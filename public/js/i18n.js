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
      'index.reveal.phrase': '优秀的商业需要连接数理、代码、金融与市场',
      'index.about.text': '从<span class="other-accent">数理金融</span>到<span class="other-accent">计算机科学</span>，我探索数据、算法与商业策略的深层共生。',
      'index.about.sub': '我是杨蕊嘉 (Flora Yeung)。本科毕业于同济大学数理金融，现就读于香港大学计算机科学硕士。游走于量化建模、大语言模型与战略分析之间，以非垂直的野蛮生长路径连接商业洞察与工程落地。',
      'index.cg.phrase': '每一次跨越边界的尝试，都是为了在<span class="other-accent">商业思维</span>与<span class="other-accent">技术能力</span>之间找到最优解。',
      'index.skills.subtitle': '专业技能',
      'index.skills.heading': '从模型到产品',
      'index.skills.text': '以金融与数学为基础，结合数据科学、人工智能与软件开发，探索技术如何解决真实问题。',
      'index.skills.cross.title': '跨学科方法',
      'index.skills.cross.desc': '我关注严谨分析、技术实现与创造性解决问题之间的连接。',
      'index.skills.contactBtn': '联系方式🞣',
      'index.skills.cat1.title': '01 / 人工智能与机器学习',
      'index.skills.cat1.desc': '让复杂数据与自然语言转化为可分析、可验证的智能结果。',
      'index.skills.cat1.items': '机器学习 · 自然语言处理 · Transformer · 大语言模型 · 特征工程 · 模型评估 · 分类与回归 · 聚类分析 · BERTopic · Scikit-learn · XGBoost · PyTorch',
      'index.skills.cat1.exploringLabel': '持续探索：',
      'index.skills.cat1.exploringItems': '大模型微调 · SFT · LoRA / QLoRA · 检索增强生成 · 量化推理',
      'index.skills.cat2.title': '02 / 数据科学与商业分析',
      'index.skills.cat2.desc': '从原始数据到业务洞察，将分析结果转化为可衡量的决策依据。',
      'index.skills.cat2.items': 'Python · SQL · Pandas · NumPy · DuckDB · Spark · 数据挖掘 · 统计检验 · 探索性数据分析 · 留存与同期群分析 · RFM 用户分层 · Shapley 归因 · 商业智能 · 数据可视化 · Streamlit · QGIS',
      'index.skills.cat3.title': '03 / 量化金融与实证研究',
      'index.skills.cat3.desc': '运用数学、统计与计算方法，研究金融市场、经济行为与不确定性。',
      'index.skills.cat3.items': '数理金融 · 计量经济学 · 时间序列分析 · 金融建模 · 多因子研究 · 市场微观结构 · 限价订单簿分析 · 量化回测 · 风险分析 · 非线性回归 · 假设检验 · Granger 因果检验 · R · Python',
      'index.skills.cat4.title': '04 / 软件工程与产品开发',
      'index.skills.cat4.desc': '将分析思路转化为可使用、可交互、以人为中心的技术产品。',
      'index.skills.cat4.items': 'Python · TypeScript · JavaScript · React · HTML / CSS · SQL · C# · Git & GitHub · API 集成 · 数据库设计 · 数据看板开发 · 交互原型 · 数据驱动产品设计',
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
      'contact.panel.title': '期待与你开启对话。',
      'contact.panel.copy': '开放全职、实习及研究合作机会，期待在商业、金融与技术交汇的领域探索更多可能。',
      'contact.meta.base': '常驻地',
      'contact.meta.status': '当前状态',
      'contact.meta.delay': '求职意向',
      'contact.meta.base.value': '香港 / 上海',
      'contact.meta.status.value': 'HKU · MSc Computer Science',
      'contact.meta.delay.value': 'Full-time · Internships',
      'contact.eyebrow': '联系方式',
      'contact.headline': '期待与你共创下一种可能。',
      'contact.role': '从商业洞察到技术创新，让分析、智能与想法创造真实价值。',
      'contact.desc': '<p>我目前就读于香港大学计算机科学硕士项目，本科毕业于同济大学数理金融专业，拥有互联网战略与数据分析、咨询和证券研究经历。</p><p>目前正在寻找 <strong>人工智能、数据科学、商业分析、战略分析、量化金融及金融科技</strong> 相关的全职与实习机会。</p><p>我期待与重视严谨分析、商业判断和技术创新的团队合作。无论是职位机会、研究合作，还是值得探索的新想法，都欢迎与我联系。</p>',
      'contact.shortcuts': '直接联系',
      'contact.brief': '关注方向',
      'contact.github.sub': 'Explore my projects',
      'contact.linkedin.sub': 'Professional profile',
      'contact.opp1.title': '01 / AI & Machine Learning',
      'contact.opp1.desc': '大模型、NLP、机器学习、AI 算法与智能应用',
      'contact.opp2.title': '02 / Data Science & Business Analytics',
      'contact.opp2.desc': '数据科学、商业分析、经营诊断与增长分析',
      'contact.opp3.title': '03 / Strategy & Operations',
      'contact.opp3.desc': '战略分析、商业策略、市场研究与业务运营',
      'contact.opp4.title': '04 / Quantitative Finance & Fintech',
      'contact.opp4.desc': '量化研究、金融建模、金融科技与投资研究',
      'contact.opp5.title': '05 / AI Product & Technology',
      'contact.opp5.desc': 'AI 产品、技术创新与数据驱动产品开发',
      'contact.bottom.status': 'OPEN TO FULL-TIME & INTERNSHIP OPPORTUNITIES · 2026',

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
      'index.reveal.phrase': 'Great business bridges math, code, finance, and markets.',
      'index.about.text': 'As a<span class="other-accent"> hybrid builder</span> between Finance & CS, I craft data-driven systems blending technical precision and <span class="other-accent">strategy</span>.',
      'index.about.sub': "I'm Flora Yeung. Holding a B.Ec. in Mathematical Finance from Tongji University and pursuing my M.Sc. in Computer Science at HKU, I bridge quantitative modeling, LLMs, and strategic business growth.",
      'index.cg.phrase': "Every project is a chance to <span class=\"other-accent\">learn</span>, <span class=\"other-accent\">experiment</span> and push my limits.",
      'index.skills.subtitle': 'SKILLS',
      'index.skills.heading': 'What I Work With.',
      'index.skills.text': 'From financial models to intelligent systems, I work across data, algorithms, and product development.',
      'index.skills.cross.title': 'CROSS-DISCIPLINARY APPROACH',
      'index.skills.cross.desc': 'I enjoy working at the intersection of analytical rigor, technical implementation, and creative problem-solving.',
      'index.skills.contactBtn': 'Contact me🞣',
      'index.skills.cat1.title': '01 / ARTIFICIAL INTELLIGENCE & MACHINE LEARNING',
      'index.skills.cat1.desc': 'Building models that turn complex data and language into actionable intelligence.',
      'index.skills.cat1.items': 'Machine Learning · Natural Language Processing · Transformers · Large Language Models · Feature Engineering · Model Evaluation · Classification & Regression · Clustering · BERTopic · Scikit-learn · XGBoost · PyTorch',
      'index.skills.cat1.exploringLabel': 'Currently Exploring:',
      'index.skills.cat1.exploringItems': 'LLM Fine-tuning · SFT · LoRA / QLoRA · Retrieval-Augmented Generation · Quantized Inference',
      'index.skills.cat2.title': '02 / DATA SCIENCE & ANALYTICS',
      'index.skills.cat2.desc': 'Transforming raw data into structured insights, measurable outcomes, and better decisions.',
      'index.skills.cat2.items': 'Python · SQL · Pandas · NumPy · DuckDB · Apache Spark · Data Mining · Statistical Testing · Exploratory Data Analysis · Cohort & Retention Analysis · RFM Segmentation · Shapley Decomposition · Business Intelligence · Data Visualization · Streamlit · QGIS',
      'index.skills.cat3.title': '03 / QUANTITATIVE FINANCE & RESEARCH',
      'index.skills.cat3.desc': 'Applying mathematical and statistical methods to understand financial markets, economic behavior, and uncertainty.',
      'index.skills.cat3.items': 'Quantitative Finance · Econometrics · Time-Series Analysis · Financial Modeling · Factor Research · Market Microstructure · Limit Order Book Analysis · Backtesting · Risk Analysis · Nonlinear Regression · Hypothesis Testing · Granger Causality · R · Python',
      'index.skills.cat4.title': '04 / SOFTWARE & PRODUCT DEVELOPMENT',
      'index.skills.cat4.desc': 'Connecting analytical ideas with functional tools, interactive experiences, and human-centered products.',
      'index.skills.cat4.items': 'Python · TypeScript · JavaScript · React · HTML / CSS · SQL · C# · Git & GitHub · API Integration · Database Design · Dashboard Development · Interactive Prototyping · Data-Driven Product Design',
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
      'contact.pageTitle': 'CONTACT',
      'contact.panel.title': "Let's Start a Conversation.",
      'contact.panel.copy': 'Open to full-time roles, internships, and research collaborations at the intersection of business, finance, and technology.',
      'contact.meta.base': 'BASED IN',
      'contact.meta.status': 'CURRENT STATUS',
      'contact.meta.delay': 'OPEN TO',
      'contact.meta.base.value': 'Hong Kong / Shanghai',
      'contact.meta.status.value': 'HKU · MSc Computer Science',
      'contact.meta.delay.value': 'Full-time · Internships',
      'contact.eyebrow': 'CONTACT',
      'contact.headline': "Let's Create What's Next.",
      'contact.role': 'From business insights to intelligent systems, turning analytical thinking into real-world impact.',
      'contact.desc': "<p>I'm currently pursuing an MSc in Computer Science at the University of Hong Kong, following a bachelor's degree in Quantitative Finance at Tongji University.</p><p>With experience in international business strategy and data analytics, consulting, and equity research, I'm exploring full-time and internship opportunities across <strong>AI, data science, business analytics, strategy, quantitative finance, and fintech</strong>.</p><p>I'm always interested in connecting with teams that combine analytical rigor, strategic thinking, and technological innovation.</p>",
      'contact.shortcuts': 'DIRECT CHANNELS',
      'contact.brief': 'OPEN TO OPPORTUNITIES',
      'contact.github.sub': 'Explore my projects',
      'contact.linkedin.sub': 'Professional profile',
      'contact.opp1.title': '01 / AI & Machine Learning',
      'contact.opp1.desc': 'LLMs · NLP · Machine Learning · AI Applications',
      'contact.opp2.title': '02 / Data Science & Business Analytics',
      'contact.opp2.desc': 'Business Intelligence · Growth Analytics · Business Diagnostics',
      'contact.opp3.title': '03 / Strategy & Operations',
      'contact.opp3.desc': 'Business Strategy · Strategic Analysis · Market Research · Operations',
      'contact.opp4.title': '04 / Quantitative Finance & Fintech',
      'contact.opp4.desc': 'Quantitative Research · Financial Modeling · Investment Research',
      'contact.opp5.title': '05 / AI Product & Technology',
      'contact.opp5.desc': 'AI Products · Product Analytics · Technology Development',
      'contact.bottom.status': 'OPEN TO FULL-TIME & INTERNSHIP OPPORTUNITIES · 2026',

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

    // Update language toggle button state on first screen
    var toggleBtn = document.getElementById('lang-toggle-btn');
    if (toggleBtn) {
      var zhEl = toggleBtn.querySelector('.lang-zh');
      var enEl = toggleBtn.querySelector('.lang-en');
      if (zhEl && enEl) {
        zhEl.classList.toggle('active', targetLang === 'zh');
        enEl.classList.toggle('active', targetLang === 'en');
      }
    }

    if (typeof window.rebuildRevealPhrase === 'function') {
      window.rebuildRevealPhrase(T['index.reveal.phrase'], isDynamicSwitch);
    }

    // Sync project list labels with current language
    document.querySelectorAll('.proj-item[data-id]').forEach(function (item) {
      var id = item.getAttribute('data-id');
      var pMap = window.FLORA_PROJECTS_MAP || {};
      var proj = pMap[id];
      if (proj) {
        item.textContent = targetLang === 'zh' ? (proj.titleZh || proj.title) : proj.title;
      }
    });

    if (isDynamicSwitch && typeof window.onLanguageChanged === 'function') {
      window.onLanguageChanged(targetLang);
    }
  };

  function ensureLangToggleUI() {
    if (document.getElementById('lang-toggle-btn')) return;

    // Only mount language switcher on the first screen (#hero) when entering the site
    var heroEl = document.getElementById('hero');
    if (!heroEl) return;

    var style = document.createElement('style');
    style.textContent =
      '.lang-toggle-btn {' +
      '  position: absolute;' +
      '  top: 2.85rem;' +
      '  right: 3rem;' +
      '  z-index: 30;' +
      '  display: inline-flex;' +
      '  align-items: center;' +
      '  justify-content: center;' +
      '  gap: 0.25rem;' +
      '  padding: 0.35rem 0.65rem;' +
      '  background: transparent;' +
      '  border: 1px solid rgba(255, 255, 255, 0.38);' +
      '  border-radius: 0;' +
      '  color: rgba(255, 255, 255, 0.55);' +
      '  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;' +
      '  font-size: 0.75rem;' +
      '  font-weight: 600;' +
      '  letter-spacing: 0.06em;' +
      '  cursor: pointer;' +
      '  user-select: none;' +
      '  transition: border-color 0.25s ease, color 0.25s ease;' +
      '}' +
      '.lang-toggle-btn:hover {' +
      '  border-color: #ffffff;' +
      '}' +
      '.lang-toggle-btn .lang-zh, .lang-toggle-btn .lang-en {' +
      '  transition: color 0.2s ease;' +
      '}' +
      '.lang-toggle-btn .active {' +
      '  color: #ffffff;' +
      '}' +
      '.lang-toggle-btn .lang-sep {' +
      '  color: rgba(255, 255, 255, 0.4);' +
      '}' +
      '@media (max-width: 960px) {' +
      '  .lang-toggle-btn {' +
      '    top: 1.5rem;' +
      '    right: 1.5rem;' +
      '    padding: 0.28rem 0.5rem;' +
      '    font-size: 0.68rem;' +
      '  }' +
      '}';
    document.head.appendChild(style);

    var btn = document.createElement('button');
    btn.id = 'lang-toggle-btn';
    btn.className = 'lang-toggle-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', '中英文切换 / Switch Language');
    btn.title = '中英文切换';
    btn.innerHTML =
      '<span class="lang-zh ' + (defaultLang === 'zh' ? 'active' : '') + '">中</span>' +
      '<span class="lang-sep">/</span>' +
      '<span class="lang-en ' + (defaultLang === 'en' ? 'active' : '') + '">EN</span>';

    btn.addEventListener('click', function () {
      var next = window.__I18N_LANG === 'zh' ? 'en' : 'zh';
      window.applyLanguage(next, true);
    });

    heroEl.appendChild(btn);
  }

  ensureLangToggleUI();
  window.applyLanguage(defaultLang, false);
})();
