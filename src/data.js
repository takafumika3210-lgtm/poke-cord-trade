// ポケモンカード投資・需給＆PSAグレーディングデータセット
export const INITIAL_CARDS = [
  {
    id: "card-001",
    name: "リーリエ (がんばリーリエ)",
    cardSet: "ハイクラスパック GXバトルブースト",
    cardNumber: "119/114 SR",
    releaseYear: 2017,
    grade: "PSA10",
    imageUrl: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=500&auto=format&fit=crop&q=60",
    // PSA10購入相場
    ebayPriceUsd: 5800,
    ebayShippingUsd: 45,
    // 素体（Raw/NM）購入相場 (eBay)
    rawPriceUsd: 2200,
    rawShippingUsd: 30,
    // 国内グレード別相場
    rawPriceJpy: 380000,
    psa9PriceJpy: 550000,
    psa10PriceJpy: 1100000,
    psa10GemRate: 0.65, // サン&ムーン初期特有の裏面カケのためPSA10率は約65%
    gradingFeeJpy: 5500, // 高額カード追加保険料込み
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
      { date: "2026-09-05", price: 550000, condition: "PSA9 美品・防湿庫保管", title: "がんばリーリエ SR PSA9 準最高評価" },
      { date: "2026-08-28", price: 390000, condition: "素体 表面極美品・白かけ微小", title: "がんばリーリエ SR 本物 素体" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-16", price: 1090000, condition: "PSA10 極美品・クーポン利用成約", title: "PSA10 がんばリーリエ SR サン&ムーン" },
      { date: "2026-09-08", price: 540000, condition: "PSA9 センタリング良好", title: "がんばリーリエ SR PSA9 ポケカ" }
    ],
    tags: ["PSA10", "PSA鑑定大化け候補", "殿堂入り人気", "海外仕入れ優位"],
    notes: "海外eBayで未鑑定素体（Raw $2,200 ≒ 約35万円）を仕入れてPSA10を取得できれば、国内110万円で約60万円以上の純利を生むウルトラアップサイド銘柄。PSA9でも黒字化しやすい。"
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
    psa10GemRate: 0.82, // 近代パックのためPSA10取得率は約82%と高い
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
      { date: "2026-09-14", price: 86000, condition: "PSA9 美品", title: "ナンジャモ SAR PSA9 クレイバースト" },
      { date: "2026-09-11", price: 63000, condition: "素体 完美品 ローダー付き", title: "ナンジャモ SAR 素体 美品" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-17", price: 166000, condition: "PSA10 クーポン利用・即決", title: "ナンジャモ SAR PSA10 クレイバースト SV2D" },
      { date: "2026-09-10", price: 84000, condition: "PSA9 準美品", title: "ナンジャモ SAR PSA9" }
    ],
    tags: ["PSA10", "高回転", "PSA10取得率高(82%)", "近代人気SAR"],
    notes: "近代カード特有のセンタリングの良さからPSA10取得率が高い（約82%）。素体約5.8万円仕入れ＋鑑定料3,500円 ➔ PSA10化で16.8万円（純利益+8〜9万円）が期待できる高勝率銘柄。"
  },
  {
    id: "card-003",
    name: "ゲンガー&ミミッキュGX (SA / SR)",
    cardSet: "拡張パック タッグボルト",
    cardNumber: "103/095 SR",
    releaseYear: 2018,
    grade: "Raw (未鑑定/NM)",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 1100, // PSA10相場
    ebayShippingUsd: 35,
    rawPriceUsd: 420, // 素体eBay相場
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
      { date: "2026-09-12", price: 98000, condition: "PSA9 美品", title: "ゲンガー&ミミッキュGX SA PSA9" },
      { date: "2026-09-08", price: 74000, condition: "素体 センタリング良好・PSA提出用", title: "ゲンガー&ミミッキュGX SA SR 素体" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-15", price: 220000, condition: "PSA10 美品・即日発送", title: "タッグボルト ゲンガー&ミミッキュGX SA PSA10" }
    ],
    tags: ["Raw", "PSA鑑定イチオシ", "タッグチームSA", "アップサイド3倍"],
    notes: "現在PSA10相場が22.5万円まで急騰。海外eBayでは素体が$420（約6.7万円）で入手可能。鑑定料3,500円を足しても約7.1万円の原価。PSA10化できれば粗利+13万円、PSA9でも手取り9万円で元本回収できる鉄板銘柄。"
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
      { date: "2026-09-16", price: 860000, condition: "PSA10 センタリング良好・極上美品", title: "【PSA10】メガリザードンY ポンチョを着たピカチュウ プロモ" },
      { date: "2026-09-07", price: 420000, condition: "PSA9 美品・防湿庫保管", title: "ポンチョを着たピカチュウ リザードンY PSA9" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-15", price: 845000, condition: "PSA10 コレクション放出品", title: "PSA10 メガリザードンY ポンチョを着たピカチュウ" }
    ],
    tags: ["PSA10", "高騰トレンド", "希少プロモ", "PSA10化爆益"],
    notes: "絶版プロモのため世界的人気。素体美品（約25万円）からPSA10（85万円）へのグレードアップ差益は60万円近い。万が一PSA9（42万円）になっても十分な利益が残る安全設計。"
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
      { date: "2026-09-17", price: 465000, condition: "PSA10 初版・ホロ欠けなし", title: "【初版・PSA10】ブラッキーVMAX SA HR イーブイヒーローズ" },
      { date: "2026-09-12", price: 260000, condition: "PSA9 美品", title: "ブラッキーVMAX SA PSA9" },
      { date: "2026-09-08", price: 195000, condition: "素体 表面裏面無傷・センタリング良好", title: "ブラッキーVMAX SA HR 素体 美品" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-16", price: 458000, condition: "PSA10 即発送", title: "ブラッキーVMAX SA PSA10 イーブイヒーローズ" }
    ],
    tags: ["PSA10", "ブイズ最高峰", "世界的人気", "流動性Sランク"],
    notes: "国内・海外問わず圧倒的流動性。素体18〜19万円で仕入れてPSA10化することで約20万円超の利ざやが得られる。PSA9でも26万円前後で即売れするため元本割れリスクが極小。"
  },
  {
    id: "card-006",
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
    psa10GemRate: 0.85, // プロモのため初期状態が良くPSA10率85%
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
    tags: ["PSA10", "小資本OK", "PSA10率85%", "初心者向け鑑定投資"],
    notes: "低単価で仕入れられるため、複数枚まとめてPSA鑑定に出すバルク鑑定投資に最も向いている。素体約1.8万円仕入れ＋鑑定料3,500円 ➔ PSA10で6.2万円（純利+3.5万円/枚）。"
  }
];

// デフォルト設定
export const DEFAULT_SETTINGS = {
  usdJpyRate: 150.0, // 為替レート (1ドル = 150円)
  customsDutyRate: 0.0, // トレカ関税は通常0%
  importConsumptionTaxRate: 0.10, // 輸入消費税
  taxExemptionThresholdJpy: 16666, // 個人輸入の少額免税ライン
  domesticShippingJpy: 550, // 国内送料
  packingCostJpy: 150, // 梱包材
  defaultGradingFeeJpy: 3500, // 標準PSA鑑定代行手数料 (送料・保険・代行料込)
  platformFees: {
    mercari: { name: "メルカリ", rate: 0.10, description: "10% (ユーザー数最大・即売れ)" },
    yahoo: { name: "ヤフーフリマ", rate: 0.05, description: "5% (業界最安水準・利益率UP)" },
    snkrdunk: { name: "スニーカーダンク", rate: 0.055, description: "5.5% (鑑定付き・相場基準)" },
    torecaJapan: { name: "トレカショップ買取", rate: 0.00, description: "0% (即現金化・買取価格)" }
  }
};
