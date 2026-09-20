import { INITIAL_CARDS, DEFAULT_SETTINGS } from './data.js';
import { calculateImportCost, calculateDomesticSaleProfit, analyzeCardInvestment, analyzePsaGradingStrategy } from './engine.js';

let state = {
  cards: JSON.parse(localStorage.getItem('poke_cards')) || INITIAL_CARDS,
  settings: JSON.parse(localStorage.getItem('poke_settings')) || DEFAULT_SETTINGS,
  activeTab: 'arbitrage', // 'arbitrage' | 'psa_grading'
  filterGrade: 'all',
  sortBy: 'score',
  searchQuery: '',
  selectedCardId: null,
  activeModal: null,
  chartInstance: null
};

const formatJpy = (num) => '¥' + Math.round(num).toLocaleString('ja-JP');
const formatUsd = (num) => '$' + Number(num).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  setupEventListeners();
  renderApp();
}

function setupEventListeners() {
  const rateInput = document.getElementById('usdJpyRateInput');
  if (rateInput) {
    rateInput.value = state.settings.usdJpyRate;
    rateInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val > 0) {
        state.settings.usdJpyRate = val;
        localStorage.setItem('poke_settings', JSON.stringify(state.settings));
        renderApp();
      }
    });
  }

  const tabArbitrage = document.getElementById('tabArbitrage');
  const tabPsaGrading = document.getElementById('tabPsaGrading');
  if (tabArbitrage && tabPsaGrading) {
    tabArbitrage.addEventListener('click', () => {
      state.activeTab = 'arbitrage';
      tabArbitrage.classList.add('active');
      tabPsaGrading.classList.remove('active');
      renderApp();
    });
    tabPsaGrading.addEventListener('click', () => {
      state.activeTab = 'psa_grading';
      tabPsaGrading.classList.add('active');
      tabArbitrage.classList.remove('active');
      renderApp();
    });
  }

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase();
      renderTable();
    });
  }

  const gradeFilter = document.getElementById('gradeFilter');
  if (gradeFilter) {
    gradeFilter.addEventListener('change', (e) => {
      state.filterGrade = e.target.value;
      renderTable();
    });
  }

  const sortFilter = document.getElementById('sortFilter');
  if (sortFilter) {
    sortFilter.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderTable();
    });
  }

  const simBtn = document.getElementById('openSimulatorBtn');
  if (simBtn) {
    simBtn.addEventListener('click', () => {
      openSimulatorModal(state.cards[0].id);
    });
  }

  const addBtn = document.getElementById('openAddCardBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      openAddCardModal();
    });
  }

  const exportBtn = document.getElementById('exportCsvBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportToCsv);
  }
}

function renderApp() {
  renderKPIs();
  renderTableHeader();
  renderTable();
}

function renderKPIs() {
  const analyzed = state.cards.map(c => analyzeCardInvestment(c, state.settings));
  const totalCount = analyzed.length;

  if (state.activeTab === 'arbitrage') {
    const avgRoi = totalCount > 0 ? (analyzed.reduce((acc, c) => acc + c.bestChannel.data.roiPercent, 0) / totalCount).toFixed(1) : 0;
    const maxProfit = totalCount > 0 ? Math.max(...analyzed.map(c => c.bestChannel.data.netProfitJpy)) : 0;
    const highRankCount = analyzed.filter(c => c.rank === 'SS' || c.rank === 'S').length;

    document.getElementById('kpiLabel2').textContent = '通常仕入れ 平均ROI';
    document.getElementById('kpiSub2').textContent = 'eBay仕入れ比 (手数料控除後)';
    document.getElementById('kpiAvgRoi').textContent = '+' + avgRoi + '%';

    document.getElementById('kpiLabel3').textContent = '最高純利 (通常仕入れ)';
    document.getElementById('kpiMaxProfit').textContent = formatJpy(maxProfit);

    document.getElementById('kpiLabel4').textContent = '高推奨 (SS/S) 銘柄数';
    document.getElementById('kpiSub4').textContent = '需給スコア80点以上';
    document.getElementById('kpiHighRankCount').textContent = highRankCount + ' 銘柄';
  } else {
    const avgExpectedRoi = totalCount > 0 ? (analyzed.reduce((acc, c) => acc + c.psaAnalysis.expectedRoiPercent, 0) / totalCount).toFixed(1) : 0;
    const maxPsa10Profit = totalCount > 0 ? Math.max(...analyzed.map(c => c.psaAnalysis.psa10Profit.netProfitJpy)) : 0;
    const safeCount = analyzed.filter(c => c.psaAnalysis.isPsa9Safe).length;

    document.getElementById('kpiLabel2').textContent = 'PSA鑑定 加重平均期待ROI';
    document.getElementById('kpiSub2').textContent = 'PSA10率×PSA9率 加重平均';
    document.getElementById('kpiAvgRoi').textContent = '+' + avgExpectedRoi + '%';

    document.getElementById('kpiLabel3').textContent = 'PSA10化 最高純利益';
    document.getElementById('kpiMaxProfit').textContent = formatJpy(maxPsa10Profit);

    document.getElementById('kpiLabel4').textContent = 'PSA9でも黒字の安全銘柄';
    document.getElementById('kpiSub4').textContent = '元本割れリスク極小';
    document.getElementById('kpiHighRankCount').textContent = `${safeCount} / ${totalCount} 銘柄`;
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
        <th>カード情報 / グレード</th>
        <th>需給スコア / トレンド</th>
        <th>eBay仕入れ ($ / 円総額)</th>
        <th>国内想定売価 / 推奨先</th>
        <th>想定純利益 (手取り)</th>
        <th>粗利率 (ROI)</th>
        <th>操作</th>
      </tr>
    `;
  } else {
    thead.innerHTML = `
      <tr>
        <th>鑑定推奨</th>
        <th>カード情報 / 素体</th>
        <th>素体仕入れ＋鑑定総原価</th>
        <th>PSA10化 売価 / 純利</th>
        <th>PSA9化 売価 / 純利</th>
        <th>PSA10期待率</th>
        <th>期待値ROI (アップサイド)</th>
        <th>操作</th>
      </tr>
    `;
  }
}

function renderTable() {
  const tbody = document.getElementById('cardTableBody');
  if (!tbody) return;

  let analyzed = state.cards.map(c => analyzeCardInvestment(c, state.settings));

  if (state.filterGrade !== 'all') {
    analyzed = analyzed.filter(item => {
      if (state.filterGrade === 'PSA10') return item.card.grade === 'PSA10';
      if (state.filterGrade === 'Raw') return item.card.grade.includes('Raw');
      return true;
    });
  }

  if (state.searchQuery) {
    analyzed = analyzed.filter(item => 
      item.card.name.toLowerCase().includes(state.searchQuery) ||
      item.card.cardSet.toLowerCase().includes(state.searchQuery) ||
      (item.card.tags && item.card.tags.some(t => t.toLowerCase().includes(state.searchQuery)))
    );
  }

  analyzed.sort((a, b) => {
    if (state.activeTab === 'arbitrage') {
      if (state.sortBy === 'profit') return b.bestChannel.data.netProfitJpy - a.bestChannel.data.netProfitJpy;
      if (state.sortBy === 'roi') return b.bestChannel.data.roiPercent - a.bestChannel.data.roiPercent;
      if (state.sortBy === 'trend') return b.card.priceTrend30d - a.card.priceTrend30d;
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

    if (state.activeTab === 'arbitrage') {
      const rankBadgeClass = `badge-rank-${item.rank.toLowerCase()}`;
      const bestCh = item.bestChannel.data;

      tr.innerHTML = `
        <td><span class="badge ${rankBadgeClass}">${item.rank}</span></td>
        <td>
          <div class="card-cell-info">
            <img src="${item.card.imageUrl}" alt="${item.card.name}" class="card-thumb" onerror="this.src='https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=100&q=50'">
            <div>
              <div class="card-name-title">${item.card.name}</div>
              <div class="card-meta-sub">${item.card.cardSet} • <span class="badge badge-grade">${item.card.grade}</span></div>
            </div>
          </div>
        </td>
        <td>
          <div class="score-bar-container">
            <span style="font-weight: 700; color: #38bdf8;">${item.overallScore}点</span>
            <div class="score-bar-bg">
              <div class="score-bar-fill" style="width: ${item.overallScore}%; background: ${item.overallScore > 80 ? 'var(--accent-emerald)' : 'var(--accent-blue)'};"></div>
            </div>
          </div>
          <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">30日: ${item.card.priceTrend30d >= 0 ? '+' : ''}${item.card.priceTrend30d}%</div>
        </td>
        <td>
          <div style="font-weight: 700; color: #ffffff;">${formatUsd(item.card.ebayPriceUsd)}</div>
          <div style="font-size: 0.74rem; color: var(--text-muted);">総原価: ${formatJpy(item.importCost.totalCostJpy)}</div>
        </td>
        <td>
          <div style="font-weight: 700; color: #ffffff;">${formatJpy(bestCh.salePriceJpy)}</div>
          <div style="font-size: 0.74rem; color: var(--accent-blue); font-weight: 600;">推奨: ${bestCh.platformName}</div>
        </td>
        <td>
          <div class="profit-highlight">+${formatJpy(bestCh.netProfitJpy)}</div>
          <div style="font-size: 0.74rem; color: var(--text-muted);">手取: ${formatJpy(bestCh.netRevenueJpy)}</div>
        </td>
        <td>
          <span class="roi-badge">+${bestCh.roiPercent}%</span>
        </td>
        <td>
          <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.78rem;" onclick="event.stopPropagation(); openCardDetailModal('${item.card.id}')">
            需給分析 ➔
          </button>
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
            <img src="${item.card.imageUrl}" alt="${item.card.name}" class="card-thumb" onerror="this.src='https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=100&q=50'">
            <div>
              <div class="card-name-title">${item.card.name}</div>
              <div class="card-meta-sub">${item.card.cardSet} • <span class="badge badge-grade">素体美品(NM)</span></div>
            </div>
          </div>
        </td>
        <td>
          <div style="font-weight: 700; color: #ffffff;">${formatJpy(psa.totalGradedCostJpy)}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">素体$${psa.rawPriceUsd} + 鑑定料${formatJpy(psa.gradingFeeJpy)}</div>
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
          <div style="font-weight: 800; color: #38bdf8; font-size: 0.95rem;">${Math.round(psa.gemRate * 100)}%</div>
          <div style="font-size: 0.7rem; color: var(--text-muted);">PSA10取得確率</div>
        </td>
        <td>
          <div class="roi-badge" style="background: rgba(168, 85, 247, 0.2); color: #c084fc;">
            +${psa.expectedRoiPercent}%
          </div>
          <div style="font-size: 0.72rem; color: #f472b6; font-weight: 700; margin-top: 2px;">
            ${psa.upsideMultiplier}x アップサイド
          </div>
        </td>
        <td>
          <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.78rem;" onclick="event.stopPropagation(); openCardDetailModal('${item.card.id}')">
            鑑定詳細 ➔
          </button>
        </td>
      `;
    }

    tbody.appendChild(tr);
  });
}

window.openCardDetailModal = function(cardId) {
  const card = state.cards.find(c => c.id === cardId);
  if (!card) return;
  state.selectedCardId = cardId;

  const analysis = analyzeCardInvestment(card, state.settings);
  const psa = analysis.psaAnalysis;
  const modalContainer = document.getElementById('modalContainer');

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal-card" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div style="display: flex; gap: 16px; align-items: center;">
            <img src="${card.imageUrl}" alt="${card.name}" style="width: 60px; height: 80px; object-fit: cover; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2);">
            <div>
              <div style="display: flex; gap: 8px; align-items: center;">
                <span class="badge badge-rank-${analysis.rank.toLowerCase()}">${analysis.rank}判定</span>
                <span class="badge badge-psa-${psa.psaRank.toLowerCase().replace('psa-', '')}">${psa.psaRank}</span>
                <span style="font-size: 0.8rem; color: var(--accent-emerald); font-weight: 700;">${psa.psaRecommendation}</span>
              </div>
              <h2 style="font-size: 1.35rem; font-weight: 800; margin-top: 4px; color: #ffffff;">${card.name}</h2>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${card.cardSet} (${card.cardNumber}) • ${card.releaseYear}年</div>
            </div>
          </div>
          <button class="modal-close-btn" onclick="closeModal()">✕</button>
        </div>

        <div class="psa-matrix-card">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <h3 style="font-size: 0.95rem; color: #c084fc; font-weight: 800; display: flex; align-items: center; gap: 6px;">
              💎 PSA鑑定投資（素体仕入れ ➔ PSA10/9 化）シミュレーション
            </h3>
            <span style="font-size: 0.78rem; color: #e2e8f0; background: rgba(168, 85, 247, 0.2); padding: 3px 8px; border-radius: 6px; font-weight: 700;">
              アップサイド倍率: ${psa.upsideMultiplier}倍
            </span>
          </div>

          <div class="psa-matrix-grid">
            <div class="market-box">
              <div class="market-title">① 素体仕入れ＋鑑定総原価</div>
              <div class="market-price">${formatJpy(psa.totalGradedCostJpy)}</div>
              <div class="market-net">素体: $${psa.rawPriceUsd} (${formatJpy(psa.rawImportCost.totalCostJpy)}) + 鑑定料: ${formatJpy(psa.gradingFeeJpy)}</div>
            </div>

            <div class="market-box best-choice">
              <span class="best-badge">PSA10 (取得率: ${Math.round(psa.gemRate * 100)}%)</span>
              <div class="market-title">② PSA10 獲得時の手取り＆純利</div>
              <div class="market-price" style="color: var(--accent-emerald);">${formatJpy(psa.psa10SalePriceJpy)}</div>
              <div style="font-weight: 800; color: #34d399; margin-top: 4px;">
                純利: +${formatJpy(psa.psa10Profit.netProfitJpy)} (+${psa.psa10Profit.roiPercent}%)
              </div>
            </div>

            <div class="market-box">
              <div class="market-title">③ PSA9 獲得時の手取り＆純利</div>
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

        <div>
          <h3 style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 12px; font-weight: 700;">
            📊 国内通常販売チャネル別・手取り＆純利益比較 (PSA10仕入れ総額: <span style="color:#ffffff;">${formatJpy(analysis.importCost.totalCostJpy)}</span>)
          </h3>
          <div class="market-grid">
            <div class="market-box ${analysis.bestChannel.key === 'mercari' ? 'best-choice' : ''}">
              ${analysis.bestChannel.key === 'mercari' ? '<span class="best-badge">最高益</span>' : ''}
              <div class="market-title">メルカリ (手数料10%)</div>
              <div class="market-price">${formatJpy(card.mercariAvgPriceJpy)}</div>
              <div class="market-net">手取: ${formatJpy(analysis.channels.mercari.netRevenueJpy)}</div>
              <div style="font-weight: 800; color: var(--accent-emerald); margin-top: 6px;">
                純利益: +${formatJpy(analysis.channels.mercari.netProfitJpy)} (${analysis.channels.mercari.roiPercent}%)
              </div>
            </div>

            <div class="market-box ${analysis.bestChannel.key === 'yahoo' ? 'best-choice' : ''}">
              ${analysis.bestChannel.key === 'yahoo' ? '<span class="best-badge">最高益</span>' : ''}
              <div class="market-title">ヤフーフリマ (手数料5%)</div>
              <div class="market-price">${formatJpy(card.yahooAvgPriceJpy)}</div>
              <div class="market-net">手取: ${formatJpy(analysis.channels.yahoo.netRevenueJpy)}</div>
              <div style="font-weight: 800; color: var(--accent-emerald); margin-top: 6px;">
                純利益: +${formatJpy(analysis.channels.yahoo.netProfitJpy)} (${analysis.channels.yahoo.roiPercent}%)
              </div>
            </div>

            <div class="market-box ${analysis.bestChannel.key === 'snkrdunk' ? 'best-choice' : ''}">
              ${analysis.bestChannel.key === 'snkrdunk' ? '<span class="best-badge">最高益</span>' : ''}
              <div class="market-title">スニーカーダンク (相場)</div>
              <div class="market-price">${formatJpy(card.snkrdunkPriceJpy)}</div>
              <div class="market-net">手取: ${formatJpy(analysis.channels.snkrdunk.netRevenueJpy)}</div>
              <div style="font-weight: 800; color: var(--accent-emerald); margin-top: 6px;">
                純利益: +${formatJpy(analysis.channels.snkrdunk.netProfitJpy)} (${analysis.channels.snkrdunk.roiPercent}%)
              </div>
            </div>

            <div class="market-box ${analysis.bestChannel.key === 'torecaJapan' ? 'best-choice' : ''}">
              ${analysis.bestChannel.key === 'torecaJapan' ? '<span class="best-badge">最高益</span>' : ''}
              <div class="market-title">トレカジャパン買取 (即現金化)</div>
              <div class="market-price">${formatJpy(analysis.channels.torecaJapan.salePriceJpy)}</div>
              <div class="market-net">手数料・送料: 0円</div>
              <div style="font-weight: 800; color: var(--accent-emerald); margin-top: 6px;">
                純利益: +${formatJpy(analysis.channels.torecaJapan.netProfitJpy)} (${analysis.channels.torecaJapan.roiPercent}%)
              </div>
            </div>
          </div>
        </div>

        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-glass); border-radius: 12px; padding: 20px;">
          <h3 style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 12px; font-weight: 700;">
            📈 スニーカーダンク成約推移 vs トレカジャパン価格履歴
          </h3>
          <div style="position: relative; height: 260px; width: 100%;">
            <canvas id="marketTrendChart"></canvas>
          </div>
        </div>

        <div class="sold-evidence-section">
          <h3 style="font-size: 0.95rem; color: var(--text-secondary); font-weight: 700;">
            🏷️ 国内マーケットプレイスでの実際の成約実績例 (PSA10 / PSA9 / 素体)
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;">
            <div>
              <div style="font-size: 0.82rem; font-weight: 700; color: #ef4444; margin-bottom: 6px;">メルカリ 成約履歴</div>
              ${card.mercariSoldExamples ? card.mercariSoldExamples.map(ex => `
                <div class="sold-item" style="margin-bottom: 8px;">
                  <div>
                    <div class="sold-item-title">${ex.title}</div>
                    <div class="sold-item-cond">${ex.date} • ${ex.condition}</div>
                  </div>
                  <div class="sold-item-price">${formatJpy(ex.price)}</div>
                </div>
              `).join('') : '<div style="color: var(--text-muted); font-size: 0.8rem;">実績データなし</div>'}
            </div>

            <div>
              <div style="font-size: 0.82rem; font-weight: 700; color: #f59e0b; margin-bottom: 6px;">ヤフーフリマ 成約履歴</div>
              ${card.yahooSoldExamples ? card.yahooSoldExamples.map(ex => `
                <div class="sold-item" style="margin-bottom: 8px;">
                  <div>
                    <div class="sold-item-title">${ex.title}</div>
                    <div class="sold-item-cond">${ex.date} • ${ex.condition}</div>
                  </div>
                  <div class="sold-item-price">${formatJpy(ex.price)}</div>
                </div>
              `).join('') : '<div style="color: var(--text-muted); font-size: 0.8rem;">実績データなし</div>'}
            </div>
          </div>
        </div>

        <div style="background: rgba(30, 41, 59, 0.4); border-radius: 10px; padding: 14px; font-size: 0.85rem; border: 1px solid var(--border-glass);">
          <div style="font-weight: 700; color: var(--accent-blue); margin-bottom: 4px;">💡 投資判断・仕入れ戦略メモ</div>
          <p style="color: #cbd5e1; line-height: 1.5;">${card.notes || '需給良好。海外からの仕入れ価格差を活かしたアービトラージが有効です。'}</p>
          <div style="margin-top: 8px; font-size: 0.78rem; color: var(--text-muted);">
            eBayセラー評価: <span style="color:#ffffff;">${card.ebaySellerRating || '高評価'}</span> | 発送元: <span style="color:#ffffff;">${card.ebayItemLocation || '海外'}</span> | 国際送料: <span style="color:#ffffff;">${formatUsd(card.ebayShippingUsd)}</span>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px;">
          <button class="btn btn-secondary" onclick="openSimulatorModal('${card.id}')">このカードでシミュレーション ➔</button>
          <button class="btn btn-primary" onclick="closeModal()">閉じる</button>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    renderDetailChart(card);
  }, 50);
}

function renderDetailChart(card) {
  const ctx = document.getElementById('marketTrendChart');
  if (!ctx) return;

  if (state.chartInstance) {
    state.chartInstance.destroy();
  }

  const labels = card.snkrdunkHistory ? card.snkrdunkHistory.map(h => h.date.slice(5)) : ['8/20', '8/27', '9/03', '9/10', '9/18'];
  const snkrData = card.snkrdunkHistory ? card.snkrdunkHistory.map(h => h.price) : [];
  const torecaData = card.torecaJapanHistory ? card.torecaJapanHistory.map(h => h.sellPrice) : [];

  state.chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'スニーカーダンク 成約相場 (円)',
          data: snkrData,
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#38bdf8',
          pointRadius: 4
        },
        {
          label: 'トレカジャパン 店頭販売価格 (円)',
          data: torecaData,
          borderColor: '#10b981',
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.35,
          pointBackgroundColor: '#10b981',
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          labels: {
            color: '#94a3b8',
            font: { family: 'Plus Jakarta Sans', size: 12 }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          titleColor: '#ffffff',
          bodyColor: '#38bdf8',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ¥${context.parsed.y.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#64748b' }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: {
            color: '#64748b',
            callback: function(value) {
              return '¥' + (value / 10000) + '万';
            }
          }
        }
      }
    }
  });
}

window.openSimulatorModal = function(cardId) {
  const card = state.cards.find(c => c.id === cardId) || state.cards[0];
  const modalContainer = document.getElementById('modalContainer');

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal-card" style="max-width: 840px;" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div>
            <h2 style="font-size: 1.35rem; font-weight: 800; color: #ffffff;">⚡ リアルタイム投資・PSA鑑定損益シミュレーター</h2>
            <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 2px;">仕入れ形態（完成品 or 素体鑑定）や為替・販売先を動かして手取りと利益を即座に試算</div>
          </div>
          <button class="modal-close-btn" onclick="closeModal()">✕</button>
        </div>

        <div class="simulator-box">
          <div style="display: flex; gap: 16px; margin-bottom: 16px;">
            <label style="display: flex; align-items: center; gap: 6px; font-size: 0.88rem; font-weight: 700; cursor: pointer; color: #ffffff;">
              <input type="radio" name="simMode" value="arbitrage" checked onchange="toggleSimMode('arbitrage')">
              ① 通常アービトラージ (完成品転売)
            </label>
            <label style="display: flex; align-items: center; gap: 6px; font-size: 0.88rem; font-weight: 700; cursor: pointer; color: #c084fc;">
              <input type="radio" name="simMode" value="psa_grading" onchange="toggleSimMode('psa_grading')">
              ② PSA鑑定投資 (素体 ➔ PSA10/9化)
            </label>
          </div>

          <div class="form-group">
            <label>対象カード選択</label>
            <select id="simCardSelect" class="form-input" onchange="onSimCardChange(this.value)">
              ${state.cards.map(c => `<option value="${c.id}" ${c.id === card.id ? 'selected' : ''}>${c.name} (${c.grade})</option>`).join('')}
            </select>
          </div>

          <div class="simulator-form-grid">
            <div class="form-group">
              <label id="simPriceLabel">仕入れ価格 ($)</label>
              <input type="number" id="simEbayPrice" class="form-input" value="${card.ebayPriceUsd}" oninput="recalcSimulator()">
            </div>
            <div class="form-group">
              <label>国際送料 ($)</label>
              <input type="number" id="simEbayShipping" class="form-input" value="${card.ebayShippingUsd || 30}" oninput="recalcSimulator()">
            </div>
            <div class="form-group" id="gradingFeeGroup" style="display: none;">
              <label>PSA鑑定代行料 (円)</label>
              <input type="number" id="simGradingFee" class="form-input" value="${card.gradingFeeJpy || 3500}" oninput="recalcSimulator()">
            </div>
            <div class="form-group">
              <label>為替レート (USD/JPY)</label>
              <input type="number" id="simUsdRate" class="form-input" value="${state.settings.usdJpyRate}" step="0.5" oninput="recalcSimulator()">
            </div>
            <div class="form-group">
              <label>国内販売先プラットフォーム</label>
              <select id="simPlatform" class="form-input" onchange="recalcSimulator()">
                <option value="yahoo">ヤフーフリマ (手数料5%)</option>
                <option value="mercari">メルカリ (手数料10%)</option>
                <option value="snkrdunk">スニーカーダンク (手数料5.5%)</option>
                <option value="torecaJapan">トレカショップ買取 (手数料0%)</option>
              </select>
            </div>
            <div class="form-group">
              <label id="simSalePriceLabel">想定国内販売価格 (円)</label>
              <input type="number" id="simSalePrice" class="form-input" value="${card.yahooAvgPriceJpy || card.snkrdunkPriceJpy}" step="1000" oninput="recalcSimulator()">
            </div>
          </div>

          <div class="sim-result-card" id="simResultArea"></div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px;">
          <button class="btn btn-primary" onclick="closeModal()">閉じる</button>
        </div>
      </div>
    </div>
  `;

  recalcSimulator();
}

window.toggleSimMode = function(mode) {
  const cardId = document.getElementById('simCardSelect').value;
  const card = state.cards.find(c => c.id === cardId) || state.cards[0];
  const gradingFeeGroup = document.getElementById('gradingFeeGroup');
  const priceLabel = document.getElementById('simPriceLabel');

  if (mode === 'psa_grading') {
    gradingFeeGroup.style.display = 'flex';
    priceLabel.textContent = '素体(Raw)仕入れ価格 ($)';
    document.getElementById('simEbayPrice').value = card.rawPriceUsd || Math.round(card.ebayPriceUsd * 0.45);
    document.getElementById('simSalePrice').value = card.psa10PriceJpy || card.snkrdunkPriceJpy;
  } else {
    gradingFeeGroup.style.display = 'none';
    priceLabel.textContent = 'eBay仕入れ価格 ($)';
    document.getElementById('simEbayPrice').value = card.ebayPriceUsd;
    document.getElementById('simSalePrice').value = card.yahooAvgPriceJpy || card.snkrdunkPriceJpy;
  }
  recalcSimulator();
}

window.onSimCardChange = function(cardId) {
  const card = state.cards.find(c => c.id === cardId);
  if (!card) return;
  const mode = document.querySelector('input[name="simMode"]:checked').value;
  toggleSimMode(mode);
}

window.recalcSimulator = function() {
  const modeEl = document.querySelector('input[name="simMode"]:checked');
  const mode = modeEl ? modeEl.value : 'arbitrage';
  const ebayPrice = parseFloat(document.getElementById('simEbayPrice').value) || 0;
  const ebayShipping = parseFloat(document.getElementById('simEbayShipping').value) || 0;
  const gradingFee = mode === 'psa_grading' ? (parseFloat(document.getElementById('simGradingFee').value) || 3500) : 0;
  const usdRate = parseFloat(document.getElementById('simUsdRate').value) || 150;
  const platform = document.getElementById('simPlatform').value;
  const salePrice = parseFloat(document.getElementById('simSalePrice').value) || 0;

  const tempSettings = { ...state.settings, usdJpyRate: usdRate };
  const importCost = calculateImportCost(ebayPrice, ebayShipping, tempSettings);
  const totalCost = importCost.totalCostJpy + gradingFee;
  const saleProfit = calculateDomesticSaleProfit(salePrice, totalCost, platform, tempSettings);

  const resultArea = document.getElementById('simResultArea');
  if (!resultArea) return;

  const isProfit = saleProfit.netProfitJpy >= 0;

  resultArea.innerHTML = `
    <div style="text-align: center;">
      <div style="font-size: 0.78rem; color: var(--text-secondary);">仕入れ総原価 (円換算)</div>
      <div style="font-size: 1.25rem; font-weight: 800; color: #ffffff;">${formatJpy(totalCost)}</div>
      <div style="font-size: 0.7rem; color: var(--text-muted);">${mode === 'psa_grading' ? `仕入:${formatJpy(importCost.totalCostJpy)} + 鑑定:${formatJpy(gradingFee)}` : `本体:${formatJpy(importCost.itemCostJpy)} / 税:${formatJpy(importCost.importTaxJpy)}`}</div>
    </div>
    <div style="text-align: center;">
      <div style="font-size: 0.78rem; color: var(--text-secondary);">販売手取り額</div>
      <div style="font-size: 1.25rem; font-weight: 800; color: #38bdf8;">${formatJpy(saleProfit.netRevenueJpy)}</div>
      <div style="font-size: 0.7rem; color: var(--text-muted);">手数料(${saleProfit.feeRatePercent}%): ${formatJpy(saleProfit.platformFeeJpy)}</div>
    </div>
    <div style="text-align: center;">
      <div style="font-size: 0.78rem; color: var(--text-secondary);">想定純利益 (ROI)</div>
      <div style="font-size: 1.45rem; font-weight: 800; color: ${isProfit ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
        ${isProfit ? '+' : ''}${formatJpy(saleProfit.netProfitJpy)}
      </div>
      <div style="font-size: 0.85rem; font-weight: 700; color: ${isProfit ? '#34d399' : '#fb7185'};">
        ${isProfit ? '+' : ''}${saleProfit.roiPercent}%
      </div>
    </div>
    <div style="text-align: center;">
      <div style="font-size: 0.78rem; color: var(--text-secondary);">損益分岐点 (BEP)</div>
      <div style="font-size: 1.15rem; font-weight: 700; color: #f59e0b;">${formatJpy(saleProfit.breakEvenPriceJpy)}</div>
      <div style="font-size: 0.7rem; color: var(--text-muted);">これ以上で売れば黒字</div>
    </div>
  `;
}

window.openAddCardModal = function() {
  const modalContainer = document.getElementById('modalContainer');
  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal-card" style="max-width: 680px;" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div>
            <h2 style="font-size: 1.3rem; font-weight: 800; color: #ffffff;">➕ 新規リサーチカードの追加</h2>
            <div style="font-size: 0.8rem; color: var(--text-secondary);">気になるカードの相場情報を入力して投資・PSA分析リストに登録</div>
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
                <option value="PSA10">PSA10 (最高鑑定)</option>
                <option value="Raw (未鑑定/NM)">Raw (未鑑定 / NearMint)</option>
              </select>
            </div>
            <div class="form-group">
              <label>eBay仕入れ想定価格 ($) *</label>
              <input type="number" id="newEbayPrice" class="form-input" placeholder="例: 450" required>
            </div>
            <div class="form-group">
              <label>素体(Raw)仕入れ価格 ($)</label>
              <input type="number" id="newRawPrice" class="form-input" placeholder="例: 200">
            </div>
            <div class="form-group">
              <label>スニーカーダンク(PSA10)相場 (円) *</label>
              <input type="number" id="newSnkrPrice" class="form-input" placeholder="例: 95000" required>
            </div>
            <div class="form-group">
              <label>PSA9 想定価格 (円)</label>
              <input type="number" id="newPsa9Price" class="form-input" placeholder="例: 52000">
            </div>
            <div class="form-group">
              <label>ヤフーフリマ想定価格 (円)</label>
              <input type="number" id="newYahooPrice" class="form-input" placeholder="例: 92000">
            </div>
            <div class="form-group">
              <label>画像URL (省略時はデフォルト)</label>
              <input type="text" id="newImageUrl" class="form-input" placeholder="https://...">
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
}

window.handleCreateCard = function(e) {
  e.preventDefault();
  const name = document.getElementById('newCardName').value.trim();
  const cardSet = document.getElementById('newCardSet').value.trim() || 'ポケモンカードゲーム';
  const grade = document.getElementById('newCardGrade').value;
  const ebayPriceUsd = parseFloat(document.getElementById('newEbayPrice').value) || 0;
  const rawPriceUsd = parseFloat(document.getElementById('newRawPrice').value) || (ebayPriceUsd * 0.45);
  const snkrPrice = parseFloat(document.getElementById('newSnkrPrice').value) || 0;
  const psa9Price = parseFloat(document.getElementById('newPsa9Price').value) || (snkrPrice * 0.55);
  const yahooPrice = parseFloat(document.getElementById('newYahooPrice').value) || snkrPrice * 0.98;
  const imageUrl = document.getElementById('newImageUrl').value.trim() || 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=500&auto=format&fit=crop&q=60';

  const newCard = {
    id: 'card-custom-' + Date.now(),
    name,
    cardSet,
    cardNumber: 'CUSTOM',
    releaseYear: 2024,
    grade,
    imageUrl,
    ebayPriceUsd,
    ebayShippingUsd: 30,
    rawPriceUsd,
    rawShippingUsd: 20,
    rawPriceJpy: Math.round(rawPriceUsd * state.settings.usdJpyRate),
    psa9PriceJpy: psa9Price,
    psa10PriceJpy: snkrPrice,
    psa10GemRate: 0.75,
    gradingFeeJpy: 3500,
    ebaySellerRating: '100%',
    ebayItemLocation: 'United States',
    snkrdunkPriceJpy: snkrPrice,
    torecaJapanPriceJpy: snkrPrice * 0.9,
    mercariAvgPriceJpy: snkrPrice,
    yahooAvgPriceJpy: yahooPrice,
    demandScore: 80,
    liquiditySpeedDays: 4.0,
    priceTrend30d: +5.0,
    snkrdunkHistory: [
      { date: '2026-08-20', price: snkrPrice * 0.9, volume: 5 },
      { date: '2026-09-18', price: snkrPrice, volume: 8 }
    ],
    torecaJapanHistory: [
      { date: '2026-08-20', buyPrice: snkrPrice * 0.75, sellPrice: snkrPrice * 0.9 },
      { date: '2026-09-18', buyPrice: snkrPrice * 0.8, sellPrice: snkrPrice * 0.92 }
    ],
    mercariSoldExamples: [
      { date: '2026-09-17', price: snkrPrice, condition: '美品・即購入可能', title: `${name} ${grade}` }
    ],
    yahooSoldExamples: [
      { date: '2026-09-16', price: yahooPrice, condition: '美品・送料無料', title: `${name} ${grade}` }
    ],
    tags: [grade, 'ユーザー追加', '要監視'],
    notes: 'ユーザーによって新規追加されたリサーチカードです。'
  };

  state.cards.unshift(newCard);
  localStorage.setItem('poke_cards', JSON.stringify(state.cards));
  closeModal();
  renderApp();
}

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
}

function exportToCsv() {
  const analyzed = state.cards.map(c => analyzeCardInvestment(c, state.settings));
  let csv = 'カード名,セット,グレード,需給スコア,通常判定,eBay価格($),総仕入れ原価(円),推奨販売先,PSA10売価(円),PSA10純利益(円),PSA9純利益(円),PSA10期待率,期待値ROI(%)\n';
  
  analyzed.forEach(item => {
    const ch = item.bestChannel.data;
    const psa = item.psaAnalysis;
    csv += `"${item.card.name}","${item.card.cardSet}","${item.card.grade}",${item.overallScore},"${item.rank}",${item.card.ebayPriceUsd},${item.importCost.totalCostJpy},"${ch.platformName}",${psa.psa10SalePriceJpy},${psa.psa10Profit.netProfitJpy},${psa.psa9Profit.netProfitJpy},"${Math.round(psa.gemRate * 100)}%","${psa.expectedRoiPercent}%"\n`;
  });

  const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `poke_arbitrage_analysis_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
