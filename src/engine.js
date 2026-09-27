/**
 * ポケモンカード投資・需給＆PSAグレーディング計算エンジン
 */

/**
 * open.er-api.com の無料APIからUSD/JPYの最新為替レートを取得する
 * @returns {Promise<{rate: number, fetchedAt: string}>}
 */
export async function fetchLatestExchangeRate() {
  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!res.ok) throw new Error("為替レート取得に失敗しました (HTTP " + res.status + ")");
  const json = await res.json();
  const rate = json.rates && json.rates.JPY;
  if (!rate) throw new Error("JPYレートが取得できませんでした");
  return {
    rate: Math.round(rate * 100) / 100, // 小数2桁に丸める
    fetchedAt: new Date().toLocaleString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
  };
}

/**
 * eBay仕入れ総費用（本体＋国際送料＋輸入消費税）を計算
 */
export function calculateImportCost(ebayPriceUsd, ebayShippingUsd, settings) {
  const usdRate = settings.usdJpyRate;
  const itemCostJpy = Math.round(ebayPriceUsd * usdRate);
  const shippingCostJpy = Math.round(ebayShippingUsd * usdRate);
  
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
  const gemRate = card.psa10GemRate || 0.70;

  const rawImportCost = calculateImportCost(rawPriceUsd, rawShippingUsd, settings);
  const totalGradedCostJpy = rawImportCost.totalCostJpy + gradingFeeJpy;

  const psa10SalePriceJpy = card.psa10PriceJpy || card.snkrdunkPriceJpy || 100000;
  const psa9SalePriceJpy = card.psa9PriceJpy || Math.round(psa10SalePriceJpy * 0.55);

  const psa10ProfitYahoo = calculateDomesticSaleProfit(psa10SalePriceJpy, totalGradedCostJpy, "yahoo", settings);
  const psa10ProfitSnkr = calculateDomesticSaleProfit(psa10SalePriceJpy, totalGradedCostJpy, "snkrdunk", settings);
  const psa10BestProfit = psa10ProfitYahoo.netProfitJpy > psa10ProfitSnkr.netProfitJpy ? psa10ProfitYahoo : psa10ProfitSnkr;

  const psa9ProfitYahoo = calculateDomesticSaleProfit(psa9SalePriceJpy, totalGradedCostJpy, "yahoo", settings);
  const psa9ProfitSnkr = calculateDomesticSaleProfit(psa9SalePriceJpy, totalGradedCostJpy, "snkrdunk", settings);
  const psa9BestProfit = psa9ProfitYahoo.netProfitJpy > psa9ProfitSnkr.netProfitJpy ? psa9ProfitYahoo : psa9ProfitSnkr;

  const expectedProfitJpy = Math.round((psa10BestProfit.netProfitJpy * gemRate) + (psa9BestProfit.netProfitJpy * (1 - gemRate)));
  const expectedRoiPercent = totalGradedCostJpy > 0 ? parseFloat(((expectedProfitJpy / totalGradedCostJpy) * 100).toFixed(1)) : 0;
  
  const upsideMultiplier = rawImportCost.totalCostJpy > 0 ? parseFloat((psa10SalePriceJpy / rawImportCost.totalCostJpy).toFixed(2)) : 0;

  const isPsa9Safe = psa9BestProfit.netProfitJpy >= 0;

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
 * カード全般の総合投資・需給分析（通常アービトラージ＋PSA鑑定＋直近7日売買成立・供給判定）
 */
export function analyzeCardInvestment(card, settings) {
  const importCost = calculateImportCost(card.ebayPriceUsd, card.ebayShippingUsd, settings);

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

  const psaAnalysis = analyzePsaGradingStrategy(card, settings);

  // 【需給・流動性スコアの精密計算】
  // 1. 週間成約数スコア (0〜100) : 週間30件以上で満点
  const soldVolumeScore = Math.min((card.domesticSold7d || 10) / 30 * 100, 100);
  
  // 2. 週間消化率 (Sell-Through Rate) スコア : 消化率200%以上で満点
  const str = card.sellThroughRate7d || ((card.domesticSold7d || 10) / (card.domesticActiveListings || 10) * 100);
  const strScore = Math.min(str / 200 * 100, 100);

  // 3. eBay仕入れ供給スコア : アクティブ出品20件以上で満点
  const supplyScore = Math.min((card.ebayActiveListings || 10) / 20 * 100, 100);

  // 4. 利回り(ROI)スコア
  const roiScore = Math.min(Math.max((bestChannel.data.roiPercent / 30) * 100, 0), 100);

  // 総合需給投資スコア (成約力 30% + 消化率 25% + 仕入れ供給力 20% + 利回り 25%)
  const overallScore = Math.round((soldVolumeScore * 0.30) + (strScore * 0.25) + (supplyScore * 0.20) + (roiScore * 0.25));

  let rank = "C";
  let recommendation = "様子見";

  if (overallScore >= 88) {
    rank = "SS";
    recommendation = "最優先・強力買い推奨（高供給＆即売れ）";
  } else if (overallScore >= 78) {
    rank = "S";
    recommendation = "買い推奨（仕入れ好機＆高回転）";
  } else if (overallScore >= 65) {
    rank = "A";
    recommendation = "手堅い投資（安定需給）";
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
    psaAnalysis,
    liquidity: {
      sold7d: card.domesticSold7d || 10,
      activeListings: card.domesticActiveListings || 10,
      sellThroughRate: parseFloat(str.toFixed(1)),
      turnoverDays: card.estimatedTurnoverDays || 3.0,
      ebayActiveListings: card.ebayActiveListings || 10,
      ebaySold7d: card.ebaySold7d || 5,
      ebaySupplyStatus: card.ebaySupplyStatus || "適正"
    }
  };
}
