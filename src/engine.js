/**
 * ポケモンカード投資・アービトラージ＆PSAグレーディング計算エンジン
 */

/**
 * eBay仕入れ総費用（本体＋国際送料＋輸入消費税）を計算
 */
export function calculateImportCost(ebayPriceUsd, ebayShippingUsd, settings) {
  const usdRate = settings.usdJpyRate;
  const itemCostJpy = Math.round(ebayPriceUsd * usdRate);
  const shippingCostJpy = Math.round(ebayShippingUsd * usdRate);
  
  // 個人輸入の消費税計算（課税価格は本体価格の約60%とみなされる）
  let importTaxJpy = 0;
  if (itemCostJpy > settings.taxExemptionThresholdJpy) {
    const taxableBase = itemCostJpy * 0.6;
    importTaxJpy = Math.round(taxableBase * settings.importConsumptionTaxRate);
  }
  
  const totalCostJpy = itemCostJpy + shippingCostJpy + importTaxJpy;

  return {
    itemCostJpy,
    shippingCostJpy,
    importTaxJpy,
    totalCostJpy
  };
}

/**
 * 指定プラットフォームでの国内売却手取り・純利益・ROIを計算
 */
export function calculateDomesticSaleProfit(salePriceJpy, totalImportCostJpy, platformKey, settings) {
  const platform = settings.platformFees[platformKey] || { rate: 0.10, name: "メルカリ" };
  const feeRate = platform.rate;
  const platformFeeJpy = Math.round(salePriceJpy * feeRate);
  const shippingJpy = platformKey === "torecaJapan" ? 0 : settings.domesticShippingJpy;
  const packingJpy = platformKey === "torecaJapan" ? 0 : settings.packingCostJpy;
  
  const netRevenueJpy = salePriceJpy - platformFeeJpy - shippingJpy - packingJpy;
  const netProfitJpy = netRevenueJpy - totalImportCostJpy;
  const roiPercent = totalImportCostJpy > 0 ? (netProfitJpy / totalImportCostJpy) * 100 : 0;
  
  // 損益分岐点（利益ゼロとなる最小販売価格）
  const breakEvenPriceJpy = Math.ceil((totalImportCostJpy + shippingJpy + packingJpy) / (1 - feeRate));

  return {
    platformKey,
    platformName: platform.name,
    feeRatePercent: feeRate * 100,
    salePriceJpy,
    platformFeeJpy,
    shippingJpy,
    packingJpy,
    netRevenueJpy,
    netProfitJpy,
    roiPercent: parseFloat(roiPercent.toFixed(1)),
    breakEvenPriceJpy
  };
}

/**
 * PSA鑑定投資（素体仕入れ ➔ PSA10/PSA9化）の損益・期待値分析
 */
export function analyzePsaGradingStrategy(card, settings) {
  const rawPriceUsd = card.rawPriceUsd || (card.ebayPriceUsd * 0.45);
  const rawShippingUsd = card.rawShippingUsd || 25;
  const gradingFeeJpy = card.gradingFeeJpy || settings.defaultGradingFeeJpy || 3500;
  const gemRate = card.psa10GemRate || 0.70; // PSA10取得期待率

  // 素体仕入れコスト
  const rawImportCost = calculateImportCost(rawPriceUsd, rawShippingUsd, settings);
  const totalGradedCostJpy = rawImportCost.totalCostJpy + gradingFeeJpy;

  const psa10SalePriceJpy = card.psa10PriceJpy || card.snkrdunkPriceJpy || 100000;
  const psa9SalePriceJpy = card.psa9PriceJpy || Math.round(psa10SalePriceJpy * 0.55);

  // 国内最適チャネルでの売却試算 (ヤフーフリマ5%を基準)
  const psa10ProfitYahoo = calculateDomesticSaleProfit(psa10SalePriceJpy, totalGradedCostJpy, "yahoo", settings);
  const psa10ProfitSnkr = calculateDomesticSaleProfit(psa10SalePriceJpy, totalGradedCostJpy, "snkrdunk", settings);
  const psa10BestProfit = psa10ProfitYahoo.netProfitJpy > psa10ProfitSnkr.netProfitJpy ? psa10ProfitYahoo : psa10ProfitSnkr;

  const psa9ProfitYahoo = calculateDomesticSaleProfit(psa9SalePriceJpy, totalGradedCostJpy, "yahoo", settings);
  const psa9ProfitSnkr = calculateDomesticSaleProfit(psa9SalePriceJpy, totalGradedCostJpy, "snkrdunk", settings);
  const psa9BestProfit = psa9ProfitYahoo.netProfitJpy > psa9ProfitSnkr.netProfitJpy ? psa9ProfitYahoo : psa9ProfitSnkr;

  // 期待値 (Expected Value)
  const expectedProfitJpy = Math.round((psa10BestProfit.netProfitJpy * gemRate) + (psa9BestProfit.netProfitJpy * (1 - gemRate)));
  const expectedRoiPercent = totalGradedCostJpy > 0 ? parseFloat(((expectedProfitJpy / totalGradedCostJpy) * 100).toFixed(1)) : 0;
  
  // アップサイド倍率 (PSA10価格 / 素体仕入れ円換算)
  const upsideMultiplier = rawImportCost.totalCostJpy > 0 ? parseFloat((psa10SalePriceJpy / rawImportCost.totalCostJpy).toFixed(2)) : 0;

  // 安全性判定: PSA9でも黒字か
  const isPsa9Safe = psa9BestProfit.netProfitJpy >= 0;

  // PSA鑑定推奨度ランク (PSA-SS, PSA-S, PSA-A, PSA-B)
  let psaRank = "PSA-B";
  let psaRecommendation = "鑑定慎重 (PSA10必須)";
  if (expectedRoiPercent >= 80 && isPsa9Safe) {
    psaRank = "PSA-SS";
    psaRecommendation = "超特選 (PSA9でも黒字・圧倒的利回り)";
  } else if (expectedRoiPercent >= 50) {
    psaRank = "PSA-S";
    psaRecommendation = "高期待値 (鑑定出し強く推奨)";
  } else if (expectedRoiPercent >= 25) {
    psaRank = "PSA-A";
    psaRecommendation = "手堅い鑑定利益";
  }

  return {
    rawPriceUsd,
    rawShippingUsd,
    rawImportCost,
    gradingFeeJpy,
    totalGradedCostJpy,
    gemRate,
    psa10SalePriceJpy,
    psa9SalePriceJpy,
    psa10Profit: psa10BestProfit,
    psa9Profit: psa9BestProfit,
    expectedProfitJpy,
    expectedRoiPercent,
    upsideMultiplier,
    isPsa9Safe,
    psaRank,
    psaRecommendation
  };
}

/**
 * カード全般の総合投資分析（通常アービトラージ＋PSA鑑定戦略）
 */
export function analyzeCardInvestment(card, settings) {
  const importCost = calculateImportCost(card.ebayPriceUsd, card.ebayShippingUsd, settings);

  // 通常仕入れ（PSA10完成品または現状グレードをそのまま国内転売）
  const mercariAnalysis = calculateDomesticSaleProfit(card.mercariAvgPriceJpy, importCost.totalCostJpy, "mercari", settings);
  const yahooAnalysis = calculateDomesticSaleProfit(card.yahooAvgPriceJpy, importCost.totalCostJpy, "yahoo", settings);
  const snkrdunkAnalysis = calculateDomesticSaleProfit(card.snkrdunkPriceJpy, importCost.totalCostJpy, "snkrdunk", settings);
  
  const latestToreca = card.torecaJapanHistory && card.torecaJapanHistory.length > 0 
    ? card.torecaJapanHistory[card.torecaJapanHistory.length - 1].buyPrice 
    : card.torecaJapanPriceJpy * 0.85;
  const torecaAnalysis = calculateDomesticSaleProfit(latestToreca, importCost.totalCostJpy, "torecaJapan", settings);

  const channels = [
    { key: "mercari", data: mercariAnalysis },
    { key: "yahoo", data: yahooAnalysis },
    { key: "snkrdunk", data: snkrdunkAnalysis },
    { key: "torecaJapan", data: torecaAnalysis }
  ];

  let bestChannel = channels[0];
  channels.forEach(ch => {
    if (ch.data.netProfitJpy > bestChannel.data.netProfitJpy) {
      bestChannel = ch;
    }
  });

  // PSA鑑定投資分析
  const psaAnalysis = analyzePsaGradingStrategy(card, settings);

  // 総合スコア
  const roiScore = Math.min(Math.max((bestChannel.data.roiPercent / 30) * 100, 0), 100);
  const demandBase = card.demandScore || 70;
  const trendScore = Math.min(Math.max((card.priceTrend30d + 10) * 5, 0), 100);
  const liquidityScore = Math.min(Math.max((10 - (card.liquiditySpeedDays || 5)) * 10, 0), 100);
  
  const overallScore = Math.round((roiScore * 0.35) + (demandBase * 0.35) + (trendScore * 0.15) + (liquidityScore * 0.15));

  let rank = "C";
  let recommendation = "様子見";

  if (overallScore >= 88) {
    rank = "SS";
    recommendation = "最優先・強力買い推奨";
  } else if (overallScore >= 78) {
    rank = "S";
    recommendation = "買い推奨（仕入れ好機）";
  } else if (overallScore >= 65) {
    rank = "A";
    recommendation = "利益確定・手堅い投資";
  } else if (overallScore >= 50) {
    rank = "B";
    recommendation = "相場注視・指値仕入れ";
  }

  return {
    card,
    importCost,
    channels: {
      mercari: mercariAnalysis,
      yahoo: yahooAnalysis,
      snkrdunk: snkrdunkAnalysis,
      torecaJapan: torecaAnalysis
    },
    bestChannel,
    overallScore,
    rank,
    recommendation,
    psaAnalysis // PSA鑑定分析結果
  };
}
