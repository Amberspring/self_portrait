# 滚动过渡区域 CrystalizedBall（Nebula 星云紫水晶球）背景集成方案

将您提供的 `CrystalizedBall` WebGL2 粒子与电弧能量球着色器组件，以 **`nebula`（星云紫 `#9478FF`）** 预设应用到首屏向下滚动时的过渡区域（显示 **「优秀的商业需要连接数理、代码、金融与市场」** 的背景）。

## 核心视觉与交互设计

1. **预设与色彩匹配 (`preset="nebula"`)**
   - **主色调**：`#9478FF`（星云紫），与全站暗紫视觉体系无缝融合。
   - **核心参数**：`strands: 6`（6 束高频谐波能量流）、`crackle: 1.0`（电弧裂变感）、`flares: 0.5`、`glow: 0.9`、`sparks: 0.6`、`particleCount: 18000`（18,000 颗悬浮微尘粒子）、`fill: 0.45`、`motion: 'rise'`（微尘向上升腾）、`particleShape: 'square'`、`depth: 0.5`、`sway: 0.4`、`twinkle: 0.6`、`haze: 0.8`、`dustSpeed: 1.2`。
   - **深邃背景衬底**：球体周围衬以纯黑 `#000000` 背景，确保中央过渡导入语 **「优秀的商业需要连接数理、代码、金融与市场 / Great business bridges math, code, finance, and markets.」** 保持极高对比度与清晰度。

2. **滚轮推进与鼠标实时交互**
   - **滚轮联动**：当从首屏向下滚动进入过渡区时，`#reveal-image-wrap` 随滚轮从中心放大展开，同時驱动 `CrystalizedBall` 的展开进度（`intro` 能量充能、电弧脉冲与微尘升腾）。
   - **鼠标与点击交互**：支持全屏指针追踪（`window` 级 `pointermove` / `pointerdown`），鼠标掠过球体边缘时触发局部热力电弧与内部 18,000 颗星云微尘的流体扰动（Stirring），点击球体区域可激发额外的闪电电弧（Sparks & Arcs）。

## 涉及修改的文件

1. **`src/CrystalizedBall.tsx` & `src/CrystalizedBall.css`**
   - 将您提供的 React + OGL 组件保存并转换为 TypeScript 组件，同时在 `src/main.tsx` 中挂载到过渡区域的容器，确保 `ogl` 渲染管线（Float/Half-Float 多重渲染目标 MRT、粒子物理扰动与电弧合成）原汁原味运行。
2. **`index.html` & `public/styles/index.css`**
   - 在 `#reveal-image-wrap` 内设置 `#reveal-crystal-ball` 容器（带 `reveal-image reveal-seq` 缩放类名与 `#000` 纯黑底色），保持原有的四角取景框 `.reveal-frame`、遮罩 `.reveal-overlay` 与中英双语导入语 `#reveal-phrase` 层级不变。
3. **`public/js/index.js`**
   - 移除旧的 2D 网格矩阵 Canvas 绘制逻辑，保留 GSAP `ScrollTrigger` 对 `.reveal-seq` 缩放、`#reveal-phrase` 逐字高斯模糊浮现/消散以及中英双语实时切换的控制。
