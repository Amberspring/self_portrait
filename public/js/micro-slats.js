// Standalone MicroSlats WebGL2 background for /contact/index.html
// Configured with exact props:
// preset="swell", color="#c195ed", glintColor="#401166", backgroundColor="#000000",
// slatWidth=14, slatHeight=20, gap=3, roundness=0.35, interactive=true,
// cursorStrength=1, cursorSize=40, swirl=0.4, trail=1.4, lean=0, intro=true,
// scale=1.25, speed=1.8, chop=0.4, perspective=0.2

(function () {
  var container = document.getElementById('contact-canvas');
  if (!container) return;

  var SWELL_PRESETS = {
    swell: {
      scale: 1.5,
      speed: 0.6,
      direction: 250,
      chop: 0.55,
      stretch: 0,
      glint: 0.7,
      contrast: 1.25,
      perspective: 0.55,
      fog: 0.55
    }
  };

  var FLUID_SIZE = 96;
  var PRESSURE_STEPS = 16;
  var SPLAT_FORCE = 6900;
  var SPLASH_JETS = 3;
  var PIXEL_BUDGET = 4.5e6;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function parseColor(value, fallback) {
    try {
      var ctx = document.createElement('canvas').getContext('2d');
      if (!ctx) return fallback;
      ctx.fillStyle = '#000000';
      ctx.fillStyle = value;
      var resolved = ctx.fillStyle;
      if (resolved.indexOf('#') === 0) {
        var n = parseInt(resolved.slice(1), 16);
        return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255, 1];
      }
      var parts = resolved.match(/[\d.]+/g);
      if (!parts || parts.length < 3) return fallback;
      return [Number(parts[0]) / 255, Number(parts[1]) / 255, Number(parts[2]) / 255, parts[3] ? Number(parts[3]) : 1];
    } catch (e) {
      return fallback;
    }
  }

  var settings = {
    color: parseColor('#8239c7', [0.51, 0.224, 0.78, 1]),
    glintColor: parseColor('#9d49cf', [0.616, 0.286, 0.812, 1]),
    backgroundColor: parseColor('#000000', [0, 0, 0, 1]),
    slatWidth: 10,
    slatHeight: 25,
    gap: 3,
    roundness: 0.75,
    scale: SWELL_PRESETS.swell.scale,
    speed: SWELL_PRESETS.swell.speed,
    direction: SWELL_PRESETS.swell.direction,
    chop: SWELL_PRESETS.swell.chop,
    stretch: SWELL_PRESETS.swell.stretch,
    glint: SWELL_PRESETS.swell.glint,
    contrast: SWELL_PRESETS.swell.contrast,
    perspective: SWELL_PRESETS.swell.perspective,
    fog: SWELL_PRESETS.swell.fog,
    interactive: true,
    cursorStrength: 1,
    cursorSize: 40,
    swirl: 0,
    trail: 1.4,
    lean: 0,
    intro: true,
    introDuration: 1.5,
    paused: false
  };

  var passVertex = '#version 300 es\nin vec2 position;\nvoid main() {\n  gl_Position = vec4(position, 0.0, 1.0);\n}\n';

  var fluidVertex = '#version 300 es\nin vec2 position;\nuniform vec2 uTexel;\nout vec2 vUv;\nout vec2 vL;\nout vec2 vR;\nout vec2 vT;\nout vec2 vB;\nvoid main() {\n  vUv = position * 0.5 + 0.5;\n  vL = vUv - vec2(uTexel.x, 0.0);\n  vR = vUv + vec2(uTexel.x, 0.0);\n  vT = vUv + vec2(0.0, uTexel.y);\n  vB = vUv - vec2(0.0, uTexel.y);\n  gl_Position = vec4(position, 0.0, 1.0);\n}\n';

  var fluidHead = '#version 300 es\nprecision highp float;\nin vec2 vUv;\nin vec2 vL;\nin vec2 vR;\nin vec2 vT;\nin vec2 vB;\nout vec4 fragColor;\n';

  var splatFragment = fluidHead + 'uniform sampler2D uTarget;\nuniform float uAspect;\nuniform vec2 uPoint;\nuniform vec3 uValue;\nuniform float uRadius;\nvoid main() {\n  vec2 offset = vUv - uPoint;\n  offset.x *= uAspect;\n  float falloff = exp(-dot(offset, offset) / uRadius);\n  fragColor = vec4(texture(uTarget, vUv).xyz + uValue * falloff, 1.0);\n}\n';

  var curlFragment = fluidHead + 'uniform sampler2D uVelocity;\nvoid main() {\n  float left = texture(uVelocity, vL).y;\n  float right = texture(uVelocity, vR).y;\n  float top = texture(uVelocity, vT).x;\n  float bottom = texture(uVelocity, vB).x;\n  fragColor = vec4(0.5 * (right - left - top + bottom), 0.0, 0.0, 1.0);\n}\n';

  var vorticityFragment = fluidHead + 'uniform sampler2D uVelocity;\nuniform sampler2D uCurl;\nuniform float uSwirl;\nuniform float uDt;\nvoid main() {\n  float left = texture(uCurl, vL).x;\n  float right = texture(uCurl, vR).x;\n  float top = texture(uCurl, vT).x;\n  float bottom = texture(uCurl, vB).x;\n  float middle = texture(uCurl, vUv).x;\n  vec2 force = 0.5 * vec2(abs(top) - abs(bottom), abs(right) - abs(left));\n  force = force / (length(force) + 0.0001) * uSwirl * middle;\n  force.y = -force.y;\n  vec2 velocity = texture(uVelocity, vUv).xy + force * uDt;\n  fragColor = vec4(clamp(velocity, -1000.0, 1000.0), 0.0, 1.0);\n}\n';

  var divergenceFragment = fluidHead + 'uniform sampler2D uVelocity;\nvoid main() {\n  vec2 middle = texture(uVelocity, vUv).xy;\n  float left = vL.x < 0.0 ? -middle.x : texture(uVelocity, vL).x;\n  float right = vR.x > 1.0 ? -middle.x : texture(uVelocity, vR).x;\n  float top = vT.y > 1.0 ? -middle.y : texture(uVelocity, vT).y;\n  float bottom = vB.y < 0.0 ? -middle.y : texture(uVelocity, vB).y;\n  fragColor = vec4(0.5 * (right - left + top - bottom), 0.0, 0.0, 1.0);\n}\n';

  var pressureFragment = fluidHead + 'uniform sampler2D uPressure;\nuniform sampler2D uDivergence;\nvoid main() {\n  float left = texture(uPressure, vL).x;\n  float right = texture(uPressure, vR).x;\n  float top = texture(uPressure, vT).x;\n  float bottom = texture(uPressure, vB).x;\n  float divergence = texture(uDivergence, vUv).x;\n  fragColor = vec4((left + right + top + bottom - divergence) * 0.25, 0.0, 0.0, 1.0);\n}\n';

  var projectFragment = fluidHead + 'uniform sampler2D uPressure;\nuniform sampler2D uVelocity;\nvoid main() {\n  float left = texture(uPressure, vL).x;\n  float right = texture(uPressure, vR).x;\n  float top = texture(uPressure, vT).x;\n  float bottom = texture(uPressure, vB).x;\n  vec2 velocity = texture(uVelocity, vUv).xy - vec2(right - left, top - bottom);\n  fragColor = vec4(velocity, 0.0, 1.0);\n}\n';

  var advectFragment = fluidHead + 'uniform sampler2D uVelocity;\nuniform sampler2D uSource;\nuniform vec2 uTexel;\nuniform float uDt;\nuniform float uFade;\nvoid main() {\n  vec2 from = vUv - uDt * texture(uVelocity, vUv).xy * uTexel;\n  fragColor = texture(uSource, from) / (1.0 + uFade * uDt);\n}\n';

  var scaleFragment = fluidHead + 'uniform sampler2D uSource;\nuniform float uValue;\nvoid main() {\n  fragColor = texture(uSource, vUv) * uValue;\n}\n';

  var fieldFragment = '#version 300 es\nprecision highp float;\nuniform vec2 uSize;\nuniform vec4 uGrid;\nuniform vec2 uOrigin;\nuniform vec2 uSlat;\nuniform float uTime;\nuniform float uScale;\nuniform float uDirection;\nuniform float uChop;\nuniform float uStretch;\nuniform float uGlint;\nuniform float uContrast;\nuniform float uPerspective;\nuniform float uFog;\nuniform float uIntro;\nuniform sampler2D tVelocity;\nuniform sampler2D tInk;\nuniform vec2 uFluidTexel;\nuniform float uFluid;\nuniform float uInk;\nuniform float uLean;\nout vec4 fragColor;\n\nconst float TURN[4] = float[4](0.0, -0.95, 0.78, 1.62);\nconst float LENGTH[4] = float[4](2.6, 1.7, 1.12, 0.76);\nconst float HEIGHT[4] = float[4](1.0, 0.75, 0.5, 0.3);\nconst float SHIFT[4] = float[4](0.0, 2.3, 4.1, 1.1);\n\nvoid main() {\n  vec2 cell = floor(gl_FragCoord.xy);\n  float row = uGrid.y - 1.0 - cell.y;\n  vec2 center = uOrigin + vec2(cell.x, row) * uGrid.zw + uSlat * 0.5;\n  float v = clamp(center.y / uSize.y, 0.0, 1.0);\n\n  vec2 flow = vec2(0.0);\n  float ink = 0.0;\n  if (uFluid > 0.5) {\n    vec2 fluidUv = clamp(vec2(center.x / uSize.x, 1.0 - center.y / uSize.y), 0.0, 1.0);\n    flow = texture(tVelocity, fluidUv).xy * uFluidTexel * uSize;\n    ink = texture(tInk, fluidUv).x;\n  }\n\n  float horizon = mix(8.0, 0.5, uPerspective);\n  float depth = (1.0 + horizon) / (v + horizon);\n  vec2 world = vec2((center.x - uSize.x * 0.5) / uSize.y * depth, (depth - 1.0) * horizon * 2.2);\n  world -= flow * 0.00018 * depth;\n  world /= max(uScale, 0.05);\n\n  float meander = 0.55 * sin(dot(world, vec2(0.23, 0.41)) * 0.9 + uTime * 0.13)\n    + 0.3 * sin(dot(world, vec2(-0.37, 0.19)) * 1.4 - uTime * 0.09);\n\n  float steep = uChop * 0.45;\n  float height = 0.0;\n  float total = 0.0;\n  for (int i = 0; i < 4; i++) {\n    float angle = uDirection + TURN[i];\n    vec2 heading = vec2(cos(angle), sin(angle));\n    float k = 6.2831853 / LENGTH[i];\n    float omega = sqrt(9.81 * k) * 0.35;\n    float theta = k * dot(world, heading) - omega * uTime + SHIFT[i] + meander * (0.6 + 0.3 * float(i));\n    height += HEIGHT[i] * (cos(theta) + steep * cos(2.0 * theta));\n    total += HEIGHT[i] * (1.0 + steep);\n  }\n  float level = clamp(0.5 + 0.5 * height / (total * 0.85), 0.0, 1.0);\n  float crest = smoothstep(0.6, 1.0, level);\n  float glint = crest * crest * uGlint;\n\n  float haze = mix(1.0, 1.0 - uFog, pow(1.0 - v, 1.4));\n  float light = (pow(level, uContrast) + glint * 0.8) * haze;\n  float glow = 1.0 - exp(-max(ink, 0.0) * uInk * 1.6);\n  light = 1.0 - (1.0 - clamp(light, 0.0, 1.0)) * (1.0 - glow);\n\n  float front = uIntro * 1.35;\n  float reveal = 1.0 - smoothstep(front - 0.35, front, v);\n  float sweep = exp(-pow((v - front + 0.22) / 0.07, 2.0)) * (1.0 - uIntro);\n  light = (light + sweep * 0.8) * reveal;\n  light = max(light, 0.045 * reveal);\n  float span = mix(1.0 - uStretch, 1.0, level) + glow * 0.3;\n  span = clamp(span, 0.08, 1.0) * mix(0.1, 1.0, reveal);\n  float tint = clamp(max(glint * 1.4, glow * 0.9) + sweep, 0.0, 1.0);\n  float lean = clamp(flow.x / 1400.0, -1.0, 1.0) * uLean * reveal;\n\n  fragColor = vec4(clamp(light, 0.0, 1.0), span, tint, 0.5 + 0.5 * lean);\n}\n';

  var slatFragment = '#version 300 es\nprecision highp float;\nuniform sampler2D tField;\nuniform vec2 uSize;\nuniform float uDpr;\nuniform vec4 uGrid;\nuniform vec2 uOrigin;\nuniform vec2 uSlat;\nuniform float uRound;\nuniform float uTilt;\nuniform vec3 uColor;\nuniform vec3 uGlintColor;\nuniform vec4 uBackground;\nout vec4 fragColor;\n\nfloat pill(vec2 p, vec2 b, float r) {\n  vec2 q = abs(p) - b + r;\n  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;\n}\n\nvoid main() {\n  vec2 p = vec2(gl_FragCoord.x, uSize.y * uDpr - gl_FragCoord.y) / uDpr;\n  vec2 local = p - uOrigin;\n  vec2 cell = floor(local / uGrid.zw);\n  vec4 background = vec4(uBackground.rgb * uBackground.a, uBackground.a);\n  vec4 slat = vec4(0.0);\n  int reach = uTilt > 0.0 ? 1 : 0;\n  for (int dx = -1; dx <= 1; dx++) {\n    if (abs(dx) > reach) continue;\n    vec2 neighbour = cell + vec2(float(dx), 0.0);\n    if (neighbour.x < 0.0 || neighbour.y < 0.0 || neighbour.x >= uGrid.x || neighbour.y >= uGrid.y) continue;\n    vec4 field = texelFetch(tField, ivec2(int(neighbour.x), int(uGrid.y - 1.0 - neighbour.y)), 0);\n    vec2 offset = local - neighbour * uGrid.zw - uSlat * 0.5;\n    float angle = (field.a - 0.5) * 2.0 * uTilt;\n    float c = cos(angle);\n    float s = sin(angle);\n    vec2 turned = vec2(c * offset.x + s * offset.y, c * offset.y - s * offset.x);\n    vec2 halfSize = vec2(uSlat.x * 0.5, uSlat.y * 0.5 * field.g);\n    float radius = uRound * min(halfSize.x, halfSize.y);\n    float alpha = clamp(0.5 - pill(turned, halfSize, radius) * uDpr, 0.0, 1.0) * field.r;\n    if (alpha > slat.a) slat = vec4(mix(uColor, uGlintColor, field.b) * alpha, alpha);\n  }\n  fragColor = slat + background * (1.0 - slat.a);\n}\n';

  var canvas = document.createElement('canvas');
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.setAttribute('aria-hidden', 'true');

  var gl = canvas.getContext('webgl2', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false
  });
  if (!gl) return;

  container.innerHTML = '';
  container.appendChild(canvas);
  gl.clearColor(0, 0, 0, 0);
  gl.disable(gl.DEPTH_TEST);
  gl.depthMask(false);

  var floatTargets = !!(
    gl.getExtension('EXT_color_buffer_float') || gl.getExtension('EXT_color_buffer_half_float')
  );

  // Fullscreen triangle VAO
  var vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  var posBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  // Blank 1x1 texture
  var blankTex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, blankTex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  function compileShader(type, source) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, source);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(sh));
    }
    return sh;
  }

  function createPass(vsSource, fsSource, uniformDefaults) {
    var prog = gl.createProgram();
    var vs = compileShader(gl.VERTEX_SHADER, vsSource);
    var fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.bindAttribLocation(prog, 0, 'position');
    gl.linkProgram(prog);

    var locs = {};
    var count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
    for (var i = 0; i < count; i++) {
      var info = gl.getActiveUniform(prog, i);
      if (info) {
        var name = info.name.replace(/\[0\]$/, '');
        locs[name] = { loc: gl.getUniformLocation(prog, name), type: info.type };
      }
    }

    return {
      program: prog,
      locs: locs,
      uniforms: uniformDefaults || {}
    };
  }

  function createRenderTarget(w, h, isFloat) {
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    if (isFloat) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    } else {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    var fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return { width: w, height: h, buffer: fbo, texture: tex };
  }

  function disposeTarget(target) {
    if (!target) return;
    gl.deleteFramebuffer(target.buffer);
    gl.deleteTexture(target.texture);
  }

  function renderPass(pass, target, doClear) {
    if (target) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.buffer);
      gl.viewport(0, 0, target.width, target.height);
    } else {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    if (doClear) {
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    gl.useProgram(pass.program);
    var texUnit = 0;
    var uKeys = Object.keys(pass.uniforms);
    for (var i = 0; i < uKeys.length; i++) {
      var key = uKeys[i];
      var meta = pass.locs[key];
      if (!meta || !meta.loc) continue;
      var val = pass.uniforms[key].value;
      if (meta.type === gl.SAMPLER_2D) {
        gl.activeTexture(gl.TEXTURE0 + texUnit);
        gl.bindTexture(gl.TEXTURE_2D, val || blankTex);
        gl.uniform1i(meta.loc, texUnit);
        texUnit++;
      } else if (meta.type === gl.FLOAT) {
        gl.uniform1f(meta.loc, val);
      } else if (meta.type === gl.FLOAT_VEC2) {
        gl.uniform2fv(meta.loc, val);
      } else if (meta.type === gl.FLOAT_VEC3) {
        gl.uniform3fv(meta.loc, val);
      } else if (meta.type === gl.FLOAT_VEC4) {
        gl.uniform4fv(meta.loc, val);
      }
    }

    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  var fieldTarget = createRenderTarget(1, 1, false);

  var fieldUniforms = {
    uSize: { value: [1, 1] },
    uGrid: { value: [1, 1, 1, 1] },
    uOrigin: { value: [0, 0] },
    uSlat: { value: [1, 1] },
    uTime: { value: 0 },
    uScale: { value: 1 },
    uDirection: { value: 0 },
    uChop: { value: 0.5 },
    uStretch: { value: 0.3 },
    uGlint: { value: 1 },
    uContrast: { value: 1 },
    uPerspective: { value: 0.7 },
    uFog: { value: 0.5 },
    uIntro: { value: 0 },
    tVelocity: { value: blankTex },
    tInk: { value: blankTex },
    uFluidTexel: { value: [1, 1] },
    uFluid: { value: 0 },
    uInk: { value: 1 },
    uLean: { value: 0.5 }
  };
  var fieldPass = createPass(passVertex, fieldFragment, fieldUniforms);

  var slatUniforms = {
    tField: { value: fieldTarget.texture },
    uSize: { value: [1, 1] },
    uDpr: { value: 1 },
    uGrid: { value: [1, 1, 1, 1] },
    uOrigin: { value: [0, 0] },
    uSlat: { value: [1, 1] },
    uRound: { value: 1 },
    uTilt: { value: 0 },
    uColor: { value: [1, 1, 1] },
    uGlintColor: { value: [1, 1, 1] },
    uBackground: { value: [0, 0, 0, 1] }
  };
  var slatPass = createPass(passVertex, slatFragment, slatUniforms);

  var fluidTexel = { value: [1, 1] };
  function makeFluidPass(frag, extra) {
    var u = { uTexel: fluidTexel };
    var k = Object.keys(extra);
    for (var i = 0; i < k.length; i++) u[k[i]] = extra[k[i]];
    return createPass(fluidVertex, frag, u);
  }

  var splatPass = makeFluidPass(splatFragment, {
    uTarget: { value: blankTex },
    uAspect: { value: 1 },
    uPoint: { value: [0, 0] },
    uValue: { value: [0, 0, 0] },
    uRadius: { value: 0.01 }
  });
  var curlPass = makeFluidPass(curlFragment, { uVelocity: { value: blankTex } });
  var vorticityPass = makeFluidPass(vorticityFragment, {
    uVelocity: { value: blankTex },
    uCurl: { value: blankTex },
    uSwirl: { value: 20 },
    uDt: { value: 0.016 }
  });
  var divergencePass = makeFluidPass(divergenceFragment, { uVelocity: { value: blankTex } });
  var pressurePass = makeFluidPass(pressureFragment, { uPressure: { value: blankTex }, uDivergence: { value: blankTex } });
  var projectPass = makeFluidPass(projectFragment, { uPressure: { value: blankTex }, uVelocity: { value: blankTex } });
  var advectPass = makeFluidPass(advectFragment, {
    uVelocity: { value: blankTex },
    uSource: { value: blankTex },
    uDt: { value: 0.016 },
    uFade: { value: 1 }
  });
  var scalePass = makeFluidPass(scaleFragment, { uSource: { value: blankTex }, uValue: { value: 0 } });

  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var width = 1;
  var height = 1;
  var dpr = 1;
  var raf = 0;
  var last = performance.now();
  var time = 0;
  var introClock = 0;
  var visible = true;
  var alive = true;
  var fluid = null;
  var fluidUntil = 0;
  var fluidDirty = false;
  var splashTurn = 0;
  var splats = [];
  var pointer = { x: 0, y: 0, tracked: false };

  function swapPair(w, h) {
    return {
      read: createRenderTarget(w, h, true),
      write: createRenderTarget(w, h, true),
      swap: function () {
        var next = this.read;
        this.read = this.write;
        this.write = next;
      }
    };
  }

  function disposeFluid() {
    if (!fluid) return;
    [fluid.velocity, fluid.ink, fluid.pressure].forEach(function (pair) {
      disposeTarget(pair.read);
      disposeTarget(pair.write);
    });
    disposeTarget(fluid.divergence);
    disposeTarget(fluid.curl);
    fluid = null;
  }

  function buildFluid() {
    if (!floatTargets) return;
    var aspect = width / height;
    var w = Math.max(8, Math.round(aspect >= 1 ? FLUID_SIZE * aspect : FLUID_SIZE));
    var h = Math.max(8, Math.round(aspect >= 1 ? FLUID_SIZE : FLUID_SIZE / aspect));
    if (fluid && fluid.width === w && fluid.height === h) return;
    disposeFluid();
    fluid = {
      width: w,
      height: h,
      velocity: swapPair(w, h),
      ink: swapPair(w, h),
      pressure: swapPair(w, h),
      divergence: createRenderTarget(w, h, true),
      curl: createRenderTarget(w, h, true)
    };
    fluidTexel.value = [1 / w, 1 / h];
  }

  function resize() {
    width = Math.max(1, container.clientWidth || window.innerWidth);
    height = Math.max(1, container.clientHeight || window.innerHeight);
    dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(PIXEL_BUDGET / (width * height)));
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    buildFluid();
    start();
  }

  function layout(s) {
    var slatW = clamp(s.slatWidth, 1, 64);
    var slatH = clamp(s.slatHeight, 2, 240);
    var gapSize = clamp(s.gap, 0, 64);
    var pitchX = slatW + gapSize;
    var pitchY = slatH + gapSize;
    var cols = Math.min(2048, Math.ceil((width + gapSize) / pitchX) + 1);
    var rows = Math.min(2048, Math.ceil((height + gapSize) / pitchY) + 1);
    var originX = (width - (cols * pitchX - gapSize)) / 2;
    var originY = (height - (rows * pitchY - gapSize)) / 2;
    if (fieldTarget.width !== cols || fieldTarget.height !== rows) {
      disposeTarget(fieldTarget);
      fieldTarget = createRenderTarget(cols, rows, false);
      slatUniforms.tField.value = fieldTarget.texture;
    }
    var tilt = Math.min(0.42, Math.asin(clamp((pitchX * 1.5 - slatW * 0.5) / (slatH * 0.5), 0, 1)));
    return { slatW: slatW, slatH: slatH, tilt: tilt, grid: [cols, rows, pitchX, pitchY], origin: [originX, originY] };
  }

  function splat(pair, point, value, radius) {
    var u = splatPass.uniforms;
    u.uTarget.value = pair.read.texture;
    u.uAspect.value = width / height;
    u.uPoint.value = point;
    u.uValue.value = value;
    u.uRadius.value = radius;
    renderPass(splatPass, pair.write, false);
    pair.swap();
  }

  function stepFluid(f, dt, s) {
    if (s.swirl > 0) {
      curlPass.uniforms.uVelocity.value = f.velocity.read.texture;
      renderPass(curlPass, f.curl, false);

      var vorticity = vorticityPass.uniforms;
      vorticity.uVelocity.value = f.velocity.read.texture;
      vorticity.uCurl.value = f.curl.texture;
      vorticity.uSwirl.value = clamp(s.swirl, 0, 2) * 40;
      vorticity.uDt.value = dt;
      renderPass(vorticityPass, f.velocity.write, false);
      f.velocity.swap();
    }

    divergencePass.uniforms.uVelocity.value = f.velocity.read.texture;
    renderPass(divergencePass, f.divergence, false);

    scalePass.uniforms.uSource.value = f.pressure.read.texture;
    scalePass.uniforms.uValue.value = 0.8;
    renderPass(scalePass, f.pressure.write, false);
    f.pressure.swap();

    pressurePass.uniforms.uDivergence.value = f.divergence.texture;
    for (var i = 0; i < PRESSURE_STEPS; i++) {
      pressurePass.uniforms.uPressure.value = f.pressure.read.texture;
      renderPass(pressurePass, f.pressure.write, false);
      f.pressure.swap();
    }

    projectPass.uniforms.uPressure.value = f.pressure.read.texture;
    projectPass.uniforms.uVelocity.value = f.velocity.read.texture;
    renderPass(projectPass, f.velocity.write, false);
    f.velocity.swap();

    var fade = 1 / clamp(s.trail, 0.1, 10);
    var advect = advectPass.uniforms;
    advect.uDt.value = dt;
    advect.uVelocity.value = f.velocity.read.texture;
    advect.uSource.value = f.velocity.read.texture;
    advect.uFade.value = fade * 1.4;
    renderPass(advectPass, f.velocity.write, false);
    f.velocity.swap();

    advect.uVelocity.value = f.velocity.read.texture;
    advect.uSource.value = f.ink.read.texture;
    advect.uFade.value = fade;
    renderPass(advectPass, f.ink.write, false);
    f.ink.swap();
  }

  function clearFluid(f) {
    scalePass.uniforms.uValue.value = 0;
    [f.velocity, f.ink, f.pressure].forEach(function (pair) {
      scalePass.uniforms.uSource.value = pair.read.texture;
      renderPass(scalePass, pair.write, false);
      pair.swap();
    });
  }

  function frame(now) {
    raf = 0;
    if (!alive) return;
    var s = settings;
    var dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
    last = now;

    if (!s.paused && !reducedMotion) time += dt * s.speed;
    introClock = s.intro && !reducedMotion ? introClock + dt / Math.max(0.2, s.introDuration) : 1;
    var introLinear = Math.min(introClock, 1);
    var introEase =
      introLinear < 0.5 ? 4 * introLinear * introLinear * introLinear : 1 - Math.pow(-2 * introLinear + 2, 3) / 2;

    if (fluid && splats.length) {
      var radius = Math.pow(clamp(s.cursorSize, 4, 600) / height, 2) * 0.35;
      var aspect = width / height;
      for (var k = 0; k < splats.length; k++) {
        var sp = splats[k];
        var u = sp[0], v = sp[1], du = sp[2], dv = sp[3], turn = sp[4];
        if (turn === null) {
          splat(fluid.velocity, [u, v], [du * SPLAT_FORCE, dv * SPLAT_FORCE, 0], radius);
          splat(fluid.ink, [u, v], [0.13, 0, 0], radius);
          continue;
        }
        var jet = radius * 0.55;
        var reach = Math.sqrt(jet * 0.5) * 1.9;
        var push = SPLAT_FORCE * 0.08;
        for (var i = 0; i < SPLASH_JETS; i++) {
          var angle = turn + (i / SPLASH_JETS) * Math.PI * 2;
          var dx = Math.cos(angle);
          var dy = Math.sin(angle);
          var point = [u + (dx * reach) / aspect, v + dy * reach];
          var spin = [(dx - dy) * Math.SQRT1_2 * push, (dy + dx) * Math.SQRT1_2 * push, 0];
          splat(fluid.velocity, point, spin, jet);
          splat(fluid.ink, point, [0.75, 0, 0], jet);
        }
        splat(fluid.ink, [u, v], [0.45, 0, 0], radius);
      }
      splats.length = 0;
      fluidDirty = true;
    }

    var fluidActive = fluid !== null && now < fluidUntil;
    if (fluid) {
      if (fluidActive) stepFluid(fluid, Math.min(Math.max(dt, 1 / 240), 1 / 30), s);
      else if (fluidDirty) {
        clearFluid(fluid);
        fluidDirty = false;
      }
    }

    var grid = layout(s);

    fieldUniforms.uSize.value = [width, height];
    fieldUniforms.uGrid.value = grid.grid;
    fieldUniforms.uOrigin.value = grid.origin;
    fieldUniforms.uSlat.value = [grid.slatW, grid.slatH];
    fieldUniforms.uTime.value = time;
    fieldUniforms.uScale.value = s.scale;
    fieldUniforms.uDirection.value = (s.direction * Math.PI) / 180;
    fieldUniforms.uChop.value = clamp(s.chop, 0, 1.5);
    fieldUniforms.uStretch.value = clamp(s.stretch, 0, 0.95);
    fieldUniforms.uGlint.value = Math.max(0, s.glint);
    fieldUniforms.uContrast.value = clamp(s.contrast, 0.2, 4);
    fieldUniforms.uPerspective.value = clamp(s.perspective, 0, 1);
    fieldUniforms.uFog.value = clamp(s.fog, 0, 1);
    fieldUniforms.uIntro.value = introEase;
    fieldUniforms.uFluid.value = fluidActive ? 1 : 0;
    fieldUniforms.tVelocity.value = fluid ? fluid.velocity.read.texture : blankTex;
    fieldUniforms.tInk.value = fluid ? fluid.ink.read.texture : blankTex;
    fieldUniforms.uFluidTexel.value = fluidTexel.value;
    fieldUniforms.uInk.value = clamp(s.cursorStrength, 0, 3);
    fieldUniforms.uLean.value = clamp(s.lean, 0, 1);
    renderPass(fieldPass, fieldTarget, true);

    slatUniforms.uSize.value = [width, height];
    slatUniforms.uDpr.value = dpr;
    slatUniforms.uGrid.value = grid.grid;
    slatUniforms.uOrigin.value = grid.origin;
    slatUniforms.uSlat.value = [grid.slatW, grid.slatH];
    slatUniforms.uRound.value = clamp(s.roundness, 0, 1);
    slatUniforms.uTilt.value = fluidActive && s.lean > 0 ? grid.tilt : 0;
    slatUniforms.uColor.value = s.color.slice(0, 3);
    slatUniforms.uGlintColor.value = s.glintColor.slice(0, 3);
    slatUniforms.uBackground.value = s.backgroundColor;
    renderPass(slatPass, null, true);

    var moving = (!s.paused && !reducedMotion && s.speed !== 0) || introClock < 1;
    if (visible && (moving || fluidActive || fluidDirty)) raf = requestAnimationFrame(frame);
  }

  function start() {
    if (raf || !visible || !alive) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function locate(e) {
    var rect = container.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var w = Math.max(1, rect.width);
    var h = Math.max(1, rect.height);
    return { x: x, y: y, u: x / w, v: 1 - y / h, h: h, inside: x >= 0 && y >= 0 && x <= w && y <= h };
  }

  function queue(u, v, du, dv, turn) {
    if (splats.length > 32) splats.shift();
    splats.push([u, v, du, dv, turn]);
    fluidUntil = performance.now() + Math.max(1.5, settings.trail * 5) * 1000;
    start();
  }

  function onPointerMove(e) {
    var spot = locate(e);
    if (!fluid || !settings.interactive || reducedMotion || !spot.inside) {
      pointer.tracked = false;
      return;
    }
    if (pointer.tracked && (spot.x !== pointer.x || spot.y !== pointer.y)) {
      queue(spot.u, spot.v, (spot.x - pointer.x) / spot.h, (pointer.y - spot.y) / spot.h, null);
    }
    pointer.x = spot.x;
    pointer.y = spot.y;
    pointer.tracked = true;
  }

  function onPointerDown(e) {
    var spot = locate(e);
    if (!fluid || !settings.interactive || reducedMotion || !spot.inside) return;
    splashTurn += 2.39996;
    queue(spot.u, spot.v, 0, 0, splashTurn);
  }

  function onPointerLeave() {
    pointer.tracked = false;
  }

  function onPointerOut(e) {
    if (!e.relatedTarget) onPointerLeave();
  }

  function onVisibility() {
    if (!document.hidden) start();
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerdown', onPointerDown, { passive: true });
  window.addEventListener('pointerout', onPointerOut, { passive: true });
  window.addEventListener('blur', onPointerLeave);
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('resize', resize);

  resize();
})();
