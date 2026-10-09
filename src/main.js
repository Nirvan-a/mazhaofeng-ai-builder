import './styles.css';

const ASSET_ROOT = '/app/app_17fqurz8tq0/runtime/api/v1/storage/object/bucket_aadkzdtnjwiby';

const clients = [
  '布基纳法索电力公司', '沙特电力公司', '中国铜业集团', '方太集团',
  '瑞幸咖啡', '上汽集团', '远景能源', '某军工集团'
];

const lifePhotos = [
  { src: `${ASSET_ROOT}/1878577700477978.jpg`, alt: '夜樱与街巷', meta: 'SPRING · NIGHT WALK', wide: true },
  { src: `${ASSET_ROOT}/1878577671180388.jpg`, alt: '西非城市街道', meta: 'WEST AFRICA · FIELD NOTES' },
  { src: `${ASSET_ROOT}/1878577700478010.jpg`, alt: '沙特城市俯瞰', meta: 'SAUDI ARABIA · 2024', wide: true },
  { src: `${ASSET_ROOT}/1878577700479050.jpg`, alt: '室内射击体验', meta: 'OFF DUTY · FOCUS' }
];

const clientGroup = (hidden = false) => `
  <div class="marquee-group" ${hidden ? 'aria-hidden="true"' : ''}>
    ${clients.map((name) => `<span>${name}</span><i aria-hidden="true"></i>`).join('')}
  </div>`;

const photoGroup = (items, hidden = false) => `
  <div class="photo-group" ${hidden ? 'aria-hidden="true"' : ''}>
    ${items.map((photo, index) => `
      <button class="photo-card ${photo.wide ? 'photo-wide' : ''}" data-photo="${lifePhotos.indexOf(photo)}" aria-label="查看${photo.alt}大图" ${hidden ? 'tabindex="-1"' : ''}>
        <img src="${photo.src}" alt="${hidden ? '' : photo.alt}" loading="lazy" />
        <span>${String(index + 1).padStart(2, '0')} / ${photo.meta}</span>
      </button>`).join('')}
  </div>`;

document.querySelector('#app').innerHTML = `
  <header class="site-header" aria-label="主导航">
    <a class="brand" href="#home">马兆峰</a>
    <nav>
      <a href="#journey">Journey</a>
      <a href="#work">Work</a>
      <a href="#life">Life</a>
    </nav>
    <span class="header-index">01—04</span>
  </header>

  <main>
    <section id="home" class="hero section-shell" aria-labelledby="hero-title">
      <div class="hero-bg" role="img" aria-label="黑白山谷与湖面"></div>
      <div class="hero-copy reveal">
        <p class="eyebrow">AI BUILDER / SHANGHAI</p>
        <h1 id="hero-title">把复杂 AI，<br />做成可交付的<br />业务系统</h1>
        <div class="hero-actions">
          <a class="primary-link" href="#journey">向下探索 <span>↓</span></a>
          <a href="https://github.com/Nirvan-a" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </div>
      <div class="chapter-index" aria-hidden="true"><b>01</b><span>02</span><span>03</span><span>04</span></div>
    </section>

    <section id="journey" class="journey section-shell" aria-labelledby="journey-title">
      <div class="section-head reveal">
        <div><span class="chapter-no">02</span><p class="eyebrow">THE JOURNEY</p></div>
        <h2 id="journey-title">一条并不笔直的路</h2>
        <p>兴趣让我开始，好奇让我远行。</p>
      </div>
      <div class="journey-stage">
        <div class="route-line" aria-hidden="true"><span></span></div>
        <article class="journey-step reveal"><b>01</b><h3>学习</h3><p>从商科出发，建立理解业务的底层视角。</p></article>
        <article class="journey-step reveal"><b>02</b><h3>创造</h3><p>自学编程，用代码把想法变成真实产品。</p></article>
        <article class="journey-step reveal"><b>03</b><h3>远行</h3><p>进入非洲与沙特，在陌生现场理解商业。</p></article>
        <article class="journey-step reveal"><b>04</b><h3>落地</h3><p>回到企业一线，让 AI 真正进入工作。</p></article>
      </div>
    </section>

    <section id="work" class="work section-shell" aria-labelledby="work-title">
      <div class="section-head reveal">
        <div><span class="chapter-no">03</span><p class="eyebrow">WHAT I HAVE DONE</p></div>
        <h2 id="work-title">做过的事情</h2>
        <p>从工程、业务到 AI 落地。</p>
      </div>
      <div class="work-grid">
        <article class="work-card reveal">
          <span>01 / ENGINEERING</span><h3>商科转码</h3><strong>7个月</strong><p>拿下阿里开发，完成从商业到工程的第一次跨越。</p>
          <a href="https://github.com/Nirvan-a" target="_blank" rel="noreferrer">查看 GitHub ↗</a>
        </article>
        <article class="work-card work-card-dark reveal">
          <span>02 / BUSINESS</span><h3>海外商务拓展</h3><strong>1亿美元</strong><p>深入非洲与沙特市场，推动单项目中标。</p>
        </article>
        <article class="work-card work-card-line reveal">
          <span>03 / AI PRODUCT</span><h3>AI 产品</h3><strong>0 → 1</strong><p>手搓智能问数与 DeepResearch 工作流，发生在 Skill 前时代。</p>
        </article>
        <article class="work-card work-card-red reveal">
          <span>04 / CONSULTING</span><h3>AI 方案顾问</h3><strong>Agent</strong><p>服务企业 Agent 建设与 AI 项目落地。</p>
        </article>
      </div>
    </section>

    <section class="clients" aria-labelledby="clients-title">
      <div class="client-label"><span id="clients-title">SERVICE EXPERIENCE</span><b>曾服务</b></div>
      <div class="marquee" tabindex="0" aria-label="服务企业滚动列表">
        <div class="marquee-track">${clientGroup()}${clientGroup(true)}</div>
      </div>
    </section>

    <section id="life" class="life section-shell" aria-labelledby="life-title">
      <div class="section-head reveal">
        <div><span class="chapter-no">04</span><p class="eyebrow">OFF DUTY</p></div>
        <h2 id="life-title">生活，不只一种现场</h2>
        <p>一些旅行、日常与好奇心留下的切片。</p>
      </div>
      <div class="photo-marquee photo-forward">
        <div class="photo-track">${photoGroup(lifePhotos)}${photoGroup(lifePhotos, true)}</div>
      </div>
      <div class="photo-marquee photo-reverse">
        <div class="photo-track">${photoGroup([...lifePhotos].reverse())}${photoGroup([...lifePhotos].reverse(), true)}</div>
      </div>
    </section>
  </main>

  <footer>
    <p>KEEP EXPLORING.</p>
    <a href="https://github.com/Nirvan-a" target="_blank" rel="noreferrer">继续认识我 ↗</a>
  </footer>

  <dialog class="lightbox" aria-label="生活剪影大图">
    <button class="lightbox-close" aria-label="关闭大图">×</button>
    <img alt="" />
    <p></p>
  </dialog>`;

const header = document.querySelector('.site-header');
const navLinks = [...document.querySelectorAll('nav a')];
const sections = [...document.querySelectorAll('main section[id]')];
const revealEls = [...document.querySelectorAll('.reveal')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55%' });
sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

const dialog = document.querySelector('.lightbox');
const dialogImage = dialog.querySelector('img');
const dialogCaption = dialog.querySelector('p');
let lastTrigger = null;
document.querySelectorAll('.photo-card').forEach((card) => {
  card.addEventListener('click', () => {
    const photo = lifePhotos[Number(card.dataset.photo)];
    if (!photo) return;
    lastTrigger = card;
    dialogImage.src = photo.src;
    dialogImage.alt = photo.alt;
    dialogCaption.textContent = photo.meta.replace(' · ', ' / ');
    dialog.showModal();
  });
});
document.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => lastTrigger?.focus());
