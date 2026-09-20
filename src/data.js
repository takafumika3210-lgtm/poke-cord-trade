// ポケモンカード投資・需給＆PSAグレーディングデータセット (需給深度・直近7日実績・仕入れ可能性データ付き)
export const INITIAL_CARDS = [
  // --- 3万円未満仕入れ特選銘柄 (小資本・高回転・PSA化で大化け) ---
  {
    id: "card-008",
    name: "コイキング (AR)",
    cardSet: "強化拡張パック トリプレットビート",
    cardNumber: "073/073 AR",
    releaseYear: 2023,
    grade: "Raw (未鑑定/NM)",
    imageUrl: "https://images.pokemontcg.io/sv1a/73_hires.png",
    fallbackImageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&auto=format&fit=crop&q=60",
    ebayBuyUrl: "https://www.ebay.com/sch/i.html?_nkw=magikarp+ar+073%2F073+japanese+pokemon+raw+nm&_sop=15",
    snkrdunkUrl: "https://snkrdunk.com/search?keywords=コイキング+AR+073%2F073",
    mercariSoldUrl: "https://jp.mercari.com/search?keyword=コイキング+AR+トリプレットビート&status=sold_out",
    yahooSoldUrl: "https://paypayfleamarket.yahoo.co.jp/search/コイキング%20AR%20トリプレットビート",
    
    // 【仕入れ側・購入可能性データ (eBay)】
    rawPriceUsd: 22,
    rawShippingUsd: 10,
    ebayActiveListings: 34, // 現在のeBay素体出品数
    ebaySold7d: 18, // 直近7日間のeBay成約数
    ebaySupplyStatus: "潤沢 (常時即購入可)",
    
    // 【売却側・直近7日販売実績・需給消化力 (国内市場)】
    domesticActiveListings: 16, // 国内現在の出品数
    domesticSold7d: 55, // 直近7日間の売買成立数
    sellThroughRate7d: 343.8, // 週間消化率: 55 / 16 = 343% (超即売れ)
    estimatedTurnoverDays: 1.8, // 平均売却所要日数
    soldPriceRange7d: { min: 17500, max: 19000 },
    
    ebayPriceUsd: 110,
    ebayShippingUsd: 15,
    rawPriceJpy: 3500,
    psa9PriceJpy: 7500,
    psa10PriceJpy: 18500,
    psa10GemRate: 0.85,
    gradingFeeJpy: 3500,
    ebaySellerRating: "100%",
    ebayItemLocation: "United States (California)",
    snkrdunkPriceJpy: 18500,
    torecaJapanPriceJpy: 17500,
    mercariAvgPriceJpy: 18000,
    yahooAvgPriceJpy: 17800,
    demandScore: 96,
    liquiditySpeedDays: 1.8,
    priceTrend30d: +18.2,
    snkrdunkHistory: [
      { date: "2026-08-20", price: 13500, volume: 35 },
      { date: "2026-08-27", price: 15000, volume: 42 },
      { date: "2026-09-03", price: 16200, volume: 50 },
      { date: "2026-09-10", price: 17500, volume: 48 },
      { date: "2026-09-18", price: 18500, volume: 55 }
    ],
    torecaJapanHistory: [
      { date: "2026-08-20", buyPrice: 11000, sellPrice: 14000 },
      { date: "2026-08-27", buyPrice: 12500, sellPrice: 15500 },
      { date: "2026-09-03", buyPrice: 14000, sellPrice: 16800 },
      { date: "2026-09-10", buyPrice: 15000, sellPrice: 18000 },
      { date: "2026-09-18", buyPrice: 15000, sellPrice: 17500 }
    ],
    mercariSoldExamples: [
      { date: "2026-09-19", price: 18800, condition: "PSA10 即日発送・鑑定品", title: "【PSA10】コイキング AR 073/073" },
      { date: "2026-09-18", price: 18500, condition: "PSA10 即購入可・匿名配送", title: "コイキング AR PSA10 トリプレットビート" },
      { date: "2026-09-17", price: 18200, condition: "PSA10 厳選個体", title: "コイキング AR PSA10 美品" },
      { date: "2026-09-14", price: 7800, condition: "PSA9 美品", title: "コイキング AR PSA9" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-19", price: 18400, condition: "PSA10 即決", title: "PSA10 コイキング AR トリプレットビート" },
      { date: "2026-09-17", price: 18200, condition: "PSA10 送料無料", title: "コイキング AR PSA10" }
    ],
    tags: ["3万円未満", "超高回転", "週間55件成約", "消化率340%"],
    notes: "eBayに素体出品が常時30件以上あり仕入れ確実。国内では直近7日で55件が売買成立しており、出品後平均1.8日で完売する最高ランクの流動性。"
  },
  {
    id: "card-009",
    name: "ピカチュウ (AR)",
    cardSet: "ハイクラスパック VSTARユニバース",
    cardNumber: "205/172 AR",
    releaseYear: 2022,
    grade: "Raw (未鑑定/NM)",
    imageUrl: "https://images.pokemontcg.io/s12a/205_hires.png",
    fallbackImageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=60",
    ebayBuyUrl: "https://www.ebay.com/sch/i.html?_nkw=pikachu+ar+205%2F172+vstar+universe+japanese+raw&_sop=15",
    snkrdunkUrl: "https://snkrdunk.com/search?keywords=ピカチュウ+AR+205%2F172",
    mercariSoldUrl: "https://jp.mercari.com/search?keyword=ピカチュウ+AR+VSTARユニバース&status=sold_out",
    yahooSoldUrl: "https://paypayfleamarket.yahoo.co.jp/search/ピカチュウ%20AR%20VSTARユニバース",
    
    // 【仕入れ側・購入可能性データ】
    rawPriceUsd: 18,
    rawShippingUsd: 10,
    ebayActiveListings: 60,
    ebaySold7d: 32,
    ebaySupplyStatus: "潤沢 (大量まとめ買い可)",

    // 【売却側・直近7日販売実績】
    domesticActiveListings: 25,
    domesticSold7d: 82, // 週間成約82件 (驚異的出来高)
    sellThroughRate7d: 328.0,
    estimatedTurnoverDays: 1.5,
    soldPriceRange7d: { min: 14000, max: 15000 },

    ebayPriceUsd: 85,
    ebayShippingUsd: 12,
    rawPriceJpy: 2800,
    psa9PriceJpy: 6000,
    psa10PriceJpy: 14500,
    psa10GemRate: 0.88,
    gradingFeeJpy: 3500,
    ebaySellerRating: "99.9%",
    ebayItemLocation: "United States (Texas)",
    snkrdunkPriceJpy: 14500,
    torecaJapanPriceJpy: 13800,
    mercariAvgPriceJpy: 14200,
    yahooAvgPriceJpy: 14000,
    demandScore: 98,
    liquiditySpeedDays: 1.5,
    priceTrend30d: +6.5,
    snkrdunkHistory: [
      { date: "2026-08-20", price: 12500, volume: 60 },
      { date: "2026-08-27", price: 13000, volume: 65 },
      { date: "2026-09-03", price: 13500, volume: 70 },
      { date: "2026-09-10", price: 14000, volume: 78 },
      { date: "2026-09-18", price: 14500, volume: 82 }
    ],
    torecaJapanHistory: [
      { date: "2026-08-20", buyPrice: 10000, sellPrice: 13000 },
      { date: "2026-08-27", buyPrice: 10500, sellPrice: 13500 },
      { date: "2026-09-03", buyPrice: 11000, sellPrice: 14000 },
      { date: "2026-09-10", buyPrice: 11500, sellPrice: 14500 },
      { date: "2026-09-18", buyPrice: 11500, sellPrice: 13800 }
    ],
    mercariSoldExamples: [
      { date: "2026-09-19", price: 14600, condition: "PSA10 即購入可", title: "ピカチュウ AR PSA10 VSTARユニバース" },
      { date: "2026-09-18", price: 14800, condition: "PSA10 美品", title: "【PSA10】ピカチュウ AR" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-19", price: 14300, condition: "PSA10 クーポン利用", title: "ピカチュウ AR PSA10" }
    ],
    tags: ["3万円未満", "週間82件成約", "即売れ度No.1", "バルク仕入れ推奨"],
    notes: "全銘柄中トップの売買成約数（週間82件）。eBayに常時60件出品があり仕入れに困ることは一切なく、国内出品後1.5日以内に確実に現金化可能。"
  },
  {
    id: "card-010",
    name: "カミツレのきらめき (SR)",
    cardSet: "ハイクラスパック VSTARユニバース",
    cardNumber: "246/172 SR",
    releaseYear: 2022,
    grade: "Raw (未鑑定/NM)",
    imageUrl: "https://images.pokemontcg.io/s12a/246_hires.png",
    fallbackImageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=60",
    ebayBuyUrl: "https://www.ebay.com/sch/i.html?_nkw=elesa%27s+sparkle+sr+246%2F172+japanese+pokemon+raw&_sop=15",
    snkrdunkUrl: "https://snkrdunk.com/search?keywords=カミツレのきらめき+SR+246%2F172",
    mercariSoldUrl: "https://jp.mercari.com/search?keyword=カミツレのきらめき+SR+VSTARユニバース&status=sold_out",
    yahooSoldUrl: "https://paypayfleamarket.yahoo.co.jp/search/カミツレのきらめき%20SR%20VSTARユニバース",
    
    // 【仕入れ側・購入可能性データ】
    rawPriceUsd: 48,
    rawShippingUsd: 12,
    ebayActiveListings: 22,
    ebaySold7d: 11,
    ebaySupplyStatus: "適正 (毎日出品あり)",

    // 【売却側・直近7日販売実績】
    domesticActiveListings: 14,
    domesticSold7d: 32,
    sellThroughRate7d: 228.6,
    estimatedTurnoverDays: 2.2,
    soldPriceRange7d: { min: 27500, max: 29000 },

    ebayPriceUsd: 165,
    ebayShippingUsd: 18,
    rawPriceJpy: 7800,
    psa9PriceJpy: 12000,
    psa10PriceJpy: 28500,
    psa10GemRate: 0.82,
    gradingFeeJpy: 3500,
    ebaySellerRating: "100%",
    ebayItemLocation: "United States (Florida)",
    snkrdunkPriceJpy: 28500,
    torecaJapanPriceJpy: 27000,
    mercariAvgPriceJpy: 28000,
    yahooAvgPriceJpy: 27500,
    demandScore: 91,
    liquiditySpeedDays: 2.2,
    priceTrend30d: +9.4,
    snkrdunkHistory: [
      { date: "2026-08-20", price: 24000, volume: 22 },
      { date: "2026-08-27", price: 25500, volume: 25 },
      { date: "2026-09-03", price: 26500, volume: 28 },
      { date: "2026-09-10", price: 27500, volume: 30 },
      { date: "2026-09-18", price: 28500, volume: 32 }
    ],
    torecaJapanHistory: [
      { date: "2026-08-20", buyPrice: 20000, sellPrice: 25000 },
      { date: "2026-08-27", buyPrice: 21000, sellPrice: 26000 },
      { date: "2026-09-03", buyPrice: 22000, sellPrice: 27000 },
      { date: "2026-09-10", buyPrice: 23000, sellPrice: 28000 },
      { date: "2026-09-18", buyPrice: 23000, sellPrice: 27000 }
    ],
    mercariSoldExamples: [
      { date: "2026-09-19", price: 28500, condition: "PSA10 美品", title: "カミツレのきらめき SR PSA10" },
      { date: "2026-09-18", price: 28800, condition: "PSA10 完全美品・横線なし", title: "【PSA10】カミツレのきらめき SR VSTARユニバース" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-17", price: 28000, condition: "PSA10 厳選品", title: "カミツレのきらめき SR PSA10" }
    ],
    tags: ["3万円未満", "女子サポートSR", "週間32件成約", "消化率228%"],
    notes: "eBayで$48前後の素体が毎日新規出品される。国内週間成約32件・消化率228%で需給バランスが非常に良好。"
  },
  {
    id: "card-014",
    name: "ブラッキーV (SA / SR)",
    cardSet: "強化拡張パック イーブイヒーローズ",
    cardNumber: "085/069 SR",
    releaseYear: 2021,
    grade: "Raw (未鑑定/NM)",
    imageUrl: "https://images.pokemontcg.io/swsh7/189_hires.png",
    fallbackImageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60",
    ebayBuyUrl: "https://www.ebay.com/sch/i.html?_nkw=umbreon+v+sa+085%2F069+eevee+heroes+japanese+raw&_sop=15",
    snkrdunkUrl: "https://snkrdunk.com/search?keywords=ブラッキーV+SA+085%2F069",
    mercariSoldUrl: "https://jp.mercari.com/search?keyword=ブラッキーV+SA+イーブイヒーローズ&status=sold_out",
    yahooSoldUrl: "https://paypayfleamarket.yahoo.co.jp/search/ブラッキーV%20SA%20イーブイヒーローズ",
    
    // 【仕入れ側・購入可能性データ】
    rawPriceUsd: 115,
    rawShippingUsd: 15,
    ebayActiveListings: 18,
    ebaySold7d: 9,
    ebaySupplyStatus: "適正 (毎日出品あり)",

    // 【売却側・直近7日販売実績】
    domesticActiveListings: 11,
    domesticSold7d: 24,
    sellThroughRate7d: 218.2,
    estimatedTurnoverDays: 2.1,
    soldPriceRange7d: { min: 54000, max: 56500 },

    ebayPriceUsd: 340,
    ebayShippingUsd: 22,
    rawPriceJpy: 18000,
    psa9PriceJpy: 28000,
    psa10PriceJpy: 56000,
    psa10GemRate: 0.80,
    gradingFeeJpy: 3500,
    ebaySellerRating: "100%",
    ebayItemLocation: "United States (California)",
    snkrdunkPriceJpy: 56000,
    torecaJapanPriceJpy: 53000,
    mercariAvgPriceJpy: 55000,
    yahooAvgPriceJpy: 54000,
    demandScore: 95,
    liquiditySpeedDays: 2.1,
    priceTrend30d: +11.2,
    snkrdunkHistory: [
      { date: "2026-08-20", price: 46000, volume: 16 },
      { date: "2026-08-27", price: 48500, volume: 20 },
      { date: "2026-09-03", price: 51000, volume: 22 },
      { date: "2026-09-10", price: 53500, volume: 25 },
      { date: "2026-09-18", price: 56000, volume: 24 }
    ],
    torecaJapanHistory: [
      { date: "2026-08-20", buyPrice: 38000, sellPrice: 47000 },
      { date: "2026-08-27", buyPrice: 40000, sellPrice: 49500 },
      { date: "2026-09-03", buyPrice: 42500, sellPrice: 52000 },
      { date: "2026-09-10", buyPrice: 45000, sellPrice: 55000 },
      { date: "2026-09-18", buyPrice: 45000, sellPrice: 53000 }
    ],
    mercariSoldExamples: [
      { date: "2026-09-19", price: 56000, condition: "PSA10 美品", title: "ブラッキーV SA PSA10" },
      { date: "2026-09-18", price: 56500, condition: "PSA10 ワンオーナー・即購入可", title: "【PSA10】ブラッキーV SA SR イーブイヒーローズ" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-17", price: 55000, condition: "PSA10 極美品", title: "ブラッキーV SA SR PSA10" }
    ],
    tags: ["3万円未満", "ブイズSA", "週間24件成約", "PSA9でも黒字確定"],
    notes: "eBayに素体出品が常時15〜20件存在。国内週間成約24件に対して出品が11件しかなく、出品すれば約2日で成約する売り手優位の相場。"
  },
  {
    id: "card-015",
    name: "リザードン 25th プロモ",
    cardSet: "25th ANNIVERSARY COLLECTION プロモパック",
    cardNumber: "001/025 PROMO",
    releaseYear: 2021,
    grade: "PSA10",
    imageUrl: "https://images.pokemontcg.io/cel25c/4_hires.png",
    fallbackImageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=60",
    ebayBuyUrl: "https://www.ebay.com/sch/i.html?_nkw=charizard+25th+anniversary+promo+001%2F025+japanese+raw&_sop=15",
    snkrdunkUrl: "https://snkrdunk.com/search?keywords=リザードン+25th+プロモ+001%2F025",
    mercariSoldUrl: "https://jp.mercari.com/search?keyword=リザードン+25th+プロモ&status=sold_out",
    yahooSoldUrl: "https://paypayfleamarket.yahoo.co.jp/search/リザードン%2025th%20プロモ",
    
    // 【仕入れ側・購入可能性データ】
    rawPriceUsd: 110,
    rawShippingUsd: 15,
    ebayActiveListings: 45,
    ebaySold7d: 20,
    ebaySupplyStatus: "潤沢 (常時即購入可)",

    // 【売却側・直近7日販売実績】
    domesticActiveListings: 18,
    domesticSold7d: 20,
    sellThroughRate7d: 111.1,
    estimatedTurnoverDays: 3.5,
    soldPriceRange7d: { min: 59000, max: 62500 },

    ebayPriceUsd: 260,
    ebayShippingUsd: 22,
    rawPriceJpy: 22000,
    psa9PriceJpy: 32000,
    psa10PriceJpy: 62000,
    psa10GemRate: 0.85,
    gradingFeeJpy: 3500,
    ebaySellerRating: "99.5%",
    ebayItemLocation: "United Kingdom (London)",
    snkrdunkPriceJpy: 62000,
    torecaJapanPriceJpy: 59000,
    mercariAvgPriceJpy: 61000,
    yahooAvgPriceJpy: 59800,
    demandScore: 89,
    liquiditySpeedDays: 3.5,
    priceTrend30d: +3.1,
    snkrdunkHistory: [
      { date: "2026-08-20", price: 56000, volume: 15 },
      { date: "2026-08-27", price: 58000, volume: 17 },
      { date: "2026-09-03", price: 59000, volume: 19 },
      { date: "2026-09-10", price: 61000, volume: 22 },
      { date: "2026-09-18", price: 62000, volume: 20 }
    ],
    torecaJapanHistory: [
      { date: "2026-08-20", buyPrice: 48000, sellPrice: 57000 },
      { date: "2026-08-27", buyPrice: 50000, sellPrice: 59000 },
      { date: "2026-09-03", buyPrice: 51000, sellPrice: 60000 },
      { date: "2026-09-10", buyPrice: 53000, sellPrice: 62000 },
      { date: "2026-09-18", buyPrice: 53000, sellPrice: 59000 }
    ],
    mercariSoldExamples: [
      { date: "2026-09-18", price: 62500, condition: "PSA10 美品・即購入OK", title: "リザードン 25th プロモ PSA10 001/025" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-16", price: 60500, condition: "PSA10 送料無料", title: "リザードン 25th ANNIVERSARY PROMO PSA10" }
    ],
    tags: ["3万円未満", "定番リザードン", "eBay潤沢45件", "PSA9でも黒字"],
    notes: "eBay出品が45件と潤沢でいつでも仕入れ可能。国内週間成約20件で価格が6万円前後で非常に安定している。"
  },
  {
    id: "card-016",
    name: "ピカチュウ (マスターボールミラー)",
    cardSet: "強化拡張パック ポケモンカード151",
    cardNumber: "025/165 C",
    releaseYear: 2023,
    grade: "Raw (未鑑定/NM)",
    imageUrl: "https://images.pokemontcg.io/sv2a/25_hires.png",
    fallbackImageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=60",
    ebayBuyUrl: "https://www.ebay.com/sch/i.html?_nkw=pikachu+masterball+mirror+025%2F165+151+japanese+raw&_sop=15",
    snkrdunkUrl: "https://snkrdunk.com/search?keywords=ピカチュウ+マスターボールミラー+151",
    mercariSoldUrl: "https://jp.mercari.com/search?keyword=ピカチュウ+マスターボールミラー+151&status=sold_out",
    yahooSoldUrl: "https://paypayfleamarket.yahoo.co.jp/search/ピカチュウ%20マスターボールミラー%20151",
    
    // 【仕入れ側・購入可能性データ】
    rawPriceUsd: 140,
    rawShippingUsd: 15,
    ebayActiveListings: 26,
    ebaySold7d: 14,
    ebaySupplyStatus: "適正 (毎日出品あり)",

    // 【売却側・直近7日販売実績】
    domesticActiveListings: 12,
    domesticSold7d: 30,
    sellThroughRate7d: 250.0,
    estimatedTurnoverDays: 2.0,
    soldPriceRange7d: { min: 65000, max: 69000 },

    ebayPriceUsd: 420,
    ebayShippingUsd: 25,
    rawPriceJpy: 22000,
    psa9PriceJpy: 35000,
    psa10PriceJpy: 68000,
    psa10GemRate: 0.82,
    gradingFeeJpy: 3500,
    ebaySellerRating: "100%",
    ebayItemLocation: "United States (California)",
    snkrdunkPriceJpy: 68000,
    torecaJapanPriceJpy: 64000,
    mercariAvgPriceJpy: 67000,
    yahooAvgPriceJpy: 66000,
    demandScore: 94,
    liquiditySpeedDays: 2.0,
    priceTrend30d: +16.0,
    snkrdunkHistory: [
      { date: "2026-08-20", price: 54000, volume: 20 },
      { date: "2026-08-27", price: 57500, volume: 22 },
      { date: "2026-09-03", price: 61000, volume: 25 },
      { date: "2026-09-10", price: 65000, volume: 28 },
      { date: "2026-09-18", price: 68000, volume: 30 }
    ],
    torecaJapanHistory: [
      { date: "2026-08-20", buyPrice: 45000, sellPrice: 56000 },
      { date: "2026-08-27", buyPrice: 48000, sellPrice: 59000 },
      { date: "2026-09-03", buyPrice: 52000, sellPrice: 63000 },
      { date: "2026-09-10", buyPrice: 55000, sellPrice: 67000 },
      { date: "2026-09-18", buyPrice: 55000, sellPrice: 64000 }
    ],
    mercariSoldExamples: [
      { date: "2026-09-18", price: 69000, condition: "PSA10 マスボミラー ピカチュウ 美品", title: "【PSA10】ピカチュウ マスターボールミラー 151" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-17", price: 67000, condition: "PSA10 即発送", title: "ピカチュウ マスターボールミラー PSA10 151" }
    ],
    tags: ["3万円未満", "マスボミラー", "週間30件成約", "消化率250%"],
    notes: "国内出品12件に対して週間30件が売買成立（消化率250%）。出品から2日前後で確実に即売れする人気銘柄。"
  },
  {
    id: "card-017",
    name: "マリィ (SR)",
    cardSet: "ハイクラスパック シャイニースターV",
    cardNumber: "198/190 SR",
    releaseYear: 2020,
    grade: "Raw (未鑑定/NM)",
    imageUrl: "https://images.pokemontcg.io/swsh45/73_hires.png",
    fallbackImageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60",
    ebayBuyUrl: "https://www.ebay.com/sch/i.html?_nkw=marnie+sr+198%2F190+shiny+star+v+japanese+raw&_sop=15",
    snkrdunkUrl: "https://snkrdunk.com/search?keywords=マリィ+SR+198%2F190",
    mercariSoldUrl: "https://jp.mercari.com/search?keyword=マリィ+SR+シャイニースターV&status=sold_out",
    yahooSoldUrl: "https://paypayfleamarket.yahoo.co.jp/search/マリィ%20SR%20シャイニースターV",
    
    // 【仕入れ側・購入可能性データ】
    rawPriceUsd: 145,
    rawShippingUsd: 15,
    ebayActiveListings: 24,
    ebaySold7d: 12,
    ebaySupplyStatus: "適正 (毎日出品あり)",

    // 【売却側・直近7日販売実績】
    domesticActiveListings: 15,
    domesticSold7d: 26,
    sellThroughRate7d: 173.3,
    estimatedTurnoverDays: 2.3,
    soldPriceRange7d: { min: 70000, max: 73000 },

    ebayPriceUsd: 450,
    ebayShippingUsd: 25,
    rawPriceJpy: 23000,
    psa9PriceJpy: 36000,
    psa10PriceJpy: 72000,
    psa10GemRate: 0.80,
    gradingFeeJpy: 3500,
    ebaySellerRating: "100%",
    ebayItemLocation: "United States (Texas)",
    snkrdunkPriceJpy: 72000,
    torecaJapanPriceJpy: 68000,
    mercariAvgPriceJpy: 71000,
    yahooAvgPriceJpy: 70000,
    demandScore: 93,
    liquiditySpeedDays: 2.3,
    priceTrend30d: +7.5,
    snkrdunkHistory: [
      { date: "2026-08-20", price: 62000, volume: 18 },
      { date: "2026-08-27", price: 65000, volume: 20 },
      { date: "2026-09-03", price: 68000, volume: 22 },
      { date: "2026-09-10", price: 70000, volume: 25 },
      { date: "2026-09-18", price: 72000, volume: 26 }
    ],
    torecaJapanHistory: [
      { date: "2026-08-20", buyPrice: 52000, sellPrice: 64000 },
      { date: "2026-08-27", buyPrice: 55000, sellPrice: 67000 },
      { date: "2026-09-03", buyPrice: 58000, sellPrice: 70000 },
      { date: "2026-09-10", buyPrice: 60000, sellPrice: 73000 },
      { date: "2026-09-18", buyPrice: 60000, sellPrice: 68000 }
    ],
    mercariSoldExamples: [
      { date: "2026-09-18", price: 73000, condition: "PSA10 シャイニーマリィ 美品", title: "【PSA10】マリィ SR シャイニースターV" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-16", price: 71000, condition: "PSA10 即日発送", title: "マリィ SR PSA10" }
    ],
    tags: ["3万円未満", "殿堂入り女子SR", "週間26件成約", "PSA9黒字"],
    notes: "eBayに素体出品24件。国内週間成約26件で成約スピード2.3日と高回転。"
  },

  // --- 中・高額プレミアム銘柄 ---
  {
    id: "card-001",
    name: "リーリエ (がんばリーリエ)",
    cardSet: "ハイクラスパック GXバトルブースト",
    cardNumber: "119/114 SR",
    releaseYear: 2017,
    grade: "PSA10",
    imageUrl: "https://images.pokemontcg.io/sm4plus/119_hires.png",
    fallbackImageUrl: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=500&auto=format&fit=crop&q=60",
    ebayBuyUrl: "https://www.ebay.com/sch/i.html?_nkw=lillie+sr+119%2F114+gx+battle+boost+japanese&_sop=15",
    snkrdunkUrl: "https://snkrdunk.com/search?keywords=がんばリーリエ+SR+119%2F114",
    mercariSoldUrl: "https://jp.mercari.com/search?keyword=がんばリーリエ+SR+GXバトルブースト&status=sold_out",
    yahooSoldUrl: "https://paypayfleamarket.yahoo.co.jp/search/がんばリーリエ%20SR%20GXバトルブースト",
    
    // 【仕入れ側・購入可能性データ】
    rawPriceUsd: 2200,
    rawShippingUsd: 30,
    ebayActiveListings: 8,
    ebaySold7d: 3,
    ebaySupplyStatus: "品薄 (指値・アラート推奨)",

    // 【売却側・直近7日販売実績】
    domesticActiveListings: 6,
    domesticSold7d: 6,
    sellThroughRate7d: 100.0,
    estimatedTurnoverDays: 4.2,
    soldPriceRange7d: { min: 1050000, max: 1120000 },

    ebayPriceUsd: 5800,
    ebayShippingUsd: 45,
    rawPriceJpy: 380000,
    psa9PriceJpy: 550000,
    psa10PriceJpy: 1100000,
    psa10GemRate: 0.65,
    gradingFeeJpy: 5500,
    ebaySellerRating: "99.8%",
    ebayItemLocation: "United States (California)",
    snkrdunkPriceJpy: 1100000,
    torecaJapanPriceJpy: 1050000,
    mercariAvgPriceJpy: 1080000,
    yahooAvgPriceJpy: 1060000,
    demandScore: 94,
    liquiditySpeedDays: 4.2,
    priceTrend30d: +8.5,
    snkrdunkHistory: [
      { date: "2026-08-20", price: 980000, volume: 3 },
      { date: "2026-08-27", price: 1010000, volume: 4 },
      { date: "2026-09-03", price: 1040000, volume: 5 },
      { date: "2026-09-10", price: 1080000, volume: 7 },
      { date: "2026-09-18", price: 1100000, volume: 6 }
    ],
    torecaJapanHistory: [
      { date: "2026-08-20", buyPrice: 850000, sellPrice: 990000 },
      { date: "2026-08-27", buyPrice: 880000, sellPrice: 1020000 },
      { date: "2026-09-03", buyPrice: 910000, sellPrice: 1050000 },
      { date: "2026-09-10", buyPrice: 930000, sellPrice: 1080000 },
      { date: "2026-09-18", buyPrice: 950000, sellPrice: 1050000 }
    ],
    mercariSoldExamples: [
      { date: "2026-09-17", price: 1120000, condition: "PSA10最高評価・暗所保管・即日発送", title: "【PSA10】がんばリーリエ SR GXバトルブースト 正規品" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-16", price: 1090000, condition: "PSA10 極美品・クーポン利用成約", title: "PSA10 がんばリーリエ SR サン&ムーン" }
    ],
    tags: ["PSA10", "高額ハイエンド", "週間6件成約", "海外仕入れ優位"],
    notes: "100万円超の最高峰銘柄。高額のためeBay出品数は8件と品薄だが、国内でも週間6件成立しており確固たる需要がある。"
  },
  {
    id: "card-002",
    name: "ナンジャモ (SAR)",
    cardSet: "スカーレット&バイオレット クレイバースト",
    cardNumber: "096/071 SAR",
    releaseYear: 2023,
    grade: "PSA10",
    imageUrl: "https://images.pokemontcg.io/sv2D/96_hires.png",
    fallbackImageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60",
    ebayBuyUrl: "https://www.ebay.com/sch/i.html?_nkw=ionor+sar+096%2F071+clay+burst+japanese+raw&_sop=15",
    snkrdunkUrl: "https://snkrdunk.com/search?keywords=ナンジャモ+SAR+096%2F071",
    mercariSoldUrl: "https://jp.mercari.com/search?keyword=ナンジャモ+SAR+クレイバースト&status=sold_out",
    yahooSoldUrl: "https://paypayfleamarket.yahoo.co.jp/search/ナンジャモ%20SAR%20クレイバースト",
    
    // 【仕入れ側・購入可能性データ】
    rawPriceUsd: 360,
    rawShippingUsd: 20,
    ebayActiveListings: 28,
    ebaySold7d: 15,
    ebaySupplyStatus: "適正 (毎日出品あり)",

    // 【売却側・直近7日販売実績】
    domesticActiveListings: 20,
    domesticSold7d: 31,
    sellThroughRate7d: 155.0,
    estimatedTurnoverDays: 2.8,
    soldPriceRange7d: { min: 162000, max: 168000 },

    ebayPriceUsd: 780,
    ebayShippingUsd: 28,
    rawPriceJpy: 62000,
    psa9PriceJpy: 85000,
    psa10PriceJpy: 168000,
    psa10GemRate: 0.82,
    gradingFeeJpy: 3500,
    ebaySellerRating: "100%",
    ebayItemLocation: "United States (Texas)",
    snkrdunkPriceJpy: 168000,
    torecaJapanPriceJpy: 160000,
    mercariAvgPriceJpy: 165000,
    yahooAvgPriceJpy: 163000,
    demandScore: 92,
    liquiditySpeedDays: 2.8,
    priceTrend30d: +4.2,
    snkrdunkHistory: [
      { date: "2026-08-20", price: 152000, volume: 18 },
      { date: "2026-08-27", price: 156000, volume: 22 },
      { date: "2026-09-03", price: 160000, volume: 25 },
      { date: "2026-09-10", price: 164000, volume: 29 },
      { date: "2026-09-18", price: 168000, volume: 31 }
    ],
    torecaJapanHistory: [
      { date: "2026-08-20", buyPrice: 130000, sellPrice: 155000 },
      { date: "2026-08-27", buyPrice: 135000, sellPrice: 158000 },
      { date: "2026-09-03", buyPrice: 138000, sellPrice: 162000 },
      { date: "2026-09-10", buyPrice: 142000, sellPrice: 165000 },
      { date: "2026-09-18", buyPrice: 145000, sellPrice: 160000 }
    ],
    mercariSoldExamples: [
      { date: "2026-09-18", price: 168000, condition: "PSA10 完全美品・白かけなし", title: "【最安値】ナンジャモ SAR PSA10 クレイバースト" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-17", price: 166000, condition: "PSA10 クーポン利用・即決", title: "ナンジャモ SAR PSA10 クレイバースト SV2D" }
    ],
    tags: ["PSA10", "高回転", "週間31件成約", "近代人気SAR"],
    notes: "eBay出品28件、国内週間成約31件。高価格帯ながら消化スピードが極めて速い。"
  },
  {
    id: "card-003",
    name: "ゲンガー&ミミッキュGX (SA / SR)",
    cardSet: "拡張パック タッグボルト",
    cardNumber: "103/095 SR",
    releaseYear: 2018,
    grade: "Raw (未鑑定/NM)",
    imageUrl: "https://images.pokemontcg.io/sm9/165_hires.png",
    fallbackImageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=60",
    ebayBuyUrl: "https://www.ebay.com/sch/i.html?_nkw=gengar+mimikyu+gx+sa+103%2F095+japanese+raw&_sop=15",
    snkrdunkUrl: "https://snkrdunk.com/search?keywords=ゲンガー%26ミミッキュGX+SA+103%2F095",
    mercariSoldUrl: "https://jp.mercari.com/search?keyword=ゲンガー%26ミミッキュGX+SA+タッグボルト&status=sold_out",
    yahooSoldUrl: "https://paypayfleamarket.yahoo.co.jp/search/ゲンガー%26ミミッキュGX%20SA%20タッグボルト",
    
    // 【仕入れ側・購入可能性データ】
    rawPriceUsd: 420,
    rawShippingUsd: 25,
    ebayActiveListings: 14,
    ebaySold7d: 8,
    ebaySupplyStatus: "適正 (毎日出品あり)",

    // 【売却側・直近7日販売実績】
    domesticActiveListings: 8,
    domesticSold7d: 14,
    sellThroughRate7d: 175.0,
    estimatedTurnoverDays: 3.2,
    soldPriceRange7d: { min: 215000, max: 225000 },

    ebayPriceUsd: 1100,
    ebayShippingUsd: 35,
    rawPriceJpy: 72000,
    psa9PriceJpy: 95000,
    psa10PriceJpy: 225000,
    psa10GemRate: 0.70,
    gradingFeeJpy: 3500,
    ebaySellerRating: "99.7%",
    ebayItemLocation: "Australia (Sydney)",
    snkrdunkPriceJpy: 225000,
    torecaJapanPriceJpy: 210000,
    mercariAvgPriceJpy: 220000,
    yahooAvgPriceJpy: 218000,
    demandScore: 92,
    liquiditySpeedDays: 3.2,
    priceTrend30d: +15.4,
    snkrdunkHistory: [
      { date: "2026-08-20", price: 180000, volume: 8 },
      { date: "2026-08-27", price: 190000, volume: 10 },
      { date: "2026-09-03", price: 205000, volume: 12 },
      { date: "2026-09-10", price: 215000, volume: 15 },
      { date: "2026-09-18", price: 225000, volume: 14 }
    ],
    torecaJapanHistory: [
      { date: "2026-08-20", buyPrice: 150000, sellPrice: 190000 },
      { date: "2026-08-27", buyPrice: 160000, sellPrice: 200000 },
      { date: "2026-09-03", buyPrice: 175000, sellPrice: 215000 },
      { date: "2026-09-10", buyPrice: 185000, sellPrice: 225000 },
      { date: "2026-09-18", buyPrice: 185000, sellPrice: 215000 }
    ],
    mercariSoldExamples: [
      { date: "2026-09-18", price: 225000, condition: "PSA10 連番・完全美品", title: "【PSA10】ゲンガー&ミミッキュGX SA SR タッグボルト" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-15", price: 220000, condition: "PSA10 美品・即日発送", title: "タッグボルト ゲンガー&ミミッキュGX SA PSA10" }
    ],
    tags: ["Raw", "PSA鑑定イチオシ", "週間14件成約", "消化率175%"],
    notes: "国内出品8件に対し週間14件成約（品薄・争奪戦状態）。eBayで仕入れられれば即売れが期待できる。"
  },
  {
    id: "card-004",
    name: "ポンチョを着たピカチュウ (リザードンY)",
    cardSet: "スペシャルBOX メガリザードンYのポンチョを着たピカチュウ",
    cardNumber: "208/XY-P PROMO",
    releaseYear: 2016,
    grade: "PSA10",
    imageUrl: "https://images.pokemontcg.io/xyp/208_hires.png",
    fallbackImageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=60",
    ebayBuyUrl: "https://www.ebay.com/sch/i.html?_nkw=poncho+pikachu+charizard+y+208%2Fxy-p+japanese&_sop=15",
    snkrdunkUrl: "https://snkrdunk.com/search?keywords=ポンチョを着たピカチュウ+208%2FXY-P",
    mercariSoldUrl: "https://jp.mercari.com/search?keyword=ポンチョを着たピカチュウ+リザードンY&status=sold_out",
    yahooSoldUrl: "https://paypayfleamarket.yahoo.co.jp/search/ポンチョを着たピカチュウ%20リザードンY",
    
    // 【仕入れ側・購入可能性データ】
    rawPriceUsd: 1500,
    rawShippingUsd: 35,
    ebayActiveListings: 6,
    ebaySold7d: 2,
    ebaySupplyStatus: "品薄 (指値・アラート推奨)",

    // 【売却側・直近7日販売実績】
    domesticActiveListings: 4,
    domesticSold7d: 4,
    sellThroughRate7d: 100.0,
    estimatedTurnoverDays: 5.1,
    soldPriceRange7d: { min: 820000, max: 860000 },

    ebayPriceUsd: 3900,
    ebayShippingUsd: 50,
    rawPriceJpy: 260000,
    psa9PriceJpy: 420000,
    psa10PriceJpy: 850000,
    psa10GemRate: 0.60,
    gradingFeeJpy: 4500,
    ebaySellerRating: "100%",
    ebayItemLocation: "Canada (Ontario)",
    snkrdunkPriceJpy: 850000,
    torecaJapanPriceJpy: 820000,
    mercariAvgPriceJpy: 840000,
    yahooAvgPriceJpy: 830000,
    demandScore: 93,
    liquiditySpeedDays: 5.1,
    priceTrend30d: +12.3,
    snkrdunkHistory: [
      { date: "2026-08-20", price: 720000, volume: 2 },
      { date: "2026-08-27", price: 760000, volume: 3 },
      { date: "2026-09-03", price: 790000, volume: 4 },
      { date: "2026-09-10", price: 820000, volume: 5 },
      { date: "2026-09-18", price: 850000, volume: 4 }
    ],
    torecaJapanHistory: [
      { date: "2026-08-20", buyPrice: 630000, sellPrice: 740000 },
      { date: "2026-08-27", buyPrice: 670000, sellPrice: 780000 },
      { date: "2026-09-03", buyPrice: 700000, sellPrice: 810000 },
      { date: "2026-09-10", buyPrice: 730000, sellPrice: 830000 },
      { date: "2026-09-18", buyPrice: 740000, sellPrice: 820000 }
    ],
    mercariSoldExamples: [
      { date: "2026-09-16", price: 860000, condition: "PSA10 センタリング良好・極上美品", title: "【PSA10】メガリザードンY ポンチョを着たピカチュウ プロモ" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-15", price: 845000, condition: "PSA10 コレクション放出品", title: "PSA10 メガリザードンY ポンチョを着たピカチュウ" }
    ],
    tags: ["PSA10", "高騰トレンド", "希少プロモ", "PSA10化爆益"],
    notes: "絶版プロモのため世界的に供給が絞られている。国内出品4件・週間成約4件と高額ながら回転は堅調。"
  },
  {
    id: "card-005",
    name: "ブラッキーVMAX (SA / HR)",
    cardSet: "強化拡張パック イーブイヒーローズ",
    cardNumber: "095/069 HR",
    releaseYear: 2021,
    grade: "PSA10",
    imageUrl: "https://images.pokemontcg.io/swsh7/215_hires.png",
    fallbackImageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60",
    ebayBuyUrl: "https://www.ebay.com/sch/i.html?_nkw=umbreon+vmax+sa+095%2F069+eevee+heroes+japanese&_sop=15",
    snkrdunkUrl: "https://snkrdunk.com/search?keywords=ブラッキーVMAX+SA+095%2F069",
    mercariSoldUrl: "https://jp.mercari.com/search?keyword=ブラッキーVMAX+SA+イーブイヒーローズ&status=sold_out",
    yahooSoldUrl: "https://paypayfleamarket.yahoo.co.jp/search/ブラッキーVMAX%20SA%20イーブイヒーローズ",
    
    // 【仕入れ側・購入可能性データ】
    rawPriceUsd: 1100,
    rawShippingUsd: 25,
    ebayActiveListings: 19,
    ebaySold7d: 8,
    ebaySupplyStatus: "適正 (毎日出品あり)",

    // 【売却側・直近7日販売実績】
    domesticActiveListings: 10,
    domesticSold7d: 15,
    sellThroughRate7d: 150.0,
    estimatedTurnoverDays: 3.8,
    soldPriceRange7d: { min: 445000, max: 465000 },

    ebayPriceUsd: 2150,
    ebayShippingUsd: 35,
    rawPriceJpy: 190000,
    psa9PriceJpy: 260000,
    psa10PriceJpy: 460000,
    psa10GemRate: 0.78,
    gradingFeeJpy: 3500,
    ebaySellerRating: "100%",
    ebayItemLocation: "United States (New York)",
    snkrdunkPriceJpy: 460000,
    torecaJapanPriceJpy: 440000,
    mercariAvgPriceJpy: 455000,
    yahooAvgPriceJpy: 450000,
    demandScore: 95,
    liquiditySpeedDays: 3.8,
    priceTrend30d: +5.0,
    snkrdunkHistory: [
      { date: "2026-08-20", price: 420000, volume: 10 },
      { date: "2026-08-27", price: 435000, volume: 12 },
      { date: "2026-09-03", price: 445000, volume: 14 },
      { date: "2026-09-10", price: 455000, volume: 16 },
      { date: "2026-09-18", price: 460000, volume: 15 }
    ],
    torecaJapanHistory: [
      { date: "2026-08-20", buyPrice: 370000, sellPrice: 430000 },
      { date: "2026-08-27", buyPrice: 385000, sellPrice: 445000 },
      { date: "2026-09-03", buyPrice: 395000, sellPrice: 455000 },
      { date: "2026-09-10", buyPrice: 405000, sellPrice: 460000 },
      { date: "2026-09-18", buyPrice: 405000, sellPrice: 440000 }
    ],
    mercariSoldExamples: [
      { date: "2026-09-17", price: 465000, condition: "PSA10 初版・ホロ欠けなし", title: "【初版・PSA10】ブラッキーVMAX SA HR イーブイヒーローズ" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-16", price: 458000, condition: "PSA10 即発送", title: "ブラッキーVMAX SA PSA10 イーブイヒーローズ" }
    ],
    tags: ["PSA10", "ブイズ最高峰", "週間15件成約", "消化率150%"],
    notes: "eBay出品19件、国内週間成約15件。40万円超の高額帯ながら安定して売買が成立する王道資産カード。"
  }
];

// デフォルト設定
export const DEFAULT_SETTINGS = {
  usdJpyRate: 150.0,
  customsDutyRate: 0.0,
  importConsumptionTaxRate: 0.10,
  taxExemptionThresholdJpy: 16666,
  domesticShippingJpy: 550,
  packingCostJpy: 150,
  defaultGradingFeeJpy: 3500,
  platformFees: {
    mercari: { name: "メルカリ", rate: 0.10, description: "10% (ユーザー数最大・即売れ)" },
    yahoo: { name: "ヤフーフリマ", rate: 0.05, description: "5% (業界最安水準・利益率UP)" },
    snkrdunk: { name: "スニーカーダンク", rate: 0.055, description: "5.5% (鑑定付き・相場基準)" },
    torecaJapan: { name: "トレカショップ買取", rate: 0.00, description: "0% (即現金化・買取価格)" }
  }
};
