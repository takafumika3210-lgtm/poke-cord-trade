/**
 * 大会優勝構築済みデッキ データセット
 * 最新大会（CL・シティリーグ等）の実績、環境シェア、なぜ売れるかの需要分析、60枚レシピ内訳、仕入れ原価 vs 推奨販売価格
 */
export const TOURNAMENT_DECKS = [
  {
    id: "deck-dragapult-bomb",
    name: "ドラパルトex ＋ ヨノワール (カースドボム型)",
    tier: "Tier 1 (環境シェアNo.1)",
    sharePercent: 17.4,
    tournamentAchievement: "CL宮城 優勝 / 全国シティリーグ 優勝多数",
    archetype: "2進化・ベンチ狙撃・ダメカンばら撒きビートダウン",
    difficulty: "中級〜上級向け",
    themeColor: "#8b5cf6",
    bannerTag: "🔥 2026年9月環境シェア単独1位・大会実績最多",
    
    // なぜ売れるかの詳細分析
    whyItSells: {
      coreReason: "サマヨール・ヨノワールの特性「カースドボム」で相手のHPを削り、ドラパルトの「ファントムダイブ」でバトル場とベンチを同時壊滅させる現環境最強ギミック。大会で勝ちたいプレイヤーの需要が圧倒的1位。",
      demandDrivers: [
        {
          title: "環境シェア17.4%の絶対王者",
          detail: "現在の大会使用率・勝率ともにトップ。対策必須のデッキであり、大会出場者は「自分で使う」か「練習相手に使う」ため真っ先に手に入れたい。"
        },
        {
          title: "パーツ集めの難易度（タイパ需要）",
          detail: "ヨマワルライン、ドラメシヤライン、なかよしポフィン、ACE SPECと、ショップを3〜4店舗回らないと揃わないパーツが多く、60枚完成品への上乗せプレミアムを払いやすい。"
        },
        {
          title: "アンフェアスタンプによる大逆転力",
          detail: "カースドボムで自主気絶 ➔ アンフェアスタンプ発動（相手手札2枚化）の必勝コンボが強力で、プレイしていて爽快感・満足度が高い。"
        }
      ],
      targetAudience: "シティリーグ・CL出場を目指す競技プレイヤー、大会で勝ちたい中級者",
      turnoverSpeed: "出品後 6〜18時間で即SOLD（回転率最高評価）"
    },

    // 収益シミュレーション
    pricing: {
      partsCostJpy: 4850, // 60枚仕入れ原価
      recommendedSalePriceJpy: 8480, // 標準高利益推奨価格
      quickSalePriceJpy: 7480, // 即日売り切り価格
      premiumSalePriceJpy: 9800, // 豪華版（プライムキャッチャー採用時）
      shippingJpy: 210, // ネコポス
      mercariFeeRate: 0.10, // メルカリ手数料10%
      yahooFeeRate: 0.05 // ヤフーフリマ手数料5%
    },

    // 60枚レシピ内訳（仕入れ原価明細）
    deckList: [
      { name: "ドラパルトex (RR)", count: 3, costJpy: 900, role: "メインアタッカー" },
      { name: "ドロンチ (ていさつしれい)", count: 3, costJpy: 300, role: "ドローエンジン" },
      { name: "ドラメシヤ", count: 4, costJpy: 150, role: "進化元たね" },
      { name: "ヨノワール (カースドボム)", count: 1, costJpy: 350, role: "ボム気絶ギミック" },
      { name: "サマヨール (カースドボム)", count: 2, costJpy: 300, role: "ボム気絶ギミック" },
      { name: "ヨマワル", count: 2, costJpy: 150, role: "進化元たね" },
      { name: "キチキギスex", count: 1, costJpy: 300, role: "3枚ドロー復帰" },
      { name: "かがやくフーディン", count: 1, costJpy: 200, role: "ダメカン操作" },
      { name: "ロトムV", count: 1, costJpy: 250, role: "序盤3枚ドロー" },
      { name: "なかよしポフィン", count: 4, costJpy: 500, role: "最重要たね展開" },
      { name: "ハイパーボール", count: 4, costJpy: 120, role: "進化サーチ" },
      { name: "ネストボール", count: 2, costJpy: 80, role: "たねサーチ" },
      { name: "ふしぎなアメ", count: 4, costJpy: 160, role: "2進化高速化" },
      { name: "大地の器", count: 2, costJpy: 150, role: "エネサーチ" },
      { name: "カウンターキャッチャー", count: 2, costJpy: 100, role: "逆転ベンチ呼び出し" },
      { name: "アンフェアスタンプ (ACE SPEC)", count: 1, costJpy: 1200, role: "最重要ACE SPEC" },
      { name: "ペパー", count: 4, costJpy: 200, role: "グッズ+どうぐサーチ" },
      { name: "ナンジャモ", count: 3, costJpy: 90, role: "手札干渉" },
      { name: "ボスの指令", count: 2, costJpy: 80, role: "決め手" },
      { name: "基本超エネルギー", count: 4, costJpy: 40, role: "技エネルギー" },
      { name: "基本炎エネルギー", count: 3, costJpy: 30, role: "技エネルギー" },
      { name: "新品無地マットスリーブ(60枚)", count: 1, costJpy: 250, role: "即プレイ用スリーブ" }
    ],

    // メルカリ出品用テンプレート
    listingTemplate: {
      title: "【CL・シティ優勝構築】ドラパルトex カースドボム型 構築済みデッキ 60枚 二重スリーブ付 即対戦可",
      description: `ご覧いただきありがとうございます！
最新大会（CL・シティリーグ）で優勝・上位を独占している大人気「ドラパルトex＋カースドボム型」の本格構築済みデッキ60枚セットです。

届いてすぐにジムバトルや大会で使えるよう、新品のインナースリーブ＋マットスリーブで二重保護済みです！

【デッキの強み】
・サマヨール/ヨノワールの「カースドボム」でダメカンをばら撒き、ドラパルトの「ファントムダイブ」で相手ベンチごと一掃できます。
・超強力ACE SPEC「アンフェアスタンプ」も採用済み！相手の手札を2枚に減らして大逆転が狙えます。
・現行の最新スタンダードレギュレーション（F・G・Hマーク）に完全対応しています。

【セット内容】
・60枚フルデッキ
・新品二重スリーブ装着済み
・折れ・濡れ対策を施し、メルカリ便（匿名配送・追跡付き）にて即日発送いたします。

バラ売り不可、即購入大歓迎です！`
    },

    // アート情報（メインビジュアルカード）
    featuredCards: [
      { name: "ドラパルトex", role: "メインアタッカー", badge: "ACE" },
      { name: "ヨノワール", role: "カースドボム", badge: "KEY" },
      { name: "アンフェアスタンプ", role: "ACE SPEC", badge: "SPEC" }
    ]
  },

  {
    id: "deck-ogerpon-bolt",
    name: "タケルライコex ＋ オーガポンみどりのめんex",
    tier: "Tier 1 (圧倒的速攻・人気No.1)",
    sharePercent: 14.2,
    tournamentAchievement: "CL東京 優勝 / 大型大会TOP入賞常連",
    archetype: "青天井火力・高速エネ加速ビートダウン",
    difficulty: "初心者〜中級者向け (扱いやすさ抜群)",
    themeColor: "#10b981",
    bannerTag: "⚡ 初心者人気No.1・圧倒的一撃火力で即完売銘柄",

    // なぜ売れるかの詳細分析
    whyItSells: {
      coreReason: "オーガポンの「みどりのまい」でドロー＆エネ加速し、タケルライコの「きょくらいごう」で相手の大型exを一撃粉砕。ルールがシンプルで超強力なため、初心者や復帰勢が真っ先に買う完成デッキ。",
      demandDrivers: [
        {
          title: "プレイングが明快で初心者に大人気",
          detail: "複雑な進化ギミックがなく、たねポケモン主体で即座に攻撃できるため、「難しくない強いデッキ」を探すユーザーの購入決定スピードが非常に速い。"
        },
        {
          title: "大型大会での確かな実績",
          detail: "CL東京での優勝など、トッププロも認める勝率の高さ。シンプルでありながら環境上位相手にも勝ち越せる。"
        },
        {
          title: "パーツの単価が高くお得感を感じやすい",
          detail: "タケルライコex、オーガポンex、プライムキャッチャー、大地の器など単体でも高価なカードが揃っているため、7,000〜8,000円台で出品すると割安に見えて即売れする。"
        }
      ],
      targetAudience: "初心者、復帰勢、分かりやすく爽快に勝ちたいプレイヤー",
      turnoverSpeed: "出品後 4〜12時間で即SOLD（高回転）"
    },

    pricing: {
      partsCostJpy: 4400,
      recommendedSalePriceJpy: 7980,
      quickSalePriceJpy: 6980,
      premiumSalePriceJpy: 8980,
      shippingJpy: 210,
      mercariFeeRate: 0.10,
      yahooFeeRate: 0.05
    },

    deckList: [
      { name: "タケルライコex (RR)", count: 3, costJpy: 900, role: "メインアタッカー" },
      { name: "オーガポン みどりのめんex (RR)", count: 3, costJpy: 900, role: "エネ加速＆ドロー" },
      { name: "スナノケガワ", count: 1, costJpy: 150, role: "サブアタッカー" },
      { name: "かがやくゲッコウガ", count: 1, costJpy: 350, role: "ドローエンジン" },
      { name: "イキリンコex", count: 1, costJpy: 200, role: "初手手札入れ替え" },
      { name: "ネストボール", count: 4, costJpy: 160, role: "たねサーチ" },
      { name: "ハイパーボール", count: 4, costJpy: 120, role: "手札コスト兼サーチ" },
      { name: "大地の器", count: 4, costJpy: 400, role: "基本エネサーチ" },
      { name: "ポケギア3.0", count: 3, costJpy: 90, role: "サポート探索" },
      { name: "エネルギー回収", count: 2, costJpy: 60, role: "エネ再利用" },
      { name: "プライムキャッチャー (ACE SPEC)", count: 1, costJpy: 1300, role: "入れ替え＆呼び出し" },
      { name: "勇気のおまもり", count: 3, costJpy: 150, role: "HP+50耐久強化" },
      { name: "オーリム博士の気迫", count: 4, costJpy: 200, role: "古代エネ加速" },
      { name: "ナンジャモ", count: 2, costJpy: 60, role: "手札干渉" },
      { name: "ボスの指令", count: 2, costJpy: 80, role: "フィニッシャー" },
      { name: "基本草エネルギー", count: 6, costJpy: 60, role: "技エネルギー" },
      { name: "基本雷エネルギー", count: 3, costJpy: 30, role: "技エネルギー" },
      { name: "基本闘エネルギー", count: 3, costJpy: 30, role: "技エネルギー" },
      { name: "新品無地マットスリーブ(60枚)", count: 1, costJpy: 250, role: "スリーブ" }
    ],

    listingTemplate: {
      title: "【CL東京優勝構築】タケルライコex オーガポン 構築済みデッキ 60枚 スリーブ付 即対戦可",
      description: `ご覧いただきありがとうございます！
CL東京で優勝を果たし、現在大流行中の「タケルライコex＋オーガポンex」本格構築済みデッキ60枚セットです。

新品スリーブを装着済みですので、届いてそのまま大会やジムバトルで使用可能です！

【デッキの強み】
・オーガポンの特性「みどりのまい」で草エネをつけてドロー、タケルライコの「きょくらいごう」で青天井の超火力を連発できます。
・大人気ACE SPEC「プライムキャッチャー」を完備！相手ベンチを呼び出しながら即座にサイドを取り切れます。
・初心者の方でも扱いやすく、現環境トップクラスの勝率を誇ります。
・最新スタンダードレギュレーション対応。

折れ・水濡れ対策を徹底し、匿名メルカリ便にて発送いたします。
即購入OKです！`
    },

    featuredCards: [
      { name: "タケルライコex", role: "青天井アタッカー", badge: "ACE" },
      { name: "オーガポン みどりのめんex", role: "エネ加速＆ドロー", badge: "KEY" },
      { name: "プライムキャッチャー", role: "ACE SPEC", badge: "SPEC" }
    ]
  },

  {
    id: "deck-charizard-pidgeot",
    name: "悪テラスタル リザードンex (ピジョット型)",
    tier: "Tier 1.5 (王道・超ロングセラー)",
    sharePercent: 12.8,
    tournamentAchievement: "CL愛知 優勝 / シティリーグ常時上位",
    archetype: "万能サーチ・高耐久・終盤超火力",
    difficulty: "初心者〜上級者まで全対応",
    themeColor: "#ef4444",
    bannerTag: "👑 ポケカ界不動の人気No.1・親子層〜競技層まで常に安定需要",

    whyItSells: {
      coreReason: "リザードンという圧倒的ブランド力と、特性「れんごくしはい」＆ピジョットの「マッハサーチ」による圧倒的安定感。環境が変わっても常に強く、息の長い資産価値。",
      demandDrivers: [
        {
          title: "全世代への圧倒的人気",
          detail: "大人の競技層だけでなく、親子プレイヤーやライト層が『最初に欲しいデッキ』として常に検索されるため、需要が尽きない。"
        },
        {
          title: "マッハサーチによる高い安定性",
          detail: "毎ターン好きなカードを山札から1枚手札に加えられるため事故が少なく、プレイングの上達を実感しやすい。"
        }
      ],
      targetAudience: "リザードンファン、親子層、安定した王道デッキを好むプレイヤー",
      turnoverSpeed: "出品後 12〜24時間以内で成約"
    },

    pricing: {
      partsCostJpy: 4200,
      recommendedSalePriceJpy: 7800,
      quickSalePriceJpy: 6800,
      premiumSalePriceJpy: 8800,
      shippingJpy: 210,
      mercariFeeRate: 0.10,
      yahooFeeRate: 0.05
    },

    deckList: [
      { name: "リザードンex (悪テラスタル)", count: 3, costJpy: 900, role: "メインアタッカー" },
      { name: "リザード", count: 1, costJpy: 80, role: "進化ライン" },
      { name: "ヒトカゲ", count: 4, costJpy: 160, role: "たね" },
      { name: "ピジョットex", count: 2, costJpy: 600, role: "マッハサーチ" },
      { name: "ポッポ", count: 2, costJpy: 80, role: "たね" },
      { name: "ビッパ ＋ ビーダル", count: 2, costJpy: 150, role: "ドローエンジン" },
      { name: "かがやくリザードン", count: 1, costJpy: 250, role: "終盤サブアタッカー" },
      { name: "ロトムV", count: 1, costJpy: 250, role: "即席充電" },
      { name: "なかよしポフィン", count: 4, costJpy: 500, role: "たね展開" },
      { name: "ハイパーボール", count: 4, costJpy: 120, role: "万能サーチ" },
      { name: "ネストボール", count: 2, costJpy: 80, role: "たねサーチ" },
      { name: "ふしぎなアメ", count: 4, costJpy: 160, role: "2進化高速化" },
      { name: "すごいつりざお", count: 2, costJpy: 100, role: "トラッシュ回収" },
      { name: "アンフェアスタンプ または プライム", count: 1, costJpy: 1200, role: "ACE SPEC" },
      { name: "ペパー", count: 4, costJpy: 200, role: "キーサーチ" },
      { name: "ナンジャモ", count: 3, costJpy: 90, role: "手札干渉" },
      { name: "ボスの指令", count: 2, costJpy: 80, role: "決め手" },
      { name: "基本炎エネルギー", count: 6, costJpy: 60, role: "炎エネ" },
      { name: "新品スリーブ(60枚)", count: 1, costJpy: 250, role: "スリーブ" }
    ],

    listingTemplate: {
      title: "【最新大会優勝構築】悪リザードンex ピジョット型 構築済みデッキ 60枚 二重スリーブ付 即対戦可",
      description: `ご覧いただきありがとうございます！
公式大会で大活躍を続ける大人気「悪テラスタル リザードンex＋ピジョット型」の本格構築済みデッキ60枚セットです。

【デッキの特徴】
・特性「れんごくしはい」でエネルギーを即加速し、ピジョットの「マッハサーチ」で毎ターン好きなカードを持ってこられる最強の安定感を誇ります。
・ACE SPECカードも完備しており、すぐに大会やジムバトルで使用可能です。
・全カード現行スタンダードレギュレーション対応。
・新品二重スリーブ入りでお届けします。

即購入大歓迎です！`
    },

    featuredCards: [
      { name: "リザードンex", role: "悪テラスタル", badge: "ACE" },
      { name: "ピジョットex", role: "マッハサーチ", badge: "KEY" },
      { name: "アンフェアスタンプ", role: "ACE SPEC", badge: "SPEC" }
    ]
  },

  {
    id: "deck-gardevoir",
    name: "サーナイトex (マシマシラ・アドレナブレイン型)",
    tier: "Tier 2 (玄人・女性人気No.1)",
    sharePercent: 9.5,
    tournamentAchievement: "シティリーグ優勝多数 / WCS上位",
    archetype: "ダメカン操作・無限エネ加速・高シナジー",
    difficulty: "上級者向け (テクニカル)",
    themeColor: "#ec4899",
    bannerTag: "🔮 テクニカル派に大人気・キャラクター人気と実力を兼備",

    whyItSells: {
      coreReason: "「サイコエンブレイス」によるトラッシュからの超エネ自由加速と、マシマシラの「アドレナブレイン」でダメカンを押し付ける知能派デッキ。プレイヤースキルが活きるため熱狂的なファンが多い。",
      demandDrivers: [
        {
          title: "サーナイト＆マシマシラのキャラクター人気",
          detail: "女性プレイヤーや競技熟練者からの根強い支持があり、環境の浮き沈みに左右されず定期的に売れる。"
        },
        {
          title: "非ルール主体でサイドレースに強い",
          detail: "フワンテやサケブシッポで戦うため、相手にサイドを1枚ずつしか取らせない粘り強さがある。"
        }
      ],
      targetAudience: "競技志向プレイヤー、テクニカルなプレイングを好む層",
      turnoverSpeed: "出品後 1日〜2日程度で成約"
    },

    pricing: {
      partsCostJpy: 3900,
      recommendedSalePriceJpy: 7280,
      quickSalePriceJpy: 6480,
      premiumSalePriceJpy: 8200,
      shippingJpy: 210,
      mercariFeeRate: 0.10,
      yahooFeeRate: 0.05
    },

    deckList: [
      { name: "サーナイトex (RR)", count: 2, costJpy: 500, role: "エネ加速エンジン" },
      { name: "キルリア (リファイン)", count: 4, costJpy: 400, role: "ドローエンジン" },
      { name: "ラルトス", count: 4, costJpy: 160, role: "進化元" },
      { name: "マシマシラ (アドレナブレイン)", count: 2, costJpy: 400, role: "ダメカン移動" },
      { name: "フワンテ", count: 2, costJpy: 100, role: "大ダメージアタッカー" },
      { name: "サケブシッポ", count: 1, costJpy: 100, role: "ベンチ狙撃" },
      { name: "なかよしポフィン", count: 4, costJpy: 500, role: "たね展開" },
      { name: "ハイパーボール", count: 4, costJpy: 120, role: "サーチ兼エネトラッシュ" },
      { name: "大地の器", count: 2, costJpy: 150, role: "エネサーチ" },
      { name: "ふしぎなアメ", count: 2, costJpy: 80, role: "進化補助" },
      { name: "すごいつりざお", count: 2, costJpy: 100, role: "回収" },
      { name: "アンフェアスタンプ", count: 1, costJpy: 1200, role: "ACE SPEC" },
      { name: "勇気のおまもり", count: 2, costJpy: 100, role: "フワンテHP増強" },
      { name: "ナンジャモ", count: 4, costJpy: 120, role: "ドロー兼妨害" },
      { name: "ボスの指令", count: 2, costJpy: 80, role: "決め手" },
      { name: "基本超エネルギー", count: 8, costJpy: 80, role: "超エネ" },
      { name: "基本悪エネルギー", count: 2, costJpy: 20, role: "マシマシラ起動用" },
      { name: "新品スリーブ(60枚)", count: 1, costJpy: 250, role: "スリーブ" }
    ],

    listingTemplate: {
      title: "【シティリーグ優勝構築】サーナイトex マシマシラ型 構築済みデッキ 60枚 スリーブ付 即対戦可",
      description: `ご覧いただきありがとうございます！
大会で根強い強さを誇る大人気「サーナイトex＋マシマシラ型」本格構築済みデッキ60枚セットです。

【デッキの特徴】
・特性「サイコエンブレイス」で無限にエネルギーを加速し、マシマシラでダメカンを自在に相手に押し付けます。
・高額ACE SPEC「アンフェアスタンプ」や必須パーツも完全網羅！
・新品スリーブ入りで即対戦可能です。
・最新スタンダードレギュレーション対応。

即購入大歓迎です！`
    },

    featuredCards: [
      { name: "サーナイトex", role: "サイコエンブレイス", badge: "ACE" },
      { name: "マシマシラ", role: "アドレナブレイン", badge: "KEY" },
      { name: "アンフェアスタンプ", role: "ACE SPEC", badge: "SPEC" }
    ]
  }
];
