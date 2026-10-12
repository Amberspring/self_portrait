(function () {
  var savedLang = null;
  try { savedLang = localStorage.getItem('flora_lang'); } catch (e) {}
  var browserLang = (navigator.language || navigator.userLanguage || 'zh').toLowerCase();
  var defaultLang = savedLang ? (savedLang === 'en' ? 'en' : 'zh') : (browserLang.startsWith('en') ? 'en' : 'zh');

  window.getCharHTML = function (ch) {
    if (ch === ' ') return '&nbsp;';
    if (ch === '🡲' || ch === '🡺') return '<svg style="width: 1.25em; height: 1.25em; vertical-align: -0.25em;" viewBox="0 0 84 85" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11 38H54L37 21H51L73 43L51 65H37L54 48H11Z"/></svg>';
    if (ch === '🡼') return '<svg style="width: 1.25em; height: 1.25em; vertical-align: -0.25em;" viewBox="0 0 84 85" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(-135 42 42.5)"><path d="M11 38H54L37 21H51L73 43L51 65H37L54 48H11Z"/></g></svg>';
    if (ch === '🞣') return '<svg style="width: 0.9em; height: 0.9em; vertical-align: -0.1em; transform: translateY(-0.1em);" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z"/></svg>';
    return ch;
  };

  window.buildChrHover = function (el, text) {
    if (!el || text == null) return;
    el.innerHTML = '';
    Array.from(String(text)).forEach(function (ch, i) {
      if (ch === ' ') {
        el.insertAdjacentHTML('beforeend', '<span style="width:0.35em;display:inline-block">&nbsp;</span>');
        return;
      }
      var wrap = document.createElement('span');
      wrap.className = 'ch-wrap';
      wrap.style.setProperty('--i', i);
      var chHTML = window.getCharHTML ? window.getCharHTML(ch) : ch;
      wrap.innerHTML = '<span class="ch-top">' + chHTML + '</span><span class="ch-bot">' + chHTML + '</span>';
      el.appendChild(wrap);
    });
  };

  var DICT = {
    zh: {
      'meta.description': '杨蕊嘉 (Flora Yeung) — 从同济数理金融到港大计算机科学，非垂直的野蛮生长路径，兼具商业思维 × 技术能力。',
      'index.title': 'Flora Yeung | 杨蕊嘉',
      'index.h1': '杨蕊嘉 (Flora Yeung) — 从同济数理金融到港大计算机科学，非垂直的野蛮生长路径，兼具商业思维 × 技术能力。',
      'index.hero.tagline': '从同济数理金融到港大计算机科学，<br><span class="other-accent">非垂直的野蛮生长路径</span><br>兼具 商业思维 x 技术能力',
      'index.nav.work': '作品',
      'index.nav.info': '关于我',
      'index.nav.contact': '联系方式',
      'index.about.text': '从<span class="other-accent">数理金融</span>到<span class="other-accent">计算机科学</span>，我探索数据、算法与商业策略的深层共生。',
      'index.about.sub': '我是杨蕊嘉 (Flora Yeung)。本科毕业于同济大学数理金融，现就读于香港大学计算机科学硕士。游走于量化建模、大语言模型与战略分析之间，以非垂直的野蛮生长路径连接商业洞察与工程落地。',
      'index.cg.phrase': '每一次跨越边界的尝试，都是为了在<span class="other-accent">商业思维</span>与<span class="other-accent">技术能力</span>之间找到最优解。',
      'index.skills.subtitle': '核心能力',
      'index.skills.text': '香港大学计算机科学硕士，同济大学数理金融学士，专注数据挖掘、量化建模与商业战略分析。',
      'index.skills.contactBtn': '联系方式🞣',
      'index.skills.frontend': 'Frontend',
      'index.skills.animation': 'Animation & 3D',
      'index.skills.backend': 'Backend',
      'index.skills.database': '数据库与大数据',
      'index.skills.devops': 'DevOps & 工具',
      'index.skills.security': '系统与安全',
      'index.skills.design': '设计与可视化',
      'index.contact.title': 'Contact',
      'index.contact.dispo1': '香港大学 <span class="other-accent">计算机科学硕士</span> 在读，同济大学 <span class="other-accent">数理金融</span> 学士（GPA 4.51/5.0，前 30%）。期待加入兼具视野与创造力的团队。',
      'index.contact.dispo2': '曾实习于 <span class="other-accent">滴滴国际部</span>、意略明 (IQVIA) 与民生证券，具备扎实的 <span class="other-accent">商业分析 × 算法工程</span> 复合背景。',
      'index.proj.label': 'Preview',
      'index.detail.visit': '访问项目 🡲',
      'index.detail.back': '🡼返回',

      'info.title': '关于我 — Flora Yeung',
      'info.pageTitle': '关于我',
      'info.eyebrow': '关于我',
      'info.role': '香港大学计算机科学硕士 · 同济大学数理金融学士，兼具商业思维 × 技术能力。',
      'info.desc': '从同济数理金融到港大计算机科学，沿着<span class="other-accent">非垂直的野蛮生长路径</span>，我在滴滴出行国际部、IQVIA 与民生证券积累了丰富的战略与行业分析经验，同时深耕大语言模型、高频 LOB 量化建模与全栈工程。',
      'info.meta.based': '所在地',
      'info.meta.status': '教育背景',
      'info.meta.based.value': '香港 / 上海',
      'info.meta.status.value': '香港大学 MSc CS · 同济大学 数理金融',
      'info.skills.frontend': '编程与数据工具',
      'info.skills.animation': '机器学习与 NLP',
      'info.skills.backend': '量化与计量建模',
      'info.skills.security': '商业与战略分析',

      'contact.title': '联系方式 — Flora Yeung',
      'contact.pageTitle': '联系方式',
      'contact.panel.title': '期待与您开启对话。',
      'contact.panel.copy': '无论是数据分析、AI/量化算法实习机会，还是跨学科商业与技术合作，我都会快速响应。',
      'contact.meta.base': '常驻地',
      'contact.meta.status': '当前状态',
      'contact.meta.delay': '电话 / 微信',
      'contact.meta.base.value': '香港 / 上海',
      'contact.meta.status.value': 'HKU 硕士在读 / 开放合作',
      'contact.meta.delay.value': '(+86) 13367811933',
      'contact.eyebrow': '联系方式',
      'contact.role': '从同济数理金融到港大计算机科学 · 商业思维 × 技术能力。',
      'contact.desc': '如果您有极具挑战性的项目、岗位机会或合作想法，欢迎随时通过邮件或 GitHub 与我联系。',
      'contact.shortcuts': '直达通道',
      'contact.brief': '核心方向',
      'contact.maildirect': '发送邮件 (yrjzcm@foxmail.com)',
      'contact.brief.product': '商业战略与增长分析',
      'contact.brief.deadline': 'LLM 与自然语言处理',
      'contact.brief.stack': '量化交易与高频 LOB 建模',
      'contact.brief.deliverables': '全栈开发与数据可视化',

      'works.title': '作品 — Flora Yeung',
      'works.pageTitle': '作品',
      'works.h1': '项目作品 — 杨蕊嘉 (Flora Yeung)，涵盖量化金融、LLM 文本计量、电商增长与全栈开发。',

      'common.back': '返回',
      'common.aria.back': '返回首页',
      'common.aria.menu': '主导航',
      'common.aria.social': '社交链接',
      'common.aria.footer': '页脚导航',

      '404.title': '404 — Flora Yeung',
      '404.subtitle': '这个页面迷失在数据虚空中。<br><span class="subtitle-dim">它不存在，或已被移除。</span>',
      '404.ticker': '— PAGE NOT FOUND — SIGNAL LOST — ERROR 0x404 — 页面不存在 — COORDINATES: NULL — UNKNOWN DESTINATION — ',
      '404.aria.back': '返回首页'
    },
    en: {
      'meta.description': 'Flora Yeung (Ruijia Yang) — From Mathematical Finance at Tongji to Computer Science at HKU. A non-linear, wild-growth trajectory combining business acumen × technical execution.',
      'index.title': 'Flora Yeung, Creative Developer & Quant/Data Analyst',
      'index.h1': 'Flora Yeung — From Mathematical Finance at Tongji to Computer Science at HKU, combining Business Acumen x Technical Execution.',
      'index.hero.tagline': 'From Math Finance at Tongji to CS at HKU,<br><span class="other-accent">a non-linear wild growth path</span><br>bridging Business Acumen x Tech Power.',
      'index.nav.work': 'Work',
      'index.nav.info': 'About Me',
      'index.nav.contact': 'Contact',
      'index.about.text': 'As a<span class="other-accent"> hybrid builder</span> between Finance & CS, I craft data-driven systems blending technical precision and <span class="other-accent">strategy</span>.',
      'index.about.sub': "I'm Flora Yeung. Holding a B.Ec. in Mathematical Finance from Tongji University and pursuing my M.Sc. in Computer Science at HKU, I bridge quantitative modeling, LLMs, and strategic business growth.",
      'index.cg.phrase': "Every project is a chance to <span class=\"other-accent\">learn</span>, <span class=\"other-accent\">experiment</span> and push my limits.",
      'index.skills.subtitle': 'Skills',
      'index.skills.text': 'M.Sc. in Computer Science at HKU & B.Ec. in Math Finance at Tongji, passionate about AI, quantitative modeling, and interactive engineering.',
      'index.skills.contactBtn': 'Contact me🞣',
      'index.skills.frontend': 'Frontend',
      'index.skills.animation': 'Animation & 3D',
      'index.skills.backend': 'Backend',
      'index.skills.database': 'Databases',
      'index.skills.devops': 'DevOps & Tools',
      'index.skills.security': 'System & Security',
      'index.skills.design': 'Design',
      'index.contact.title': 'Contact',
      'index.contact.dispo1': "Pursuing my <span class=\"other-accent\">M.Sc. in Computer Science at HKU</span> after graduating top 30% in <span class=\"other-accent\">Math Finance at Tongji</span> (GPA 4.51/5.0).",
      'index.contact.dispo2': "Available for<span class=\"other-accent\"> ambitious collaborations</span> worldwide, bridging<span class=\"other-accent\"> business strategy x technical engineering</span>.",
      'index.proj.label': 'Preview',
      'index.detail.visit': 'VISIT 🡲',
      'index.detail.back': '🡼BACK',

      'info.title': 'About Me — Flora Yeung',
      'info.pageTitle': 'About Me',
      'info.eyebrow': 'About Me',
      'info.role': 'M.Sc. Computer Science @ HKU · B.Ec. Mathematical Finance @ Tongji University.',
      'info.desc': "From Mathematical Finance at Tongji to Computer Science at HKU, following a <span class=\"other-accent\">non-linear wild growth path</span>, I combine strategic consulting experience (DiDi Global, IQVIA, Minsheng Securities) with quantitative modeling, LLM pipelines, and full-stack engineering.",
      'info.meta.based': 'Based in',
      'info.meta.status': 'Education',
      'info.meta.based.value': 'Hong Kong / Shanghai',
      'info.meta.status.value': 'HKU MSc CS · Tongji Math Finance',
      'info.skills.frontend': 'Programming & Data',
      'info.skills.animation': 'ML & NLP',
      'info.skills.backend': 'Quant & Econometrics',
      'info.skills.security': 'Strategy & Growth',

      'contact.title': 'Contact — Flora Yeung',
      'contact.pageTitle': 'Contact',
      'contact.panel.title': "Let's talk about your project.",
      'contact.panel.copy': "I respond quickly to internship opportunities, quantitative/AI research roles, and ambitious cross-disciplinary collaborations.",
      'contact.meta.base': 'Based in',
      'contact.meta.status': 'Status',
      'contact.meta.delay': 'Phone',
      'contact.meta.base.value': 'Hong Kong / Shanghai',
      'contact.meta.status.value': 'HKU MSc CS / Open to Roles',
      'contact.meta.delay.value': '(+86) 13367811933',
      'contact.eyebrow': 'Contact',
      'contact.role': 'Bridging Business Acumen × Technical Capability across Finance, AI, and Web.',
      'contact.desc': "If you have an ambitious project, research topic, or role in mind, I'd be glad to connect and explore a potential collaboration.",
      'contact.shortcuts': 'Shortcuts',
      'contact.brief': 'Focus Areas',
      'contact.maildirect': 'Direct Mail (yrjzcm@foxmail.com)',
      'contact.brief.product': 'Business Strategy & Growth',
      'contact.brief.deadline': 'LLMs & NLP Pipelines',
      'contact.brief.stack': 'Quant & High-Freq LOB Modeling',
      'contact.brief.deliverables': 'Full-Stack & Interactive Web',

      'works.title': 'Work — Flora Yeung',
      'works.pageTitle': 'Work',
      'works.h1': 'Projects — Flora Yeung, spanning quantitative modeling, LLM econometrics, e-commerce analytics, and interactive web.',

      'common.back': 'Back',
      'common.aria.back': 'Back to home',
      'common.aria.menu': 'Main navigation',
      'common.aria.social': 'Social links',
      'common.aria.footer': 'Footer navigation',

      '404.title': '404 — Flora Yeung',
      '404.subtitle': 'This page got lost in the void.<br><span class="subtitle-dim">It doesn\'t exist, or no longer does.</span>',
      '404.ticker': '— PAGE NOT FOUND — SIGNAL LOST — ERROR 0x404 — THIS PAGE DOESN\'T EXIST — COORDINATES: NULL — UNKNOWN DESTINATION — ',
      '404.aria.back': 'Back to home'
    }
  };

  function wrapWordsForElement(el) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    var isMobile = navigator.maxTouchPoints > 1 || window.innerWidth <= 768;

    textNodes.forEach(function (node) {
      var words = node.textContent.split(/(\s+)/);
      var frag = document.createDocumentFragment();
      words.forEach(function (w) {
        if (/^\s+$/.test(w)) {
          frag.appendChild(document.createTextNode(w));
        } else if (w) {
          var span = document.createElement('span');
          span.className = 'word';
          span.textContent = w;
          span.style.opacity = '1';
          span.style.filter = 'blur(0px)';
          frag.appendChild(span);
        }
      });
      node.parentNode.replaceChild(frag, node);
    });
  }

  window.applyLanguage = function (lang, isDynamicSwitch) {
    var targetLang = lang === 'en' ? 'en' : 'zh';
    window.__I18N_LANG = targetLang;
    document.documentElement.lang = targetLang === 'zh' ? 'zh-CN' : 'en';
    document.documentElement.dataset.lang = targetLang;
    try { localStorage.setItem('flora_lang', targetLang); } catch (e) {}

    var T = DICT[targetLang];
    window.__t = function (key) { return T[key]; };

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (T[key] != null) {
        var hadWords = el.querySelector('.word') !== null;
        el.innerHTML = T[key];
        if (isDynamicSwitch && hadWords) {
          wrapWordsForElement(el);
        }
      }
    });

    document.querySelectorAll('[data-i18n-chr]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-chr');
      var val = T[key];
      if (val != null) {
        el.setAttribute('data-chr', val);
        if (isDynamicSwitch || el.querySelector('.ch-wrap')) {
          window.buildChrHover(el, val);
        }
      }
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split('|').forEach(function (pair) {
        var idx = pair.indexOf(':');
        if (idx < 0) return;
        var attr = pair.slice(0, idx).trim();
        var key = pair.slice(idx + 1).trim();
        if (T[key] != null) {
          el.setAttribute(attr, T[key]);
          if ((attr === 'data-chr' || attr === 'data-chr-footer' || attr === 'data-chr-contact') && (isDynamicSwitch || el.querySelector('.ch-wrap'))) {
            window.buildChrHover(el, T[key]);
          }
        }
      });
    });

    var titleKey = document.documentElement.getAttribute('data-i18n-title');
    if (titleKey && T[titleKey]) document.title = T[titleKey];

    var descMeta = document.querySelector('meta[name="description"]');
    if (descMeta && T['meta.description']) descMeta.setAttribute('content', T['meta.description']);

    // Update language toggle button state
    var toggleBtn = document.getElementById('lang-toggle-btn');
    if (toggleBtn) {
      var zhSpan = toggleBtn.querySelector('.lang-zh');
      var enSpan = toggleBtn.querySelector('.lang-en');
      if (zhSpan && enSpan) {
        zhSpan.classList.toggle('active', targetLang === 'zh');
        enSpan.classList.toggle('active', targetLang === 'en');
      }
    }

    if (isDynamicSwitch && typeof window.onLanguageChanged === 'function') {
      window.onLanguageChanged(targetLang);
    }
  };

  function ensureLangToggleUI() {
    if (document.getElementById('lang-toggle-btn')) return;

    var style = document.createElement('style');
    style.textContent =
      '.lang-toggle-btn {' +
      '  position: fixed;' +
      '  top: 2.6rem;' +
      '  right: 3rem;' +
      '  z-index: 30040;' +
      '  display: inline-flex;' +
      '  align-items: center;' +
      '  gap: 0.45rem;' +
      '  padding: 0.45rem 0.9rem;' +
      '  background: rgba(10, 10, 10, 0.55);' +
      '  backdrop-filter: blur(10px);' +
      '  -webkit-backdrop-filter: blur(10px);' +
      '  border: 1px solid rgba(147, 51, 234, 0.38);' +
      '  border-radius: 999px;' +
      '  color: rgba(240, 240, 240, 0.5);' +
      '  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;' +
      '  font-size: 0.72rem;' +
      '  font-weight: 600;' +
      '  letter-spacing: 0.1em;' +
      '  cursor: pointer;' +
      '  user-select: none;' +
      '  transition: border-color 0.3s ease, background 0.3s ease, transform 0.25s ease;' +
      '}' +
      '.lang-toggle-btn:hover {' +
      '  border-color: rgba(168, 85, 247, 0.85);' +
      '  background: rgba(20, 12, 32, 0.75);' +
      '}' +
      '.lang-toggle-btn .lang-zh, .lang-toggle-btn .lang-en {' +
      '  transition: color 0.25s ease;' +
      '}' +
      '.lang-toggle-btn .active {' +
      '  color: #f0f0f0;' +
      '}' +
      '.lang-toggle-btn .lang-sep {' +
      '  color: rgba(168, 85, 247, 0.6);' +
      '  font-weight: 400;' +
      '}' +
      'body.has-back-btn .lang-toggle-btn {' +
      '  right: 8.5rem;' +
      '  top: 2.85rem;' +
      '}' +
      '@media (max-width: 768px) {' +
      '  .lang-toggle-btn {' +
      '    top: 1.35rem;' +
      '    right: 1.5rem;' +
      '    padding: 0.35rem 0.75rem;' +
      '    font-size: 0.65rem;' +
      '  }' +
      '  body.has-back-btn .lang-toggle-btn {' +
      '    right: 6.2rem;' +
      '    top: 1.4rem;' +
      '  }' +
      '}';
    document.head.appendChild(style);

    if (document.getElementById('back-btn')) {
      document.body.classList.add('has-back-btn');
    }

    var btn = document.createElement('button');
    btn.id = 'lang-toggle-btn';
    btn.className = 'lang-toggle-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Switch Language / 切换语言');
    btn.innerHTML =
      '<span class="lang-zh ' + (window.__I18N_LANG === 'zh' ? 'active' : '') + '">中</span>' +
      '<span class="lang-sep">/</span>' +
      '<span class="lang-en ' + (window.__I18N_LANG === 'en' ? 'active' : '') + '">EN</span>';

    btn.addEventListener('click', function () {
      var next = window.__I18N_LANG === 'zh' ? 'en' : 'zh';
      window.applyLanguage(next, true);
    });

    document.body.appendChild(btn);
  }

  ensureLangToggleUI();
  window.applyLanguage(defaultLang, false);
})();
