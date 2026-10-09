import './life.css';

const instances = new WeakMap();
const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));
const normalizePhotos = (photos) => (Array.isArray(photos) ? photos : [])
  .filter((photo) => photo && typeof photo.src === 'string' && photo.src.trim())
  .map((photo, index) => ({
    src: photo.src,
    alt: String(photo.alt || '生活剪影'),
    meta: String(photo.meta ?? ''),
    wide: typeof photo.wide === 'boolean' ? photo.wide : index % 2 === 0,
    aspectRatio: Number.isFinite(photo.aspectRatio) && photo.aspectRatio > 0 ? photo.aspectRatio : (photo.wide ? 1.52 : .74),
  }));
const number = (value) => String(value).padStart(2, '0');
const modulo = (value, length) => ((value % length) + length) % length;
const arrow = (direction) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d="${direction < 0 ? 'M14 5 7 12l7 7M7 12h13' : 'm10 5 7 7-7 7M17 12H4'}" stroke="currentColor" stroke-width="1.5"/></svg>`;

export function renderLife(photos) {
  const items = normalizePhotos(photos);

  return `
    <section id="life" class="life" aria-labelledby="life-title">
      <header class="life-heading">
        <p class="life-kicker"><span class="life-chapter">04</span><span>OFF THE CLOCK</span></p>
        <div class="life-heading-row">
          <h2 id="life-title">生活，不只一种现场</h2>
          <p class="life-intro">一些日常，一些好奇心。</p>
        </div>
      </header>
      ${items.length ? `
        <div class="life-toolbar">
          <p id="life-instruction" class="life-instruction">拖动浏览，点击放大<span> / DRAG TO EXPLORE</span></p>
          <div class="life-controls" role="group" aria-label="照片胶片控制">
            <button class="life-control life-step" type="button" data-life-back aria-label="向前浏览照片" aria-controls="life-reel">${arrow(-1)}</button>
            <button class="life-control life-toggle" type="button" data-life-toggle data-state="playing" aria-controls="life-reel">
              <span class="life-toggle-icon" aria-hidden="true"></span><span data-life-toggle-label>暂停滚动</span>
            </button>
            <button class="life-control life-step" type="button" data-life-forward aria-label="向后浏览照片" aria-controls="life-reel">${arrow(1)}</button>
          </div>
        </div>
        <div id="life-reel" class="life-reel" role="region" aria-label="生活照片，可用左右方向键浏览" aria-describedby="life-instruction" tabindex="0">
          <div class="life-track">
            <div class="life-group" data-life-original>
              ${items.map((photo, index) => `
                <figure class="life-frame ${photo.wide ? 'life-frame-wide' : 'life-frame-portrait'}" style="--frame-ratio:${photo.aspectRatio}">
                  <button class="life-photo" type="button" data-life-photo="${index}" aria-label="查看大图：${escapeHTML(photo.alt)}" aria-haspopup="dialog">
                    <img src="${escapeHTML(photo.src)}" alt="${escapeHTML(photo.alt)}" loading="lazy" decoding="async" draggable="false" />
                    <span class="life-photo-open" aria-hidden="true">查看大图 <span>+</span></span>
                  </button>
                  <figcaption class="life-caption">
                    <span class="life-photo-number">${number(index + 1)}</span>
                    <span class="life-caption-copy">
                      <span class="life-caption-title">${escapeHTML(photo.alt)}</span>
                      ${photo.meta ? `<span class="life-photo-meta">${escapeHTML(photo.meta)}</span>` : ''}
                    </span>
                  </figcaption>
                </figure>`).join('')}
            </div>
          </div>
        </div>
      ` : '<p class="life-empty">暂时没有可展示的生活照片。</p>'}
      <div class="life-colophon">
        <p>LIFE, IN FRAGMENTS.</p>
        <span>${number(items.length)} FRAMES <span aria-hidden="true">/</span> 生活剪影</span>
      </div>
      ${items.length ? `
        <dialog class="life-lightbox" aria-labelledby="life-lightbox-title" aria-describedby="life-lightbox-caption">
          <div class="life-lightbox-shell">
            <div class="life-lightbox-top">
              <h3 id="life-lightbox-title">生活剪影 <span aria-hidden="true">/</span> <span data-life-counter></span></h3>
              <button class="life-lightbox-button life-lightbox-close" type="button" data-life-close autofocus aria-label="关闭大图">
                <span>关闭</span><svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" stroke="currentColor" stroke-width="1.5"/></svg>
              </button>
            </div>
            <figure class="life-lightbox-figure">
              <img class="life-lightbox-image" data-life-full alt="" decoding="async" />
              <figcaption id="life-lightbox-caption" class="life-lightbox-caption" aria-live="polite" aria-atomic="true">
                <strong data-life-title></strong><span data-life-meta></span>
              </figcaption>
            </figure>
            <div class="life-lightbox-bottom">
              <button class="life-lightbox-button" type="button" data-life-previous aria-label="上一张照片">${arrow(-1)}</button>
              <p>方向键切换 <span aria-hidden="true">/</span> Esc 关闭</p>
              <button class="life-lightbox-button" type="button" data-life-next aria-label="下一张照片">${arrow(1)}</button>
            </div>
          </div>
        </dialog>` : ''}
    </section>`;
}

export function initLife(photos) {
  const root = document.querySelector('section#life.life');
  if (!root) return () => {};
  if (instances.has(root)) return instances.get(root);

  const items = normalizePhotos(photos);
  const reel = root.querySelector('.life-reel');
  if (!reel || !items.length) return () => {};

  const track = root.querySelector('.life-track');
  const original = root.querySelector('[data-life-original]');
  const originals = [...original.querySelectorAll('.life-photo')];
  const dialog = root.querySelector('.life-lightbox');
  const fullImage = dialog.querySelector('[data-life-full]');
  const toggle = root.querySelector('[data-life-toggle]');
  const toggleLabel = toggle.querySelector('[data-life-toggle-label]');
  const back = root.querySelector('[data-life-back]');
  const forward = root.querySelector('[data-life-forward]');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const controller = new AbortController();
  const listen = (target, event, handler, options = {}) => {
    target.addEventListener(event, handler, { ...options, signal: controller.signal });
  };
  const copies = [-1, 1].map(() => {
    const copy = original.cloneNode(true);
    copy.removeAttribute('data-life-original');
    copy.setAttribute('data-life-copy', '');
    copy.setAttribute('aria-hidden', 'true');
    copy.setAttribute('inert', '');
    copy.hidden = true;
    copy.querySelectorAll('button').forEach((button) => { button.tabIndex = -1; });
    copy.querySelectorAll('img').forEach((image) => { image.alt = ''; });
    return copy;
  });
  track.prepend(copies[0]);
  track.append(copies[1]);

  const pauses = new Set(['layout']);
  let span = 0;
  let looping = false;
  let frame = 0;
  let lastTime = 0;
  let autoPosition = 0;
  let manualTimer = 0;
  let pointer = null;
  let suppressClickUntil = 0;
  let current = 0;
  let lastTrigger = null;
  let bodySnapshot = null;
  let disposed = false;

  function animate(time) {
    frame = 0;
    if (!root.isConnected) {
      dispose();
      return;
    }
    if (pauses.size) return;
    if (lastTime) {
      autoPosition += Math.min(time - lastTime, 64) * 0.022;
      if (autoPosition >= span * 2) autoPosition -= span;
      reel.scrollLeft = autoPosition;
    } else {
      autoPosition = reel.scrollLeft;
    }
    lastTime = time;
    frame = requestAnimationFrame(animate);
  }

  function syncPlayback() {
    const reduced = motion.matches;
    toggle.disabled = reduced || !looping;
    toggle.dataset.state = reduced ? 'reduced' : pauses.has('user') ? 'paused' : 'playing';
    toggleLabel.textContent = reduced ? '已关闭自动滚动' : !looping ? '全部照片已显示' : pauses.has('user') ? '继续滚动' : '暂停滚动';
    toggle.title = reduced ? '系统已启用减少动态效果，可手动浏览照片' : '悬停或键盘聚焦时自动暂停';
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

  function holdManual() {
    pause('manual', true);
    window.clearTimeout(manualTimer);
    manualTimer = window.setTimeout(() => pause('manual', false), 1600);
  }

  function wrapScroll() {
    if (!looping) return;
    const left = reel.scrollLeft;
    if (left < span - 1 || left >= span * 2) {
      reel.scrollLeft = span + modulo(left - span, span);
    }
  }

  function measure() {
    const relative = looping ? reel.scrollLeft - span : reel.scrollLeft;
    span = original.getBoundingClientRect().width;
    looping = !motion.matches && span > reel.clientWidth && span > 0;
    copies.forEach((copy) => { copy.hidden = !looping; });
    reel.scrollLeft = looping ? span + modulo(relative, span) : Math.max(0, relative);
    const canScroll = reel.scrollWidth > reel.clientWidth + 1;
    back.disabled = !canScroll;
    forward.disabled = !canScroll;
    pauses.delete('layout');
    pause('reduced', motion.matches);
    pause('fits', !looping);
    lastTime = 0;
  }

  function step(direction) {
    holdManual();
    const relative = looping ? reel.scrollLeft - span : reel.scrollLeft;
    const groupLeft = original.getBoundingClientRect().left;
    const stops = originals.map((button) => button.getBoundingClientRect().left - groupLeft);
    let next = direction > 0
      ? stops.find((stop) => stop > relative + 2)
      : [...stops].reverse().find((stop) => stop < relative - 2);
    if (next === undefined) {
      next = direction > 0 ? span : looping ? stops[stops.length - 1] - span : 0;
    }
    reel.scrollLeft = (looping ? span : 0) + next;
    wrapScroll();
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
    fullImage.src = photo.src;
    fullImage.alt = photo.alt;
    dialog.querySelector('[data-life-title]').textContent = photo.alt;
    dialog.querySelector('[data-life-meta]').textContent = photo.meta;
    dialog.querySelector('[data-life-counter]').textContent = `${number(current + 1)} / ${number(items.length)}`;
  }

  function openPhoto(index) {
    if (!items[index] || dialog.open) return;
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
    unlockBody();
    if (!disposed && lastTrigger?.isConnected) lastTrigger.focus({ preventScroll: true });
    pause('dialog', false);
  }

  function finishPointer(event) {
    if (!pointer || event.pointerId !== pointer.id) return;
    if (pointer.moved || event.type === 'pointercancel') suppressClickUntil = performance.now() + 500;
    if (reel.hasPointerCapture(pointer.id)) reel.releasePointerCapture(pointer.id);
    pointer = null;
    root.classList.remove('life-is-dragging');
    holdManual();
    pause('pointer', false);
  }

  listen(toggle, 'click', () => pause('user', !pauses.has('user')));
  listen(back, 'click', () => step(-1));
  listen(forward, 'click', () => step(1));
  listen(root, 'pointerenter', (event) => {
    if (event.pointerType === 'mouse') pause('hover', true);
  });
  listen(root, 'pointerleave', (event) => {
    if (event.pointerType === 'mouse') pause('hover', false);
  });
  listen(root, 'focusin', (event) => {
    pause('focus', event.target === reel || original.contains(event.target) || dialog.contains(event.target));
    if (original.contains(event.target)) {
      queueMicrotask(() => {
        // Native focus scrolling must not wrap the focused original out of view.
        if (!disposed && looping && reel.scrollLeft < span) reel.scrollLeft = span;
      });
    }
  });
  listen(root, 'focusout', () => {
    queueMicrotask(() => {
      if (!disposed) pause('focus', document.activeElement === reel || original.contains(document.activeElement) || dialog.contains(document.activeElement));
    });
  });
  listen(reel, 'wheel', holdManual, { passive: true });
  listen(reel, 'scroll', () => {
    wrapScroll();
    if (pauses.has('manual')) holdManual();
  }, { passive: true });
  listen(reel, 'keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      step(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  listen(reel, 'dragstart', (event) => event.preventDefault());
  listen(reel, 'pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    pointer = { id: event.pointerId, type: event.pointerType, x: event.clientX, y: event.clientY, lastX: event.clientX, moved: false };
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
  listen(dialog.querySelector('[data-life-close]'), 'click', () => dialog.close());
  listen(dialog.querySelector('[data-life-previous]'), 'click', () => showPhoto(current - 1));
  listen(dialog.querySelector('[data-life-next]'), 'click', () => showPhoto(current + 1));
  listen(dialog, 'keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  listen(dialog, 'click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  listen(dialog, 'close', finishDialog);
  listen(document, 'visibilitychange', () => pause('hidden', document.hidden));
  listen(motion, 'change', measure);
  pause('hidden', document.hidden);
  pause('focus', root.contains(document.activeElement));

  const resizeObserver = new ResizeObserver(measure);
  resizeObserver.observe(reel);
  const intersectionObserver = new IntersectionObserver(([entry]) => pause('offscreen', !entry.isIntersecting));
  intersectionObserver.observe(root);

  function dispose() {
    if (disposed) return;
    disposed = true;
    if (dialog.open) dialog.close();
    unlockBody();
    controller.abort();
    cancelAnimationFrame(frame);
    window.clearTimeout(manualTimer);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    copies.forEach((copy) => copy.remove());
    root.classList.remove('life-is-dragging');
    instances.delete(root);
  }

  instances.set(root, dispose);
  measure();
  return dispose;
}
