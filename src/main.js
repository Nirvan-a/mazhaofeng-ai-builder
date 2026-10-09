import './styles.css';

const ASSET_ROOT = '/app/app_17fqurz8tq0/runtime/api/v1/storage/object/bucket_aadkzdtnjwiby';

const approvedVisuals = {
  hero: `${ASSET_ROOT}/1878580067109017.png`,
  journey: `${ASSET_ROOT}/1878579962834955.png`,
  work: `${ASSET_ROOT}/1878579962834971.png`
};

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
  <header class="site-header mobile-only" aria-label="主导航">
    <a class="brand" href="#home">马兆峰</a>
    <nav>
      <a href="#journey">Journey</a>
      <a href="#work">Work</a>
      <a href="#life">Life</a>
    </nav>
    <span class="header-index">01—04</span>
  </header>

  <main>
    <section id="home" class="approved-section approved-hero" aria-labelledby="hero-title">
      <img class="approved-visual" src="${approvedVisuals.hero}" alt="" fetchpriority="high" />
      <div class="sr-only">
        <h1 id="hero-title">把复杂 AI，做成可交付的业务系统</h1>
        <p>马兆峰，AI Builder，上海。</p>
      </div>
      <a class="visual-hotspot hero-explore" href="#journey" aria-label="向下探索 THE JOURNEY"></a>
      <a class="visual-hotspot hero-nav-02" href="#journey" aria-label="前往 THE JOURNEY"></a>
      <a class="visual-hotspot hero-nav-03" href="#work" aria-label="前往做过的事情"></a>
    </section>

    <section id="journey" class="approved-section" aria-labelledby="journey-title">
      <img class="approved-visual" src="${approvedVisuals.journey}" alt="" loading="eager" />
      <div class="sr-only">
        <h2 id="journey-title">THE JOURNEY，一条并不笔直的路</h2>
        <ol><li>学习：从商科出发</li><li>创造：用代码表达想法</li><li>远行：去陌生现场理解业务</li><li>落地：让 AI 真正进入工作</li></ol>
        <p>兴趣让我开始，好奇让我远行。</p>
      </div>
    </section>

    <section id="work" class="approved-section" aria-labelledby="work-title">
      <img class="approved-visual" src="${approvedVisuals.work}" alt="" loading="lazy" />
      <div class="sr-only">
        <h2 id="work-title">做过的事情</h2>
        <ol>
          <li>商科转码，7个月拿下阿里开发</li>
          <li>海外商务拓展，非洲与沙特，单项目中标1亿美元</li>
          <li>AI产品，智能问数与DeepResearch，Skill前时代的工作流实践</li>
          <li>AI方案顾问，Agent服务与AI项目落地</li>
        </ol>
        <p id="clients-title">服务企业：${clients.join('、')}</p>
      </div>
      <a class="visual-hotspot work-github" href="https://github.com/Nirvan-a" target="_blank" rel="noreferrer" aria-label="打开马兆峰的 GitHub"></a>
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
