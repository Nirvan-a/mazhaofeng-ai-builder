import './analytics.css';

const DAY = 24 * 60 * 60 * 1000;
const ranges = [7, 30, 90];
const number = new Intl.NumberFormat('zh-CN');
const dateLabel = new Intl.DateTimeFormat('zh-CN', { month: 'numeric', day: 'numeric' });

function createDemoSeries(length = 90) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length }, (_, index) => {
    const distance = length - index - 1;
    const date = new Date(today.getTime() - distance * DAY);
    const weekday = date.getDay();
    const weeklyLift = weekday === 0 || weekday === 6 ? -18 : 13;
    const pulse = Math.round(Math.sin(index * 0.63) * 22 + Math.cos(index * 0.21) * 13);
    const visits = Math.max(48, 142 + Math.round(index * 0.72) + weeklyLift + pulse);
    const visitors = Math.max(31, Math.round(visits * (0.58 + Math.sin(index * 0.29) * 0.035)));
    return { date, visits, visitors };
  });
}

const series = createDemoSeries();
const totals = { visits: 12864, visitors: 4219 };

document.body.className = 'analytics-mode';
document.title = '访问统计｜马兆峰';
document.querySelector('#app').innerHTML = `
  <main class="analytics-shell">
    <header class="analytics-heading">
      <div>
        <p class="analytics-eyebrow">SITE ANALYTICS <span>/</span> FRONTEND PREVIEW</p>
        <h1>访问数据</h1>
      </div>
      <p class="analytics-demo-note">演示数据</p>
    </header>

    <section class="analytics-kpis" aria-label="核心指标">
      <article class="analytics-kpi">
        <p>总访问量</p>
        <strong>${number.format(totals.visits)}</strong>
      </article>
      <article class="analytics-kpi">
        <p>总访客数</p>
        <strong>${number.format(totals.visitors)}</strong>
      </article>
    </section>

    <section class="analytics-chart-panel" aria-labelledby="trend-title">
      <div class="analytics-chart-heading">
        <div>
          <p class="analytics-section-index">01 <i></i> TRAFFIC TREND</p>
          <h2 id="trend-title">访问趋势</h2>
        </div>
        <div class="analytics-ranges" role="group" aria-label="选择时间范围">
          ${ranges.map((days) => `<button type="button" data-range="${days}" aria-pressed="${days === 7}">近${days}天</button>`).join('')}
        </div>
      </div>

      <div class="analytics-legend" aria-hidden="true">
        <span><i class="legend-visits"></i>访问量</span>
        <span><i class="legend-visitors"></i>访客数</span>
      </div>
      <div class="analytics-chart" data-chart></div>
    </section>
  </main>
`;

const chart = document.querySelector('[data-chart]');
const buttons = [...document.querySelectorAll('[data-range]')];

function niceMax(value) {
  if (value <= 0) return 10;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  return Math.ceil(value / magnitude) * magnitude;
}

function linePath(points, width, height, padding, maxValue) {
  const drawableWidth = width - padding.left - padding.right;
  const drawableHeight = height - padding.top - padding.bottom;
  return points.map((value, index) => {
    const x = padding.left + (points.length === 1 ? 0 : index / (points.length - 1)) * drawableWidth;
    const y = padding.top + drawableHeight - (value / maxValue) * drawableHeight;
    return `${index ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');
}

function renderChart(days) {
  const data = series.slice(-days);
  const width = 1120;
  const height = 430;
  const padding = { top: 30, right: 24, bottom: 58, left: 62 };
  const maxValue = niceMax(Math.max(...data.flatMap(({ visits, visitors }) => [visits, visitors])) * 1.08);
  const plotHeight = height - padding.top - padding.bottom;
  const plotWidth = width - padding.left - padding.right;
  const yTicks = Array.from({ length: 5 }, (_, index) => Math.round(maxValue * (4 - index) / 4));
  const labelIndexes = [...new Set([0, Math.round((data.length - 1) / 2), data.length - 1])];
  const visitPath = linePath(data.map((item) => item.visits), width, height, padding, maxValue);
  const visitorPath = linePath(data.map((item) => item.visitors), width, height, padding, maxValue);

  chart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="chart-title chart-description">
      <title id="chart-title">近${days}天访问量与访客数趋势</title>
      <desc id="chart-description">红色实线代表访问量，黑色虚线代表访客数。</desc>
      <g class="chart-grid">
        ${yTicks.map((tick, index) => {
          const y = padding.top + index / 4 * plotHeight;
          return `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" />
            <text x="${padding.left - 14}" y="${y + 4}" text-anchor="end">${tick}</text>`;
        }).join('')}
      </g>
      <g class="chart-labels">
        ${labelIndexes.map((index) => {
          const x = padding.left + (data.length === 1 ? 0 : index / (data.length - 1)) * plotWidth;
          return `<text x="${x}" y="${height - 19}" text-anchor="${index === 0 ? 'start' : index === data.length - 1 ? 'end' : 'middle'}">${dateLabel.format(data[index].date)}</text>`;
        }).join('')}
      </g>
      <path class="chart-line chart-line-visits" d="${visitPath}" pathLength="1" />
      <path class="chart-line chart-line-visitors" d="${visitorPath}" pathLength="1" />
    </svg>
  `;
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const days = Number(button.dataset.range);
    buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    renderChart(days);
  });
});

renderChart(7);
