# 马兆峰个人网站

Vite + 原生 JavaScript / CSS。妙搭应用 `app_17fqurz8tq0`，开发分支 `sprint/default`。

## 页面结构

- `src/main.js` / `src/styles.css`：首页、职业旅程、四项成果、企业双向滚动与导航。
- `src/life.js` / `src/life.css`：生活照片带、自动滚动、拖动、暂停与键盘可操作的大图浏览。
- `src/photos.js`：本应用文件存储中的照片地址。替换照片与文案可在此修改。

所有标题、段落、链接和企业名称均为可见 HTML；旅程红线为 SVG。图片只承载摄影内容。请勿重新引入整屏设计稿、隐藏正文或透明点击热区。

照片来自用户确认的设计稿中的纯摄影区域、既有无字山景，以及用户提供的四张生活照片。原图保留不动；网页使用压缩后的 WebP。生活照片按实际画面描述，不推测拍摄时间与地点。

## 开发与发布

`npm run dev` 启动 Vite，`npm run build` 生成妙搭部署格式：

- `dist/output/index.html`
- `dist/output_resource/assets/*`

图片路径属于妙搭运行时，本地验证时需单独映射应用存储，不能把本地图片路径写入产品源码。默认 Vite preview 不适用于上述分离的部署目录。

发布顺序：构建 → 提交相关文件 → 推送 `sprint/default` → `lark-cli apps +release-create` → 对同一发布单执行 `+release-get`，确认 `finished`。所有飞书命令显式使用本机 `--profile CLI1`，支持时加 `--as user`；第一次访问先核验身份。

## 验证要点

检查 1440px 桌面及 320 / 390 / 768px 窄屏：正文可选择、章节跳转、布局无横向溢出、企业滚动与暂停/恢复、照片拖动、大图前后切换与 Esc 关闭、焦点与页面滚动恢复、系统减少动态效果。隐藏所有图片后，正文与成果信息仍应完整可读。
