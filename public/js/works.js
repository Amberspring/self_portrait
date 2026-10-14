(function () {
  'use strict';

  function isEn() {
    return window.__I18N_LANG === 'en' || (typeof localStorage !== 'undefined' && localStorage.getItem('flora_lang') === 'en');
  }

  var FLORA_LIST = (window.FLORA_PROJECTS && window.FLORA_PROJECTS.length)
    ? window.FLORA_PROJECTS
    : [];

  // Preserve the cube navigation physics: index 0 followed by reversed slice
  var PROJECTS = FLORA_LIST.slice();
  if (PROJECTS.length > 1) {
    PROJECTS = [PROJECTS[0]].concat(PROJECTS.slice(1).reverse());
  }

  var TOTAL = PROJECTS.length || 1;
  var cube = document.getElementById('cube');
  var faces = document.querySelectorAll('.cube-face');

  var BASE_ANGLES = [0, -90, -180, 90];
  var halfH = 0;

  function frontFace(r) {
    return (4 - (((r % 4) + 4) % 4)) % 4;
  }
  function wrapProject(r) {
    return ((r % TOTAL) + TOTAL) % TOTAL;
  }

  function measureCube() {
    var vp = document.getElementById('cube-viewport');
    if (!vp) return;
    halfH = vp.offsetHeight / 2;
    for (var i = 0; i < 4; i++) {
      if (faces[i]) {
        faces[i].style.transform = 'rotateX(' + BASE_ANGLES[i] + 'deg) translateZ(' + halfH + 'px)';
      }
    }
    setCubeAngle(displayAngle);
    layoutRulers();
  }

  function setCubeAngle(deg) {
    if (cube) {
      cube.style.transform = 'translateZ(' + (-halfH) + 'px) rotateX(' + deg + 'deg)';
    }
  }

  var faceOwner = [-1, -1, -1, -1];

  function populateFace(fIdx, pIdx) {
    if (faceOwner[fIdx] === pIdx) return;
    faceOwner[fIdx] = pIdx;
    var proj = PROJECTS[pIdx];
    if (!proj || !faces[fIdx]) return;

    var en = isEn();
    var loc = en ? proj.en : proj.zh;
    var isLeft = pIdx % 2 === 0;

    var projTitle = en ? proj.title : (proj.titleZh || proj.title);
    var categoryText = en ? (proj.natureEn || 'PROJECT') : (proj.natureZh || '项目实践');

    faces[fIdx].dataset.pIdx = pIdx;
    faces[fIdx].dataset.projId = proj.id;

    faces[fIdx].innerHTML =
      '<div class="face-content ' + (isLeft ? 'layout-left' : 'layout-right') + '">' +
        '<div class="face-cover" data-proj-id="' + proj.id + '">' +
          '<div class="face-name">' + projTitle + '</div>' +
          '<img src="' + proj.cover + '" alt="' + projTitle + '" decoding="async">' +
        '</div>' +
        '<div class="face-info">' +
          '<div class="face-info-bg"><img src="' + proj.cover + '" alt="" decoding="async"></div>' +
          '<div class="face-info-content">' +
            '<div class="face-meta">' +
              '<span class="face-nature">' + categoryText + '</span>' +
              '<span class="face-meta-sep">/</span>' +
              '<span class="face-year">' + proj.year + '</span>' +
            '</div>' +
            '<div class="face-desc">' + loc.desc + '</div>' +
            '<div class="face-brief">' +
              (loc.problem ? '<div class="face-brief-row"><span class="face-brief-k">' + (en ? 'Problem' : '问题') + '</span><span class="face-brief-v">' + loc.problem + '</span></div>' : '') +
              (loc.methods ? '<div class="face-brief-row"><span class="face-brief-k">' + (en ? 'Method' : '方法') + '</span><span class="face-brief-v">' + loc.methods + '</span></div>' : '') +
              (loc.outcomes ? '<div class="face-brief-row"><span class="face-brief-k">' + (en ? 'Outcome' : '成果') + '</span><span class="face-brief-v">' + loc.outcomes + '</span></div>' : '') +
            '</div>' +
            '<div class="face-cta">' +
              '<span class="face-cta-label">' + (en ? 'View Case Study & Artifacts 🡲' : '查看完整交付物与 Case Study 🡲') + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function syncFaces(r) {
    for (var offset = -1; offset <= 2; offset++) {
      populateFace(frontFace(r + offset), wrapProject(r + offset));
    }
  }

  // Rulers
  var RULER_SEG = 100;
  var RULER_TICKS_PER_SEG = 10;
  var RULER_TICK_SPACING = RULER_SEG / RULER_TICKS_PER_SEG;
  var RULER_BOW = 48;
  var RULER_W = 80;
  var RULER_PAD = 4;

  var rulerLeftCanvas = document.getElementById('ruler-left');
  var rulerRightCanvas = document.getElementById('ruler-right');
  var rulerLeftCtx = null;
  var rulerRightCtx = null;
  var rulerDPR = window.devicePixelRatio || 1;
  var rulerH = 0;

  function curveX(vy, h, bow) {
    var t = vy / h;
    return bow * 4 * t * (1 - t);
  }

  function setupRulerCanvases() {
    var vp = document.getElementById('cube-viewport');
    if (!vp || !rulerLeftCanvas || !rulerRightCanvas) return;
    var vpRect = vp.getBoundingClientRect();
    var gap = 16;
    rulerH = vpRect.height;

    [rulerLeftCanvas, rulerRightCanvas].forEach(function(c) {
      c.style.width = RULER_W + 'px';
      c.style.height = rulerH + 'px';
      c.style.marginTop = (-rulerH / 2) + 'px';
      c.width = RULER_W * rulerDPR;
      c.height = rulerH * rulerDPR;
    });

    rulerLeftCanvas.style.left = (vpRect.left - gap - RULER_W) + 'px';
    rulerRightCanvas.style.left = (vpRect.right + gap) + 'px';

    rulerLeftCtx = rulerLeftCanvas.getContext('2d');
    rulerRightCtx = rulerRightCanvas.getContext('2d');
    rulerLeftCtx.setTransform(rulerDPR, 0, 0, rulerDPR, 0, 0);
    rulerRightCtx.setTransform(rulerDPR, 0, 0, rulerDPR, 0, 0);

    var cw = document.getElementById('counter-wrap');
    if (cw) {
      cw.style.left = (vpRect.right + gap + RULER_W + 12) + 'px';
      cw.style.top = '50%';
      cw.style.marginTop = '-1.2rem';
    }
  }

  function drawRuler(ctx, w, h, side, angle) {
    ctx.clearRect(0, 0, w, h);
    var scrollPos = (angle / 90) * RULER_SEG;
    var margin = 20;
    var minTick = Math.floor((scrollPos - h / 2 - margin) / RULER_TICK_SPACING);
    var maxTick = Math.ceil((scrollPos + h / 2 + margin) / RULER_TICK_SPACING);

    ctx.lineWidth = 1;

    for (var i = minTick; i <= maxTick; i++) {
      var tickInSeg = ((i % RULER_TICKS_PER_SEG) + RULER_TICKS_PER_SEG) % RULER_TICKS_PER_SEG;
      var vy = h / 2 + i * RULER_TICK_SPACING - scrollPos;

      if (vy < -margin || vy > h + margin) continue;

      var tickLen, alpha;
      if (tickInSeg === 0) { tickLen = 16; alpha = 0.55; }
      else if (tickInSeg === 5) { tickLen = 10; alpha = 0.3; }
      else { tickLen = 6; alpha = 0.12; }

      var bowDisp = curveX(Math.max(0, Math.min(h, vy)), h, RULER_BOW);
      var edgeFade = 1;
      if (vy < 50) edgeFade = vy / 50;
      else if (vy > h - 50) edgeFade = (h - vy) / 50;
      edgeFade = Math.max(0, Math.min(1, edgeFade));

      ctx.strokeStyle = 'rgba(255,255,255,' + (alpha * edgeFade) + ')';
      ctx.beginPath();
      if (side === 'left') {
        var sx = (w - RULER_PAD) - bowDisp;
        ctx.moveTo(sx, vy);
        ctx.lineTo(sx - tickLen, vy);
      } else {
        var sx = RULER_PAD + bowDisp;
        ctx.moveTo(sx, vy);
        ctx.lineTo(sx + tickLen, vy);
      }
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (var py = 0; py <= h; py += 2) {
      var bd = curveX(py, h, RULER_BOW);
      var x = (side === 'left') ? (w - RULER_PAD) - bd : RULER_PAD + bd;
      if (py === 0) ctx.moveTo(x, py);
      else ctx.lineTo(x, py);
    }
    ctx.stroke();
  }

  function layoutRulers() {
    setupRulerCanvases();
  }

  function updateRulers(angle) {
    if (!rulerLeftCtx || !rulerRightCtx) return;
    drawRuler(rulerLeftCtx, RULER_W, rulerH, 'left', angle);
    drawRuler(rulerRightCtx, RULER_W, rulerH, 'right', angle);
  }

  // Counter
  var NUM_H = 2.4 * parseFloat(getComputedStyle(document.documentElement).fontSize);
  var counterStrip = document.getElementById('counter-strip');

  function buildCounter() {
    if (!counterStrip) return;
    var html = '';
    for (var i = 0; i < TOTAL; i++) {
      var num = String(i + 1).padStart(2, '0');
      html += '<div class="counter-num"><span class="dim">/</span> ' + num + '</div>';
    }
    counterStrip.innerHTML = html;
    var firstNum = counterStrip.querySelector('.counter-num');
    if (firstNum) NUM_H = firstNum.offsetHeight;
  }

  function updateCounter(angle) {
    if (!counterStrip) return;
    var frac = angle / 90;
    var wrapped = ((frac % TOTAL) + TOTAL) % TOTAL;
    counterStrip.style.transform = 'translateY(' + (-wrapped * NUM_H) + 'px)';
  }

  // Physics & Animation
  var rawAngle = 0;
  var displayAngle = 0;
  var rotStep = 0;
  var snapTimer = null;
  var isSnapping = false;
  var snapTween = null;
  var snapProxy = { a: 0 };
  var introTl = null;
  var lastRenderTimestamp = 0;

  function snapToNearest() {
    var nearest = Math.round(rawAngle / 90) * 90;
    if (Math.abs(rawAngle - nearest) < 0.5) {
      rawAngle = nearest;
      return;
    }
    isSnapping = true;
    snapProxy.a = rawAngle;
    snapTween = gsap.to(snapProxy, {
      a: nearest,
      duration: 0.5,
      ease: 'power3.out',
      onUpdate: function() { rawAngle = snapProxy.a; },
      onComplete: function() { rawAngle = nearest; isSnapping = false; }
    });
  }

  function cancelSnap() {
    if (isSnapping && snapTween) {
      snapTween.kill();
      isSnapping = false;
    }
    if (snapTimer) clearTimeout(snapTimer);
  }

  // Mouse & Touch Interaction
  var isDragging = false;
  var dragStartY = 0;
  var dragStartX = 0;
  var dragLastY = 0;
  var hasDraggedSignificantly = false;

  function onWheel(e) {
    if (isDetailOpen) return;
    e.preventDefault();
    cancelSnap();
    rawAngle += e.deltaY * 0.22;
    snapTimer = setTimeout(snapToNearest, 180);
  }
  document.addEventListener('wheel', onWheel, { passive: false });

  var touchLastY = 0;
  var touchStartY = 0;
  var touchStartX = 0;
  var touchMovedSignificantly = false;

  document.addEventListener('touchstart', function(e) {
    if (isDetailOpen) return;
    touchLastY = e.touches[0].clientY;
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
    touchMovedSignificantly = false;
    cancelSnap();
  }, { passive: true });

  document.addEventListener('touchmove', function(e) {
    if (isDetailOpen) return;
    var y = e.touches[0].clientY;
    var delta = touchLastY - y;
    if (Math.abs(y - touchStartY) > 8 || Math.abs(e.touches[0].clientX - touchStartX) > 8) {
      touchMovedSignificantly = true;
    }
    touchLastY = y;
    rawAngle += delta * 0.6;
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('touchend', function(e) {
    if (isDetailOpen) return;
    if (!touchMovedSignificantly) {
      var target = e.target;
      var faceEl = target.closest('.cube-face');
      if (faceEl) {
        var pIdx = parseInt(faceEl.dataset.pIdx, 10);
        if (!isNaN(pIdx) && PROJECTS[pIdx]) {
          openProjectDetail(PROJECTS[pIdx]);
        }
      }
    }
    snapTimer = setTimeout(snapToNearest, 120);
  }, { passive: true });

  function stopDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';

    if (!hasDraggedSignificantly && e && e.target) {
      var faceEl = e.target.closest('.cube-face');
      if (faceEl) {
        var pIdx = parseInt(faceEl.dataset.pIdx, 10);
        if (!isNaN(pIdx) && PROJECTS[pIdx]) {
          openProjectDetail(PROJECTS[pIdx]);
        }
      }
    }
    snapTimer = setTimeout(snapToNearest, 120);
  }

  document.addEventListener('mousedown', function(e) {
    if (isDetailOpen) return;
    if (e.button !== 0) return;
    isDragging = true;
    hasDraggedSignificantly = false;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragLastY = e.clientY;
    cancelSnap();
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    if (!(e.buttons & 1)) { stopDrag(e); return; }
    if (Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY) > 6) {
      hasDraggedSignificantly = true;
    }
    var delta = dragLastY - e.clientY;
    dragLastY = e.clientY;
    rawAngle += delta * 0.5;
  });

  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('mouseleave', stopDrag);
  window.addEventListener('blur', stopDrag);

  document.addEventListener('keydown', function(e) {
    if (isDetailOpen) {
      if (e.key === 'Escape') closeProjectDetail();
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault(); cancelSnap();
      rawAngle = (Math.round(rawAngle / 90) + 1) * 90;
      snapToNearest();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault(); cancelSnap();
      rawAngle = (Math.round(rawAngle / 90) - 1) * 90;
      snapToNearest();
    }
  });

  // Render loop
  function render(timestamp) {
    if (lastRenderTimestamp > 0 && timestamp - lastRenderTimestamp > 500) {
      displayAngle = rawAngle;
    }
    lastRenderTimestamp = timestamp;

    var lerp = isSnapping ? 0.07 : 0.035;
    displayAngle += (rawAngle - displayAngle) * lerp;
    if (Math.abs(rawAngle - displayAngle) < 0.05) displayAngle = rawAngle;

    setCubeAngle(displayAngle);

    var newStep = Math.round(-displayAngle / 90);
    if (newStep !== rotStep) {
      rotStep = newStep;
      syncFaces(rotStep);
    }

    updateRulers(displayAngle);
    updateCounter(-displayAngle);

    requestAnimationFrame(render);
  }

  // Case Study Detail Modal
  var isDetailOpen = false;
  var activeDetailProj = null;

  function openProjectDetail(proj) {
    if (!proj || isDetailOpen) return;
    isDetailOpen = true;
    activeDetailProj = proj;

    var en = isEn();
    var loc = en ? proj.en : proj.zh;

    var detailEl = document.getElementById('project-detail');
    var detailTitle = document.getElementById('detail-title');
    var detailYear = document.getElementById('detail-year');
    var detailDesc = document.getElementById('detail-desc');
    var detailTags = document.getElementById('detail-tags');
    var detailVisit = document.getElementById('detail-visit');
    var detailThumbsInner = document.getElementById('detail-thumbs-inner');
    var detailSelected = document.getElementById('detail-selected');
    var detailBack = document.getElementById('detail-back');

    if (!detailEl) return;

    var projTitle = en ? proj.title : (proj.titleZh || proj.title);
    var categoryText = en ? (proj.natureEn || 'PROJECT') : (proj.natureZh || '项目实践');

    detailTitle.textContent = projTitle;
    detailYear.innerHTML = '<span class="detail-nature-tag">' + categoryText + '</span><span class="detail-year-tag">' + proj.year + '</span>';

    // Structured Case Study layout
    var descHtml = '<p class="detail-lead">' + loc.desc + '</p>';
    if (loc.problem) {
      descHtml += '<div class="detail-sec-card"><div class="detail-sec-title">' + (en ? '01 / Problem & Context' : '01 / 核心痛点与背景') + '</div><div class="detail-sec-text">' + loc.problem + '</div></div>';
    }
    if (loc.methods) {
      descHtml += '<div class="detail-sec-card"><div class="detail-sec-title">' + (en ? '02 / Methodology & Stack' : '02 / 技术方案与方法') + '</div><div class="detail-sec-text">' + loc.methods + '</div></div>';
    }
    if (loc.outcomes) {
      descHtml += '<div class="detail-sec-card"><div class="detail-sec-title">' + (en ? '03 / Outcomes & Deliverables' : '03 / 成果与交付物') + '</div><div class="detail-sec-text">' + loc.outcomes + '</div></div>';
    }
    if (loc.scope) {
      descHtml += '<div class="detail-scope-box"><div class="detail-scope-title">' + (en ? 'PRD Scope & Phasing' : 'PRD 范围与阶段规划') + '</div><div class="detail-scope-text">' + loc.scope + '</div></div>';
    }
    if (loc.note) {
      descHtml += '<div class="detail-note-box">' + loc.note + '</div>';
    }
    detailDesc.innerHTML = descHtml;

    detailTags.innerHTML = proj.tags.map(function(t) { return '<span class="detail-tag">' + t + '</span>'; }).join('');

    if (proj.link) {
      detailVisit.href = proj.link;
      detailVisit.classList.add('has-link');
      var visitText = en ? 'Visit Live Demo 🡲' : '访问线上演示 🡲';
      detailVisit.setAttribute('data-chr', visitText);
      if (window.buildChrHover) window.buildChrHover(detailVisit, visitText);
      else detailVisit.textContent = visitText;
    } else {
      detailVisit.removeAttribute('href');
      detailVisit.classList.remove('has-link');
    }

    // Gallery
    var allImages = (proj.gallery && proj.gallery.length) ? proj.gallery : [proj.cover];
    detailThumbsInner.innerHTML = allImages.map(function(src, i) {
      return '<img src="' + src + '" alt="' + proj.title + ' ' + (i + 1) + '" decoding="async" class="' + (i === 0 ? 'active' : '') + '">';
    }).join('');

    function updateSelectedView(idx) {
      var src = allImages[idx] || allImages[0];
      detailSelected.innerHTML = '<img src="' + src + '" alt="' + proj.title + '" decoding="async">' +
        '<div class="detail-selected-caption">' + (en ? 'Deliverable / Slide ' + (idx + 1) + ' of ' + allImages.length : '实际交付物 / 原页 ' + (idx + 1) + ' / ' + allImages.length) + '</div>';
    }
    updateSelectedView(0);

    detailThumbsInner.querySelectorAll('img').forEach(function(thumb, i) {
      thumb.addEventListener('click', function(e) {
        e.stopPropagation();
        detailThumbsInner.querySelectorAll('img').forEach(function(img) { img.classList.remove('active'); });
        thumb.classList.add('active');
        updateSelectedView(i);
      });
    });

    detailEl.classList.add('active');
    gsap.killTweensOf([detailEl, detailBack]);
    gsap.to(detailEl, { opacity: 1, duration: 0.45, ease: 'power2.out' });
    gsap.to(detailBack, { opacity: 1, duration: 0.4, delay: 0.1, ease: 'power2.out' });
  }

  function closeProjectDetail() {
    if (!isDetailOpen) return;
    var detailEl = document.getElementById('project-detail');
    var detailBack = document.getElementById('detail-back');

    gsap.killTweensOf([detailEl, detailBack]);
    gsap.to(detailBack, { opacity: 0, duration: 0.2, ease: 'power2.in' });
    gsap.to(detailEl, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: function() {
        detailEl.classList.remove('active');
        isDetailOpen = false;
        activeDetailProj = null;
      }
    });
  }

  var detailBackBtn = document.getElementById('detail-back');
  if (detailBackBtn) {
    detailBackBtn.addEventListener('click', function(e) {
      e.preventDefault();
      closeProjectDetail();
    });
  }

  // Transitions & Intro
  var fromIndexTransition = sessionStorage.getItem('work-transition') === '1';
  var backBtnEl = document.getElementById('back-btn');
  var isLeavingWithFade = false;

  function isOnBackTrapState() {
    return !!(window.history.state && window.history.state.__workBackTrap);
  }

  function ensureBackTrapState() {
    if (!fromIndexTransition) return;
    if (isOnBackTrapState()) return;
    if (!(window.history && window.history.pushState)) return;
    window.history.pushState({ __workBackTrap: true }, '', window.location.href);
  }

  ensureBackTrapState();

  function returnToIndexWithFade(historySteps) {
    if (isLeavingWithFade) return;
    isLeavingWithFade = true;

    var overlay = document.getElementById('intro-overlay');
    var title = document.getElementById('page-title');
    gsap.killTweensOf([overlay, title]);
    if (overlay) overlay.style.pointerEvents = 'auto';

    var tl = gsap.timeline({
      onComplete: function() {
        sessionStorage.setItem('index-return-fade', 'works');
        if (historySteps > 0 && window.history.length > historySteps) {
          window.history.go(-historySteps);
          return;
        }
        window.location.href = 'index.html';
      }
    });

    if (title) tl.to(title, { opacity: 0, duration: 0.4, ease: 'power2.inOut' }, 0);
    if (overlay) tl.to(overlay, { opacity: 1, duration: 0.5, ease: 'power2.inOut' }, 0.1);
  }

  if (backBtnEl) {
    backBtnEl.addEventListener('click', function(e) {
      e.preventDefault();
      var steps = fromIndexTransition ? (isOnBackTrapState() ? 2 : 1) : 0;
      returnToIndexWithFade(steps);
    });
  }

  window.addEventListener('popstate', function() {
    if (isDetailOpen) {
      closeProjectDetail();
      return;
    }
    if (!fromIndexTransition || isLeavingWithFade) return;
    returnToIndexWithFade(1);
  });

  function playIntro() {
    var overlay = document.getElementById('intro-overlay');
    var title = document.getElementById('page-title');
    var viewport = document.getElementById('cube-viewport');
    var backBtn = document.getElementById('back-btn');
    var rl = document.getElementById('ruler-left');
    var rr = document.getElementById('ruler-right');
    var cw = document.getElementById('counter-wrap');
    var hint = document.getElementById('scroll-hint');
    var chevron = document.getElementById('scroll-chevron');
    var langBtn = document.getElementById('works-lang-toggle');

    var fromIndex = fromIndexTransition;
    sessionStorage.removeItem('work-transition');

    var tl = gsap.timeline();
    introTl = tl;

    if (fromIndex) {
      if (overlay) gsap.set(overlay, { opacity: 1 });
      if (title) gsap.set(title, { opacity: 1 });
      if (overlay) tl.to(overlay, { opacity: 0, duration: 0.8, ease: 'power2.out' }, 0.1);
    } else {
      if (overlay) gsap.set(overlay, { opacity: 1 });
      if (title) gsap.set(title, { opacity: 0 });
      if (overlay) tl.to(overlay, { opacity: 0, duration: 0.6, ease: 'power2.out' }, 0);
      if (title) tl.to(title, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.2);
    }

    var t0 = fromIndex ? 0.6 : 0.4;
    if (viewport) tl.to(viewport, { opacity: 1, duration: 1, ease: 'power2.out' }, t0);
    if (backBtn) tl.to(backBtn, { opacity: 1, duration: 0.6, ease: 'power2.out' }, t0 + 0.2);
    if (langBtn) tl.to(langBtn, { opacity: 1, duration: 0.6, ease: 'power2.out' }, t0 + 0.2);
    if (rl && rr) tl.to([rl, rr], { opacity: 1, duration: 0.8, ease: 'power2.out' }, t0 + 0.3);
    if (cw) tl.to(cw, { opacity: 1, duration: 0.6, ease: 'power2.out' }, t0 + 0.4);
    if (hint) tl.set(hint, { display: 'none' });

    if (chevron) {
      tl.to(chevron, { opacity: 1, duration: 0.6, ease: 'power2.out' }, t0 + 0.5);
      gsap.to(chevron, {
        y: 6, duration: 0.9, ease: 'power1.inOut', repeat: -1, yoyo: true, delay: t0 + 0.5
      });
      tl.to(chevron, { opacity: 0, duration: 0.8, ease: 'power2.in' }, t0 + 5);
    }
  }

  window.onLanguageChanged = function(lang) {
    faceOwner = [-1, -1, -1, -1];
    syncFaces(rotStep);
    if (isDetailOpen && activeDetailProj) {
      openProjectDetail(activeDetailProj);
    }
  };

  buildCounter();
  measureCube();
  syncFaces(0);
  requestAnimationFrame(render);

  window.addEventListener('resize', measureCube);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(playIntro);
  } else {
    window.addEventListener('load', playIntro);
  }

  window.addEventListener('pageshow', function(e) {
    isLeavingWithFade = false;
    ensureBackTrapState();
    if (!e.persisted) return;
    var overlay = document.getElementById('intro-overlay');
    if (overlay) {
      gsap.killTweensOf(overlay);
      gsap.set(overlay, { opacity: 0 });
      overlay.style.pointerEvents = 'none';
    }
  });

  document.addEventListener('visibilitychange', function() {
    if (document.hidden) return;
    if (introTl && introTl.progress() < 1) introTl.progress(1);
    displayAngle = rawAngle;
  });

})();
