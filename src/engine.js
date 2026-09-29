/**
 * ポケモンカード国内投資・メルカリ販売特化型 計算エンジン
 * 国内仕入れ（カドショ・フリマ・ストレージ等）➔ メルカリ販売の正確な手取り・純利益・ROIを計算
 */

// メルカリ基本設定定数
export const MERCARI_CONSTANTS = {
  feeRate: 0.10,          // メルカリ販売手数料 10%
  shippingJpy: 210,       // らくらくメルカリ便 ネコポス (全国一律 ¥210)
  packingCostJpy: 50,     // 硬質ケース/厚紙・OPP防水袋・クッション封筒等の資材費 (約 ¥50)
  psaJapanFeeJpy: 3500    // PSA日本支社 鑑定代行料 (エコノミープラン ¥3,500)
};

/**
 * メルカリ販売での手取り額・純利益・損益分岐点 (BEP) を計算
 * @param {number} salePriceJpy - メルカリ出品・売却想定価格 (円)
 * @param {number} purchaseCostJpy - 仕入れ原価 (円)
 * @returns {object} 計算結果
 */
export function calculateMercariProfit(salePriceJpy, purchaseCostJpy) {
  const feeRate = MERCARI_CONSTANTS.feeRate;
  const platformFeeJpy = Math.round(salePriceJpy * feeRate);
  const shippingJpy = MERCARI_CONSTANTS.shippingJpy;
  const packingJpy = MERCARI_CONSTANTS.packingCostJpy;

  // 手取り額 = 売価 - 手数料(10%) - 送料(¥210) - 梱包資材(¥50)
  const netRevenueJpy = salePriceJpy - platformFeeJpy - shippingJpy - packingJpy;
  
  // 純利益 = 手取り額 - 仕入れ原価
  const netProfitJpy = netRevenueJpy - purchaseCostJpy;
  
  // 粗利率 (ROI %)
  const roiPercent = purchaseCostJpy > 0 ? parseFloat(((netProfitJpy / purchaseCostJpy) * 100).toFixed(1)) : 0;

  // 損益分岐点 (BEP) = (仕入れ原価 + 送料210 + 梱包50) ÷ (1 - 0.10)
  const breakEvenPriceJpy = Math.ceil((purchaseCostJpy + shippingJpy + packingJpy) / (1 - feeRate));

  return {
    platform: "メルカリ",
    salePriceJpy,
    platformFeeJpy,
    feeRatePercent: feeRate * 100,
    shippingJpy,
    packingJpy,
    netRevenueJpy,
    purchaseCostJpy,
    netProfitJpy,
    roiPercent,
    breakEvenPriceJpy
  };
}

/**
 * 国内素体仕入れ ➔ PSA日本支社鑑定 ➔ メルカリ売却の損益・期待値分析
 * @param {object} card 
 * @param {object} settings 
 */
export function analyzePsaGradingStrategy(card, settings) {
  // 国内カドショ・フリマでの素体美品(Near Mint)仕入れ価格 (円)
  const rawPriceJpy = card.rawPriceJpy || Math.round((card.rawPriceUsd || 25) * (settings.usdJpyRate || 150));
  const gradingFeeJpy = card.gradingFeeJpy || MERCARI_CONSTANTS.psaJapanFeeJpy;
  
  // 総原価 = 素体仕入れ代 + PSA日本支社鑑定料(¥3,500)
  const totalGradedCostJpy = rawPriceJpy + gradingFeeJpy;

  const psa10SalePriceJpy = card.psa10PriceJpy || card.snkrdunkPriceJpy || 18000;
  const psa9SalePriceJpy = card.psa9PriceJpy || Math.round(psa10SalePriceJpy * 0.55);
  const gemRate = card.psa10GemRate || 0.75;

  // メルカリ販売時の損益計算
  const psa10Profit = calculateMercariProfit(psa10SalePriceJpy, totalGradedCostJpy);
  const psa9Profit = calculateMercariProfit(psa9SalePriceJpy, totalGradedCostJpy);

  // 加重平均期待値 (EV) = PSA10純利 × 取得率 + PSA9純利 × (1 - 取得率)
  const expectedProfitJpy = Math.round((psa10Profit.netProfitJpy * gemRate) + (psa9Profit.netProfitJpy * (1 - gemRate)));
  const expectedRoiPercent = totalGradedCostJpy > 0 ? parseFloat(((expectedProfitJpy / totalGradedCostJpy) * 100).toFixed(1)) : 0;
  
  const upsideMultiplier = rawPriceJpy > 0 ? parseFloat((psa10SalePriceJpy / (rawPriceJpy + gradingFeeJpy)).toFixed(2)) : 0;
  const isPsa9Safe = psa9Profit.netProfitJpy >= 0;

  let psaRank = "PSA-B";
  let psaRecommendation = "PSA10必須 (ハイリスク)";
  if (expectedRoiPercent >= 80 && isPsa9Safe) {
    psaRank = "PSA-SS";
    psaRecommendation = "超特選 (PSA9でも黒字・鉄壁)";
  } else if (expectedRoiPercent >= 50) {
    psaRank = "PSA-S";
    psaRecommendation = "高期待値 (鑑定出し強く推奨)";
  } else if (expectedRoiPercent >= 25) {
    psaRank = "PSA-A";
    psaRecommendation = "手堅い鑑定利益";
  }

  return {
    rawPriceJpy,
    gradingFeeJpy,
    totalGradedCostJpy,
    gemRate,
    psa10SalePriceJpy,
    psa9SalePriceJpy,
    psa10Profit,
    psa9Profit,
    expectedProfitJpy,
    expectedRoiPercent,
    upsideMultiplier,
    isPsa9Safe,
    psaRank,
    psaRecommendation
  };
}

/**
 * 国内シングルカードのメルカリ販売 総合分析
 * @param {object} card 
 * @param {object} settings 
 */
export function analyzeCardInvestment(card, settings) {
  // 国内仕入れ目安価格 (円)
  const purchaseCostJpy = card.rawPriceJpy || Math.round((card.rawPriceUsd || 20) * 150);
  
  // メルカリ想定売価 (円)
  const mercariSalePriceJpy = card.mercariAvgPriceJpy || card.snkrdunkPriceJpy || 18000;

  // メルカリ利益計算
  const mercariProfit = calculateMercariProfit(mercariSalePriceJpy, purchaseCostJpy);

  // 互換性のためのbestChannel構造
  const bestChannel = {
    key: "mercari",
    data: {
      platformName: "メルカリ (手取計算済)",
      salePriceJpy: mercariSalePriceJpy,
      netRevenueJpy: mercariProfit.netRevenueJpy,
      netProfitJpy: mercariProfit.netProfitJpy,
      roiPercent: mercariProfit.roiPercent,
      breakEvenPriceJpy: mercariProfit.breakEvenPriceJpy
    }
  };

  const psaAnalysis = analyzePsaGradingStrategy(card, settings);

  // メルカリ流動性スコアリング
  const sold7d = card.domesticSold7d || (card.domesticMarketLiquidity ? card.domesticMarketLiquidity.weeklySoldCount : 15);
  const activeListings = card.domesticActiveListings || (card.domesticMarketLiquidity ? card.domesticMarketLiquidity.activeListingCount : 20);
  const str = card.sellThroughRate7d || (card.domesticMarketLiquidity ? card.domesticMarketLiquidity.sellThroughRate : 75.0);

  // 総合需給スコア (成約数 40% + 消化率 35% + 粗利 25%)
  const soldScore = Math.min(sold7d / 30 * 100, 100);
  const strScore = Math.min(str / 200 * 100, 100);
  const roiScore = Math.min(Math.max((mercariProfit.roiPercent / 40) * 100, 0), 100);
  const overallScore = Math.round((soldScore * 0.40) + (strScore * 0.35) + (roiScore * 0.25));

  let rank = "B";
  let recommendation = "手堅い銘柄";
  if (overallScore >= 85) {
    rank = "SS";
    recommendation = "超高回転・即売れ確実";
  } else if (overallScore >= 75) {
    rank = "S";
    recommendation = "高需要・早期SOLD推奨";
  } else if (overallScore >= 60) {
    rank = "A";
    recommendation = "安定した成約需要";
  }

  return {
    card,
    purchaseCostJpy,
    importCost: {
      totalCostJpy: purchaseCostJpy,
      itemCostJpy: purchaseCostJpy,
      shippingCostJpy: 0,
      importTaxJpy: 0
    },
    mercariProfit,
    bestChannel,
    overallScore,
    rank,
    recommendation,
    psaAnalysis,
    liquidity: {
      sold7d,
      activeListings,
      sellThroughRate: parseFloat(Number(str).toFixed(1)),
      turnoverDays: card.estimatedTurnoverDays || (card.domesticMarketLiquidity ? card.domesticMarketLiquidity.estimatedDaysToSell : 2.5),
      ebayActiveListings: activeListings,
      ebaySupplyStatus: "国内流通潤沢"
    }
  };
}

// 互換性のためのエクスポート
export async function fetchLatestExchangeRate() {
  return { rate: 150.0, fetchedAt: "国内日本円基準" };
}
export function calculateImportCost(ebayPriceUsd, ebayShippingUsd, settings) {
  const itemCostJpy = Math.round(ebayPriceUsd * 150);
  return { itemCostJpy, shippingCostJpy: 0, importTaxJpy: 0, totalCostJpy: itemCostJpy };
}
export function calculateDomesticSaleProfit(salePriceJpy, totalImportCostJpy, platformKey, settings) {
  return calculateMercariProfit(salePriceJpy, totalImportCostJpy);
}
