// ポケモンカード投資・需給＆PSAグレーディングデータセット (拡充版)
export const INITIAL_CARDS = [
  // --- 3万円未満仕入れ特選銘柄 (小資本・高回転・PSA化で大化け) ---
  {
    id: "card-008",
    name: "コイキング (AR)",
    cardSet: "強化拡張パック トリプレットビート",
    cardNumber: "073/073 AR",
    releaseYear: 2023,
    grade: "Raw (未鑑定/NM)",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 110, // PSA10
    ebayShippingUsd: 15,
    rawPriceUsd: 22, // 素体約3,300円
    rawShippingUsd: 10,
    rawPriceJpy: 3500,
    psa9PriceJpy: 7500,
    psa10PriceJpy: 18500,
    psa10GemRate: 0.85,
    gradingFeeJpy: 3500,
    ebaySellerRating: "100%",
    ebayItemLocation: "United States",
    snkrdunkPriceJpy: 18500,
    torecaJapanPriceJpy: 17500,
    mercariAvgPriceJpy: 18000,
    yahooAvgPriceJpy: 17800,
    demandScore: 93,
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
      { date: "2026-09-18", price: 18500, condition: "PSA10 即購入可・匿名配送", title: "コイキング AR PSA10 トリプレットビート" },
      { date: "2026-09-14", price: 7800, condition: "PSA9 美品", title: "コイキング AR PSA9" },
      { date: "2026-09-10", price: 3600, condition: "素体 表面裏面傷なし", title: "コイキング AR 素体 美品" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-17", price: 18200, condition: "PSA10 送料無料", title: "PSA10 コイキング AR トリプレットビート" }
    ],
    tags: ["3万円未満", "超高回転", "PSA10率85%", "アート人気"],
    notes: "アート人気が世界中で爆発。素体約3,300円＋鑑定料3,500円（総原価約8,300円）➔ PSA10で18,500円（純利+9,000円/枚、ROI 100%超）。PSA9でも元本回収可能。"
  },
  {
    id: "card-009",
    name: "ピカチュウ (AR)",
    cardSet: "ハイクラスパック VSTARユニバース",
    cardNumber: "205/172 AR",
    releaseYear: 2022,
    grade: "Raw (未鑑定/NM)",
    imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 85,
    ebayShippingUsd: 12,
    rawPriceUsd: 18,
    rawShippingUsd: 10,
    rawPriceJpy: 2800,
    psa9PriceJpy: 6000,
    psa10PriceJpy: 14500,
    psa10GemRate: 0.88,
    gradingFeeJpy: 3500,
    ebaySellerRating: "99.9%",
    ebayItemLocation: "Japan / US",
    snkrdunkPriceJpy: 14500,
    torecaJapanPriceJpy: 13800,
    mercariAvgPriceJpy: 14200,
    yahooAvgPriceJpy: 14000,
    demandScore: 92,
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
      { date: "2026-09-18", price: 14800, condition: "PSA10 9枚連番個体・美品", title: "【PSA10】ピカチュウ AR VSTARユニバース" },
      { date: "2026-09-12", price: 6200, condition: "PSA9", title: "ピカチュウ AR PSA9 Vユニ" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-16", price: 14200, condition: "PSA10 即日発送", title: "ピカチュウ AR PSA10" }
    ],
    tags: ["3万円未満", "最高回転数", "PSA10率88%", "VユニAR9枚組"],
    notes: "圧倒的な出来高を誇る超高流動性銘柄。まとめ出し（バルク鑑定）に最も適しており、短期間で小資本を高効率に回転可能。"
  },
  {
    id: "card-010",
    name: "カミツレのきらめき (SR)",
    cardSet: "ハイクラスパック VSTARユニバース",
    cardNumber: "246/172 SR",
    releaseYear: 2022,
    grade: "Raw (未鑑定/NM)",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 165,
    ebayShippingUsd: 18,
    rawPriceUsd: 48,
    rawShippingUsd: 12,
    rawPriceJpy: 7800,
    psa9PriceJpy: 12000,
    psa10PriceJpy: 28500,
    psa10GemRate: 0.82,
    gradingFeeJpy: 3500,
    ebaySellerRating: "100%",
    ebayItemLocation: "United States",
    snkrdunkPriceJpy: 28500,
    torecaJapanPriceJpy: 27000,
    mercariAvgPriceJpy: 28000,
    yahooAvgPriceJpy: 27500,
    demandScore: 89,
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
      { date: "2026-09-18", price: 28800, condition: "PSA10 完全美品・横線なし", title: "【PSA10】カミツレのきらめき SR VSTARユニバース" },
      { date: "2026-09-13", price: 12500, condition: "PSA9 美品", title: "カミツレのきらめき SR PSA9" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-17", price: 28000, condition: "PSA10 厳選品", title: "カミツレのきらめき SR PSA10" }
    ],
    tags: ["3万円未満", "女子サポートSR", "PSA10率82%", "手堅い利ざや"],
    notes: "総仕入れ原価約1.25万円（素体+送料+鑑定料）➔ PSA10で2.85万円（純利+1.4万円/枚、ROI 110%超）。PSA9でも手取り1.1万円前後でほぼ元本回収できる安心銘柄。"
  },
  {
    id: "card-011",
    name: "イーブイ (AR)",
    cardSet: "強化拡張パック クリムゾンヘイズ",
    cardNumber: "078/066 AR",
    releaseYear: 2024,
    grade: "Raw (未鑑定/NM)",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 70,
    ebayShippingUsd: 12,
    rawPriceUsd: 14,
    rawShippingUsd: 8,
    rawPriceJpy: 2200,
    psa9PriceJpy: 4800,
    psa10PriceJpy: 11800,
    psa10GemRate: 0.90,
    gradingFeeJpy: 3500,
    ebaySellerRating: "100%",
    ebayItemLocation: "Japan / US",
    snkrdunkPriceJpy: 11800,
    torecaJapanPriceJpy: 11000,
    mercariAvgPriceJpy: 11500,
    yahooAvgPriceJpy: 11300,
    demandScore: 91,
    liquiditySpeedDays: 1.9,
    priceTrend30d: +12.0,
    snkrdunkHistory: [
      { date: "2026-08-20", price: 9000, volume: 45 },
      { date: "2026-08-27", price: 9800, volume: 52 },
      { date: "2026-09-03", price: 10500, volume: 58 },
      { date: "2026-09-10", price: 11200, volume: 60 },
      { date: "2026-09-18", price: 11800, volume: 64 }
    ],
    torecaJapanHistory: [
      { date: "2026-08-20", buyPrice: 7500, sellPrice: 9500 },
      { date: "2026-08-27", buyPrice: 8000, sellPrice: 10200 },
      { date: "2026-09-03", buyPrice: 8800, sellPrice: 11000 },
      { date: "2026-09-10", buyPrice: 9200, sellPrice: 11800 },
      { date: "2026-09-18", buyPrice: 9200, sellPrice: 11000 }
    ],
    mercariSoldExamples: [
      { date: "2026-09-18", price: 12000, condition: "PSA10 美品・即日発送", title: "イーブイ AR PSA10 クリムゾンヘイズ" },
      { date: "2026-09-15", price: 5000, condition: "PSA9", title: "イーブイ AR PSA9" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-16", price: 11600, condition: "PSA10 送料無料", title: "PSA10 イーブイ AR" }
    ],
    tags: ["3万円未満", "ブイズ人気", "PSA10率90%", "超低単価仕入れ"],
    notes: "最新弾のブイズAR。素体約2,200円で仕入れられ、PSA10取得率は90%超。1枚あたり純利+4,000円〜+5,000円を手堅く積み上げられる。"
  },
  {
    id: "card-012",
    name: "ピカチュウ (CHR)",
    cardSet: "強化拡張パック ドリームリーグ",
    cardNumber: "054/049 CHR",
    releaseYear: 2019,
    grade: "Raw (未鑑定/NM)",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 120,
    ebayShippingUsd: 15,
    rawPriceUsd: 28,
    rawShippingUsd: 10,
    rawPriceJpy: 4500,
    psa9PriceJpy: 8500,
    psa10PriceJpy: 19800,
    psa10GemRate: 0.76,
    gradingFeeJpy: 3500,
    ebaySellerRating: "99.8%",
    ebayItemLocation: "United States (Oregon)",
    snkrdunkPriceJpy: 19800,
    torecaJapanPriceJpy: 19000,
    mercariAvgPriceJpy: 19500,
    yahooAvgPriceJpy: 19200,
    demandScore: 90,
    liquiditySpeedDays: 2.5,
    priceTrend30d: +14.5,
    snkrdunkHistory: [
      { date: "2026-08-20", price: 15500, volume: 18 },
      { date: "2026-08-27", price: 16500, volume: 20 },
      { date: "2026-09-03", price: 17800, volume: 24 },
      { date: "2026-09-10", price: 18800, volume: 26 },
      { date: "2026-09-18", price: 19800, volume: 28 }
    ],
    torecaJapanHistory: [
      { date: "2026-08-20", buyPrice: 13000, sellPrice: 16500 },
      { date: "2026-08-27", buyPrice: 14000, sellPrice: 17500 },
      { date: "2026-09-03", buyPrice: 15000, sellPrice: 18800 },
      { date: "2026-09-10", buyPrice: 16000, sellPrice: 20000 },
      { date: "2026-09-18", buyPrice: 16000, sellPrice: 19000 }
    ],
    mercariSoldExamples: [
      { date: "2026-09-18", price: 20000, condition: "PSA10 レッド&ピカチュウ 極美品", title: "【PSA10】ピカチュウ CHR ドリームリーグ" },
      { date: "2026-09-11", price: 8800, condition: "PSA9 美品", title: "ピカチュウ CHR PSA9" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-16", price: 19500, condition: "PSA10 即決", title: "PSA10 ピカチュウ CHR 054/049" }
    ],
    tags: ["3万円未満", "絶版CHR元祖", "レッド&ピカチュウ", "アップサイド高"],
    notes: "ドリームリーグ絶版による高騰トレンド。素体約4,500円＋鑑定料3,500円（総原価約9,200円）➔ PSA10で約2万円。PSA9でも8,500円で元本がほぼ守られる。"
  },
  {
    id: "card-013",
    name: "フウロ (SR)",
    cardSet: "ハイクラスパック シャイニースターV",
    cardNumber: "195/190 SR",
    releaseYear: 2020,
    grade: "Raw (未鑑定/NM)",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 85,
    ebayShippingUsd: 15,
    rawPriceUsd: 20,
    rawShippingUsd: 10,
    rawPriceJpy: 3200,
    psa9PriceJpy: 6500,
    psa10PriceJpy: 14800,
    psa10GemRate: 0.84,
    gradingFeeJpy: 3500,
    ebaySellerRating: "99.5%",
    ebayItemLocation: "United States",
    snkrdunkPriceJpy: 14800,
    torecaJapanPriceJpy: 14000,
    mercariAvgPriceJpy: 14500,
    yahooAvgPriceJpy: 14200,
    demandScore: 87,
    liquiditySpeedDays: 2.8,
    priceTrend30d: +5.8,
    snkrdunkHistory: [
      { date: "2026-08-20", price: 13000, volume: 15 },
      { date: "2026-08-27", price: 13500, volume: 18 },
      { date: "2026-09-03", price: 14000, volume: 20 },
      { date: "2026-09-10", price: 14500, volume: 22 },
      { date: "2026-09-18", price: 14800, volume: 21 }
    ],
    torecaJapanHistory: [
      { date: "2026-08-20", buyPrice: 10500, sellPrice: 13500 },
      { date: "2026-08-27", buyPrice: 11000, sellPrice: 14000 },
      { date: "2026-09-03", buyPrice: 11500, sellPrice: 14500 },
      { date: "2026-09-10", buyPrice: 12000, sellPrice: 15000 },
      { date: "2026-09-18", buyPrice: 12000, sellPrice: 14000 }
    ],
    mercariSoldExamples: [
      { date: "2026-09-17", price: 15000, condition: "PSA10 美品・白かけなし", title: "【PSA10】フウロ SR シャイニースターV" },
      { date: "2026-09-11", price: 6800, condition: "PSA9", title: "フウロ SR PSA9" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-15", price: 14400, condition: "PSA10 即発送", title: "フウロ SR PSA10" }
    ],
    tags: ["3万円未満", "女子サポートSR", "シャイニースター", "安定需要"],
    notes: "素体約3,000円台で仕入れられる女子サポートSR。安定した需要があり、初心者向けの低リスク鑑定投資銘柄。"
  },
  {
    id: "card-014",
    name: "ブラッキーV (SA / SR)",
    cardSet: "強化拡張パック イーブイヒーローズ",
    cardNumber: "085/069 SR",
    releaseYear: 2021,
    grade: "Raw (未鑑定/NM)",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 340,
    ebayShippingUsd: 22,
    rawPriceUsd: 115, // 素体約1.7万円
    rawShippingUsd: 15,
    rawPriceJpy: 18000,
    psa9PriceJpy: 28000,
    psa10PriceJpy: 56000,
    psa10GemRate: 0.80,
    gradingFeeJpy: 3500,
    ebaySellerRating: "100%",
    ebayItemLocation: "United States",
    snkrdunkPriceJpy: 56000,
    torecaJapanPriceJpy: 53000,
    mercariAvgPriceJpy: 55000,
    yahooAvgPriceJpy: 54000,
    demandScore: 94,
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
      { date: "2026-09-18", price: 56500, condition: "PSA10 ワンオーナー・即購入可", title: "【PSA10】ブラッキーV SA SR イーブイヒーローズ" },
      { date: "2026-09-13", price: 28500, condition: "PSA9 美品", title: "ブラッキーV SA PSA9" },
      { date: "2026-09-08", price: 18500, condition: "素体 表面裏面傷なし", title: "ブラッキーV SA 美品" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-17", price: 55000, condition: "PSA10 極美品", title: "ブラッキーV SA SR PSA10" }
    ],
    tags: ["3万円未満", "ブイズSA", "PSA10化で3倍", "PSA9黒字"],
    notes: "3万円未満（素体約1.8万円）で仕入れられる最高峰のブイズSA銘柄。PSA10化で5.6万円（純利+3万円超、ROI 120%）。PSA9でも2.8万円で手取り2.6万円残り、確実に黒字化する極上銘柄。"
  },
  {
    id: "card-015",
    name: "リザードン 25th プロモ",
    cardSet: "25th ANNIVERSARY COLLECTION プロモパック",
    cardNumber: "001/025 PROMO",
    releaseYear: 2021,
    grade: "PSA10",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 260,
    ebayShippingUsd: 22,
    rawPriceUsd: 110,
    rawShippingUsd: 15,
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
    demandScore: 88,
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
      { date: "2026-09-18", price: 62500, condition: "PSA10 美品・即購入OK", title: "リザードン 25th プロモ PSA10 001/025" },
      { date: "2026-09-14", price: 32000, condition: "PSA9 鑑定品・防湿庫保管", title: "【PSA9】25周年 リザードン プロモ" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-16", price: 60500, condition: "PSA10 送料無料", title: "リザードン 25th ANNIVERSARY PROMO PSA10" }
    ],
    tags: ["3万円未満", "定番リザードン", "PSA10率85%", "PSA9でも黒字"],
    notes: "素体約1.8万円仕入れ＋鑑定料3,500円（総原価約2.25万円）➔ PSA10で6.2万円。万が一PSA9でも3.2万円（手取り3万円）で利益が出る優良銘柄。"
  },
  {
    id: "card-016",
    name: "ピカチュウ (マスターボールミラー)",
    cardSet: "強化拡張パック ポケモンカード151",
    cardNumber: "025/165 C",
    releaseYear: 2023,
    grade: "Raw (未鑑定/NM)",
    imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 420,
    ebayShippingUsd: 25,
    rawPriceUsd: 140, // 素体約2.1万円
    rawShippingUsd: 15,
    rawPriceJpy: 22000,
    psa9PriceJpy: 35000,
    psa10PriceJpy: 68000,
    psa10GemRate: 0.82,
    gradingFeeJpy: 3500,
    ebaySellerRating: "100%",
    ebayItemLocation: "United States",
    snkrdunkPriceJpy: 68000,
    torecaJapanPriceJpy: 64000,
    mercariAvgPriceJpy: 67000,
    yahooAvgPriceJpy: 66000,
    demandScore: 93,
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
      { date: "2026-09-18", price: 69000, condition: "PSA10 マスボミラー ピカチュウ 美品", title: "【PSA10】ピカチュウ マスターボールミラー 151" },
      { date: "2026-09-12", price: 36000, condition: "PSA9 美品", title: "ピカチュウ マスターボールミラー PSA9" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-17", price: 67000, condition: "PSA10 即発送", title: "ピカチュウ マスターボールミラー PSA10 151" }
    ],
    tags: ["3万円未満", "マスボミラー", "151目玉", "PSA10化で3倍以上"],
    notes: "151の1ボックスに1枚しか入っていないマスターボールミラーの頂点。素体2.2万円仕入れ ➔ PSA10で6.8万円。世界的なコレクター需要が極めて強い。"
  },
  {
    id: "card-017",
    name: "マリィ (SR)",
    cardSet: "ハイクラスパック シャイニースターV",
    cardNumber: "198/190 SR",
    releaseYear: 2020,
    grade: "Raw (未鑑定/NM)",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 450,
    ebayShippingUsd: 25,
    rawPriceUsd: 145, // 素体約2.2万円
    rawShippingUsd: 15,
    rawPriceJpy: 23000,
    psa9PriceJpy: 36000,
    psa10PriceJpy: 72000,
    psa10GemRate: 0.80,
    gradingFeeJpy: 3500,
    ebaySellerRating: "100%",
    ebayItemLocation: "United States",
    snkrdunkPriceJpy: 72000,
    torecaJapanPriceJpy: 68000,
    mercariAvgPriceJpy: 71000,
    yahooAvgPriceJpy: 70000,
    demandScore: 92,
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
      { date: "2026-09-18", price: 73000, condition: "PSA10 シャイニーマリィ 美品", title: "【PSA10】マリィ SR シャイニースターV" },
      { date: "2026-09-12", price: 37000, condition: "PSA9 美品", title: "マリィ SR PSA9 シャイニースターV" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-16", price: 71000, condition: "PSA10 即日発送", title: "マリィ SR PSA10" }
    ],
    tags: ["3万円未満", "殿堂入り女子SR", "PSA10率80%", "PSA9黒字"],
    notes: "女性サポートSRの人気代表格。素体2.3万円＋鑑定料3,500円（総原価約2.8万円）➔ PSA10で7.2万円（純利+4万円超）。PSA9でも3.6万円で手取り3.4万円が残りノーリスク。"
  },

  // --- 中・高額プレミアム銘柄 ---
  {
    id: "card-001",
    name: "リーリエ (がんばリーリエ)",
    cardSet: "ハイクラスパック GXバトルブースト",
    cardNumber: "119/114 SR",
    releaseYear: 2017,
    grade: "PSA10",
    imageUrl: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 5800,
    ebayShippingUsd: 45,
    rawPriceUsd: 2200,
    rawShippingUsd: 30,
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
      { date: "2026-09-17", price: 1120000, condition: "PSA10最高評価・暗所保管・即日発送", title: "【PSA10】がんばリーリエ SR GXバトルブースト 正規品" },
      { date: "2026-09-12", price: 1080000, condition: "PSA10 連番個体・鑑定証明QR確認済", title: "がんばリーリエ PSA10 SR 鑑定品" },
      { date: "2026-09-05", price: 550000, condition: "PSA9 美品・防湿庫保管", title: "がんばリーリエ SR PSA9 準最高評価" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-16", price: 1090000, condition: "PSA10 極美品・クーポン利用成約", title: "PSA10 がんばリーリエ SR サン&ムーン" }
    ],
    tags: ["PSA10", "PSA鑑定大化け候補", "殿堂入り人気", "海外仕入れ優位"],
    notes: "海外eBayで未鑑定素体を仕入れてPSA10を取得できれば、国内110万円で約60万円以上の純利を生むウルトラアップサイド銘柄。"
  },
  {
    id: "card-002",
    name: "ナンジャモ (SAR)",
    cardSet: "スカーレット&バイオレット クレイバースト",
    cardNumber: "096/071 SAR",
    releaseYear: 2023,
    grade: "PSA10",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 780,
    ebayShippingUsd: 28,
    rawPriceUsd: 360,
    rawShippingUsd: 20,
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
      { date: "2026-09-18", price: 168000, condition: "PSA10 完全美品・白かけなし", title: "【最安値】ナンジャモ SAR PSA10 クレイバースト" },
      { date: "2026-09-14", price: 86000, condition: "PSA9 美品", title: "ナンジャモ SAR PSA9 クレイバースト" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-17", price: 166000, condition: "PSA10 クーポン利用・即決", title: "ナンジャモ SAR PSA10 クレイバースト SV2D" }
    ],
    tags: ["PSA10", "高回転", "PSA10取得率高(82%)", "近代人気SAR"],
    notes: "近代カード特有のセンタリングの良さからPSA10取得率が高い（約82%）。素体約5.8万円仕入れ＋鑑定料3,500円 ➔ PSA10化で16.8万円。"
  },
  {
    id: "card-003",
    name: "ゲンガー&ミミッキュGX (SA / SR)",
    cardSet: "拡張パック タッグボルト",
    cardNumber: "103/095 SR",
    releaseYear: 2018,
    grade: "Raw (未鑑定/NM)",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 1100,
    ebayShippingUsd: 35,
    rawPriceUsd: 420,
    rawShippingUsd: 25,
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
    demandScore: 91,
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
      { date: "2026-09-18", price: 225000, condition: "PSA10 連番・完全美品", title: "【PSA10】ゲンガー&ミミッキュGX SA SR タッグボルト" },
      { date: "2026-09-12", price: 98000, condition: "PSA9 美品", title: "ゲンガー&ミミッキュGX SA PSA9" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-15", price: 220000, condition: "PSA10 美品・即日発送", title: "タッグボルト ゲンガー&ミミッキュGX SA PSA10" }
    ],
    tags: ["Raw", "PSA鑑定イチオシ", "タッグチームSA", "アップサイド3倍"],
    notes: "現在PSA10相場が22.5万円まで急騰。海外eBayでは素体が$420で入手可能。PSA10化できれば粗利+13万円、PSA9でも手取り9万円で元本回収可能。"
  },
  {
    id: "card-004",
    name: "ポンチョを着たピカチュウ (リザードンY)",
    cardSet: "スペシャルBOX メガリザードンYのポンチョを着たピカチュウ",
    cardNumber: "208/XY-P PROMO",
    releaseYear: 2016,
    grade: "PSA10",
    imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 3900,
    ebayShippingUsd: 50,
    rawPriceUsd: 1500,
    rawShippingUsd: 35,
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
    notes: "素体美品からPSA10へのグレードアップ差益は60万円近い。万が一PSA9になっても十分な利益が残る安全設計。"
  },
  {
    id: "card-005",
    name: "ブラッキーVMAX (SA / HR)",
    cardSet: "強化拡張パック イーブイヒーローズ",
    cardNumber: "095/069 HR",
    releaseYear: 2021,
    grade: "PSA10",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 2150,
    ebayShippingUsd: 35,
    rawPriceUsd: 1100,
    rawShippingUsd: 25,
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
    tags: ["PSA10", "ブイズ最高峰", "世界的人気", "流動性Sランク"],
    notes: "国内・海外問わず圧倒的流動性。素体からPSA10化で約20万円超の利ざやが得られる。"
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
