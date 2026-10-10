# 马兆峰个人网站

独立的个人作品集前端，使用 Vite、原生 JavaScript 和 CSS 构建。

在线访问：https://nirvan-a.github.io/mazhaofeng-ai-builder/

## 功能

- 四屏全页作品集：简介、职业旅程、项目成果与生活照片。
- 触摸与触控板横向手势分页，滚动位置与 URL hash 同步。
- 客户 Logo 和生活照片无限循环滚动，支持拖动与键盘浏览。
- 响应式布局、减少动态效果适配和图片渐进加载。
- 生活照片大图预览与微信号复制。

## 本地开发

环境要求：Node.js `^20.19.0` 或 `>=22.12.0`，推荐 Node.js 22。

```bash
npm ci
npm run dev
```

开发服务器默认运行在 `http://localhost:5173`。

## 构建

```bash
npm run build
npm run preview
```

标准静态站点产物生成在 `dist/`，可部署到 GitHub Pages、Cloudflare Pages、Vercel、Netlify 或任意静态文件服务器。

部署到子路径时可指定：

```bash
VITE_BASE_PATH=/your-repository/ npm run build
```

## GitHub Pages

推送到 `main` 后，[Deploy GitHub Pages](.github/workflows/build.yml) 会自动安装依赖、构建并发布 `dist/`。

## 目录

- `src/main.js` / `src/styles.css`：首页、职业旅程、项目成果与全局导航。
- `src/life.js` / `src/life.css`：生活照片、循环滚动、预览与结束页。
- `src/photos.js`：本地图片资源映射。
- `public/assets/`：场景照片、生活照片与客户 Logo。

## 内容声明

仓库中的个人照片、个人履历、客户信息、Logo 与联系方式仅用于本网站展示，不授权复制、分发或再利用。
