# 个人照片导入与关于我模块展示集成方案

## 背景与目标
用户需要导入 3 张真实的个人风采照片，分别对应个人主页中的：
- **照片 1**：`public/assets/images/profile/photo1.jpg`
- **照片 2**：`public/assets/images/profile/photo2.jpg`
- **照片 3**：`public/assets/images/profile/photo3.jpg`

为了彻底解决“直接在网页或对话框中粘贴/拖拽无法写入服务器”的问题，本次方案提供**双重兜底保障**：
1. **聊天窗口直接粘贴**：用户可以在下一轮对话中直接粘贴图片（或发送图片文件），系统直接将其转存入对应目录。
2. **预览界面原生剪贴板与拖拽直连系统**：在开发服务中挂载 `/api/upload-photo` 接口，并在网页端监听全局 `Ctrl+V`（粘贴）以及对照片区域的拖拽放置（Drag & Drop）。用户只要在网页预览区按粘贴键或拖入照片，即可一键保存并实时替换页面上的 `photo1.jpg`、`photo2.jpg`、`photo3.jpg`。

---

## 详细实施计划

### 1. 服务端直传接口 (`/api/upload-photo`)
- 在 `vite.config.ts` 中配置轻量级 API 中间件，拦截 `/api/upload-photo` POST 请求。
- 支持接收图片的 Base64 数据或二进制流，按指定目标槽位（`photo1` / `photo2` / `photo3` / `me`）写入：
  - `public/assets/images/profile/photo1.jpg`
  - `public/assets/images/profile/photo2.jpg`
  - `public/assets/images/profile/photo3.jpg`
- 同时自动将写入的文件同步至 `dist/assets/images/profile/`，保证即时热更新，无需重启服务。

### 2. 网页端交互与提示体验
- **剪贴板监听**：在网页全局监听 `paste` 事件，当检测到剪贴板包含图片时，弹出轻量选择弹窗（“设为：照片 1 / 照片 2 / 照片 3”），点击后 0.2 秒完成上传并即时刷新照片。
- **拖拽替换**：个人风采卡片区域支持将外部图片直接拖拽至目标卡片上释放完成替换。
- **视觉风格**：保持 Luke 风格的高级质感与极简黑色调，不破坏页面整体视觉。

### 3. 照片展示模块优化
- 确保关于我模块 (`index.html`) 与个人形象区域的 `<picture>` / `<img>` 标签正确加载 `photo1.jpg`、`photo2.jpg`、`photo3.jpg`。
- 优化移动端与桌面端的宽高比自适应与图片居中裁剪（`object-fit: cover; object-position: center top;`），确保竖版/横版人像均能优雅呈现。

### 4. 验证与交付
- 编译项目确保 0 报错。
- 提供清晰明确的下一步指引：用户可随时直接在对话框粘贴图片，或在右侧预览页直接按 `Ctrl+V` 即可完成写入。
