(function () {
  const getLang = () => (typeof window !== 'undefined' && window.__I18N_LANG) || (typeof localStorage !== 'undefined' && localStorage.getItem('flora_lang')) || 'zh';
  const isEn = () => (getLang() === 'en');

  const PROJECTS_LIST = [
    {
      id: 'finger-touch-piano',
      title: 'Finger Touch Piano',
      titleZh: '指尖钢琴',
      natureZh: '网页应用 · 交互实验',
      natureEn: 'WEB APP · INTERACTION',
      link: 'https://finger-touch-piano.vercel.app/',
      year: '2026',
      tags: ['React', 'TypeScript', 'Vite', 'MediaPipe Hands', 'Web Audio API', 'Tailwind CSS'],
      cover: '/assets/images/projects/finger-touch-piano/image.png',
      gallery: [
        '/assets/images/projects/finger-touch-piano/image.png'
      ],
      zh: {
        category: '网页互动实验 · Web App',
        desc: '基于摄像头手部追踪的互动音乐与文字实验。通过拇指与其他手指捏合，触发自定义音符或文字，将手势变成可以演奏、表达和分享的界面。',
        problem: '传统数字乐器与文本输入高度依赖键盘触控等实体外设，缺乏自然的身体表达手感与即兴交互趣味。',
        methods: '利用 MediaPipe Hands 在浏览器端实现低延迟 21 点手部骨骼追踪，结合几何向量判定拇指与各指尖的捏合事件，驱动 Web Audio API 动态合成音符，配合 Canvas 进行粒子律动与文本排版渲染。',
        outcomes: '成功交付并上线完整 Web 体验，支持轻量级即开即弹。',
        scope: '【MVP (已上线)】：钢琴音阶演奏模式 (Piano Mode)、文字即兴模式 (Word Mode)、生日定制祝贺模式 (Birthday Greeting)。<br>【二期规划】：演奏录制与回放、自定旋律分享链接。<br>【三期规划】：双人手势合奏与空间音效探索。',
        note: 'LIVE 网页应用：可通过顶部链接直接体验线上版本。'
      },
      en: {
        category: 'Interactive Web Experiment',
        desc: 'A camera-powered creative interaction experiment that turns thumb-to-finger pinches into notes and words, exploring how hand gestures can become a playful interface for music and expression.',
        problem: 'Traditional digital instruments and text input heavily depend on physical peripherals, lacking tactile body expression and playful spontaneous interaction.',
        methods: 'Engineered real-time 21-point hand landmark tracking via MediaPipe Hands in-browser, mapping pinch vectors to Web Audio API synthesis and dynamic HTML5 Canvas typography animations.',
        outcomes: 'Deployed responsive zero-install live web application accessible across desktop and laptop webcams.',
        scope: '【MVP (Live)】: Piano Mode, Word Mode, Birthday Greeting Mode.<br>【Phase 2 (Planned)】: Session recording & playback, custom melody sharing.<br>【Phase 3 (Exploratory)】: Multi-user duet gestures & spatial audio.',
        note: 'Live Web Application: Direct access available via the project link.'
      }
    },
    {
      id: 'tarobot-omega',
      title: 'TaroBot Omega',
      titleZh: 'TaroBot Omega 塔罗空间',
      natureZh: '网页应用 · 互动空间',
      natureEn: 'WEB APP · INTERACTION',
      link: 'https://tarobot-omega.vercel.app/',
      year: '2026',
      tags: ['Next.js', 'React', 'TypeScript', 'MediaPipe Vision', 'Supabase', 'Tailwind CSS'],
      cover: '/assets/images/projects/tarobot-omega/image.png',
      gallery: [
        '/assets/images/projects/tarobot-omega/image.png'
      ],
      zh: {
        category: '网页应用 · 互动空间',
        desc: '具有沉浸式塔罗室场景的互动抽牌体验，结合提问、洗牌、正逆位与解读流程，并探索手势抽牌和多步骤的数字仪式。',
        problem: '线上塔罗服务大多止步于静态表单提交，缺乏真实占卜过程中的空间氛围感、仪式感与抽牌互动心流。',
        methods: '基于 Next.js 与 Tailwind 构建暗黑沉浸式视效与场景声学空间，集成 MediaPipe Tasks Vision 探索隔空手势抽牌，利用 Supabase 存储牌阵状态、78 张伟特牌正逆位权重与多步骤解读流转。',
        outcomes: '上线高完成度互动体验，涵盖分类提问引导、洗牌切牌切感、正逆位判定及多视角卡牌解读。',
        scope: '【MVP (已上线)】：分类提问、78 张 RWS 伟特塔罗牌牌意图鉴、洗牌切牌与正逆位抽牌互动流程。<br>【二期规划】：个性化牌阵记录归档、历史心境变化统计与多语言解读切换。',
        note: '基于确证的代码仓库架构：使用规则引擎与牌意知识体系，不宣称为未经确认的 LLM / RAG 系统。'
      },
      en: {
        category: 'Web App · Interactive',
        desc: 'An immersive digital tarot experience that brings together question-led readings, shuffled decks, upright and reversed cards, and gesture-driven drawing within an atmospheric interactive space.',
        problem: 'Most web tarot services are reduced to plain form dropdowns, missing spatial presence, meditative pacing, and tactile ritual depth.',
        methods: 'Crafted an atmospheric dark-mode audiovisual space with Next.js and Tailwind CSS, leveraging MediaPipe Tasks Vision for gesture-based drawing and Supabase for reading state management and upright/reversed spread transitions.',
        outcomes: 'Live web deployment supporting structured inquiry, deck shuffle mechanics, and multi-step symbolic readings across the 78-card Rider-Waite-Smith system.',
        scope: '【MVP (Live)】: Categorized inquiry, 78 RWS tarot symbolism encyclopedia, interactive shuffle & upright/reversed spread flow.<br>【Phase 2 (Planned)】: Reading journal history, thematic emotional trends, bilingual interpretation toggle.',
        note: 'Engineered with verified repository architecture; strictly not labeled as LLM/RAG unless specifically verified.'
      }
    },
    {
      id: 'acg-pop-economy',
      title: 'ACG Pop Economy — Consumer Intelligence with BERTopic',
      titleZh: '二次元谷子经济：BERTopic 消费洞察',
      natureZh: '比赛项目 · 学术研究',
      natureEn: 'COMPETITION · RESEARCH',
      link: '',
      year: '2025',
      tags: ['Python', 'Web Data Collection', 'BERTopic', 'HDBSCAN', 'c-TF-IDF', 'Survey Research'],
      cover: '/assets/images/projects/REAL_slides_cut_pdf/slides_cut_page_13_REAL.png',
      gallery: [
        '/assets/images/projects/REAL_slides_cut_pdf/slides_cut_page_13_REAL.png',
        '/assets/images/projects/REAL_slides_cut_pdf/slides_cut_page_12_REAL.png'
      ],
      zh: {
        category: '学术竞赛研究 · 正大杯',
        desc: '围绕二次元“谷子经济”，结合社交媒体文本挖掘、BERTopic 主题建模与消费者调查，识别圈层语言、购买动机、市场痛点及线上线下消费机会。',
        problem: '青年二次元衍生品（谷子）市场爆发式增长，但圈层话语体系高维隐蔽，传统市场调研难以捕捉消费者情感共鸣点与消费痛点。',
        methods: '通过 Python 抓取主流社媒 UGC 语料，采用预训练语义嵌入与 BERTopic (HDBSCAN + c-TF-IDF) 聚类挖掘潜在主题，配合大样本定量消费者问卷交叉验证。',
        outcomes: '识别出 6 大核心圈层消费动机与溢价动因，绘制全渠道消费旅程图，为品牌衍生品研发与线下快闪落地提供决策依据。',
        scope: '【研究交付物】：社媒 UGC 语义挖掘数据集、BERTopic 主题聚类结果集、大样本量化问卷分析模型与正大杯汇报 PPT 原页。',
        note: '材料来自正大杯市场调查大赛真实汇报成果；奖项与本人职责保持真实克制，不作虚构。'
      },
      en: {
        category: 'Research & Competition',
        desc: 'A consumer intelligence study of the ACG merchandise economy, combining social-media text mining, BERTopic-based topic modeling, and consumer research to surface community dynamics, purchase motivations, and omnichannel opportunities.',
        problem: 'The rapid explosion of the ACG merchandise (Gu-zi) market features fragmented subculture vernacular that traditional surveys struggle to decode.',
        methods: 'Collected unstructured social UGC via Python pipelines; applied transformer embeddings with BERTopic clustering (HDBSCAN and class-based TF-IDF) complemented by quantitative consumer surveying.',
        outcomes: 'Uncovered key purchase archetypes, pricing drivers, and community pain points, informing omnichannel brand activation.',
        scope: '【Research Deliverables】: Social UGC mining corpus, BERTopic semantic topic maps, survey statistical cross-tabs, and authentic presentation deck slides.',
        note: 'Authentic project presentation materials from National Market Research Competition.'
      }
    },
    {
      id: 'healthcare-prescription',
      title: 'Healthcare Prescription & Market Opportunities',
      titleZh: '舒洛地特处方行为与科室机会洞察',
      natureZh: '实习项目 · 商业咨询',
      natureEn: 'INTERNSHIP · CONSULTING',
      link: '',
      year: '2025',
      tags: ['HCP Research', 'Market Strategy', 'Segmentation', 'Competitive Benchmarking', 'Data Visualization', 'PowerPoint'],
      cover: '/assets/images/projects/REAL_slides_cut_pdf/slides_cut_page_01_REAL.png',
      gallery: [
        '/assets/images/projects/REAL_slides_cut_pdf/slides_cut_page_01_REAL.png',
        '/assets/images/projects/REAL_slides_cut_pdf/slides_cut_page_03_REAL.png',
        '/assets/images/projects/REAL_slides_cut_pdf/slides_cut_page_06_REAL.png',
        '/assets/images/projects/REAL_slides_cut_pdf/slides_cut_page_07_REAL.png'
      ],
      zh: {
        category: '实习项目 · 商业咨询',
        desc: '基于医生定量调研，研究舒洛地特在不同科室的知晓、试用与处方行为，比较治疗路径和竞争产品定位，梳理潜在市场机会与医学传播方向。',
        problem: '特定心血管与微血管药物在不同专科科室间渗透率差异显著，药企亟需明晰各科室医生处方阻碍与竞品替代逻辑。',
        methods: '设计覆盖多科室临床医生 (HCP) 的定量调研问卷，运用医生分群细分模型与竞品对标矩阵，结合治疗路径流转图剖析用药心智。',
        outcomes: '量化核心科室知晓率与处方转化漏斗，识别出跨专科拓展机会点，形成结构化市场传播与学术推广策略建议。',
        scope: '【咨询交付物】：临床科室知晓/试用漏斗分析、处方路径比较矩阵、竞品定位象限图与商业化战略提案 PPT。',
        note: '真实雇主/客户咨询样本，遵守商业保密原则，不披露未公开的客户及临床敏感数据。'
      },
      en: {
        category: 'Internship · Consulting',
        desc: 'A physician-research-based market analysis of Sulodexide, examining awareness, trial and prescribing patterns, treatment pathways, competitive positioning, and market opportunities across clinical specialties.',
        problem: 'Uneven clinical penetration of vascular treatments across specialties necessitated a granular assessment of prescribing barriers and competitive substitution.',
        methods: 'Engineered HCP quantitative survey frameworks, clinician segmentation, competitive benchmarking matrices, and treatment pathway mapping.',
        outcomes: 'Quantified awareness-to-trial conversion funnels across departments, surfacing unmet clinical needs and strategic positioning.',
        scope: '【Consulting Deliverables】: Departmental adoption funnel analysis, prescribing pathway comparison matrices, positioning quadrants, and commercialization decks.',
        note: 'Genuine consulting work sample with strict confidentiality compliance.'
      }
    },
    {
      id: 'satellite-research',
      title: 'Direct-to-Cell Satellite Research',
      titleZh: '手机直连卫星产业与频谱策略研究',
      natureZh: '实习项目 · 行业研究',
      natureEn: 'INTERNSHIP · INDUSTRY RESEARCH',
      link: '',
      year: '2024',
      tags: ['Industry Research', 'Regulatory Analysis', '3GPP NTN', 'WRC Spectrum', 'Competitive Architecture', 'PowerPoint'],
      cover: '/assets/images/projects/REAL_slides_cut_pdf/slides_cut_page_09_REAL.png',
      gallery: [
        '/assets/images/projects/REAL_slides_cut_pdf/slides_cut_page_09_REAL.png',
        '/assets/images/projects/REAL_slides_cut_pdf/slides_cut_page_08_REAL.png',
        '/assets/images/projects/REAL_slides_cut_pdf/slides_cut_page_10_REAL.png',
        '/assets/images/projects/REAL_slides_cut_pdf/slides_cut_page_11_REAL.png'
      ],
      zh: {
        category: '实习项目 · 行业研究',
        desc: '围绕手机直连卫星的发展路径，梳理 WRC 频谱议程、3GPP NTN 标准、FCC SCS 监管与产业链技术路线，为产业竞争格局及商业化研究建立结构化框架。',
        problem: '手机直连卫星 (D2C) 处于技术演进与跨国监管的交汇爆发期，产业链上下游路线复杂且标准争夺激烈。',
        methods: '系统追踪国际电信联盟 WRC 频谱决议、3GPP Rel-17/18/19 非地面网络 (NTN) 演进，深入拆解 FCC 补充覆盖监管架构 (SCS) 与全球头部星座技术方案。',
        outcomes: '绘制从空间段天线、星载相控阵到地面终端协议的完整技术演进树，输出产业链竞争图谱与商业模式研判报告。',
        scope: '【研究交付物】：WRC 频谱演进全景表、3GPP NTN 标准路线图、全球主要低轨卫星运营商商业架构对标报告。',
        note: '研究类 PPT 均为真实原页；公开展示须遵循原雇主合规授权范围。'
      },
      en: {
        category: 'Internship · Industry Research',
        desc: 'An industry research project mapping direct-to-cell satellite technologies through WRC spectrum policy, 3GPP NTN standards, FCC SCS regulation, and competing network architectures.',
        problem: 'Direct-to-cell (D2C) satellite connectivity sits at the crossroads of spectrum allocation disputes and rapid aerospace-telecom convergence.',
        methods: 'Analyzed ITU WRC spectrum agendas, 3GPP Rel-17-19 NTN standards, FCC Supplemental Coverage from Space (SCS) rules, and leading LEO constellation designs.',
        outcomes: 'Delivered an architectural taxonomy connecting phased-array payload evolution with carrier business models.',
        scope: '【Deliverables】: WRC spectrum roadmap, 3GPP NTN specification timelines, and comparative constellation architecture deck.',
        note: 'Authentic presentation slides; requires appropriate organizational disclosure clearance.'
      }
    },
    {
      id: 'huazhu-atour',
      title: 'Huazhu vs. Atour — Business & Financial Analysis',
      titleZh: '华住与亚朵：酒店商业与财报对标',
      natureZh: '商业研究 · 公司估值',
      natureEn: 'BUSINESS RESEARCH · VALUATION',
      link: '',
      year: '2025',
      tags: ['Financial Statement Analysis', 'Ratio Analysis', 'DuPont Analysis', 'Benchmarking', 'Business Models', 'PowerPoint'],
      cover: '/assets/images/projects/REAL_hotel_123_pptx/huazhu_atour_slide_07_REAL.png',
      gallery: [
        '/assets/images/projects/REAL_hotel_123_pptx/huazhu_atour_slide_07_REAL.png',
        '/assets/images/projects/REAL_hotel_123_pptx/huazhu_atour_slide_04_REAL.png',
        '/assets/images/projects/REAL_hotel_123_pptx/huazhu_atour_slide_10_REAL.png',
        '/assets/images/projects/REAL_hotel_123_pptx/huazhu_atour_slide_13_REAL.png',
        '/assets/images/projects/REAL_hotel_123_pptx/huazhu_atour_slide_15_REAL.png'
      ],
      zh: {
        category: '商业研究 · 公司估值',
        desc: '对比华住与亚朵在连锁经营、加盟扩张、新零售、盈利能力和资本效率方面的差异，研究不同商业模式如何影响酒店集团的增长质量与财务韧性。',
        problem: '中国连锁酒店行业分化，华住的规模规模化加盟模式与亚朵的“体验+场景新零售”模式在资本效率与抗周期性上各具特色。',
        methods: '基于两家上市公司多期财报构建杜邦分解分析体系，深入对标 RevPAR、入住率、加盟费抽成比率、现金流结构与单店模型 ROI。',
        outcomes: '阐明轻资产加盟与生活方式新零售对 ROIC 的不同驱动机制，形成详实客观的对标分析报告。',
        scope: '【课程交付物】：上市公司财务比率对比表、加盟商单店投资模型估算、亚朵场景零售毛利拆解与完整 123.pptx 课件原页。',
        note: '团队课程作业，严格区分个人负责篇章与其他成员工作；保留真实 123.pptx 原始汇报课件。'
      },
      en: {
        category: 'Business Research · Valuation',
        desc: 'A comparative analysis of Huazhu and Atour, investigating how franchising, asset-light expansion, retail diversification, profitability, and capital efficiency shape growth in China\'s hotel sector.',
        problem: 'Divergent operating strategies in China\'s hospitality industry present contrasting capital efficiency and margin resilience.',
        methods: 'Executed comparative financial statement analysis, DuPont decomposition, RevPAR and franchisee economics benchmarking, and cash-flow efficiency evaluation.',
        outcomes: 'Quantified how asset-light scale versus retail-driven lifestyle models drive differentiated ROIC and unit economics.',
        scope: '【Deliverables】: Financial ratio benchmarking matrices, franchisee unit economics models, retail gross-margin breakdowns, and authentic 123.pptx slides.',
        note: 'Academic collaborative project; maintains authentic 123.pptx slide sourcing.'
      }
    },
    {
      id: 'fx-policy-text',
      title: 'LLM-driven FX Policy Text Modeling',
      titleZh: '央行沟通文本计量与外汇政策研究',
      natureZh: '学术研究 · 文本计量',
      natureEn: 'ACADEMIC RESEARCH · ECONOMETRICS',
      link: '',
      year: '2026',
      tags: ['NLP', 'LLM Text Analysis', 'Econometrics', 'Python', 'Financial Modeling'],
      cover: '/assets/images/projects/fx-policy/cover.png',
      gallery: [
        '/assets/images/projects/fx-policy/cover.png'
      ],
      zh: {
        category: '学术研究 · 文本计量',
        desc: '将央行政策文本的语义信息转化为可量化特征，并结合非线性计量分析，探索央行沟通与外汇市场压力之间的关系。',
        problem: '中央银行政策文本沟通富含复杂预示信息，传统基于词袋 (BoW) 或情感字典的方法难以解析语气转折与隐性前瞻指引。',
        methods: '利用大语言模型抽取货币政策文本的多维语义特征与立场基调指数，构建动态时序非线性计量回归模型与脉冲响应分析。',
        outcomes: '实证检验央行前瞻沟通对外汇汇率预期波动与市场压力的平抑效应，为宏观政策预期管理提供量化支撑。',
        scope: '【研究成果】：央行沟通前瞻指引语义量化特征库、非线性计量时间序列模型、脉冲响应实证图表。',
        note: '学术实证论文项目；严禁虚构未经验证的回测指标或模型得分。'
      },
      en: {
        category: 'Academic Research · Econometrics',
        desc: 'Quantifying central-bank communication with language-model-based text features and nonlinear econometric analysis to investigate their relationship with foreign-exchange market dynamics.',
        problem: 'Macroeconomic forward guidance in central bank statements carries subtle semantic shifts that lexicon-based sentiment models miss.',
        methods: 'Applied transformer/LLM semantic extraction to generate multidimensional monetary stance indices, combined with nonlinear econometric modeling and impulse response functions.',
        outcomes: 'Empirically evaluated the transmission mechanism of forward guidance on foreign-exchange market volatility and currency pressure.',
        scope: '【Deliverables】: Quantitative stance indices, non-linear econometric specifications, and empirical impulse-response curves.',
        note: 'Academic research; backtests and evaluation figures are strictly grounded in verified experiment logs.'
      }
    },
    {
      id: 'commerceiq',
      title: 'CommerceIQ — E-commerce Diagnostics & Causal Uplift',
      titleZh: 'CommerceIQ 跨境电商智能数据洞察',
      natureZh: '网页应用 · 数据平台',
      natureEn: 'FULL-STACK WEB APP',
      link: '',
      year: '2026',
      tags: ['Python', 'SQL', 'DuckDB', 'Shapley Decomposition', 'RFM', 'Uplift Modeling'],
      cover: '/assets/images/projects/commerceiq/cover.png',
      gallery: [
        '/assets/images/projects/commerceiq/cover.png'
      ],
      zh: {
        category: '网页应用 · 数据平台',
        desc: '围绕电商 GMV 波动建立经营诊断框架，结合 Shapley 归因、用户分层和 Uplift 模型，连接“发生了什么”与“下一步针对谁采取行动”。',
        problem: '电商运营常受限于表面指标追踪，无法准确度量营销补贴的真实因果增量 (Incrementality)，造成营销预算浪费。',
        methods: '基于 DuckDB/SQL 构建高吞吐指标异动监控管线，运用博弈论 Shapley 分解剥离渠道贡献，引入因果推断 Uplift 算法锁定高敏感高净增人群。',
        outcomes: '打通从“指标异常归因”到“高潜用户定位与精准触达”的完整闭环，显著提升营销转化 ROI。',
        scope: '【项目成果】：GMV 指标波动诊断监控管道、博弈论贡献分解算法、因果增量 Uplift 用户打分模型与看板原型。',
        note: '明确区分 Olist 经营诊断公开数据集与 X5 RetailHero 因果增量实验数据；不暗示单一真实企业全量部署。'
      },
      en: {
        category: 'Full-Stack Web App',
        desc: 'An end-to-end e-commerce analytics project combining GMV anomaly diagnostics, Shapley attribution, customer segmentation, and causal uplift modeling to connect business diagnosis with targeted action.',
        problem: 'Standard e-commerce dashboards reveal historical GMV dips but fail to isolate true incremental returns from discount campaigns.',
        methods: 'Constructed an analytical pipeline using DuckDB and SQL, implemented Shapley-value metric decomposition, and deployed casual machine learning (Uplift Modeling) for targeting.',
        outcomes: 'Bridged root-cause anomaly detection with targeted intervention, optimizing promotional expenditure.',
        scope: '【Deliverables】: Automated anomaly triage pipelines, Shapley channel attribution modules, and causal uplift scoring models.',
        note: 'Properly distinguishes public Olist diagnostic data from X5 RetailHero uplift benchmarks.'
      }
    },
    {
      id: 'order-book-modeling',
      title: 'High-Frequency Limit Order Book Modeling',
      titleZh: '高频订单簿微观结构与流动性建模',
      natureZh: '学术研究 · 量化金融',
      natureEn: 'ACADEMIC RESEARCH · QUANT',
      link: '',
      year: '2024',
      tags: ['Python', 'WebSocket', 'Feature Engineering', 'Time-Series Validation', 'Scikit-learn', 'Backtesting'],
      cover: '/assets/images/projects/order-book/cover.png',
      gallery: [
        '/assets/images/projects/order-book/cover.png'
      ],
      zh: {
        category: '学术研究 · 量化金融',
        desc: '基于实时订单簿深度数据构建市场微观结构特征，比较机器学习模型在短期价格方向预测中的表现，并强调严格时间隔离与无未来信息回测。',
        problem: '高频交易微观结构数据信噪比极低，易受前视偏差 (Look-ahead bias) 与时间序列交叉泄漏影响，导致实盘与回测脱节。',
        methods: '通过 WebSocket 捕获实时 Level-2/3 订单簿盘口流动性、微观结构失衡度 (OFI) 与买卖挂单倾斜特征，采用严格因果 Walk-forward 时间分块校验比较模型预测力。',
        outcomes: '验证了高频订单簿盘口失衡特征在超短期价格变动上的预测边际，构建无未来信息的标准量化回测流水线。',
        scope: '【量化交付物】：WebSocket 高频订单簿数据接入清洗流水线、OFI 盘口特征工程集、无前视偏差回测框架及检验报告。',
        note: '报告指标仅在原始实验日志与回测框架直接支撑时披露，杜绝合成行情与虚构收益。'
      },
      en: {
        category: 'Academic Research · Quant',
        desc: 'A quantitative research project using real-time limit-order-book data and market microstructure features to evaluate short-horizon price-direction models under time-aware validation and look-ahead-bias controls.',
        problem: 'High-frequency order-book environments suffer from severe noise and vulnerability to look-ahead bias and temporal leakage in standard CV.',
        methods: 'Engineered order flow imbalance (OFI), bid-ask queue dynamics, and liquidity depth features from real-time WebSocket feeds, validated via strict walk-forward temporal cross-validation.',
        outcomes: 'Demonstrated verifiable predictive edge in short-horizon tick directions without future information leakage.',
        scope: '【Deliverables】: WebSocket order-book parser, microstructure feature library, and leakage-free walk-forward backtesting framework.',
        note: 'Performance numbers are grounded strictly in authentic experiment logs.'
      }
    },
    {
      id: 'stirpat-carbon',
      title: 'STIRPAT — Digital Economy & Carbon Emissions',
      titleZh: 'STIRPAT 碳排放预测与计量模型',
      natureZh: '学术研究 · 计量经济',
      natureEn: 'ACADEMIC RESEARCH · ECONOMETRICS',
      link: '',
      year: '2023',
      tags: ['Econometrics', 'STIRPAT', 'Indicator Construction', 'Panel Regression', 'ESG'],
      cover: '/assets/images/projects/stirpat/cover.png',
      gallery: [
        '/assets/images/projects/stirpat/cover.png'
      ],
      zh: {
        category: '学术研究 · 计量经济',
        desc: '基于宏观指标体系与扩展 STIRPAT 模型，研究数字经济发展与碳排放强度的关系，并结合城市政策案例讨论数字化与低碳转型。',
        problem: '数字经济发展对能源消耗具有赋能节约与算力能耗并存的“反弹效应”，对其净减排效益存在学术争议。',
        methods: '构建涵盖数字基础设施、创新要素与产业数字化的综合评价指标，扩展环境随机影响评估模型 (STIRPAT)，运用面板计量回归模型与中介效应分析检验非线性关系。',
        outcomes: '实证证实数字经济对碳排放强度的“倒U型”拐点效应，并提出针对性数字化低碳转型政策与产业建议。',
        scope: '【研究成果】：数字经济综合指标测算体系、城市面板回归计量代码、中介效应检验报告与学术论文图表。',
        note: '实证论文规范图表与学术模型输出。'
      },
      en: {
        category: 'Academic Research · Econometrics',
        desc: 'An empirical econometric study examining the relationship between digital-economy development and carbon-emissions intensity through a composite indicator framework and an extended STIRPAT model.',
        problem: 'The dual impact of digital infrastructure—enabling operational efficiencies versus escalating compute power demands—creates debate on net decarbonization.',
        methods: 'Built a multidimensional digital economy composite index and adapted the STIRPAT environmental impact model using regional panel econometric regressions and mediation effects.',
        outcomes: 'Identified non-linear Kuznets-curve inflection patterns in emission intensity, offering policy frameworks for sustainable digital transformation.',
        scope: '【Deliverables】: Composite index calculation scripts, city-level panel regressions, mediation test tables, and academic charts.',
        note: 'Grounded in standard empirical econometric publication methodology.'
      }
    },
    {
      id: 'medication-companion',
      title: 'Medication Companion',
      titleZh: 'AI 智能用药伴侣 (概念设计)',
      natureZh: '桌面与移动APP · 概念设计',
      natureEn: 'DESKTOP & MOBILE APP · CONCEPT',
      link: '',
      year: 'CONCEPT',
      tags: ['Voice-First', 'Structured LLM', 'Timeline Visualization', 'PDF Export', 'Healthcare Product'],
      cover: '/assets/images/projects/CONCEPT_ONLY_NOT_REAL/medication_companion_PRELIM_CONCEPT.png',
      gallery: [
        '/assets/images/projects/CONCEPT_ONLY_NOT_REAL/medication_companion_PRELIM_CONCEPT.png'
      ],
      zh: {
        category: '桌面与移动APP · 概念设计',
        desc: '为长期服药者设计的语音优先日常健康日志。按既有医嘱记录服药时间和数量，将服药、症状、情绪与睡眠串成时间轴，支持基于真实记录的 AI 周报及供就诊使用的 PDF 摘要。',
        problem: '长期慢性病与日常服药者常因记录繁琐导致依从性差、症状遗忘，在复诊就医时难以向医生提供连续、结构化的主诉记录。',
        methods: '规划语音优先交互与轻量级对话确认机制，通过大语言模型结构化抽取医嘱记录与主观感受，在客户端渲染直观的健康时间轴，并自动生成结构化问诊摘要 PDF。',
        outcomes: '完成完整产品需求文档 (PRD)、信息架构与交互原型设计；概念验证阶段，暂未上线生产系统。',
        scope: '【MVP (一期)】：语音录音转文字 (STT)、按既有医嘱核对服药时间/剂量、症状/情绪/睡眠多维时间轴、结构化信息确认。<br>【二期规划】：基于连续真实日志的 AI 周报洞察、就医就诊摘要 PDF 一键导出、依从性温和提醒。<br>【三期规划】：处方与药盒拍照 OCR 智能对齐、家属/医护协同监护视图、用药依从性长期行为分析。<br>【严格医疗伦理边界】：坚决不提供处方诊断、调药或停药建议，不推断未经证实的因果机制，不确定信息严格标注为未知。',
        note: '暂定概念方案展示，不宣称已上线生产环境；必须根据完整 PRD 严格区分 MVP、二期与三期。'
      },
      en: {
        category: 'Desktop & Mobile App · Concept',
        desc: 'A voice-first longitudinal medication journal built around existing prescriptions, human-confirmed medication logs, symptom and sleep timelines, and evidence-grounded summaries that patients can share with clinicians.',
        problem: 'Chronic medication users struggle with cumbersome manual logs, leading to recall bias during brief clinical consultations.',
        methods: 'Architected voice-guided capture pipelines, structured LLM information extraction, timeline visualizers, and standardized physician-ready PDF summary compilation.',
        outcomes: 'Delivered end-to-end Product Requirement Document (PRD), interaction specs, and visual moodboards for concept validation.',
        scope: '【MVP (Phase 1)】: Speech-to-text logging, adherence verification against existing prescriptions, timeline mapping, confirmation flows.<br>【Phase 2 (Planned)】: AI weekly trend reports, clinical appointment PDF exports, gentle reminders.<br>【Phase 3 (Exploratory)】: Camera/OCR prescription alignment, caregiver shared dashboard, longitudinal adherence analytics.<br>【Clinical Safety Boundary】: Strictly zero prescribing, zero dosage alteration, and zero inferred clinical causation; ambiguous entries remain explicitly unverified.',
        note: 'Provisional conceptual presentation; strictly marked as CONCEPT / PRD rather than deployed live software.'
      }
    },
    {
      id: 'ai-music-record-store',
      title: 'AI Music Record Store',
      titleZh: 'AI 唱片店交互体验 (概念设计)',
      natureZh: '网页应用 · 概念设计',
      natureEn: 'WEB APP · CONCEPT',
      link: '',
      year: 'CONCEPT',
      tags: ['Music Metadata', 'Record Store Browsing', 'Conversational AI', 'Interactive Visuals', 'Audio Experience'],
      cover: '/assets/images/projects/CONCEPT_ONLY_NOT_REAL/ai_record_store_PRELIM_CONCEPT.png',
      gallery: [
        '/assets/images/projects/CONCEPT_ONLY_NOT_REAL/ai_record_store_PRELIM_CONCEPT.png'
      ],
      zh: {
        category: '网页应用 · 概念设计',
        desc: '将获得授权的网易云音乐收藏重新组织为可漫游的数字唱片店，以 Artist A–Z、Genre、Album 与 Track 浏览音乐。后续通过个人音乐画像、自然语言心境检索和唱片店助手增强发现体验。',
        problem: '现代流媒体过度依赖算法喂养推荐，用户丧失了在实体唱片店淘碟时偶遇未知音乐的探索心流与实体感。',
        methods: '接入授权音乐曲库元数据，设计翻转黑胶封套与唱片架的拟物化交互，结合自然语言对话助手理解细微心境需求，营造沉浸式视觉与听觉漫游体验。',
        outcomes: '完成产品概念架构、多维度唱片分类体系与黑胶交互原型规范；暂未上线生产系统。',
        scope: '【MVP (一期)】：授权音乐曲库数据同步、拟真黑胶唱片封套翻转与插拔交互、Artist A–Z / 流派 Genre / 专辑 Album / 单曲 Track 唱片架多维浏览。<br>【二期规划】：个人历史听歌画像建模、自然语言心境与场景音乐检索（如“秋雨夜里的静谧室内乐”）。<br>【三期规划】：唱片店 AI 店员交互助手 (Conversational Record Clerk)、沉浸式 3D 虚拟唱片店漫游。',
        note: '暂定概念方案展示，不宣称已上线生产环境；必须根据完整 PRD 严格区分 MVP、二期与三期。'
      },
      en: {
        category: 'Web App · Concept',
        desc: 'A digital record store that reorganizes an authorized personal music library into an artist-first browsing experience, with vinyl-sleeve interactions and planned AI listening profiles, mood-based discovery, and a conversational record-store assistant.',
        problem: 'Streaming algorithms trap listeners in repetitive recommendation loops, discarding the tactile serendipity of physical record digging.',
        methods: 'Mapped authorized music collection metadata into interactive vinyl sleeve frameworks, integrating conversational assistants for context-aware mood discovery.',
        outcomes: 'Completed comprehensive PRD, browsing hierarchy, and interactive visual concepts for digital digging.',
        scope: '【MVP (Phase 1)】: Library synchronization, vinyl flip/sleeve tactile gestures, Artist A–Z / Genre / Album / Track crate browsing.<br>【Phase 2 (Planned)】: Personal listening DNA profile, natural-language mood search.<br>【Phase 3 (Exploratory)】: Conversational AI Record Clerk, spatial 3D store crate exploration.',
        note: 'Provisional conceptual showcase; strictly designated as CONCEPT / PRD rather than deployed live service.'
      }
    }
  ];

  window.FLORA_PROJECTS = PROJECTS_LIST;
  window.FLORA_PROJECTS_MAP = {};
  PROJECTS_LIST.forEach(p => {
    window.FLORA_PROJECTS_MAP[p.id] = p;
  });
})();
