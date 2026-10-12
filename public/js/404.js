(function () {
  'use strict';

  // ── chr-hover setup ──────────────────────────────────────────────────────
  document.querySelectorAll('[data-chr]').forEach(function (el) {
    var text = el.dataset.chr;
    el.removeAttribute('data-chr');
    el.innerHTML = '';
    Array.from(text).forEach(function (ch, i) {
      if (ch === ' ') {
        el.insertAdjacentHTML('beforeend', '<span style="width:0.35em;display:inline-block">&nbsp;</span>');
        return;
      }
      var wrap = document.createElement('span');
      wrap.className = 'ch-wrap';
      wrap.style.setProperty('--i', i);
      wrap.innerHTML = '<span class="ch-top">' + ch + '</span><span class="ch-bot">' + ch + '</span>';
      el.appendChild(wrap);
    });
  });

  // ── element refs ──────────────────────────────────────────────────────────
  var noiseCanvas = document.getElementById('noise-canvas');
  var fcs = document.querySelectorAll('.fc');
  var errorLabel = document.getElementById('error-label');
  var backBtn = document.getElementById('back-btn');
  var d1El = document.getElementById('d1');
  var d0El = document.getElementById('d0');
  var d2El = document.getElementById('d2');
  var d1Char = document.getElementById('d1-char');
  var d0Char = document.getElementById('d0-char');
  var d2Char = document.getElementById('d2-char');
  var zeroWrap = document.getElementById('zero-wrap');
  var orbitRing = document.getElementById('orbit-ring');
  var satEl = document.getElementById('satellite');
  var subtitle = document.getElementById('subtitle');
  var hudData = document.getElementById('hud-data');
  var hudX = document.getElementById('hud-x');
  var hudY = document.getElementById('hud-y');
  var ticker = document.getElementById('ticker-wrap');
  var scene = document.getElementById('scene');

  // ── noise canvas ──────────────────────────────────────────────────────────
  var noiseCtx = noiseCanvas.getContext('2d');
  noiseCanvas.width = 160;
  noiseCanvas.height = 160;
  var noiseLastTs = 0;

  function drawNoise(ts) {
    if (ts - noiseLastTs > 70) {
      noiseLastTs = ts;
      var img = noiseCtx.createImageData(160, 160);
      var d = img.data;
      for (var i = 0; i < d.length; i += 4) {
        var v = Math.random() * 20;
        d[i] = d[i + 1] = d[i + 2] = v;
        d[i + 3] = 255;
      }
      noiseCtx.putImageData(img, 0, 0);
    }
  }

  // ── mouse tracking ────────────────────────────────────────────────────────
  var rawMx = 0, rawMy = 0;
  var lerpMx = 0, lerpMy = 0;

  window.addEventListener('mousemove', function (e) {
    rawMx = (e.clientX / window.innerWidth - 0.5) * 2;
    rawMy = (e.clientY / window.innerHeight - 0.5) * 2;
    // HUD coordinates
    hudX.textContent = e.clientX.toString().padStart(4, '0');
    hudY.textContent = e.clientY.toString().padStart(4, '0');
  });

  window.addEventListener('touchmove', function (e) {
    rawMx = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
    rawMy = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  // ── satellite orbit ───────────────────────────────────────────────────────
  var orbitReady = false;
  var orbitRx = 0, orbitRy = 0;

  function setupOrbit() {
    var rect = zeroWrap.getBoundingClientRect();
    orbitRx = rect.width * 0.54;
    orbitRy = rect.height * 0.16;

    orbitRing.style.width  = (orbitRx * 2) + 'px';
    orbitRing.style.height = (orbitRy * 2) + 'px';
    orbitRing.style.marginLeft = (-orbitRx) + 'px';
    orbitRing.style.marginTop  = (-orbitRy) + 'px';

    orbitReady = true;
  }

  var orbitStart = null;
  var ORBIT_PERIOD = 5200;

  function animateSatellite(ts) {
    if (!orbitStart) orbitStart = ts;
    if (orbitReady) {
      var t = ((ts - orbitStart) % ORBIT_PERIOD) / ORBIT_PERIOD;
      var angle = t * Math.PI * 2;
      var sx = Math.cos(angle) * orbitRx;
      var sy = Math.sin(angle) * orbitRy;

      satEl.style.transform = 'translate(calc(-50% + ' + sx.toFixed(2) + 'px), calc(-50% + ' + sy.toFixed(2) + 'px))';

      // behind the 0: dimmed + slightly blurred
      if (sy < 0) {
        satEl.style.opacity = '0.18';
        satEl.style.filter = 'blur(1px)';
        satEl.style.zIndex = '0';
      } else {
        satEl.style.opacity = '1';
        satEl.style.filter = '';
        satEl.style.zIndex = '6';
      }
    }
  }

  // ── glitch scramble ───────────────────────────────────────────────────────
  var GLITCH_POOL = '!@#$%^&*<>/\\|≈∑√∫÷×±≠∞¤§¶0123456789ABCDEF█▓▒░▌';
  var isGlitching = false;

  function scramble(charEl, original, duration, delay) {
    delay = delay || 0;
    setTimeout(function () {
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = (ts - start) / duration;
        if (p >= 1) { charEl.textContent = original; return; }
        var result = '';
        for (var i = 0; i < original.length; i++) {
          var charP = Math.max(0, p * 4 - i * 0.6);
          result += charP >= 1
            ? original[i]
            : GLITCH_POOL[Math.floor(Math.random() * GLITCH_POOL.length)];
        }
        charEl.textContent = result;
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, delay);
  }

  function triggerGlitch() {
    if (isGlitching) return;
    isGlitching = true;

    // brief CSS glitch flash
    scene.classList.add('glitch-flash');
    setTimeout(function () { scene.classList.remove('glitch-flash'); }, 260);

    scramble(d1Char, '4', 550, 0);
    scramble(d0Char, '0', 580, 90);
    scramble(d2Char, '4', 550, 45);

    setTimeout(function () { isGlitching = false; }, 700);
  }

  document.addEventListener('click', triggerGlitch);
  document.addEventListener('touchstart', triggerGlitch, { passive: true });

  // ── auto-glitch (occasional) ──────────────────────────────────────────────
  function scheduleAutoGlitch() {
    var delay = 5000 + Math.random() * 7000;
    setTimeout(function () {
      triggerGlitch();
      scheduleAutoGlitch();
    }, delay);
  }

  // ── main render loop ──────────────────────────────────────────────────────
  function render(ts) {
    drawNoise(ts);
    animateSatellite(ts);

    // smooth mouse lerp
    lerpMx += (rawMx - lerpMx) * 0.055;
    lerpMy += (rawMy - lerpMy) * 0.055;

    // parallax — each digit at different depth
    d1El.style.transform = 'translate(' + (lerpMx * -42).toFixed(2) + 'px, ' + (lerpMy * -22).toFixed(2) + 'px)';
    d0El.style.transform = 'translate(' + (lerpMx *   4).toFixed(2) + 'px, ' + (lerpMy *   4).toFixed(2) + 'px)';
    d2El.style.transform = 'translate(' + (lerpMx *  38).toFixed(2) + 'px, ' + (lerpMy *  18).toFixed(2) + 'px)';

    requestAnimationFrame(render);
  }

  // ── intro animation ───────────────────────────────────────────────────────
  function playIntro() {
    setupOrbit();

    var tl = gsap.timeline({ onComplete: scheduleAutoGlitch });

    // frame corners
    gsap.set(fcs, { opacity: 0 });
    tl.to(fcs, { opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.08 }, 0);

    // noise canvas fade in
    tl.to(noiseCanvas, { opacity: 0.04, duration: 1.2, ease: 'power2.out' }, 0);

    // error label slide + fade
    gsap.set(errorLabel, { opacity: 0, x: -10 });
    tl.to(errorLabel, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, 0.1);

    // back button
    gsap.set(backBtn, { opacity: 0, x: 10 });
    tl.to(backBtn, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, 0.2);

    // 404 digits drop in with stagger
    gsap.set([d1Char, d0Char, d2Char], { opacity: 0, y: -60, rotateX: 25 });
    tl.to(d1Char, { opacity: 1, y: 0, rotateX: 0, duration: 1.0, ease: 'power4.out' }, 0.3);
    tl.to(d0Char, { opacity: 1, y: 0, rotateX: 0, duration: 1.0, ease: 'power4.out' }, 0.48);
    tl.to(d2Char, { opacity: 1, y: 0, rotateX: 0, duration: 1.0, ease: 'power4.out' }, 0.38);

    // subtitle
    gsap.set(subtitle, { opacity: 0, y: 12 });
    tl.to(subtitle, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 1.1);

    // HUD slide in
    gsap.set(hudData, { opacity: 0, x: -16 });
    tl.to(hudData, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, 1.25);

    // ticker
    gsap.set(ticker, { opacity: 0 });
    tl.to(ticker, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 1.4);
  }

  // ── boot ──────────────────────────────────────────────────────────────────
  requestAnimationFrame(render);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(playIntro);
  } else {
    window.addEventListener('load', playIntro);
  }

  // re-measure orbit on resize
  window.addEventListener('resize', function () {
    if (orbitReady) setupOrbit();
  });

})();
