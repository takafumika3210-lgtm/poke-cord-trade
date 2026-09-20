/**
 * ポケモンカード投資・アービトラージ計算エンジン
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
 * カード全般の投資分析指標（最適販売チャネル・需給スコア・総合判定）を算出
 */
export function analyzeCardInvestment(card, settings) {
  const importCost = calculateImportCost(card.ebayPriceUsd, card.ebayShippingUsd, settings);

  // 各プラットフォームでのシミュレーション
  const mercariAnalysis = calculateDomesticSaleProfit(card.mercariAvgPriceJpy, importCost.totalCostJpy, "mercari", settings);
  const yahooAnalysis = calculateDomesticSaleProfit(card.yahooAvgPriceJpy, importCost.totalCostJpy, "yahoo", settings);
  const snkrdunkAnalysis = calculateDomesticSaleProfit(card.snkrdunkPriceJpy, importCost.totalCostJpy, "snkrdunk", settings);
  
  // トレカジャパン買取価格
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

  // 純利益が最も高い最適チャネルを特定
  let bestChannel = channels[0];
  channels.forEach(ch => {
    if (ch.data.netProfitJpy > bestChannel.data.netProfitJpy) {
      bestChannel = ch;
    }
  });

  // 需給スコア総合判定（0〜100点）
  // 構成要素: 利益率(35%) + 需給スコア(35%) + トレンドモメンタム(15%) + 回転日数(15%)
  const roiScore = Math.min(Math.max((bestChannel.data.roiPercent / 30) * 100, 0), 100);
  const demandBase = card.demandScore || 70;
  const trendScore = Math.min(Math.max((card.priceTrend30d + 10) * 5, 0), 100);
  const liquidityScore = Math.min(Math.max((10 - (card.liquiditySpeedDays || 5)) * 10, 0), 100);
  
  const overallScore = Math.round((roiScore * 0.35) + (demandBase * 0.35) + (trendScore * 0.15) + (liquidityScore * 0.15));

  let rank = "C";
  let badgeColor = "gray";
  let recommendation = "様子見";

  if (overallScore >= 88) {
    rank = "SS";
    badgeColor = "emerald";
    recommendation = "最優先・強力買い推奨";
  } else if (overallScore >= 78) {
    rank = "S";
    badgeColor = "blue";
    recommendation = "買い推奨（仕入れ好機）";
  } else if (overallScore >= 65) {
    rank = "A";
    badgeColor = "indigo";
    recommendation = "利益確定・手堅い投資";
  } else if (overallScore >= 50) {
    rank = "B";
    badgeColor = "amber";
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
    badgeColor,
    recommendation
  };
}
