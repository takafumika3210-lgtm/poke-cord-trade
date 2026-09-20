// ポケモンカード投資・需給データセット
export const INITIAL_CARDS = [
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
    ebaySellerRating: "99.8%",
    ebayItemLocation: "United States (California)",
    snkrdunkPriceJpy: 1100000,
    torecaJapanPriceJpy: 1050000,
    mercariAvgPriceJpy: 1080000,
    yahooAvgPriceJpy: 1060000,
    demandScore: 94,
    liquiditySpeedDays: 4.2, // 平均回転日数
    priceTrend30d: +8.5, // 30日価格変動率(%)
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
      { date: "2026-09-05", price: 1050000, condition: "PSA10 専用スリーブ&ローダー付き", title: "ポケモンカード がんばリーリエ SR PSA10" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-16", price: 1090000, condition: "PSA10 極美品・クーポン利用成約", title: "PSA10 がんばリーリエ SR サン&ムーン" },
      { date: "2026-09-08", price: 1060000, condition: "PSA10 横線なし・防湿庫管理", title: "がんばリーリエ SR PSA10 ポケカ" }
    ],
    tags: ["PSA10", "超高需要", "海外仕入れ優位", "殿堂入り人気"],
    notes: "海外コレクターからのeBay出品が多く、円高局面やドル安オークション終了時に割安で仕入れ可能。国内スニダン・ヤフーフリマでの成約スピードは極めて速い。"
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
    ebaySellerRating: "100%",
    ebayItemLocation: "United States (Texas)",
    snkrdunkPriceJpy: 168000,
    torecaJapanPriceJpy: 160000,
    mercariAvgPriceJpy: 165000,
    yahooAvgPriceJpy: 163000,
    demandScore: 89,
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
      { date: "2026-09-15", price: 165000, condition: "PSA10 厳選個体・ワンオーナー", title: "ナンジャモ SAR PSA10 クレイバースト 096/071" },
      { date: "2026-09-11", price: 162000, condition: "PSA10 鑑定ケース保護フィルム付", title: "ナンジャモ SAR クレイバースト PSA10" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-17", price: 166000, condition: "PSA10 クーポン利用・即決", title: "ナンジャモ SAR PSA10 クレイバースト SV2D" },
      { date: "2026-09-10", price: 164000, condition: "PSA10 防湿庫保管品", title: "ナンジャモ SAR PSA10 ポケモンカード" }
    ],
    tags: ["PSA10", "高回転", "近代人気SAR", "価格安定"],
    notes: "回転率が抜群で1週間以内に成約しやすい。eBayでの出品数が豊富で、複数まとめ買い交渉による送料削減が狙える。"
  },
  {
    id: "card-003",
    name: "リザードン 25th プロモ",
    cardSet: "25th ANNIVERSARY COLLECTION プロモパック",
    cardNumber: "001/025 PROMO",
    releaseYear: 2021,
    grade: "PSA10",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 260,
    ebayShippingUsd: 22,
    ebaySellerRating: "99.5%",
    ebayItemLocation: "United Kingdom (London)",
    snkrdunkPriceJpy: 62000,
    torecaJapanPriceJpy: 59000,
    mercariAvgPriceJpy: 61000,
    yahooAvgPriceJpy: 59800,
    demandScore: 86,
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
      { date: "2026-09-14", price: 61000, condition: "PSA10 鑑定品・防湿庫保管", title: "【PSA10】25周年 リザードン プロモ" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-16", price: 60500, condition: "PSA10 送料無料", title: "リザードン 25th ANNIVERSARY PROMO PSA10" }
    ],
    tags: ["PSA10", "定番人気", "リザードン", "低仕入れ単価"],
    notes: "海外での25thコレクションの流通量が多く、eBay仕入れの価格優位性が高い。ヤフーフリマの手数料5%を活用すると手取り純利を最大化できる。"
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
    ebaySellerRating: "100%",
    ebayItemLocation: "Canada (Ontario)",
    snkrdunkPriceJpy: 850000,
    torecaJapanPriceJpy: 820000,
    mercariAvgPriceJpy: 840000,
    yahooAvgPriceJpy: 830000,
    demandScore: 91,
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
      { date: "2026-09-07", price: 830000, condition: "PSA10 厳重梱包・保険付配送", title: "ポンチョを着たピカチュウ リザードンY 208/XY-P PSA10" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-15", price: 845000, condition: "PSA10 コレクション放出品", title: "PSA10 メガリザードンY ポンチョを着たピカチュウ" }
    ],
    tags: ["PSA10", "高騰トレンド", "希少プロモ", "高単価利益"],
    notes: "絶版プロモのため世界的に供給が限定的。スニダンの取引相場が継続上昇トレンドにあり、eBayで即決購入できれば一撃で10万〜20万円規模の利ざやが狙える。"
  },
  {
    id: "card-005",
    name: "ルチア (SR)",
    cardSet: "強化拡張パック 裂空のカリスマ",
    cardNumber: "104/096 SR",
    releaseYear: 2018,
    grade: "PSA10",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 2950,
    ebayShippingUsd: 38,
    ebaySellerRating: "99.2%",
    ebayItemLocation: "United States (Florida)",
    snkrdunkPriceJpy: 640000,
    torecaJapanPriceJpy: 620000,
    mercariAvgPriceJpy: 635000,
    yahooAvgPriceJpy: 625000,
    demandScore: 88,
    liquiditySpeedDays: 4.8,
    priceTrend30d: +6.7,
    snkrdunkHistory: [
      { date: "2026-08-20", price: 580000, volume: 4 },
      { date: "2026-08-27", price: 600000, volume: 5 },
      { date: "2026-09-03", price: 615000, volume: 6 },
      { date: "2026-09-10", price: 630000, volume: 7 },
      { date: "2026-09-18", price: 640000, volume: 6 }
    ],
    torecaJapanHistory: [
      { date: "2026-08-20", buyPrice: 500000, sellPrice: 590000 },
      { date: "2026-08-27", buyPrice: 520000, sellPrice: 610000 },
      { date: "2026-09-03", buyPrice: 540000, sellPrice: 630000 },
      { date: "2026-09-10", buyPrice: 560000, sellPrice: 645000 },
      { date: "2026-09-18", buyPrice: 560000, sellPrice: 620000 }
    ],
    mercariSoldExamples: [
      { date: "2026-09-17", price: 648000, condition: "PSA10 白かけ凹みなし・ホロ欠けなし", title: "【PSA10】ルチア SR 裂空のカリスマ 完美品" },
      { date: "2026-09-09", price: 630000, condition: "PSA10 暗所防湿庫保管", title: "ルチア SR PSA10 ポケモンカード" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-14", price: 638000, condition: "PSA10 鑑定ワンオーナー品", title: "ルチア SR PSA10 裂空のカリスマ" }
    ],
    tags: ["PSA10", "サン&ムーンSR", "女子サポート", "手堅い需要"],
    notes: "国内女性サポートSRの代表格。国内フリマでの買い手が非常に多く、出品後数日以内の成約率が高い。"
  },
  {
    id: "card-006",
    name: "ゲンガー&ミミッキュGX (SA / SR)",
    cardSet: "拡張パック タッグボルト",
    cardNumber: "103/095 SR",
    releaseYear: 2018,
    grade: "Raw (未鑑定/NM)",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 420,
    ebayShippingUsd: 25,
    ebaySellerRating: "99.7%",
    ebayItemLocation: "Australia (Sydney)",
    snkrdunkPriceJpy: 98000,
    torecaJapanPriceJpy: 92000,
    mercariAvgPriceJpy: 96000,
    yahooAvgPriceJpy: 94500,
    demandScore: 85,
    liquiditySpeedDays: 3.2,
    priceTrend30d: +15.4,
    snkrdunkHistory: [
      { date: "2026-08-20", price: 80000, volume: 8 },
      { date: "2026-08-27", price: 84000, volume: 10 },
      { date: "2026-09-03", price: 89000, volume: 12 },
      { date: "2026-09-10", price: 94000, volume: 15 },
      { date: "2026-09-18", price: 98000, volume: 14 }
    ],
    torecaJapanHistory: [
      { date: "2026-08-20", buyPrice: 70000, sellPrice: 83000 },
      { date: "2026-08-27", buyPrice: 74000, sellPrice: 87000 },
      { date: "2026-09-03", buyPrice: 79000, sellPrice: 91000 },
      { date: "2026-09-10", buyPrice: 83000, sellPrice: 95000 },
      { date: "2026-09-18", buyPrice: 83000, sellPrice: 92000 }
    ],
    mercariSoldExamples: [
      { date: "2026-09-18", price: 99000, condition: "素体 美品・初期傷なし・ローダー発送", title: "ゲンガー&ミミッキュGX SA SR タッグボルト 美品" },
      { date: "2026-09-12", price: 95000, condition: "素体 センタリング良好・PSA提出用", title: "ゲンガー&ミミッキュGX スペシャルアート SR" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-15", price: 96000, condition: "未鑑定 NearMint 美品", title: "タッグボルト ゲンガー&ミミッキュGX SA" }
    ],
    tags: ["Raw", "タッグチームSA", "PSA鑑定出し候補", "急騰中"],
    notes: "海外eBayで未鑑定NM品を安く仕入れ、そのまま国内フリマで即転売するか、PSA鑑定に出してPSA10化することで利益を2〜3倍に跳ね上げられるハイリターン候補。"
  },
  {
    id: "card-007",
    name: "ブラッキーVMAX (SA / HR)",
    cardSet: "強化拡張パック イーブイヒーローズ",
    cardNumber: "095/069 HR",
    releaseYear: 2021,
    grade: "PSA10",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60",
    ebayPriceUsd: 2150,
    ebayShippingUsd: 35,
    ebaySellerRating: "100%",
    ebayItemLocation: "United States (New York)",
    snkrdunkPriceJpy: 460000,
    torecaJapanPriceJpy: 440000,
    mercariAvgPriceJpy: 455000,
    yahooAvgPriceJpy: 450000,
    demandScore: 92,
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
      { date: "2026-09-11", price: 452000, condition: "PSA10 厳選コレクション", title: "ブラッキーVMAX HR SA PSA10" }
    ],
    yahooSoldExamples: [
      { date: "2026-09-16", price: 458000, condition: "PSA10 即発送", title: "ブラッキーVMAX SA PSA10 イーブイヒーローズ" }
    ],
    tags: ["PSA10", "ブイズ最高峰", "世界的人気", "流動性Sランク"],
    notes: "国内外問わず圧倒的なコレクター需要。価格が崩れにくく、中長期保有と短期フリップの両方に対応できる万能投資銘柄。"
  }
];

// デフォルト設定
export const DEFAULT_SETTINGS = {
  usdJpyRate: 150.0, // 為替レート (1ドル = 150円)
  customsDutyRate: 0.0, // トレカ関税は通常0%
  importConsumptionTaxRate: 0.10, // 輸入消費税 (課税価格が1万円超の場合に約10%)
  taxExemptionThresholdJpy: 16666, // 個人輸入の少額免税ライン (課税価格ベース)
  domesticShippingJpy: 550, // 国内送料 (宅急便コンパクト・メルカリ便等)
  packingCostJpy: 150, // 梱包材・スリーブ・ローダー代
  // 販売プラットフォーム手数料
  platformFees: {
    mercari: { name: "メルカリ", rate: 0.10, description: "10% (最も高いがユーザー数最大・即売れ)" },
    yahoo: { name: "ヤフーフリマ", rate: 0.05, description: "5% (業界最安水準・利益率UPに最適)" },
    snkrdunk: { name: "スニーカーダンク", rate: 0.055, description: "5.5% (鑑定付き・相場基準・安心取引)" },
    torecaJapan: { name: "トレカショップ買取", rate: 0.00, description: "0% (即現金化・買取価格で直接売却)" }
  }
};
