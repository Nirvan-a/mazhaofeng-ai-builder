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
  { title: '实践', date: '2025 — 至今', organization: '云问 &amp; 字节跳动', role: 'AI产品 &amp; 解决方案', text: '让 AI 真正进入工作', image: scenes.collaboration, note: 'DELIVER' },
];

const clientGroup = (items, duplicate = false) => `
  <div class="client-group" ${duplicate ? 'aria-hidden="true" inert' : 'data-client-original'}>
    ${items.map(({ name, logo, brand, width, height }) => `
      <span class="client-item">
        ${logo ? `
          <span class="client-mark client-mark-${brand}" aria-hidden="true">
            <img src="${logo}" alt="" width="${width}" height="${height}" decoding="async" />
          </span>` : ''}
        <span class="client-name">${name}</span>
      </span><i aria-hidden="true"></i>`).join('')}
  </div>`;

const heroCharacters = (text, startIndex = 0, highlighted = []) => [...text]
  .map((character, index) => `<span class="hero-char${highlighted.includes(index) ? ' red' : ''}" style="--char-index:${startIndex + index}">${character === ' ' ? '&nbsp;' : character}</span>`)
  .join('');

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
        <h1 id="hero-title" aria-label="让好奇带路，在每一次跨界中生长">
          <span class="hero-line" aria-hidden="true">${heroCharacters('让好奇带路', 0, [1, 2])}</span>
          <span class="hero-line" aria-hidden="true">${heroCharacters('在每一次跨界中生长', 6)}</span>
        </h1>
        <p class="hero-description" aria-label="以商业理解世界，用代码创造答案">
          <span aria-hidden="true">${heroCharacters('以商业理解世界，用代码创造答案', 17)}</span>
        </p>
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
          <path pathLength="1" d="M56 215 C160 175 245 190 390 222 S620 275 763 235 S1000 190 1123 230 S1280 235 1384 202" />
          <path class="route-arrow" d="m1370 198 14 4-8 11" />
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
            <p>驻布基纳法索 · 沙特</p>
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
        <div class="client-marquee" tabindex="0" aria-label="服务企业，可左右拖动浏览，松开后继续自动循环">
          <div class="client-track">${clientGroup(clients)}</div>
        </div>
      </aside>
    </section>

    ${renderLife(lifePhotos)}
  </main>

`;

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
function resetToHome() {
  history.replaceState(history.state, '', `${location.pathname}${location.search}#home`);
  document.scrollingElement.scrollTop = 0;
}
resetToHome();
addEventListener('pageshow', resetToHome, { once: true });

// Decode the photograph before revealing its entire art layer, including red.
// A failed or slow image leaves a neutral, fully usable introduction.
const hero = document.querySelector('#home');
const heroArt = document.querySelector('.hero-art');
const heroImage = document.querySelector('.hero-landscape img');
heroImage.decode().then(() => {
  heroArt.classList.add('is-ready');
}).catch(() => {
  hero.classList.add('is-copy-ready');
});
setTimeout(() => hero.classList.add('is-copy-ready'), 3500);

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
  const edge = Math.min(56, Math.max(28, bounds.width * .04));
  let path = `M${points[0].x} ${points[0].y}`;
  points.slice(1).forEach((point, index) => {
    const previous = points[index];
    const third = (point.x - previous.x) / 3;
    const bend = index % 2 ? rise : -rise;
    path += ` C${previous.x + third} ${previous.y + bend} ${point.x - third} ${point.y + bend} ${point.x} ${point.y}`;
  });
  const last = points.at(-1), endX = bounds.width - edge, endY = last.y - rise;
  path += ` Q${last.x + (endX - last.x) / 2} ${last.y} ${endX} ${endY}`;
  route.firstElementChild.setAttribute('d', path);
  route.lastElementChild.setAttribute('d', `m${endX - 14} ${endY - 4} 14 4-8 11`);
}
new ResizeObserver(sizeJourneyRoute).observe(film);
document.fonts.ready.then(sizeJourneyRoute);

function hideJourneyRoute() {
  film.classList.add('route-resetting');
  film.classList.remove('route-visible');
  void film.offsetWidth;
  film.classList.remove('route-resetting');
}

function replayJourneyRoute() {
  if (motionPreference.matches) {
    film.classList.add('route-visible');
    return;
  }
  if (film.classList.contains('route-visible')) return;
  film.classList.add('route-resetting');
  film.classList.remove('route-visible');
  void film.offsetWidth;
  requestAnimationFrame(() => {
    film.classList.remove('route-resetting');
    requestAnimationFrame(() => film.classList.add('route-visible'));
  });
}

new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting && entry.intersectionRatio > 0) {
    if (!film.classList.contains('route-visible')) replayJourneyRoute();
  } else {
    hideJourneyRoute();
  }
}).observe(document.querySelector('#journey'));

const header = document.querySelector('.site-header');
const sections = [...document.querySelectorAll('main > section[id]')];
const navigation = [...document.querySelectorAll('.site-header nav a')];
const journeySection = document.querySelector('#journey');
let framePending = false;
let snapTimer = 0;
let snapReleaseTimer = 0;
let snapFrame = 0;
let snapping = false;
let scrollDirection = 1;
let directionSampleY = scrollY;
let snapTargetY = scrollY;
let suppressScrollEndUntil = 0;
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
  if (!snapping && Math.abs(scrollY - current.offsetTop) <= 2) syncSectionHash(current);
}

function syncSectionHash(section) {
  const nextHash = `#${section.id}`;
  if (location.hash !== nextHash) history.replaceState(history.state, '', nextHash);
}

function settleSectionState(section) {
  syncSectionHash(section);
  if (section === journeySection) replayJourneyRoute();
  else hideJourneyRoute();
}

function releaseThresholdSnap(suppressScrollEnd = true, commitRoute = true) {
  cancelAnimationFrame(snapFrame);
  snapFrame = 0;
  document.documentElement.classList.remove('is-page-snapping');
  snapping = false;
  directionSampleY = scrollY;
  clearTimeout(snapReleaseTimer);
  suppressScrollEndUntil = suppressScrollEnd ? performance.now() + 180 : 0;
  if (!commitRoute) return;
  const aligned = sections.find((section) => Math.abs(scrollY - section.offsetTop) <= 2);
  if (aligned) settleSectionState(aligned);
}

function snapToSection(target) {
  if (!target) return;
  clearTimeout(snapTimer);
  clearTimeout(snapReleaseTimer);
  cancelAnimationFrame(snapFrame);
  snapFrame = 0;
  snapTargetY = target.offsetTop;
  const startY = scrollY;
  const distance = snapTargetY - startY;
  if (Math.abs(distance) <= 2) {
    document.scrollingElement.scrollTop = snapTargetY;
    settleSectionState(target);
    return;
  }

  snapping = true;
  document.documentElement.classList.add('is-page-snapping');
  if (motionPreference.matches) {
    document.scrollingElement.scrollTop = snapTargetY;
    settleSectionState(target);
    snapReleaseTimer = setTimeout(() => releaseThresholdSnap(true, false), 0);
    return;
  }

  const duration = Math.min(800, 620 + Math.abs(distance) / Math.max(1, innerHeight) * 180);
  const startedAt = performance.now();
  const easeInOutCubic = (progress) => progress < .5
    ? 4 * progress ** 3
    : 1 - (-2 * progress + 2) ** 3 / 2;

  const step = (time) => {
    const progress = Math.min(1, (time - startedAt) / duration);
    document.scrollingElement.scrollTop = startY + distance * easeInOutCubic(progress);
    if (progress < 1) {
      snapFrame = requestAnimationFrame(step);
      return;
    }
    snapFrame = 0;
    document.scrollingElement.scrollTop = snapTargetY;
    settleSectionState(target);
    snapReleaseTimer = setTimeout(() => releaseThresholdSnap(true, false), 120);
  };
  snapFrame = requestAnimationFrame(step);
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
  if (Math.abs(scrollY - target.offsetTop) <= 2) {
    settleSectionState(target);
    return;
  }
  snapToSection(target);
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
    if (snapping && snapFrame) return;
    if (!snapping) {
      if (performance.now() < suppressScrollEndUntil) return;
      snapAtThreshold();
      return;
    }
    const reachedTarget = Math.abs(scrollY - snapTargetY) <= 2;
    releaseThresholdSnap(true, reachedTarget);
    if (!reachedTarget) scheduleThresholdSnap();
  }, { passive: true });
}
function interruptThresholdSnap() {
  suppressScrollEndUntil = 0;
  if (!snapping) return;
  releaseThresholdSnap(false, false);
}
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

const pageGestureExclusion = '.client-marquee, .life-reel, .life-lightbox, input, textarea, select, [contenteditable="true"]';
const pageGestureIsExcluded = (target) => target instanceof Element && Boolean(target.closest(pageGestureExclusion));
const currentSectionIndex = () => sections.reduce((closest, section, index) =>
  Math.abs(section.offsetTop - scrollY) < Math.abs(sections[closest].offsetTop - scrollY) ? index : closest, 0);
function moveByPage(direction) {
  const currentIndex = currentSectionIndex();
  const targetIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
  if (targetIndex === currentIndex) return false;
  scrollDirection = direction;
  snapToSection(sections[targetIndex]);
  return true;
}
addEventListener('hashchange', () => {
  const target = sections.find((section) => `#${section.id}` === location.hash);
  if (target) snapToSection(target);
});

let pageTouch = null;
addEventListener('touchstart', (event) => {
  if (event.touches.length !== 1 || pageGestureIsExcluded(event.target)) {
    pageTouch = null;
    return;
  }
  const touch = event.touches[0];
  pageTouch = { id: touch.identifier, x: touch.clientX, y: touch.clientY, axis: null };
}, { passive: true });
addEventListener('touchmove', (event) => {
  if (event.touches.length !== 1) {
    pageTouch = null;
    return;
  }
  const touch = [...event.touches].find((candidate) => candidate.identifier === pageTouch?.id);
  if (!pageTouch || !touch) return;
  const deltaX = touch.clientX - pageTouch.x;
  const deltaY = touch.clientY - pageTouch.y;
  if (!pageTouch.axis && Math.hypot(deltaX, deltaY) > 10) {
    pageTouch.axis = Math.abs(deltaX) > Math.abs(deltaY) * 1.15 ? 'x' : 'y';
  }
  if (pageTouch.axis === 'x' && event.cancelable) event.preventDefault();
}, { passive: false });
addEventListener('touchend', (event) => {
  const touch = [...event.changedTouches].find((candidate) => candidate.identifier === pageTouch?.id);
  if (!pageTouch || !touch) return;
  const deltaX = touch.clientX - pageTouch.x;
  const deltaY = touch.clientY - pageTouch.y;
  const axis = pageTouch.axis;
  pageTouch = null;
  if (Math.abs(deltaX) < Math.max(56, innerWidth * .08) || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;
  if (axis === 'y') return;
  if (event.cancelable) event.preventDefault();
  moveByPage(deltaX < 0 ? 1 : -1);
}, { passive: false });
addEventListener('touchcancel', () => { pageTouch = null; }, { passive: true });

let pageWheelX = 0;
let pageWheelY = 0;
let pageWheelActive = false;
let pageWheelLocked = false;
let pageWheelTimer = 0;
function resetPageWheel() {
  clearTimeout(pageWheelTimer);
  pageWheelX = 0;
  pageWheelY = 0;
  pageWheelActive = false;
  pageWheelLocked = false;
  pageWheelTimer = 0;
}
addEventListener('wheel', (event) => {
  if (event.ctrlKey || pageGestureIsExcluded(event.target)) {
    resetPageWheel();
    return;
  }
  const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.15;
  if (!pageWheelActive && !horizontal) {
    resetPageWheel();
    return;
  }
  clearTimeout(pageWheelTimer);
  pageWheelX += event.deltaX;
  pageWheelY += event.deltaY;
  if (!pageWheelActive) {
    if (Math.abs(pageWheelX) < 8 || Math.abs(pageWheelX) <= Math.abs(pageWheelY) * 1.35) {
      pageWheelTimer = setTimeout(resetPageWheel, 180);
      return;
    }
    pageWheelActive = true;
    interruptThresholdSnap();
  }
  if (event.cancelable) event.preventDefault();
  const threshold = Math.min(72, Math.max(36, innerWidth * .035));
  if (!pageWheelLocked && Math.abs(pageWheelX) >= threshold && Math.abs(pageWheelX) > Math.abs(pageWheelY) * 1.2) {
    pageWheelLocked = true;
    moveByPage(Math.sign(pageWheelX));
  }
  pageWheelTimer = setTimeout(resetPageWheel, 180);
}, { passive: false });
addEventListener('wheel', (event) => {
  if (pageWheelActive || Math.abs(event.deltaY) <= Math.abs(event.deltaX) || Math.abs(event.deltaY) <= .5) return;
  scrollDirection = Math.sign(event.deltaY);
  interruptThresholdSnap();
}, { passive: true });
addEventListener('resize', updateNavigation);
updateNavigation();

const clientSection = document.querySelector('.clients');
const clientRows = [...document.querySelectorAll('.client-marquee')];
const wrapClientPosition = (value, length) => ((value % length) + length) % length;

function initClientMarquee(row) {
  const track = row.querySelector('.client-track');
  const original = row.querySelector('[data-client-original]');
  const before = [];
  const after = [];
  const pauses = new Set(['layout', 'offscreen']);
  let span = 0;
  let base = 0;
  let frame = 0;
  let lastTime = 0;
  let autoPosition = 0;
  let pointer = null;
  const supportsRowScrollEnd = 'onscrollend' in row;

  const cloneGroup = () => {
    const clone = original.cloneNode(true);
    clone.removeAttribute('data-client-original');
    clone.setAttribute('aria-hidden', 'true');
    clone.setAttribute('inert', '');
    return clone;
  };

  function animate(time) {
    frame = 0;
    if (pauses.size) return;
    if (lastTime) {
      autoPosition = base + wrapClientPosition(autoPosition - base + Math.min(time - lastTime, 64) * .031, span);
      row.scrollLeft = autoPosition;
    } else {
      autoPosition = row.scrollLeft;
    }
    lastTime = time;
    frame = requestAnimationFrame(animate);
  }

  function syncPlayback() {
    if (pauses.size) {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    } else if (!frame) {
      frame = requestAnimationFrame(animate);
    }
  }

  function pause(reason, enabled) {
    if (enabled) pauses.add(reason);
    else pauses.delete(reason);
    syncPlayback();
  }

  function wrapManualScroll() {
    if (!span) return;
    const left = row.scrollLeft;
    if (left < base || left >= base + span) {
      autoPosition = base + wrapClientPosition(left - base, span);
      row.scrollLeft = autoPosition;
    }
  }

  function measure() {
    const relative = span ? row.scrollLeft - base : 0;
    span = original.getBoundingClientRect().width;
    if (!span) return;
    const sideCount = Math.max(1, Math.ceil(row.clientWidth / span));
    while (before.length < sideCount) {
      const clone = cloneGroup();
      track.prepend(clone);
      before.push(clone);
    }
    while (after.length < sideCount) {
      const clone = cloneGroup();
      track.append(clone);
      after.push(clone);
    }
    base = original.offsetLeft;
    autoPosition = base + wrapClientPosition(relative, span);
    row.scrollLeft = autoPosition;
    pauses.delete('layout');
    pause('static', motionPreference.matches);
    lastTime = 0;
  }

  function finishPointer(event = {}) {
    const activePointer = pointer;
    if (!activePointer || (event.pointerId != null && event.pointerId !== activePointer.id)) return;
    pointer = null;
    if (row.hasPointerCapture(activePointer.id)) row.releasePointerCapture(activePointer.id);
    row.classList.remove('is-dragging');
    if (supportsRowScrollEnd && activePointer.type !== 'mouse' && activePointer.horizontal) pause('native-scroll', true);
    autoPosition = row.scrollLeft;
    lastTime = 0;
    pause('pointer', false);
  }

  function resumeNativeScroll() {
    autoPosition = row.scrollLeft;
    lastTime = 0;
    pause('native-scroll', false);
  }

  row.addEventListener('wheel', (event) => {
    if (supportsRowScrollEnd && !event.ctrlKey && Math.abs(event.deltaX) > Math.abs(event.deltaY) && Math.abs(event.deltaX) > .5) pause('native-scroll', true);
  }, { passive: true });
  if (supportsRowScrollEnd) row.addEventListener('scrollend', resumeNativeScroll, { passive: true });
  row.addEventListener('scroll', () => {
    wrapManualScroll();
    autoPosition = row.scrollLeft;
  }, { passive: true });
  row.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    row.scrollLeft += (event.key === 'ArrowRight' ? 1 : -1) * Math.min(260, row.clientWidth * .45);
  });
  row.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    pointer = { id: event.pointerId, type: event.pointerType, x: event.clientX, y: event.clientY, lastX: event.clientX, moved: false, horizontal: false };
    if (event.pointerType === 'mouse') row.setPointerCapture(event.pointerId);
    pause('pointer', true);
  });
  addEventListener('pointermove', (event) => {
    if (!pointer || event.pointerId !== pointer.id) return;
    const distanceX = event.clientX - pointer.x;
    const distanceY = event.clientY - pointer.y;
    if (Math.hypot(distanceX, distanceY) > 5) pointer.moved = true;
    if (Math.abs(distanceX) > 5 && Math.abs(distanceX) > Math.abs(distanceY)) pointer.horizontal = true;
    if (pointer.type !== 'mouse') return;
    if (!pointer.moved) return;
    event.preventDefault();
    row.scrollLeft -= event.clientX - pointer.lastX;
    pointer.lastX = event.clientX;
    row.classList.add('is-dragging');
  }, { passive: false });
  addEventListener('pointerup', finishPointer);
  addEventListener('pointercancel', finishPointer);
  addEventListener('blur', () => finishPointer());
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) finishPointer();
    pause('hidden', document.hidden);
  });
  new IntersectionObserver(([entry]) => pause('offscreen', !entry.isIntersecting)).observe(clientSection);
  const resizeObserver = new ResizeObserver(measure);
  resizeObserver.observe(row);
  resizeObserver.observe(original);
  motionPreference.addEventListener('change', measure);
  document.fonts.ready.then(measure);
  measure();
}

clientRows.forEach(initClientMarquee);
