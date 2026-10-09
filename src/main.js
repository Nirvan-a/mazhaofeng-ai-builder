import './styles.css';
import { clientLogos, scenes, lifePhotos } from './photos.js';
import { renderLife, initLife } from './life.js';

const clients = [
  { name: '布基纳法索电力公司', logo: clientLogos.sonabel, brand: 'sonabel', width: 152, height: 88 },
  { name: '沙特电力公司', logo: clientLogos.saudiEnergy, brand: 'saudi-energy', width: 286, height: 88 },
  { name: '中国铜业有限公司', logo: clientLogos.chinaCopper, brand: 'china-copper', width: 457, height: 88 },
  { name: '方太集团', logo: clientLogos.fotile, brand: 'fotile', width: 193, height: 56 },
  { name: '瑞幸咖啡', logo: clientLogos.luckin, brand: 'luckin', width: 333, height: 88 },
  { name: '上汽集团', logo: clientLogos.saic, brand: 'saic', width: 55, height: 55 },
  { name: '远景能源', logo: clientLogos.envision, brand: 'envision', width: 111, height: 29 },
  { name: '某军工集团', brand: 'confidential' },
];

const steps = [
  { title: '学习', date: '2020 — 2024', organization: '华中科技大学', role: '国际商务 &amp; 英语双学位', text: '从商科出发', image: scenes.library, note: 'LEARN' },
  { title: '创造', date: '2022 — 2023', organization: '阿里巴巴 &amp; Cider', role: 'iOS 工程师', text: '用代码表达想法', image: scenes.coding, note: 'BUILD' },
  { title: '商业', date: '2024 — 2025', organization: '特变电工', role: '市场经理', text: '在驻外现场理解业务', image: scenes.travel, note: 'EXPLORE' },
  { title: '实践', date: '2025 — 至今', organization: '云问 &amp; 字节跳动', text: '让 AI 真正进入工作', image: scenes.collaboration, note: 'DELIVER' },
];

const clientGroup = (items, duplicate = false) => `
  <div class="client-group" ${duplicate ? 'aria-hidden="true" inert' : ''}>
    ${items.map(({ name, logo, brand, width, height }) => `
      <span class="client-item">
        ${logo ? `
          <span class="client-mark client-mark-${brand}" aria-hidden="true">
            <img src="${logo}" alt="" width="${width}" height="${height}" decoding="async" />
          </span>` : ''}
        <span class="client-name">${name}</span>
      </span><i aria-hidden="true"></i>`).join('')}
  </div>`;

document.querySelector('#app').innerHTML = `
  <a class="skip-link" href="#work">跳至做过的事情</a>
  <header class="site-header">
    <a class="brand" href="#home" aria-label="马兆峰，返回首页">马兆峰</a>
    <span class="brand-note">AI BUILDER <i>/</i> SHANGHAI</span>
    <nav aria-label="主导航">
      <a href="#home"><span>01</span><b>INTRO</b></a>
      <a href="#journey"><span>02</span><b>JOURNEY</b></a>
      <a href="#work"><span>03</span><b>WORK</b></a>
      <a href="#life"><span>04</span><b>LIFE</b></a>
    </nav>
  </header>

  <main>
    <section id="home" class="page hero" aria-labelledby="hero-title">
      <div class="hero-art" aria-hidden="true">
        <div class="hero-landscape">
          <img src="${scenes.hero}" alt="" width="1586" height="992" fetchpriority="high" decoding="async" />
        </div>
      </div>
      <div class="hero-copy">
        <span class="hero-rule" aria-hidden="true"></span>
        <h1 id="hero-title"><span>让<span class="red">好奇</span>带路</span><span>在每一次跨界中生长</span></h1>
        <p class="hero-description">以商业理解世界，用代码创造答案</p>
      </div>
      <div class="hero-bottom">
        <div class="chapter-label"><b>01</b><i aria-hidden="true"></i><span>INTRODUCTION</span></div>
        <p class="hero-footnote">BUSINESS → CODE → THE WORLD → AI</p>
      </div>
    </section>

    <section id="journey" class="page journey" aria-labelledby="journey-title">
      <div class="journey-heading section-inset reveal">
        <div class="journey-number"><span>02</span><i aria-hidden="true"></i></div>
        <div class="journey-heading-copy"><h2 id="journey-title">THE JOURNEY</h2><p>一条并不笔直的路</p></div>
        <span class="margin-note">CURIOSITY IS THE THREAD.</span>
      </div>
      <div class="journey-film reveal">
        <ol class="journey-stages">
          ${steps.map((step, index) => `
            <li class="journey-stage stage-${index + 1}">
              <img data-section-src="${step.image}" alt="" decoding="async" fetchpriority="low" />
              <div class="stage-meta">
                <div class="stage-dateline"><span class="stage-date">${step.date}</span><span class="stage-note">${step.note}</span></div>
                <div class="stage-credential">
                  <p class="stage-organization">${step.organization}</p>
                  ${step.role ? `<p class="stage-role">${step.role}</p>` : ''}
                </div>
              </div>
              <div class="stage-copy"><i aria-hidden="true"></i><h3>${step.title}</h3><p>${step.text}</p></div>
            </li>`).join('')}
        </ol>
        <svg class="journey-route" viewBox="0 0 1440 430" preserveAspectRatio="none" aria-hidden="true">
          <path pathLength="1" d="M-10 215 C160 175 245 190 390 222 S620 275 763 235 S1000 190 1123 230 S1320 235 1430 202" />
          <path class="route-arrow" d="m1414 195 17 7-12 13" />
        </svg>
      </div>
      <div class="journey-ending section-inset"><span class="eyebrow">ALWAYS A BEGINNER.</span><p>由兴趣出发，寻直觉前行.</p></div>
    </section>

    <section id="work" class="page work section-inset" aria-labelledby="work-title">
      <div class="work-heading reveal">
        <div class="section-kicker"><span>03 — WHAT I HAVE DONE</span><i aria-hidden="true"></i></div>
        <h2 id="work-title">做过的<span class="red">事情</span></h2>
        <p>从想法，到真实世界里的结果。</p>
      </div>
      <div class="work-grid">
        <article class="work-card work-code reveal">
          <img class="work-picture" data-section-src="${scenes.architecture}" alt="" decoding="async" fetchpriority="low" />
          <div class="work-content">
            <span class="work-index">01 <i aria-hidden="true"></i> A NEW LANGUAGE</span>
            <div class="work-body">
            <h3>商科<span class="red">转码</span></h3>
            <p><strong>7个月</strong>自学速成<wbr>转战计算机</p>
            </div>
            <div class="work-footer">
              <a class="text-link" href="https://github.com/Nirvan-a" target="_blank" rel="noreferrer">GitHub<span class="sr-only">（新窗口打开）</span></a>
              <span class="work-bottom">FROM BUSINESS TO CODE</span>
            </div>
          </div>
        </article>
        <article class="work-card work-global reveal">
          <img class="work-picture" data-section-src="${scenes.travel}" alt="" decoding="async" fetchpriority="low" />
          <div class="global-sun" aria-hidden="true"></div>
          <div class="work-content">
            <span class="work-index">02 <i aria-hidden="true"></i> BEYOND BORDERS</span>
            <div class="work-body">
            <h3>海外<span class="red">商务</span></h3>
            <p>布基纳法索 · 沙特</p>
            </div>
            <div class="work-footer">
              <a class="text-link award-link" href="https://www.seetao.com/details/253446.html" target="_blank" rel="noreferrer">单项目中标 <strong class="red">1 亿美元</strong><span class="sr-only">（查看报道，新窗口打开）</span></a>
              <span class="work-bottom">BUSINESS DEVELOPMENT</span>
            </div>
          </div>
        </article>
        <article class="work-card work-products reveal">
          <div class="workflow-art" aria-hidden="true"><i></i><i></i><i></i><i></i><span></span></div>
          <div class="work-content">
            <span class="work-index">03 <i aria-hidden="true"></i> BUILT FROM SCRATCH</span>
            <div class="work-body">
            <h3><span class="red">产品</span>经理</h3>
            <p>工作流平台设计 &amp; 搭建</p>
            </div>
            <span class="work-bottom">QUESTION → RESEARCH → ANSWER</span>
          </div>
        </article>
        <article class="work-card work-advisory reveal">
          <img class="work-picture" data-section-src="${scenes.hero}" alt="" decoding="async" fetchpriority="low" />
          <div class="work-content">
            <span class="work-index">04 <i aria-hidden="true"></i> INTO THE REAL WORLD</span>
            <div class="work-body">
            <h3>AI <span class="red">解决</span>方案</h3>
            <p>豆包工作伙伴 &amp; 妙搭服务</p>
            </div>
            <span class="work-bottom">FROM POSSIBILITY TO PRACTICE</span>
          </div>
        </article>
      </div>
      <aside class="clients is-offscreen" aria-labelledby="clients-title">
      <div class="client-heading">
        <h2 id="clients-title">SELECTED CLIENTS <span>/</span> 服务企业</h2>
        <i aria-hidden="true"></i>
      </div>
        <div class="client-marquee" aria-label="服务企业，自动循环展示">
          <div class="client-track">${clientGroup(clients)}${clientGroup(clients, true)}</div>
        </div>
      </aside>
    </section>

    ${renderLife(lifePhotos)}
  </main>

`;

// Decode the photograph before revealing its entire art layer, including red.
// A failed or slow image leaves a neutral, fully usable introduction.
const heroImage = document.querySelector('.hero-landscape img');
heroImage.decode().then(() => {
  document.querySelector('.hero-art').classList.add('is-ready');
}).catch(() => {});

const sectionImageObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    const image = entry.target;
    image.src = image.dataset.sectionSrc;
    image.removeAttribute('data-section-src');
    sectionImageObserver.unobserve(image);
  }
}, { rootMargin: '0px 0px -25% 0px' });
document.querySelectorAll('img[data-section-src]').forEach((image) => sectionImageObserver.observe(image));

const lifeSection = document.querySelector('#life');
const lifeInitializer = new IntersectionObserver((entries) => {
  if (!entries.some((entry) => entry.isIntersecting)) return;
  initLife(lifePhotos);
  lifeInitializer.disconnect();
}, { rootMargin: '0px 0px -5% 0px' });
lifeInitializer.observe(document.querySelector('#work'));
lifeInitializer.observe(lifeSection);

const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  }
}, { threshold: 0.1 });
reveals.forEach((element) => revealObserver.observe(element));

const film = document.querySelector('.journey-film');
function sizeJourneyRoute() {
  const route = film.querySelector('.journey-route');
  if (!route.getBoundingClientRect().width) return;
  const bounds = film.getBoundingClientRect();
  const points = [...film.querySelectorAll('.stage-copy i')].map((node) => {
    const rect = node.getBoundingClientRect();
    return { x: rect.left - bounds.left + rect.width / 2, y: rect.top - bounds.top + rect.height / 2 };
  });
  route.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
  const rise = Math.min(38, bounds.height * .1);
  let path = `M-10 ${points[0].y + 12} Q0 ${points[0].y} ${points[0].x} ${points[0].y}`;
  points.slice(1).forEach((point, index) => {
    const previous = points[index];
    const third = (point.x - previous.x) / 3;
    const bend = index % 2 ? rise : -rise;
    path += ` C${previous.x + third} ${previous.y + bend} ${point.x - third} ${point.y + bend} ${point.x} ${point.y}`;
  });
  const last = points.at(-1), endX = bounds.width - 12, endY = last.y - rise;
  path += ` Q${last.x + (endX - last.x) / 2} ${last.y} ${endX} ${endY}`;
  route.firstElementChild.setAttribute('d', path);
  route.lastElementChild.setAttribute('d', `m${endX - 14} ${endY - 4} 14 4-8 11`);
}
new ResizeObserver(sizeJourneyRoute).observe(film);
document.fonts.ready.then(sizeJourneyRoute);

const header = document.querySelector('.site-header');
const sections = [...document.querySelectorAll('main > section[id]')];
const navigation = [...document.querySelectorAll('.site-header nav a')];
let framePending = false;
let snapTimer = 0;
let snapReleaseTimer = 0;
let snapping = false;
let scrollDirection = 1;
let directionSampleY = scrollY;
let snapTargetY = scrollY;
const supportsScrollEnd = 'onscrollend' in window;
function updateNavigation() {
  framePending = false;
  header.classList.toggle('scrolled', scrollY > 64);
  const current = sections.reduce((active, section) =>
    section.getBoundingClientRect().top <= innerHeight * 0.4 ? section : active, sections[0]);
  navigation.forEach((link) => {
    const active = link.hash === `#${current.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

function releaseThresholdSnap() {
  snapping = false;
  directionSampleY = scrollY;
  clearTimeout(snapReleaseTimer);
}

function snapAtThreshold() {
  snapTimer = 0;
  if (snapping || document.querySelector('.life-lightbox[open]')) return;
  const position = scrollY;
  let target;
  if (scrollDirection < 0) {
    const currentIndex = sections.findIndex((section) => section.offsetTop >= position - 2);
    const current = sections[currentIndex < 0 ? sections.length - 1 : currentIndex];
    const previous = sections[Math.max(0, (currentIndex < 0 ? sections.length - 1 : currentIndex) - 1)];
    const distance = Math.max(1, current.offsetTop - previous.offsetTop);
    const previousExposure = (current.offsetTop - position) / distance;
    target = previousExposure > .3 ? previous : current;
  } else {
    const currentIndex = sections.reduce((index, section, candidate) =>
      section.offsetTop <= position + 2 ? candidate : index, 0);
    const current = sections[currentIndex];
    const next = sections[currentIndex + 1];
    if (!next) target = current;
    else {
      const distance = Math.max(1, next.offsetTop - current.offsetTop);
      const nextExposure = (position - current.offsetTop) / distance;
      target = nextExposure > .3 ? next : current;
    }
  }
  if (Math.abs(scrollY - target.offsetTop) <= 2) return;
  snapping = true;
  snapTargetY = target.offsetTop;
  scrollTo({ top: snapTargetY, behavior: motionPreference.matches ? 'instant' : 'smooth' });
  snapReleaseTimer = setTimeout(releaseThresholdSnap, 1000);
}

function scheduleThresholdSnap() {
  clearTimeout(snapTimer);
  if (!snapping) snapTimer = setTimeout(snapAtThreshold, 180);
}

addEventListener('scroll', () => {
  if (!snapping) {
    const delta = scrollY - directionSampleY;
    if (Math.abs(delta) > .5) {
      scrollDirection = Math.sign(delta);
      directionSampleY = scrollY;
    }
    if (!supportsScrollEnd) scheduleThresholdSnap();
  }
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(updateNavigation);
}, { passive: true });
if (supportsScrollEnd) {
  addEventListener('scrollend', () => {
    clearTimeout(snapTimer);
    if (!snapping) {
      snapAtThreshold();
      return;
    }
    const reachedTarget = Math.abs(scrollY - snapTargetY) <= 2;
    releaseThresholdSnap();
    if (!reachedTarget) scheduleThresholdSnap();
  }, { passive: true });
}
function interruptThresholdSnap() {
  if (!snapping) return;
  scrollTo({ top: scrollY, behavior: 'instant' });
  releaseThresholdSnap();
}
addEventListener('wheel', (event) => {
  if (Math.abs(event.deltaY) > .5) scrollDirection = Math.sign(event.deltaY);
  interruptThresholdSnap();
}, { passive: true });
['touchstart', 'pointerdown'].forEach((event) =>
  addEventListener(event, interruptThresholdSnap, { passive: true }));
addEventListener('keydown', (event) => {
  const directions = {
    ArrowUp: -1,
    PageUp: -1,
    Home: -1,
    ArrowDown: 1,
    PageDown: 1,
    End: 1,
    ' ': 1,
  };
  if (!(event.key in directions)) return;
  scrollDirection = event.key === ' ' && event.shiftKey ? -1 : directions[event.key];
  interruptThresholdSnap();
});
addEventListener('resize', updateNavigation);
updateNavigation();

const clientSection = document.querySelector('.clients');
const clientRows = [...document.querySelectorAll('.client-marquee')];
new IntersectionObserver(([entry]) => {
  clientSection.classList.toggle('is-offscreen', !entry.isIntersecting);
}).observe(clientSection);

function sizeClientLoops() {
  clientRows.forEach((row) => {
    const track = row.querySelector('.client-track');
    const group = track.firstElementChild;
    const width = group.getBoundingClientRect().width;
    if (!width) return;
    // One full period plus the viewport must remain covered at every frame.
    const count = Math.max(2, Math.ceil(row.clientWidth / width) + 1);
    while (track.children.length < count) {
      const copy = group.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      copy.setAttribute('inert', '');
      track.append(copy);
    }
    track.style.setProperty('--client-shift', `${-width}px`);
    track.style.animationDuration = `${width / 31}s`;
  });
}
new ResizeObserver(sizeClientLoops).observe(clientSection);
document.fonts.ready.then(sizeClientLoops);
sizeClientLoops();
