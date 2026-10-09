import './styles.css';
import { scenes, lifePhotos } from './photos.js';
import { renderLife, initLife } from './life.js';

const clients = [
  '布基纳法索电力公司', '沙特电力公司', '中国铜业集团', '方太集团',
  '瑞幸咖啡', '上汽集团', '远景能源', '某军工集团',
];

const steps = [
  { title: '学习', text: '从商科出发', image: scenes.library, note: 'LEARN', position: 'center' },
  { title: '创造', text: '用代码表达想法', image: scenes.coding, note: 'BUILD', position: 'center' },
  { title: '远行', text: '去陌生现场理解业务', image: lifePhotos[1].src, note: 'EXPLORE', position: 'center' },
  { title: '落地', text: '让 AI 真正进入工作', image: scenes.collaboration, note: 'DELIVER', position: 'center' },
];

const clientGroup = (names, duplicate = false) => `
  <div class="client-group" ${duplicate ? 'aria-hidden="true" inert' : ''}>
    ${names.map((name) => `<span>${name}</span><i aria-hidden="true"></i>`).join('')}
  </div>`;

document.querySelector('#app').innerHTML = `
  <a class="skip-link" href="#work">跳至做过的事情</a>
  <header class="site-header">
    <a class="brand" href="#home" aria-label="马兆峰，返回首页">马兆峰</a>
    <span class="brand-note">AI BUILDER <i>/</i> SHANGHAI</span>
    <nav aria-label="主导航">
      <a href="#journey"><span>02</span> JOURNEY</a>
      <a href="#work"><span>03</span> WORK</a>
      <a href="#life"><span>04</span> LIFE</a>
    </nav>
  </header>

  <main>
    <section id="home" class="hero" aria-labelledby="hero-title">
      <div class="hero-landscape" aria-hidden="true">
        <img src="${scenes.hero}" alt="" fetchpriority="high" decoding="async" />
      </div>
      <div class="hero-red" aria-hidden="true"></div>
      <div class="hero-copy">
        <span class="hero-rule" aria-hidden="true"></span>
        <h1 id="hero-title"><span>把复杂 AI<span class="red">，</span></span><span>做成可交付的</span><span>业务系统</span></h1>
        <div class="chapter-label"><b>01</b><i aria-hidden="true"></i><span>INTRODUCTION</span></div>
      </div>
      <a class="explore-link" href="#journey"><span class="explore-dot" aria-hidden="true">↓</span><span>向下探索 <small>SCROLL TO EXPLORE</small></span></a>
      <nav class="chapter-rail" aria-label="章节导航">
        <a href="#home" aria-label="01 首页" aria-current="location">01</a>
        <a href="#journey" aria-label="02 人生旅程">02</a>
        <a href="#work" aria-label="03 做过的事情">03</a>
        <a href="#life" aria-label="04 生活剪影">04</a>
      </nav>
      <p class="hero-footnote">BUSINESS → CODE → THE WORLD → AI</p>
    </section>

    <section id="journey" class="journey" aria-labelledby="journey-title">
      <div class="journey-heading section-inset reveal">
        <div class="journey-number"><span>02</span><i aria-hidden="true"></i></div>
        <h2 id="journey-title">THE JOURNEY</h2>
        <p>一条并不笔直的路</p>
        <span class="margin-note">CURIOSITY IS THE THREAD.</span>
      </div>
      <div class="journey-film reveal">
        <ol class="journey-stages">
          ${steps.map((step, index) => `
            <li class="journey-stage stage-${index + 1}">
              <img src="${step.image}" alt="" loading="lazy" decoding="async" style="object-position:${step.position}" />
              <span class="stage-note">${String(index + 1).padStart(2, '0')} / ${step.note}</span>
              <div class="stage-copy"><i aria-hidden="true"></i><h3>${step.title}</h3><p>${step.text}</p></div>
            </li>`).join('')}
        </ol>
        <svg class="journey-route" viewBox="0 0 1440 430" preserveAspectRatio="none" aria-hidden="true">
          <path pathLength="1" d="M-10 172 C15 177 28 183 43 188 S220 221 403 239 S620 257 763 282 S960 306 1123 282 S1320 284 1430 256" />
          <path class="route-arrow" d="m1414 249 17 7-12 13" />
        </svg>
      </div>
      <div class="journey-ending section-inset"><span class="eyebrow">ALWAYS A BEGINNER.</span><p>兴趣让我开始，好奇让我远行。</p></div>
    </section>

    <section id="work" class="work section-inset" aria-labelledby="work-title">
      <div class="work-heading reveal">
        <div class="section-kicker"><span>03 — WHAT I HAVE DONE</span><i aria-hidden="true"></i></div>
        <h2 id="work-title">做过的<span class="red">事情</span></h2>
        <p>从想法，到真实世界里的结果。</p>
      </div>
      <div class="work-grid">
        <article class="work-card work-code reveal">
          <img class="work-picture" src="${scenes.architecture}" alt="" loading="lazy" decoding="async" />
          <div class="work-content">
            <span class="work-index">01 <i aria-hidden="true"></i> A NEW LANGUAGE</span>
            <h3>商科<span class="red">转码</span></h3>
            <p><strong>7个月</strong>拿下阿里开发</p>
            <a class="text-link" href="https://github.com/Nirvan-a" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span><span class="sr-only">（新窗口打开）</span></a>
          </div>
        </article>
        <article class="work-card work-global reveal">
          <img class="work-picture" src="${lifePhotos[2].src}" alt="" loading="lazy" decoding="async" />
          <div class="global-sun" aria-hidden="true"></div>
          <div class="work-content">
            <span class="work-index">02 <i aria-hidden="true"></i> BEYOND BORDERS</span>
            <h3>海外商务<span class="red">拓展</span></h3>
            <p>非洲 / 沙特<br>单项目中标 <strong class="red">1 亿美元</strong></p>
            <span class="work-bottom">BUSINESS DEVELOPMENT</span>
          </div>
        </article>
        <article class="work-card work-products reveal">
          <div class="workflow-art" aria-hidden="true"><i></i><i></i><i></i><i></i><span></span></div>
          <div class="work-content">
            <span class="work-index">03 <i aria-hidden="true"></i> BUILT FROM SCRATCH</span>
            <h3>AI <span class="red">产品</span></h3>
            <p>手搓智能问数 · DeepResearch<br><span class="work-detail">Skill 前时代的工作流实践</span></p>
            <span class="work-bottom">QUESTION → RESEARCH → ANSWER</span>
          </div>
        </article>
        <article class="work-card work-advisory reveal">
          <img class="work-picture" src="${scenes.hero}" alt="" loading="lazy" decoding="async" />
          <div class="work-content">
            <span class="work-index">04 <i aria-hidden="true"></i> INTO THE REAL WORLD</span>
            <h3>AI <span class="red">方案</span>顾问</h3>
            <p>字节跳动<br>Agent 服务 · AI 项目落地</p>
            <span class="work-bottom">FROM POSSIBILITY TO PRACTICE</span>
          </div>
        </article>
      </div>
    </section>

    <section class="clients" aria-labelledby="clients-title">
      <div class="client-heading section-inset">
        <h2 id="clients-title">SELECTED CLIENTS <span>/</span> 服务企业</h2>
        <i aria-hidden="true"></i>
        <button class="motion-toggle client-toggle" type="button" aria-label="暂停企业滚动" aria-pressed="false"><span class="toggle-icon" aria-hidden="true">Ⅱ</span><span class="toggle-text">暂停</span></button>
      </div>
      ${[clients.slice(0, 4), clients.slice(4)].map((names, index) => `
        <div class="client-marquee ${index ? 'reverse' : ''}" tabindex="0" aria-label="服务企业，可横向滚动">
          <div class="client-track">${clientGroup(names)}${clientGroup(names, true)}</div>
        </div>`).join('')}
    </section>

    ${renderLife(lifePhotos)}
  </main>

  <footer class="site-footer section-inset">
    <div class="footer-top"><span class="eyebrow">THE STORY IS STILL BEING WRITTEN.</span><a href="#home" aria-label="返回顶部">BACK TO TOP ↑</a></div>
    <p>KEEP EXPLORING<span class="red">.</span></p>
    <div class="footer-bottom"><span>马兆峰 / AI BUILDER</span><a href="https://github.com/Nirvan-a" target="_blank" rel="noreferrer">继续认识我 · GitHub ↗</a><span>SHANGHAI, CHINA</span></div>
  </footer>
`;

initLife(lifePhotos);

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

const header = document.querySelector('.site-header');
const sections = [...document.querySelectorAll('main > section[id]')];
const navigation = [...document.querySelectorAll('.site-header nav a, .chapter-rail a')];
let framePending = false;
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
addEventListener('scroll', () => {
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(updateNavigation);
}, { passive: true });
addEventListener('resize', updateNavigation);
updateNavigation();

const clientSection = document.querySelector('.clients');
const clientToggle = document.querySelector('.client-toggle');
const clientRows = [...document.querySelectorAll('.client-marquee')];
let manuallyPaused = motionPreference.matches;
function updateClientMotion() {
  const paused = manuallyPaused || motionPreference.matches;
  clientSection.classList.toggle('is-paused', paused);
  clientToggle.setAttribute('aria-pressed', String(paused));
  clientToggle.setAttribute('aria-label', paused ? '继续企业滚动' : '暂停企业滚动');
  clientToggle.querySelector('.toggle-icon').textContent = paused ? '▶' : 'Ⅱ';
  clientToggle.querySelector('.toggle-text').textContent = paused ? '继续' : '暂停';
  clientToggle.disabled = motionPreference.matches;
}
clientToggle.addEventListener('click', () => {
  manuallyPaused = !manuallyPaused;
  if (!manuallyPaused) {
    clientRows.forEach((row) => {
      row.classList.remove('is-manual');
      row.scrollLeft = 0;
    });
  }
  updateClientMotion();
});
motionPreference.addEventListener('change', updateClientMotion);
updateClientMotion();

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
    track.style.animationDuration = `${width / (row.classList.contains('reverse') ? 27 : 31)}s`;
  });
}
new ResizeObserver(sizeClientLoops).observe(clientSection);
document.fonts.ready.then(sizeClientLoops);
sizeClientLoops();

// A focused or touched row becomes a native, manually scrollable list.
clientRows.forEach((row) => {
  const useManualScrolling = () => {
    row.classList.add('is-manual');
    manuallyPaused = true;
    updateClientMotion();
  };
  row.addEventListener('touchstart', useManualScrolling, { passive: true });
  row.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    useManualScrolling();
    row.scrollBy({ left: event.key === 'ArrowRight' ? 240 : -240, behavior: motionPreference.matches ? 'instant' : 'smooth' });
  });
});
