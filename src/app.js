import { INITIAL_CARDS, DEFAULT_SETTINGS, DATA_META } from './data.js';
import { TOURNAMENT_DECKS } from './deckData.js';
import { 
  calculateMercariProfit,
  analyzeCardInvestment, 
  analyzePsaGradingStrategy,
  MERCARI_CONSTANTS
} from './engine.js';

let state = {
  cards: INITIAL_CARDS,
  decks: TOURNAMENT_DECKS,
  settings: JSON.parse(localStorage.getItem('poke_settings')) || DEFAULT_SETTINGS,
  activeTab: 'tournament_decks', // 'tournament_decks' (デフォルト) | 'psa_grading' | 'arbitrage'
  filterGrade: 'all',
  filterBudget: 'all', // 'all' | 'under_30k' | 'under_50k' | 'under_100k' | 'over_100k'
  sortBy: 'score', // 'score' | 'liquidity' | 'sold_count' | 'psa_roi' | 'upside' | 'profit' | 'roi'
  searchQuery: '',
  selectedCardId: null,
  activeModal: null,
  chartInstance: null
};

// ユーザーが追加したカスタムカードをLocalStorageから復元
const savedCustomCards = JSON.parse(localStorage.getItem('poke_custom_cards')) || [];
if (savedCustomCards.length > 0) {
  state.cards = [...savedCustomCards, ...INITIAL_CARDS];
}

const formatJpy = (num) => '¥' + Math.round(num || 0).toLocaleString('ja-JP');

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  const updatedAtEl = document.getElementById('dataUpdatedAtLabel');
  if (updatedAtEl && DATA_META) {
    updatedAtEl.textContent = `${DATA_META.cardDataUpdatedAt} 国内相場`;
  }

  setupEventListeners();
  renderApp();
}

function setupEventListeners() {
  // 戦略タブ切替 (① 優勝デッキ再現販売 vs ② PSA鑑定メルカリ販売 vs ③ 国内シングル転売)
  const tabArbitrage = document.getElementById('tabArbitrage');
  const tabPsaGrading = document.getElementById('tabPsaGrading');
  const tabTournamentDecks = document.getElementById('tabTournamentDecks');

  const updateTabUI = (activeId) => {
    [tabTournamentDecks, tabPsaGrading, tabArbitrage].forEach(tab => {
      if (tab) {
        if (tab.id === activeId) tab.classList.add('active');
        else tab.classList.remove('active');
      }
    });
  };

  if (tabTournamentDecks) {
    tabTournamentDecks.addEventListener('click', () => {
      state.activeTab = 'tournament_decks';
      updateTabUI('tabTournamentDecks');
      renderApp();
    });
  }
  if (tabPsaGrading) {
    tabPsaGrading.addEventListener('click', () => {
      state.activeTab = 'psa_grading';
      updateTabUI('tabPsaGrading');
      renderApp();
    });
  }
  if (tabArbitrage) {
    tabArbitrage.addEventListener('click', () => {
      state.activeTab = 'arbitrage';
      updateTabUI('tabArbitrage');
      renderApp();
    });
  }

  // 検索
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase();
      if (state.activeTab === 'tournament_decks') {
        renderDeckView();
      } else {
        renderTable();
      }
    });
  }

  // 予算フィルタ
  const budgetFilter = document.getElementById('budgetFilter');
  if (budgetFilter) {
    budgetFilter.addEventListener('change', (e) => {
      state.filterBudget = e.target.value;
      if (state.activeTab === 'tournament_decks') {
        renderDeckView();
      } else {
        renderTable();
      }
    });
  }

  // グレードフィルタ
  const gradeFilter = document.getElementById('gradeFilter');
  if (gradeFilter) {
    gradeFilter.addEventListener('change', (e) => {
      state.filterGrade = e.target.value;
      renderTable();
    });
  }

  // 並び順
  const sortFilter = document.getElementById('sortFilter');
  if (sortFilter) {
    sortFilter.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      if (state.activeTab === 'tournament_decks') {
        renderDeckView();
      } else {
        renderTable();
      }
    });
  }

  // メルカリ損益シミュレーターボタン
  const simBtn = document.getElementById('openSimulatorBtn');
  if (simBtn) {
    simBtn.addEventListener('click', () => {
      openSimulatorModal(state.cards[0].id);
    });
  }

  // カード追加ボタン
  const addBtn = document.getElementById('openAddCardBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      openAddCardModal();
    });
  }

  // CSVエクスポート
  const exportBtn = document.getElementById('exportCsvBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportToCsv);
  }
}

function renderApp() {
  const cardTableContainer = document.getElementById('cardTableContainer');
  const deckViewContainer = document.getElementById('deckViewContainer');

  if (state.activeTab === 'tournament_decks') {
    if (cardTableContainer) cardTableContainer.style.display = 'none';
    if (deckViewContainer) deckViewContainer.style.display = 'block';
    renderDeckKPIs();
    renderDeckView();
  } else {
    if (cardTableContainer) cardTableContainer.style.display = 'block';
    if (deckViewContainer) deckViewContainer.style.display = 'none';
    renderKPIs();
    renderTableHeader();
    renderTable();
  }
}

function renderDeckKPIs() {
  const decks = state.decks;
  const totalCount = decks.length;

  const profits = decks.map(d => {
    const netRevenue = d.pricing.recommendedSalePriceJpy * (1 - d.pricing.mercariFeeRate) - d.pricing.shippingJpy;
    return netRevenue - d.pricing.partsCostJpy;
  });
  const maxProfit = Math.max(...profits);
  const avgProfit = Math.round(profits.reduce((a, b) => a + b, 0) / totalCount);

  document.getElementById('kpiCardCount').textContent = totalCount + ' 構築';

  document.getElementById('kpiLabel2').textContent = '1デッキあたり 平均純利益';
  document.getElementById('kpiSub2').textContent = 'メルカリ手数料10%＋送料込実質手取り';
  document.getElementById('kpiAvgRoi').textContent = `+${formatJpy(avgProfit)}`;

  document.getElementById('kpiLabel3').textContent = '最高純利デッキ';
  document.getElementById('kpiMaxProfit').textContent = `+${formatJpy(maxProfit)}`;

  document.getElementById('kpiLabel4').textContent = '👑 環境シェア1位';
  document.getElementById('kpiSub4').textContent = 'CL宮城優勝・シェア17.4%';
  document.getElementById('kpiHighRankCount').textContent = 'ドラパルトex';
}

function renderKPIs() {
  const analyzed = state.cards.map(c => analyzeCardInvestment(c, state.settings));
  const totalCount = analyzed.length;

  if (state.activeTab === 'arbitrage') {
    const avgRoi = totalCount > 0 ? (analyzed.reduce((acc, c) => acc + c.mercariProfit.roiPercent, 0) / totalCount).toFixed(1) : 0;
    const maxProfit = totalCount > 0 ? Math.max(...analyzed.map(c => c.mercariProfit.netProfitJpy)) : 0;
    const under30kCount = analyzed.filter(c => c.purchaseCostJpy < 30000).length;

    document.getElementById('kpiLabel2').textContent = 'メルカリ販売 平均ROI';
    document.getElementById('kpiSub2').textContent = '手数料10%+送料控除後手取り比';
    document.getElementById('kpiAvgRoi').textContent = '+' + avgRoi + '%';

    document.getElementById('kpiLabel3').textContent = '最高純利 (シングル販売)';
    document.getElementById('kpiMaxProfit').textContent = formatJpy(maxProfit);

    document.getElementById('kpiLabel4').textContent = '🎯 3万円未満で仕入れ可能';
    document.getElementById('kpiSub4').textContent = `全${totalCount}銘柄中 ${under30kCount}銘柄`;
    document.getElementById('kpiHighRankCount').textContent = `${under30kCount} 銘柄`;
  } else {
    const avgExpectedRoi = totalCount > 0 ? (analyzed.reduce((acc, c) => acc + c.psaAnalysis.expectedRoiPercent, 0) / totalCount).toFixed(1) : 0;
    const maxPsa10Profit = totalCount > 0 ? Math.max(...analyzed.map(c => c.psaAnalysis.psa10Profit.netProfitJpy)) : 0;
    const under30kPsaCount = analyzed.filter(c => c.psaAnalysis.totalGradedCostJpy < 30000).length;

    document.getElementById('kpiLabel2').textContent = 'PSA鑑定 メルカリ期待ROI';
    document.getElementById('kpiSub2').textContent = 'PSA10率×PSA9率 手取り加重平均';
    document.getElementById('kpiAvgRoi').textContent = '+' + avgExpectedRoi + '%';

    document.getElementById('kpiLabel3').textContent = 'PSA10化 メルカリ最高純利';
    document.getElementById('kpiMaxProfit').textContent = formatJpy(maxPsa10Profit);

    document.getElementById('kpiLabel4').textContent = '🎯 3万円未満で鑑定投資可能';
    document.getElementById('kpiSub4').textContent = `素体仕入れ＋鑑定料込`;
    document.getElementById('kpiHighRankCount').textContent = `${under30kPsaCount} 銘柄`;
  }

  document.getElementById('kpiCardCount').textContent = totalCount + ' 枚';
}

function renderTableHeader() {
  const thead = document.getElementById('cardTableHead');
  if (!thead) return;

  if (state.activeTab === 'arbitrage') {
    thead.innerHTML = `
      <tr>
        <th>判定</th>
        <th>カード名 / 状態</th>
        <th>メルカリ7日成約力 (消化率)</th>
        <th>カドショ仕入れ目安</th>
        <th>メルカリ想定売価</th>
        <th>メルカリ実質手取り</th>
        <th>純利益 (ROI)</th>
        <th>メルカリ相場 / 詳細</th>
      </tr>
    `;
  } else {
    thead.innerHTML = `
      <tr>
        <th>鑑定推奨</th>
        <th>カード名 / 素体状態</th>
        <th>素体仕入＋PSA鑑定料(¥3500)</th>
        <th>メルカリ成約力 (7日成約数)</th>
        <th>PSA10 メルカリ売価 / 純利</th>
        <th>PSA9 メルカリ売価 / 純利</th>
        <th>PSA10率 / 期待ROI</th>
        <th>メルカリ相場 / 詳細</th>
      </tr>
    `;
  }
}

function renderTable() {
  const tbody = document.getElementById('cardTableBody');
  if (!tbody) return;

  let analyzed = state.cards.map(c => analyzeCardInvestment(c, state.settings));

  // 予算フィルタ
  if (state.filterBudget !== 'all') {
    analyzed = analyzed.filter(item => {
      const cost = state.activeTab === 'arbitrage' ? item.purchaseCostJpy : item.psaAnalysis.totalGradedCostJpy;
      if (state.filterBudget === 'under_30k') return cost < 30000;
      if (state.filterBudget === 'under_50k') return cost < 50000;
      if (state.filterBudget === 'under_100k') return cost < 100000;
      if (state.filterBudget === 'over_100k') return cost >= 100000;
      return true;
    });
  }

  // グレードフィルタ
  if (state.filterGrade !== 'all') {
    analyzed = analyzed.filter(item => {
      if (state.filterGrade === 'PSA10') return item.card.grade === 'PSA10';
      if (state.filterGrade === 'Raw') return item.card.grade.includes('Raw');
      return true;
    });
  }

  // 検索フィルタ
  if (state.searchQuery) {
    analyzed = analyzed.filter(item => 
      item.card.name.toLowerCase().includes(state.searchQuery) ||
      item.card.cardSet.toLowerCase().includes(state.searchQuery) ||
      (item.card.tags && item.card.tags.some(t => t.toLowerCase().includes(state.searchQuery)))
    );
  }

  // ソート処理
  analyzed.sort((a, b) => {
    if (state.sortBy === 'liquidity') {
      return b.liquidity.sellThroughRate - a.liquidity.sellThroughRate;
    }
    if (state.sortBy === 'sold_count') {
      return b.liquidity.sold7d - a.liquidity.sold7d;
    }

    if (state.activeTab === 'arbitrage') {
      if (state.sortBy === 'profit') return b.mercariProfit.netProfitJpy - a.mercariProfit.netProfitJpy;
      if (state.sortBy === 'roi') return b.mercariProfit.roiPercent - a.mercariProfit.roiPercent;
      return b.overallScore - a.overallScore;
    } else {
      if (state.sortBy === 'psa_roi' || state.sortBy === 'roi') return b.psaAnalysis.expectedRoiPercent - a.psaAnalysis.expectedRoiPercent;
      if (state.sortBy === 'upside') return b.psaAnalysis.upsideMultiplier - a.psaAnalysis.upsideMultiplier;
      if (state.sortBy === 'profit') return b.psaAnalysis.psa10Profit.netProfitJpy - a.psaAnalysis.psa10Profit.netProfitJpy;
      return b.psaAnalysis.expectedRoiPercent - a.psaAnalysis.expectedRoiPercent;
    }
  });

  tbody.innerHTML = '';

  if (analyzed.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 40px; color: var(--text-muted);">条件に一致するカードが見つかりませんでした。</td></tr>`;
    return;
  }

  analyzed.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = 'card-row';
    tr.onclick = () => openCardDetailModal(item.card.id);

    const isUnder30k = (state.activeTab === 'arbitrage' ? item.purchaseCostJpy : item.psaAnalysis.totalGradedCostJpy) < 30000;
    const mercariUrl = item.card.mercariSoldUrl || `https://jp.mercari.com/search?keyword=${encodeURIComponent(item.card.name)}&status=sold_out`;
    const liq = item.liquidity;

    if (state.activeTab === 'arbitrage') {
      const rankBadgeClass = `badge-rank-${item.rank.toLowerCase()}`;
      const mProfit = item.mercariProfit;

      tr.innerHTML = `
        <td><span class="badge ${rankBadgeClass}">${item.rank}</span></td>
        <td>
          <div class="card-cell-info">
            <img src="${item.card.imageUrl}" alt="${item.card.name}" class="card-thumb" onerror="this.src='${item.card.fallbackImageUrl || 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=100&q=50'}'">
            <div>
              <div class="card-name-title">${item.card.name}</div>
              <div class="card-meta-sub">
                ${item.card.cardSet} • <span class="badge badge-grade">${item.card.grade}</span>
                ${isUnder30k ? '<span class="badge" style="background:rgba(56,189,248,0.15);color:#38bdf8;border:1px solid rgba(56,189,248,0.3);margin-left:4px;">🎯 3万円未満</span>' : ''}
              </div>
            </div>
          </div>
        </td>
        <td>
          <div style="display: flex; flex-direction: column; gap: 3px;">
            <div style="font-weight: 700; color: #38bdf8; font-size: 0.86rem; display: flex; align-items: center; gap: 4px;">
              🔥 7日成約: <span style="color:#ffffff;">${liq.sold7d}件</span>
              <span style="font-size: 0.72rem; color: var(--text-muted);">(出品:${liq.activeListings}件)</span>
            </div>
            <div style="font-size: 0.76rem; color: #34d399; font-weight: 600;">
              消化率: ${liq.sellThroughRate}% (約${liq.turnoverDays}日で売却)
            </div>
          </div>
        </td>
        <td>
          <div style="font-weight: 700; color: #ffffff;">${formatJpy(item.purchaseCostJpy)}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">カドショ/フリマ仕入</div>
        </td>
        <td>
          <div style="font-weight: 700; color: #ffffff;">${formatJpy(mProfit.salePriceJpy)}</div>
          <div style="font-size: 0.72rem; color: #ef4444; font-weight: 600;">メルカリ成約相場</div>
        </td>
        <td>
          <div style="font-weight: 700; color: #38bdf8;">${formatJpy(mProfit.netRevenueJpy)}</div>
          <div style="font-size: 0.70rem; color: var(--text-muted);">(手数料10%+送料引後)</div>
        </td>
        <td>
          <div class="profit-highlight">+${formatJpy(mProfit.netProfitJpy)}</div>
          <span class="roi-badge" style="margin-top: 2px; display: inline-block;">+${mProfit.roiPercent}%</span>
        </td>
        <td>
          <div style="display: flex; gap: 6px; align-items: center;">
            <a href="${mercariUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="padding: 5px 8px; font-size: 0.75rem; text-decoration: none; color: #ef4444; display: inline-flex; align-items: center; gap: 4px;" onclick="event.stopPropagation();" title="メルカリ売り切れ相場を見る">
              🛍️ メルカリ相場
            </a>
            <button class="btn btn-secondary" style="padding: 5px 10px; font-size: 0.78rem;" onclick="event.stopPropagation(); openCardDetailModal('${item.card.id}')">
              詳細 ➔
            </button>
          </div>
        </td>
      `;
    } else {
      const psa = item.psaAnalysis;
      const psaRankClass = `badge-psa-${psa.psaRank.toLowerCase().replace('psa-', '')}`;

      tr.innerHTML = `
        <td>
          <span class="badge ${psaRankClass}">${psa.psaRank}</span>
          <div style="font-size: 0.68rem; color: ${psa.isPsa9Safe ? '#34d399' : '#f59e0b'}; margin-top: 4px; font-weight: 600;">
            ${psa.isPsa9Safe ? '🛡️ PSA9黒字' : '⚠️ PSA10勝負'}
          </div>
        </td>
        <td>
          <div class="card-cell-info">
            <img src="${item.card.imageUrl}" alt="${item.card.name}" class="card-thumb" onerror="this.src='${item.card.fallbackImageUrl || 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=100&q=50'}'">
            <div>
              <div class="card-name-title">${item.card.name}</div>
              <div class="card-meta-sub">
                ${item.card.cardSet} • <span class="badge badge-grade">素体美品(NM)</span>
                ${isUnder30k ? '<span class="badge" style="background:rgba(56,189,248,0.15);color:#38bdf8;border:1px solid rgba(56,189,248,0.3);margin-left:4px;">🎯 3万円未満</span>' : ''}
              </div>
            </div>
          </div>
        </td>
        <td>
          <div style="font-weight: 700; color: ${isUnder30k ? '#38bdf8' : '#ffffff'}; font-size: 0.95rem;">
            ${formatJpy(psa.totalGradedCostJpy)}
          </div>
          <div style="font-size: 0.71rem; color: var(--text-muted); line-height: 1.3; margin-top: 2px;">
            素体${formatJpy(psa.rawPriceJpy)} ＋ PSA鑑定料${formatJpy(psa.gradingFeeJpy)}
          </div>
        </td>
        <td>
          <div style="font-weight: 700; color: #38bdf8; font-size: 0.85rem;">
            🔥 7日成約: ${liq.sold7d}件
          </div>
          <div style="font-size: 0.72rem; color: #34d399; font-weight: 600;">
            消化率: ${liq.sellThroughRate}% (約${liq.turnoverDays}日)
          </div>
        </td>
        <td>
          <div style="font-weight: 700; color: #34d399;">${formatJpy(psa.psa10SalePriceJpy)}</div>
          <div class="profit-highlight" style="font-size: 0.88rem;">+${formatJpy(psa.psa10Profit.netProfitJpy)}</div>
        </td>
        <td>
          <div style="font-weight: 700; color: #e2e8f0;">${formatJpy(psa.psa9SalePriceJpy)}</div>
          <div style="font-size: 0.82rem; font-weight: 700; color: ${psa.psa9Profit.netProfitJpy >= 0 ? '#34d399' : '#fb7185'};">
            ${psa.psa9Profit.netProfitJpy >= 0 ? '+' : ''}${formatJpy(psa.psa9Profit.netProfitJpy)}
          </div>
        </td>
        <td>
          <div style="font-weight: 800; color: #38bdf8; font-size: 0.9rem;">PSA10率: ${Math.round(psa.gemRate * 100)}%</div>
          <div class="roi-badge" style="background: rgba(168, 85, 247, 0.2); color: #c084fc; margin-top: 3px; display: inline-block;">
            期待ROI: +${psa.expectedRoiPercent}%
          </div>
        </td>
        <td>
          <div style="display: flex; gap: 6px; align-items: center;">
            <a href="${mercariUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="padding: 5px 8px; font-size: 0.75rem; text-decoration: none; color: #ef4444; display: inline-flex; align-items: center; gap: 4px;" onclick="event.stopPropagation();" title="メルカリで成約相場を見る">
              🛍️ メルカリ相場
            </a>
            <button class="btn btn-secondary" style="padding: 5px 10px; font-size: 0.78rem;" onclick="event.stopPropagation(); openCardDetailModal('${item.card.id}')">
              詳細 ➔
            </button>
          </div>
        </td>
      `;
    }

    tbody.appendChild(tr);
  });
}

/**
 * 優勝デッキ再現販売ビューのレンダリング
 */
function renderDeckView() {
  const container = document.getElementById('deckGrid');
  if (!container) return;

  let decks = [...state.decks];

  if (state.searchQuery) {
    decks = decks.filter(d => 
      d.name.toLowerCase().includes(state.searchQuery) ||
      d.tournamentAchievement.toLowerCase().includes(state.searchQuery) ||
      d.archetype.toLowerCase().includes(state.searchQuery)
    );
  }

  container.innerHTML = '';

  if (decks.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 40px; color: var(--text-muted); grid-column: 1 / -1;">該当する大会優勝デッキが見つかりませんでした。</div>`;
    return;
  }

  decks.forEach(deck => {
    const p = deck.pricing;
    const mProfit = calculateMercariProfit(p.recommendedSalePriceJpy, p.partsCostJpy);

    const cardEl = document.createElement('div');
    cardEl.className = 'deck-card';
    cardEl.innerHTML = `
      <div>
        <div class="deck-card-header">
          <div>
            <span class="badge deck-tier-badge" style="background: rgba(168, 85, 247, 0.2); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.4);">
              ${deck.tier}
            </span>
            <span class="badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; margin-left: 6px;">
              環境シェア ${deck.sharePercent}%
            </span>
            <h3 style="font-size: 1.15rem; font-weight: 800; color: #ffffff; margin-top: 8px;">
              ${deck.name}
            </h3>
            <div style="font-size: 0.78rem; color: #cbd5e1; margin-top: 2px;">
              🏆 ${deck.tournamentAchievement}
            </div>
          </div>
        </div>

        <div style="margin-top: 12px; font-size: 0.78rem; color: #fbbf24; font-weight: 700;">
          ${deck.bannerTag}
        </div>

        <!-- なぜ売れるか 要約ボックス -->
        <div class="deck-why-box" style="margin-top: 10px;">
          <div style="font-weight: 800; color: #38bdf8; margin-bottom: 4px; display: flex; align-items: center; gap: 4px;">
            💡 なぜ売れるのか（需要の核心）
          </div>
          <div>${deck.whyItSells.coreReason}</div>
          <div style="margin-top: 6px; font-size: 0.74rem; color: #34d399; font-weight: 600;">
            ⚡ 売却速度目安: ${deck.whyItSells.turnoverSpeed}
          </div>
        </div>
      </div>

      <div>
        <!-- 価格・利益ストリップ -->
        <div class="deck-price-strip">
          <div>
            <div style="font-size: 0.7rem; color: var(--text-secondary);">パーツ仕入れ原価</div>
            <div style="font-size: 1.05rem; font-weight: 800; color: #ffffff;">${formatJpy(p.partsCostJpy)}</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">60枚+スリーブ込</div>
          </div>
          <div>
            <div style="font-size: 0.7rem; color: var(--text-secondary);">メルカリ推奨売価</div>
            <div style="font-size: 1.05rem; font-weight: 800; color: #38bdf8;">${formatJpy(p.recommendedSalePriceJpy)}</div>
            <div style="font-size: 0.68rem; color: var(--text-muted);">(即売: ${formatJpy(p.quickSalePriceJpy)})</div>
          </div>
          <div>
            <div style="font-size: 0.7rem; color: var(--text-secondary);">実質純利益 (ROI)</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: var(--accent-emerald);">+${formatJpy(mProfit.netProfitJpy)}</div>
            <div style="font-size: 0.72rem; color: #34d399; font-weight: 700;">+${mProfit.roiPercent}%</div>
          </div>
        </div>

        <!-- アクションボタン -->
        <div class="deck-action-row" style="margin-top: 14px;">
          <button class="btn btn-secondary" style="flex: 1; padding: 8px 12px; font-size: 0.8rem;" onclick="openDeckDetailModal('${deck.id}')">
            📊 なぜ売れるか分析 ＆ レシピ ➔
          </button>
          <button class="btn btn-primary" style="flex: 1; padding: 8px 12px; font-size: 0.8rem; background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);" onclick="openDeckDetailModal('${deck.id}', true)">
            📸 出品用画像を生成 ➔
          </button>
        </div>
      </div>
    `;

    container.appendChild(cardEl);
  });
}

/**
 * デッキ詳細モーダル（なぜ売れるか徹底解説、パーツ原価明細、Canvas出品画像生成ジェネレーター）
 */
window.openDeckDetailModal = function(deckId, scrollToGenerator = false) {
  const deck = state.decks.find(d => d.id === deckId);
  if (!deck) return;

  const p = deck.pricing;
  const mProfit = calculateMercariProfit(p.recommendedSalePriceJpy, p.partsCostJpy);

  const modalContainer = document.getElementById('modalContainer');
  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal-card" style="max-width: 950px;" onclick="event.stopPropagation()">
        <!-- Header -->
        <div class="modal-header">
          <div>
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
              <span class="badge" style="background: rgba(168, 85, 247, 0.2); color: #c084fc; border: 1px solid #a855f7;">
                ${deck.tier}
              </span>
              <span class="badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
                環境シェア ${deck.sharePercent}%
              </span>
              <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">
                実質粗利率 +${mProfit.roiPercent}%
              </span>
            </div>
            <h2 style="font-size: 1.45rem; font-weight: 800; color: #ffffff; margin-top: 6px;">
              ${deck.name}
            </h2>
            <div style="font-size: 0.82rem; color: #cbd5e1; margin-top: 2px;">
              🏆 ${deck.tournamentAchievement} • 【戦術】${deck.archetype}
            </div>
          </div>
          <button class="modal-close-btn" onclick="closeModal()">✕</button>
        </div>

        <!-- 💡 なぜ売れるか？ 徹底需要分析パネル -->
        <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 14px; padding: 18px;">
          <h3 style="font-size: 1.05rem; font-weight: 800; color: #38bdf8; display: flex; align-items: center; gap: 8px;">
            💡 なぜ売れるのか？ 3大需要ドライバー ＆ ターゲット層分析
          </h3>
          <p style="font-size: 0.88rem; color: #e2e8f0; margin-top: 8px; line-height: 1.6;">
            <strong>【コアとなる理由】</strong>: ${deck.whyItSells.coreReason}
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-top: 14px;">
            ${deck.whyItSells.demandDrivers.map((driver, idx) => `
              <div style="background: rgba(30, 41, 59, 0.5); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
                <div style="font-size: 0.84rem; font-weight: 700; color: #ffffff; display: flex; align-items: center; gap: 6px;">
                  <span style="color:#38bdf8;">✔</span> ${driver.title}
                </div>
                <div style="font-size: 0.78rem; color: #cbd5e1; margin-top: 4px; line-height: 1.45;">
                  ${driver.detail}
                </div>
              </div>
            `).join('')}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-top: 14px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.08);">
            <div style="font-size: 0.82rem; color: #cbd5e1;">
              🎯 <strong>ターゲット購買層:</strong> <span style="color:#ffffff;">${deck.whyItSells.targetAudience}</span>
            </div>
            <div style="font-size: 0.82rem; color: #34d399; font-weight: 700;">
              ⚡ <strong>売却スピード:</strong> ${deck.whyItSells.turnoverSpeed}
            </div>
          </div>
        </div>

        <!-- 📸 メルカリ出品用 商品販売イメージ画像 自動生成セクション -->
        <div id="imageGeneratorSection" class="mockup-generator-box">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #c084fc; display: flex; align-items: center; gap: 8px;">
                📸 メルカリ出品用メイン画像 自動ジェネレーター
              </h3>
              <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 2px;">
                プロ出品者のようなアイキャッチ帯・二重スリーブ・即対戦可能バッジ付き画像を瞬時に生成！そのまま出品画像として保存できます。
              </div>
            </div>
            <button class="btn btn-primary" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); font-size: 0.82rem; padding: 8px 16px;" onclick="downloadDeckMockupImage('${deck.id}')">
              💾 出品用画像をダウンロード (PNG)
            </button>
          </div>

          <div class="mockup-canvas-wrapper">
            <canvas id="deckMockupCanvas" width="600" height="600" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.7);"></canvas>
          </div>
        </div>

        <!-- 60枚デッキレシピ ＆ 仕入れ原価内訳明細 -->
        <div>
          <h3 style="font-size: 1.0rem; font-weight: 800; color: #ffffff; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
            📋 60枚レシピ ＆ パーツ仕入れ原価内訳 (仕入れ総額: <span style="color:#38bdf8;">${formatJpy(p.partsCostJpy)}</span>)
          </h3>
          <div style="max-height: 240px; overflow-y: auto; border: 1px solid var(--border-glass); border-radius: 10px;">
            <table class="card-table" style="font-size: 0.82rem;">
              <thead>
                <tr>
                  <th>カード名</th>
                  <th>枚数</th>
                  <th>役割・戦術</th>
                  <th>仕入れ原価目安</th>
                </tr>
              </thead>
              <tbody>
                ${deck.deckList.map(item => `
                  <tr>
                    <td style="font-weight: 700; color: #ffffff;">${item.name}</td>
                    <td>${item.count}枚</td>
                    <td style="color: #cbd5e1;">${item.role}</td>
                    <td style="font-weight: 700; color: ${item.costJpy >= 500 ? '#f59e0b' : '#38bdf8'};">${formatJpy(item.costJpy)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- メルカリ出品用 タイトル・説明文 コピー枠 -->
        <div class="mercari-copy-box">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div style="font-size: 0.88rem; font-weight: 700; color: #ef4444;">
              🏷️ メルカリ出品用 タイトル・説明文テンプレート (コピペ用)
            </div>
            <button class="btn btn-secondary" style="padding: 4px 10px; font-size: 0.74rem;" onclick="copyListingTemplate('${deck.id}')">
              📋 一括コピーする
            </button>
          </div>
          <div style="font-size: 0.76rem; color: var(--text-muted); margin-bottom: 6px;">タイトル:</div>
          <input type="text" id="listingTitleInput" class="form-input" style="font-size: 0.8rem; padding: 6px 10px; margin-bottom: 8px;" value="${deck.listingTemplate.title}" readonly>
          <div style="font-size: 0.76rem; color: var(--text-muted); margin-bottom: 6px;">商品説明文:</div>
          <textarea id="listingDescInput" class="copy-text-area" rows="6" readonly>${deck.listingTemplate.description}</textarea>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px;">
          <button class="btn btn-primary" onclick="closeModal()">閉じる</button>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    drawDeckMockupCanvas(deck);
    if (scrollToGenerator) {
      const el = document.getElementById('imageGeneratorSection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, 60);
};

function drawDeckMockupCanvas(deck) {
  const canvas = document.getElementById('deckMockupCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  // 1. 背景グラデーション
  const bgGrad = ctx.createLinearGradient(0, 0, w, h);
  bgGrad.addColorStop(0, '#090d16');
  bgGrad.addColorStop(0.5, '#131d33');
  bgGrad.addColorStop(1, '#0b0f19');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // グリッド線
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // 2. 上部ヘッダーバナー帯 (メルカリのアイキャッチ)
  const topGrad = ctx.createLinearGradient(0, 0, w, 0);
  topGrad.addColorStop(0, '#ef4444');
  topGrad.addColorStop(0.5, '#dc2626');
  topGrad.addColorStop(1, '#991b1b');
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, w, 68);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px "Noto Sans JP", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`🏆【${deck.tournamentAchievement.split('/')[0].trim()}】優勝構築！`, w / 2, 44);

  // 3. サブタイトル帯
  ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
  ctx.fillRect(0, 68, w, 40);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 18px "Noto Sans JP", sans-serif';
  ctx.fillText('⚡ 60枚ガチ構築・新品二重スリーブ付き・即対戦可能 ⚡', w / 2, 94);

  // 4. メインカードプレビュー
  const cards = deck.featuredCards || [];
  const cardW = 160;
  const cardH = 224;
  const startX = 65;
  const cardY = 160;

  cards.forEach((c, i) => {
    const cx = startX + i * 165;
    
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = i === 0 ? '#38bdf8' : (i === 1 ? '#a855f7' : '#f59e0b');
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(cx, cardY, cardW, cardH, 10);
    ctx.fill();
    ctx.stroke();

    const cardGrad = ctx.createLinearGradient(cx, cardY, cx + cardW, cardY + cardH);
    cardGrad.addColorStop(0, 'rgba(56, 189, 248, 0.2)');
    cardGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.25)');
    cardGrad.addColorStop(1, 'rgba(16, 185, 129, 0.2)');
    ctx.fillStyle = cardGrad;
    ctx.beginPath();
    ctx.roundRect(cx + 8, cardY + 8, cardW - 16, cardH - 16, 6);
    ctx.fill();

    ctx.fillStyle = i === 0 ? '#38bdf8' : (i === 1 ? '#a855f7' : '#f59e0b');
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(c.badge, cx + 16, cardY + 30);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px "Noto Sans JP", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(c.name, cx + cardW / 2, cardY + 110);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px "Noto Sans JP", sans-serif';
    ctx.fillText(c.role, cx + cardW / 2, cardY + 138);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(cx + cardW - 24, cardY + 24, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  // 5. 下部 特徴バッジ
  const badgeY = 415;
  ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(40, badgeY, w - 80, 105, 12);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px "Noto Sans JP", sans-serif';
  ctx.fillText('✔ 最新レギュレーション（F・G・Hマーク）完全対応', 65, badgeY + 32);
  ctx.fillText('✔ 高額ACE SPEC採用済み・届いてすぐ大会出場OK', 65, badgeY + 62);
  ctx.fillText('✔ 新品スリーブ二重装着 ＆ 折れ・濡れ対策・即日匿名配送', 65, badgeY + 92);

  // 6. フッター価格帯 & 即購入OKバッジ
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, h - 60, w, 60);

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 22px "Noto Sans JP", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`メルカリ特価 ¥${deck.pricing.recommendedSalePriceJpy.toLocaleString()} (送料無料)`, 30, h - 22);

  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.roundRect(w - 180, h - 48, 150, 36, 6);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px "Noto Sans JP", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('即購入大歓迎！', w - 105, h - 24);
}

window.downloadDeckMockupImage = function(deckId) {
  const canvas = document.getElementById('deckMockupCanvas');
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = `mercari_deck_${deckId}_mockup.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};

window.copyListingTemplate = function(deckId) {
  const title = document.getElementById('listingTitleInput').value;
  const desc = document.getElementById('listingDescInput').value;
  const text = `${title}\n\n${desc}`;

  navigator.clipboard.writeText(text).then(() => {
    alert('✅ 出品用タイトルと説明文をコピーしました！メルカリにそのまま貼り付け可能です。');
  }).catch(() => {
    alert('コピーに失敗しました。手動で選択してコピーしてください。');
  });
};

window.openCardDetailModal = function(cardId) {
  const card = state.cards.find(c => c.id === cardId);
  if (!card) return;
  state.selectedCardId = cardId;

  const analysis = analyzeCardInvestment(card, state.settings);
  const psa = analysis.psaAnalysis;
  const modalContainer = document.getElementById('modalContainer');

  const mercariUrl = card.mercariSoldUrl || `https://jp.mercari.com/search?keyword=${encodeURIComponent(card.name)}&status=sold_out`;
  const snkrUrl = card.snkrdunkUrl || `https://snkrdunk.com/search?keywords=${encodeURIComponent(card.name)}`;
  const mProfit = analysis.mercariProfit;
  const liq = analysis.liquidity;

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal-card" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div style="display: flex; gap: 20px; align-items: center;">
            <img src="${card.imageUrl}" alt="${card.name}" onerror="this.src='${card.fallbackImageUrl || 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=200&q=80'}'" style="width: 80px; height: 112px; object-fit: contain; border-radius: 8px; border: 1px solid rgba(255,255,255,0.25); box-shadow: 0 8px 16px rgba(0,0,0,0.5); background:#0f172a;">
            <div>
              <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <span class="badge badge-rank-${analysis.rank.toLowerCase()}">${analysis.rank}判定</span>
                <span class="badge badge-psa-${psa.psaRank.toLowerCase().replace('psa-', '')}">${psa.psaRank}</span>
                <span style="font-size: 0.8rem; color: var(--accent-emerald); font-weight: 700;">${psa.psaRecommendation}</span>
              </div>
              <h2 style="font-size: 1.45rem; font-weight: 800; margin-top: 6px; color: #ffffff;">${card.name}</h2>
              <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 2px;">
                ${card.cardSet} (${card.cardNumber}) • ${card.releaseYear}年
              </div>

              <!-- メルカリ直行リンク -->
              <div style="display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap;">
                <a href="${mercariUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="background:#ef4444; padding: 6px 14px; font-size: 0.8rem; text-decoration: none;">
                  🛍️ メルカリで売り切れ相場を確認 ↗
                </a>
                <a href="${snkrUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.8rem; text-decoration: none; color: #38bdf8;">
                  📊 スニダン相場 ↗
                </a>
              </div>
            </div>
          </div>
          <button class="modal-close-btn" onclick="closeModal()">✕</button>
        </div>

        <!-- メルカリ手取り ＆ 純利益ブレイクダウン -->
        <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 14px; padding: 18px;">
          <div style="font-size: 0.95rem; font-weight: 800; color: #f87171; margin-bottom: 10px;">
            🛍️ メルカリ販売時の手取り額 ＆ 純利益明細
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px;">
            <div style="background: rgba(15, 23, 42, 0.6); padding: 12px; border-radius: 8px;">
              <div style="font-size: 0.72rem; color: var(--text-secondary);">① 想定販売価格</div>
              <div style="font-size: 1.2rem; font-weight: 800; color: #ffffff;">${formatJpy(mProfit.salePriceJpy)}</div>
              <div style="font-size: 0.70rem; color: var(--text-muted);">メルカリ直近成約相場</div>
            </div>

            <div style="background: rgba(15, 23, 42, 0.6); padding: 12px; border-radius: 8px;">
              <div style="font-size: 0.72rem; color: var(--text-secondary);">② 手数料 ＋ 送料 ＋ 梱包費</div>
              <div style="font-size: 1.2rem; font-weight: 800; color: #fb7185;">▲ ${formatJpy(mProfit.platformFeeJpy + mProfit.shippingJpy + mProfit.packingJpy)}</div>
              <div style="font-size: 0.70rem; color: var(--text-muted);">手数料10%(${formatJpy(mProfit.platformFeeJpy)}) + ネコポス¥210 + 資材¥50</div>
            </div>

            <div style="background: rgba(15, 23, 42, 0.6); padding: 12px; border-radius: 8px;">
              <div style="font-size: 0.72rem; color: var(--text-secondary);">③ メルカリ手取り額</div>
              <div style="font-size: 1.2rem; font-weight: 800; color: #38bdf8;">${formatJpy(mProfit.netRevenueJpy)}</div>
              <div style="font-size: 0.70rem; color: var(--text-muted);">口座に実際に入る金額</div>
            </div>

            <div style="background: rgba(15, 23, 42, 0.6); padding: 12px; border-radius: 8px; border: 1px solid rgba(16, 185, 129, 0.3);">
              <div style="font-size: 0.72rem; color: var(--text-secondary);">④ 想定純利益 (ROI)</div>
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--accent-emerald);">+${formatJpy(mProfit.netProfitJpy)}</div>
              <div style="font-size: 0.75rem; color: #34d399; font-weight: 700;">+${mProfit.roiPercent}% (原価: ${formatJpy(item.purchaseCostJpy)})</div>
            </div>
          </div>
        </div>

        <!-- PSA鑑定メルカリ販売マトリックス -->
        <div class="psa-matrix-card">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <h3 style="font-size: 0.95rem; color: #c084fc; font-weight: 800;">
              💎 国内素体 ➔ PSA鑑定メルカリ販売（PSA10/9化）シミュレーション
            </h3>
            <span style="font-size: 0.78rem; color: #e2e8f0; background: rgba(168, 85, 247, 0.2); padding: 3px 8px; border-radius: 6px; font-weight: 700;">
              アップサイド倍率: ${psa.upsideMultiplier}倍
            </span>
          </div>

          <div class="psa-matrix-grid">
            <div class="market-box">
              <div class="market-title">① 素体仕入＋PSA日本鑑定料</div>
              <div class="market-price">${formatJpy(psa.totalGradedCostJpy)}</div>
              <div class="market-net">素体: ${formatJpy(psa.rawPriceJpy)} ＋ PSA鑑定料: ${formatJpy(psa.gradingFeeJpy)}</div>
            </div>

            <div class="market-box best-choice">
              <span class="best-badge">PSA10 (取得率: ${Math.round(psa.gemRate * 100)}%)</span>
              <div class="market-title">② PSA10 メルカリ手取＆純利</div>
              <div class="market-price" style="color: var(--accent-emerald);">${formatJpy(psa.psa10SalePriceJpy)}</div>
              <div style="font-weight: 800; color: #34d399; margin-top: 4px;">
                純利: +${formatJpy(psa.psa10Profit.netProfitJpy)} (+${psa.psa10Profit.roiPercent}%)
              </div>
            </div>

            <div class="market-box">
              <div class="market-title">③ PSA9 メルカリ手取＆純利</div>
              <div class="market-price">${formatJpy(psa.psa9SalePriceJpy)}</div>
              <div style="font-weight: 800; color: ${psa.psa9Profit.netProfitJpy >= 0 ? '#34d399' : '#fb7185'}; margin-top: 4px;">
                純利: ${psa.psa9Profit.netProfitJpy >= 0 ? '+' : ''}${formatJpy(psa.psa9Profit.netProfitJpy)} (${psa.psa9Profit.roiPercent}%)
              </div>
            </div>

            <div class="market-box" style="border-color: rgba(56, 189, 248, 0.4);">
              <div class="market-title">④ 加重平均 期待値 (EV)</div>
              <div class="market-price" style="color: #38bdf8;">+${formatJpy(psa.expectedProfitJpy)}</div>
              <div style="font-weight: 800; color: #c084fc; margin-top: 4px;">
                期待ROI: +${psa.expectedRoiPercent}%
              </div>
            </div>
          </div>
        </div>

        <!-- メルカリ直近成約事例 -->
        <div class="sold-evidence-section">
          <h3 style="font-size: 0.95rem; color: var(--text-secondary); font-weight: 700;">
            🏷️ メルカリでの実際の成約実績（直近SOLDデータ）
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 10px;">
            ${card.mercariSoldExamples ? card.mercariSoldExamples.map(ex => `
              <div class="sold-item">
                <div>
                  <div class="sold-item-title">${ex.title}</div>
                  <div class="sold-item-cond">${ex.date} • ${ex.condition}</div>
                </div>
                <div class="sold-item-price">${formatJpy(ex.price)}</div>
              </div>
            `).join('') : '<div style="color: var(--text-muted); font-size: 0.8rem;">実績データなし</div>'}
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px;">
          <button class="btn btn-secondary" onclick="openSimulatorModal('${card.id}')">メルカリ試算シミュレーター ➔</button>
          <button class="btn btn-primary" onclick="closeModal()">閉じる</button>
        </div>
      </div>
    </div>
  `;
};

/**
 * メルカリ損益シミュレーター モーダル
 */
window.openSimulatorModal = function(cardId) {
  const card = state.cards.find(c => c.id === cardId) || state.cards[0];
  const modalContainer = document.getElementById('modalContainer');

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal-card" style="max-width: 760px;" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div>
            <h2 style="font-size: 1.35rem; font-weight: 800; color: #ffffff;">⚡ メルカリ販売 損益シミュレーター</h2>
            <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 2px;">
              販売価格と仕入れ原価を入力するだけで、メルカリ手数料10%・送料¥210・梱包費¥50を引いた実質手取りと純利を即座に試算
            </div>
          </div>
          <button class="modal-close-btn" onclick="closeModal()">✕</button>
        </div>

        <div class="simulator-box">
          <div class="form-group" style="margin-bottom: 14px;">
            <label>対象カード選択 (プリセット読込)</label>
            <select id="simCardSelect" class="form-input" onchange="onSimCardChange(this.value)">
              ${state.cards.map(c => `<option value="${c.id}" ${c.id === card.id ? 'selected' : ''}>${c.name} (${c.grade})</option>`).join('')}
            </select>
          </div>

          <div class="simulator-form-grid">
            <div class="form-group">
              <label>仕入れ原価 (円)</label>
              <input type="number" id="simCostPrice" class="form-input" value="${card.rawPriceJpy || 3500}" step="100" oninput="recalcSimulator()">
            </div>
            <div class="form-group">
              <label>メルカリ想定販売価格 (円)</label>
              <input type="number" id="simSalePrice" class="form-input" value="${card.mercariAvgPriceJpy || 18000}" step="500" oninput="recalcSimulator()">
            </div>
            <div class="form-group">
              <label>メルカリ販売手数料 (%)</label>
              <input type="number" class="form-input" value="10" readonly style="opacity: 0.7;">
            </div>
            <div class="form-group">
              <label>送料 (らくらくメルカリ便 ネコポス)</label>
              <input type="number" class="form-input" value="210" readonly style="opacity: 0.7;">
            </div>
          </div>

          <div class="sim-result-card" id="simResultArea"></div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px;">
          <button class="btn btn-primary" onclick="closeModal()">閉じる</button>
        </div>
      </div>
    </div>
  `;

  recalcSimulator();
};

window.onSimCardChange = function(cardId) {
  const card = state.cards.find(c => c.id === cardId);
  if (!card) return;
  document.getElementById('simCostPrice').value = card.rawPriceJpy || 3500;
  document.getElementById('simSalePrice').value = card.mercariAvgPriceJpy || 18000;
  recalcSimulator();
};

window.recalcSimulator = function() {
  const cost = parseFloat(document.getElementById('simCostPrice').value) || 0;
  const sale = parseFloat(document.getElementById('simSalePrice').value) || 0;
  const resultArea = document.getElementById('simResultArea');
  if (!resultArea) return;

  const profit = calculateMercariProfit(sale, cost);
  const isProfit = profit.netProfitJpy >= 0;

  resultArea.innerHTML = `
    <div style="text-align: center;">
      <div style="font-size: 0.78rem; color: var(--text-secondary);">仕入れ原価</div>
      <div style="font-size: 1.25rem; font-weight: 800; color: #ffffff;">${formatJpy(profit.purchaseCostJpy)}</div>
      <div style="font-size: 0.7rem; color: var(--text-muted);">カドショ/フリマ等</div>
    </div>
    <div style="text-align: center;">
      <div style="font-size: 0.78rem; color: var(--text-secondary);">メルカリ実質手取り額</div>
      <div style="font-size: 1.25rem; font-weight: 800; color: #38bdf8;">${formatJpy(profit.netRevenueJpy)}</div>
      <div style="font-size: 0.7rem; color: var(--text-muted);">手数料(${formatJpy(profit.platformFeeJpy)}) + 送料(¥210) 控除後</div>
    </div>
    <div style="text-align: center;">
      <div style="font-size: 0.78rem; color: var(--text-secondary);">想定純利益 (ROI)</div>
      <div style="font-size: 1.45rem; font-weight: 800; color: ${isProfit ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
        ${isProfit ? '+' : ''}${formatJpy(profit.netProfitJpy)}
      </div>
      <div style="font-size: 0.85rem; font-weight: 700; color: ${isProfit ? '#34d399' : '#fb7185'};">
        ${isProfit ? '+' : ''}${profit.roiPercent}%
      </div>
    </div>
    <div style="text-align: center;">
      <div style="font-size: 0.78rem; color: var(--text-secondary);">損益分岐点 (BEP)</div>
      <div style="font-size: 1.15rem; font-weight: 700; color: #f59e0b;">${formatJpy(profit.breakEvenPriceJpy)}</div>
      <div style="font-size: 0.7rem; color: var(--text-muted);">これ以上で売れば黒字</div>
    </div>
  `;
};

window.openAddCardModal = function() {
  const modalContainer = document.getElementById('modalContainer');
  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal-card" style="max-width: 680px;" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div>
            <h2 style="font-size: 1.3rem; font-weight: 800; color: #ffffff;">➕ 新規リサーチカードの追加</h2>
            <div style="font-size: 0.8rem; color: var(--text-secondary);">国内で仕入れてメルカリで販売したいカードを登録</div>
          </div>
          <button class="modal-close-btn" onclick="closeModal()">✕</button>
        </div>

        <form id="addCardForm" onsubmit="handleCreateCard(event)" style="display: flex; flex-direction: column; gap: 16px;">
          <div class="simulator-form-grid">
            <div class="form-group" style="grid-column: 1 / -1;">
              <label>カード名 *</label>
              <input type="text" id="newCardName" class="form-input" placeholder="例: ミモザ (SAR)" required>
            </div>
            <div class="form-group">
              <label>収録パック / 型番</label>
              <input type="text" id="newCardSet" class="form-input" placeholder="例: バイオレットex 105/078">
            </div>
            <div class="form-group">
              <label>グレード / 状態</label>
              <select id="newCardGrade" class="form-input">
                <option value="Raw (未鑑定/NM)">Raw (未鑑定 / 美品NM)</option>
                <option value="PSA10">PSA10 (鑑定品)</option>
              </select>
            </div>
            <div class="form-group">
              <label>カドショ仕入れ想定価格 (円) *</label>
              <input type="number" id="newRawPrice" class="form-input" placeholder="例: 15000" required>
            </div>
            <div class="form-group">
              <label>メルカリ想定販売価格 (円) *</label>
              <input type="number" id="newMercariPrice" class="form-input" placeholder="例: 24000" required>
            </div>
            <div class="form-group">
              <label>PSA10 メルカリ想定価格 (円)</label>
              <input type="number" id="newPsa10Price" class="form-input" placeholder="例: 48000">
            </div>
            <div class="form-group">
              <label>PSA9 メルカリ想定価格 (円)</label>
              <input type="number" id="newPsa9Price" class="form-input" placeholder="例: 22000">
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
              <label>画像URL (省略時はサンプル画像)</label>
              <input type="text" id="newImageUrl" class="form-input" placeholder="https://images.pokemontcg.io/...">
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 10px;">
            <button type="button" class="btn btn-secondary" onclick="closeModal()">キャンセル</button>
            <button type="submit" class="btn btn-primary">リストに追加して分析 ➔</button>
          </div>
        </form>
      </div>
    </div>
  `;
};

window.handleCreateCard = function(e) {
  e.preventDefault();
  const name = document.getElementById('newCardName').value.trim();
  const cardSet = document.getElementById('newCardSet').value.trim() || 'ポケモンカードゲーム';
  const grade = document.getElementById('newCardGrade').value;
  const rawPriceJpy = parseFloat(document.getElementById('newRawPrice').value) || 0;
  const mercariPrice = parseFloat(document.getElementById('newMercariPrice').value) || 0;
  const psa10Price = parseFloat(document.getElementById('newPsa10Price').value) || (mercariPrice * 2.2);
  const psa9Price = parseFloat(document.getElementById('newPsa9Price').value) || (mercariPrice * 0.95);
  const imageUrl = document.getElementById('newImageUrl').value.trim() || 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=500&auto=format&fit=crop&q=60';

  const newCard = {
    id: 'card-custom-' + Date.now(),
    name,
    cardSet,
    cardNumber: 'CUSTOM',
    releaseYear: 2024,
    grade,
    imageUrl,
    fallbackImageUrl: imageUrl,
    mercariSoldUrl: `https://jp.mercari.com/search?keyword=${encodeURIComponent(name)}&status=sold_out`,
    rawPriceJpy,
    rawPriceUsd: Math.round(rawPriceJpy / 150),
    psa9PriceJpy: psa9Price,
    psa10PriceJpy: psa10Price,
    psa10GemRate: 0.75,
    gradingFeeJpy: 3500,
    mercariAvgPriceJpy: mercariPrice,
    snkrdunkPriceJpy: mercariPrice,
    domesticSold7d: 15,
    domesticActiveListings: 18,
    sellThroughRate7d: 83.3,
    estimatedTurnoverDays: 3.0,
    mercariSoldExamples: [
      { date: '2026-09-28', price: mercariPrice, condition: '美品・即購入OK', title: `${name} ${grade}` }
    ],
    tags: [grade, 'ユーザー追加', 'メルカリ販売'],
    notes: '国内カドショ仕入れからメルカリ販売用に登録されたカードです。'
  };

  state.cards.unshift(newCard);
  const currentCustom = JSON.parse(localStorage.getItem('poke_custom_cards')) || [];
  currentCustom.unshift(newCard);
  localStorage.setItem('poke_custom_cards', JSON.stringify(currentCustom));
  closeModal();
  renderApp();
};

window.closeModal = function(e) {
  if (e && e.target && !e.target.classList.contains('modal-overlay') && !e.target.classList.contains('modal-close-btn')) {
    return;
  }
  const modalContainer = document.getElementById('modalContainer');
  if (modalContainer) modalContainer.innerHTML = '';
  if (state.chartInstance) {
    state.chartInstance.destroy();
    state.chartInstance = null;
  }
};

function exportToCsv() {
  const analyzed = state.cards.map(c => analyzeCardInvestment(c, state.settings));
  let csv = 'カード名,セット,グレード,仕入れ原価(円),メルカリ想定売価(円),メルカリ手取り額(円),純利益(円),粗利率(%),直近7日成約数,週間消化率(%),PSA10売価(円),PSA10純利益(円)\n';
  
  analyzed.forEach(item => {
    const m = item.mercariProfit;
    const psa = item.psaAnalysis;
    const liq = item.liquidity;
    csv += `"${item.card.name}","${item.card.cardSet}","${item.card.grade}",${item.purchaseCostJpy},${m.salePriceJpy},${m.netRevenueJpy},${m.netProfitJpy},"${m.roiPercent}%",${liq.sold7d},"${liq.sellThroughRate}%",${psa.psa10SalePriceJpy},${psa.psa10Profit.netProfitJpy}\n`;
  });

  const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mercari_pokemon_investment_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
