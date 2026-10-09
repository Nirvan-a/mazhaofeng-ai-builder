import './life.css';

const instances = new WeakMap();
const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));
const normalizePhotos = (photos) => (Array.isArray(photos) ? photos : [])
  .filter((photo) => photo && typeof photo.src === 'string' && photo.src.trim())
  .map((photo) => ({
    src: photo.src,
    fullSrc: typeof photo.fullSrc === 'string' && photo.fullSrc.trim() ? photo.fullSrc : photo.src,
    alt: String(photo.alt || '生活剪影'),
    meta: String(photo.meta ?? ''),
    aspectRatio: Number.isFinite(photo.aspectRatio) && photo.aspectRatio > 0 ? photo.aspectRatio : (photo.wide === false ? .75 : 4 / 3),
  }));
const number = (value) => String(value).padStart(2, '0');
const modulo = (value, length) => ((value % length) + length) % length;

export function renderLife(photos) {
  const items = normalizePhotos(photos);

  return `
    <section id="life" class="page life" aria-labelledby="life-title">
      <div class="life-heading">
        <p class="life-kicker"><span class="life-chapter">04</span><span>OFF THE CLOCK</span></p>
        <div class="life-heading-row">
          <h2 id="life-title">生活，不只一种现场</h2>
          <p class="life-intro">一些日常，一些好奇<span class="life-intro-dot">。</span></p>
        </div>
      </div>
      ${items.length ? `
        <div id="life-reel" class="life-reel" role="region" aria-label="生活照片，可用左右方向键浏览" tabindex="0">
          <div class="life-track">
            <div class="life-group" data-life-original>
              ${items.map((photo, index) => `
                <figure class="life-frame" style="--frame-ratio:${photo.aspectRatio}">
                  <button class="life-photo" type="button" data-life-photo="${index}" aria-label="查看大图：${escapeHTML(photo.alt)}" aria-haspopup="dialog">
                    <img data-src="${escapeHTML(photo.src)}" alt="${escapeHTML(photo.alt)}" decoding="async" fetchpriority="low" draggable="false" />
                  </button>
                  <figcaption class="life-caption">
                    <span class="life-photo-number">${number(index + 1)}</span>
                    <span class="life-caption-title">${escapeHTML(photo.alt)}</span>
                  </figcaption>
                </figure>`).join('')}
            </div>
          </div>
        </div>
      ` : '<p class="life-empty">暂时没有可展示的生活照片。</p>'}
      <footer class="life-ending" aria-label="结束语">
        <p class="life-outro">KEEP EXPLORING<span>.</span></p>
        <button class="life-wechat" type="button" data-wechat-copy="M15378955467" aria-label="复制微信号 M15378955467">
          <svg fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke="currentColor" stroke-linejoin="round" d="M16.5 9.5c0 -3.314 -3.358 -6 -7.5 -6 -4.142 0 -7.5 2.686 -7.5 6 0 1.891 1.094 3.578 2.803 4.678L4 17l3.302 -1.654a9.35 9.35 0 0 0 3.288 0.02" stroke-width="1"></path>
            <path stroke="currentColor" stroke-linejoin="round" d="M6.5 8.5a0.5 0.5 0 0 1 0 -1" stroke-width="1"></path>
            <path stroke="currentColor" stroke-linejoin="round" d="M6.5 8.5a0.5 0.5 0 0 0 0 -1" stroke-width="1"></path>
            <path stroke="currentColor" stroke-linejoin="round" d="M11.5 8.5a0.5 0.5 0 0 1 0 -1" stroke-width="1"></path>
            <path stroke="currentColor" stroke-linejoin="round" d="M11.5 8.5a0.5 0.5 0 0 0 0 -1" stroke-width="1"></path>
            <path stroke="currentColor" stroke-linejoin="round" d="M14.25 13.5a0.25 0.25 0 1 1 0 -0.5" stroke-width="1"></path>
            <path stroke="currentColor" stroke-linejoin="round" d="M14.25 13.5a0.25 0.25 0 1 0 0 -0.5" stroke-width="1"></path>
            <path stroke="currentColor" stroke-linejoin="round" d="M18.75 13.5a0.25 0.25 0 1 1 0 -0.5" stroke-width="1"></path>
            <path stroke="currentColor" stroke-linejoin="round" d="M18.75 13.5a0.25 0.25 0 1 0 0 -0.5" stroke-width="1"></path>
            <path stroke="currentColor" stroke-linejoin="round" d="M10.5 14.5c0 2.761 2.686 5 6 5 0.34 0 0.675 -0.024 1 -0.07L21 21l-0.5 -2.773c1.227 -0.916 2 -2.246 2 -3.727 0 -2.761 -2.686 -5 -6 -5s-6 2.239 -6 5Z" stroke-width="1"></path>
          </svg>
          <span class="life-copy-toast" role="status" aria-live="polite"></span>
        </button>
        <div class="life-colophon">
          <p class="life-signature">马兆峰 <span>/ AI BUILDER</span></p>
          <span class="life-location">Shanghai</span>
          <a class="life-back" href="#home">期待认识新同学 ⬆️</a>
        </div>
      </footer>
      ${items.length ? `
        <dialog class="life-lightbox" aria-label="图片预览，点击图片或背景关闭">
          <div class="life-lightbox-shell">
            <img class="life-lightbox-preview" data-life-preview alt="" decoding="async" />
            <img class="life-lightbox-image" data-life-full alt="" decoding="async" fetchpriority="high" />
          </div>
        </dialog>` : ''}
    </section>`;
}

export function initLife(photos) {
  const root = document.querySelector('section#life.life');
  if (!root) return () => {};
  if (instances.has(root)) return instances.get(root);

  const controller = new AbortController();
  const listen = (target, event, handler, options = {}) => {
    target.addEventListener(event, handler, { ...options, signal: controller.signal });
  };
  let copyTimer = 0;
  const copyButton = root.querySelector('[data-wechat-copy]');
  listen(copyButton, 'click', async () => {
    const value = copyButton.dataset.wechatCopy;
    let copied = false;
    try {
      await navigator.clipboard.writeText(value);
      copied = true;
    } catch {
      const helper = document.createElement('textarea');
      helper.value = value;
      helper.setAttribute('readonly', '');
      helper.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.append(helper);
      helper.select();
      copied = document.execCommand('copy');
      helper.remove();
    }
    if (!copied) return;
    const toast = copyButton.querySelector('.life-copy-toast');
    toast.textContent = '已复制';
    copyButton.classList.remove('is-copied');
    void copyButton.offsetWidth;
    copyButton.classList.add('is-copied');
    window.clearTimeout(copyTimer);
    copyTimer = window.setTimeout(() => {
      copyButton.classList.remove('is-copied');
      toast.textContent = '';
    }, 1400);
  });

  const items = normalizePhotos(photos);
  const reel = root.querySelector('.life-reel');
  if (!reel || !items.length) {
    const disposeEmpty = () => {
      controller.abort();
      window.clearTimeout(copyTimer);
      instances.delete(root);
    };
    instances.set(root, disposeEmpty);
    return disposeEmpty;
  }

  const track = root.querySelector('.life-track');
  const original = root.querySelector('[data-life-original]');
  const originals = [...original.querySelectorAll('.life-photo')];
  const dialog = root.querySelector('.life-lightbox');
  const previewImage = dialog.querySelector('[data-life-preview]');
  const fullImage = dialog.querySelector('[data-life-full]');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const copies = [];
  const pauses = new Set(['layout', 'offscreen']);
  let span = 0;
  let looping = false;
  let frame = 0;
  let lastTime = 0;
  let autoPosition = 0;
  let manualTimer = 0;
  let pointer = null;
  let suppressClickUntil = 0;
  let current = 0;
  let imageRequest = 0;
  let lastTrigger = null;
  let reelSnapshot = 0;
  let bodySnapshot = null;
  let imagesHydrated = false;
  let disposed = false;

  function animate(time) {
    frame = 0;
    if (!root.isConnected) {
      dispose();
      return;
    }
    if (pauses.size) return;
    if (lastTime) {
      autoPosition = span + modulo(autoPosition - span + Math.min(time - lastTime, 64) * .045, span);
      reel.scrollLeft = autoPosition;
    } else {
      autoPosition = reel.scrollLeft;
    }
    lastTime = time;
    frame = requestAnimationFrame(animate);
  }

  function syncPlayback() {
    if (pauses.size || disposed) {
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

  function holdManual(delay = 120) {
    pause('manual', true);
    window.clearTimeout(manualTimer);
    manualTimer = window.setTimeout(() => {
      autoPosition = reel.scrollLeft;
      pause('manual', false);
    }, delay);
  }

  function wrapScroll() {
    if (!looping || original.contains(document.activeElement)) return;
    const left = reel.scrollLeft;
    if (left < span - 1 || left >= span * 2) {
      reel.scrollLeft = span + modulo(left - span, span);
    }
  }

  function hydrateImages(scope = track) {
    scope.querySelectorAll('img[data-src]').forEach((image) => {
      const reveal = () => image.classList.add('is-loaded');
      image.addEventListener('load', reveal, { once: true });
      image.src = image.dataset.src;
      image.removeAttribute('data-src');
      if (image.complete) reveal();
    });
  }

  function measure() {
    const relative = looping ? reel.scrollLeft - span : reel.scrollLeft;
    span = original.getBoundingClientRect().width;
    looping = !motion.matches && span > 0;
    // Keep one group on either side; add more only if the set is shorter than the viewport.
    const count = looping ? Math.max(2, Math.ceil(reel.clientWidth / span) + 1) : 0;
    while (copies.length < count) {
      const copy = original.cloneNode(true);
      copy.removeAttribute('data-life-original');
      copy.setAttribute('aria-hidden', 'true');
      copy.setAttribute('inert', '');
      copy.querySelectorAll('button').forEach((button) => { button.tabIndex = -1; });
      copy.querySelectorAll('img').forEach((image) => { image.alt = ''; });
      if (!copies.length) track.prepend(copy);
      else track.append(copy);
      if (imagesHydrated) hydrateImages(copy);
      copies.push(copy);
    }
    copies.forEach((copy, index) => { copy.hidden = index >= count; });
    reel.scrollLeft = looping ? span + modulo(relative, span) : Math.max(0, relative);
    pauses.delete('layout');
    pause('static', !looping);
    lastTime = 0;
  }

  function preserveRatio(image) {
    if (!image.naturalWidth || !image.naturalHeight) return;
    const index = image.closest('[data-life-photo]').dataset.lifePhoto;
    track.querySelectorAll(`[data-life-photo="${index}"]`).forEach((button) => {
      button.parentElement.style.setProperty('--frame-ratio', image.naturalWidth / image.naturalHeight);
    });
  }

  function lockBody() {
    const body = document.body;
    const properties = ['overflow', 'position', 'top', 'left', 'width', 'padding-right'];
    bodySnapshot = {
      x: window.scrollX,
      y: window.scrollY,
      styles: properties.map((property) => [property, body.style.getPropertyValue(property), body.style.getPropertyPriority(property)]),
    };
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    const padding = parseFloat(getComputedStyle(body).paddingRight) || 0;
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `${-bodySnapshot.y}px`;
    body.style.left = `${-bodySnapshot.x}px`;
    body.style.width = '100%';
    if (gutter > 0) body.style.paddingRight = `${padding + gutter}px`;
  }

  function unlockBody() {
    if (!bodySnapshot) return;
    const { styles, x, y } = bodySnapshot;
    styles.forEach(([property, value, priority]) => {
      if (value) document.body.style.setProperty(property, value, priority);
      else document.body.style.removeProperty(property);
    });
    bodySnapshot = null;
    window.scrollTo({ left: x, top: y, behavior: 'instant' });
  }

  function showPhoto(index) {
    current = modulo(index, items.length);
    const photo = items[current];
    const request = ++imageRequest;
    fullImage.classList.remove('is-ready');
    previewImage.src = photo.src;
    previewImage.alt = photo.alt;
    fullImage.src = photo.fullSrc;
    fullImage.alt = photo.alt;
    const reveal = () => {
      if (request === imageRequest && items[current] === photo && fullImage.naturalWidth) {
        fullImage.classList.add('is-ready');
      }
    };
    fullImage.decode().then(reveal).catch(() => {
      if (fullImage.complete) reveal();
      else fullImage.addEventListener('load', reveal, { once: true });
    });
  }

  function openPhoto(index) {
    if (!items[index] || dialog.open) return;
    reelSnapshot = reel.scrollLeft;
    lastTrigger = originals[index];
    // Inert loop copies are visual only; return focus to their real counterpart.
    const bounds = lastTrigger.getBoundingClientRect();
    const viewport = reel.getBoundingClientRect();
    if (bounds.right < viewport.left || bounds.left > viewport.right) {
      const padding = parseFloat(getComputedStyle(reel).paddingLeft) || 0;
      reel.scrollLeft += bounds.left - viewport.left - padding;
    }
    pause('dialog', true);
    showPhoto(index);
    lockBody();
    dialog.showModal();
  }

  function finishDialog() {
    imageRequest += 1;
    fullImage.classList.remove('is-ready');
    fullImage.removeAttribute('src');
    previewImage.removeAttribute('src');
    unlockBody();
    if (!disposed && lastTrigger?.isConnected) lastTrigger.focus({ preventScroll: true });
    reel.scrollLeft = reelSnapshot;
    pause('dialog', false);
  }

  function finishPointer(event = {}) {
    const activePointer = pointer;
    if (!activePointer || (event.pointerId != null && event.pointerId !== activePointer.id)) return;
    pointer = null;
    if (activePointer.moved || event.type === 'pointercancel') suppressClickUntil = performance.now() + 500;
    if (reel.hasPointerCapture(activePointer.id)) reel.releasePointerCapture(activePointer.id);
    root.classList.remove('life-is-dragging');
    holdManual(80);
    pause('pointer', false);
  }

  listen(reel, 'wheel', () => holdManual(120), { passive: true });
  listen(reel, 'scroll', () => {
    wrapScroll();
    if (pauses.has('manual')) holdManual(120);
  }, { passive: true });
  listen(reel, 'keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      holdManual(100);
      reel.scrollLeft += (event.key === 'ArrowLeft' ? -1 : 1) * reel.clientWidth * .6;
    }
  });
  listen(reel, 'dragstart', (event) => event.preventDefault());
  listen(reel, 'pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    pointer = { id: event.pointerId, type: event.pointerType, x: event.clientX, y: event.clientY, lastX: event.clientX, moved: false };
    reel.setPointerCapture(event.pointerId);
    pause('pointer', true);
  });
  listen(window, 'pointermove', (event) => {
    if (!pointer || event.pointerId !== pointer.id) return;
    const distanceX = event.clientX - pointer.x;
    const distanceY = event.clientY - pointer.y;
    if (Math.hypot(distanceX, distanceY) > 8) pointer.moved = true;
    if (pointer.type === 'mouse' && pointer.moved && Math.abs(distanceX) > Math.abs(distanceY)) {
      if (!reel.hasPointerCapture(pointer.id)) reel.setPointerCapture(pointer.id);
      event.preventDefault();
      reel.scrollLeft -= event.clientX - pointer.lastX;
      root.classList.add('life-is-dragging');
    }
    pointer.lastX = event.clientX;
  }, { passive: false });
  listen(window, 'pointerup', finishPointer);
  listen(window, 'pointercancel', finishPointer);
  listen(window, 'blur', () => finishPointer());
  listen(reel, 'lostpointercapture', finishPointer);
  listen(reel, 'click', (event) => {
    if (event.detail > 0 && performance.now() < suppressClickUntil) {
      event.preventDefault();
      return;
    }
    let button = event.target.closest('[data-life-photo]');
    // Browsers retarget pointer events on inert copies to the scroll container.
    if (!button && event.detail > 0) {
      button = [...track.querySelectorAll('.life-photo')].find((candidate) => {
        const rect = candidate.getBoundingClientRect();
        return rect.width && event.clientX >= rect.left && event.clientX <= rect.right
          && event.clientY >= rect.top && event.clientY <= rect.bottom;
      });
    }
    if (button) openPhoto(Number(button.dataset.lifePhoto));
  });
  listen(dialog, 'click', () => dialog.close());
  listen(dialog, 'close', finishDialog);
  listen(document, 'visibilitychange', () => {
    if (document.hidden) finishPointer();
    pause('hidden', document.hidden);
  });
  listen(motion, 'change', measure);
  listen(original, 'load', (event) => preserveRatio(event.target), { capture: true });
  original.querySelectorAll('img').forEach(preserveRatio);
  pause('hidden', document.hidden);

  const resizeObserver = new ResizeObserver(measure);
  resizeObserver.observe(reel);
  resizeObserver.observe(original);
  const intersectionObserver = new IntersectionObserver(([entry]) => pause('offscreen', !entry.isIntersecting));
  intersectionObserver.observe(root);
  const imageObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    imagesHydrated = true;
    hydrateImages();
    imageObserver.disconnect();
  }, { rootMargin: '0px 0px -5% 0px' });
  imageObserver.observe(root);

  function dispose() {
    if (disposed) return;
    disposed = true;
    if (dialog.open) dialog.close();
    unlockBody();
    controller.abort();
    cancelAnimationFrame(frame);
    window.clearTimeout(manualTimer);
    window.clearTimeout(copyTimer);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    imageObserver.disconnect();
    copies.forEach((copy) => copy.remove());
    root.classList.remove('life-is-dragging');
    instances.delete(root);
  }

  instances.set(root, dispose);
  measure();
  return dispose;
}
