# Specification: core_mvp_20260304 - AI 高星项目瀑布流展示页 (智能截断与悬停预览)

## 1. 概述 (Overview)
本轨道旨在实现 AI GitHub Explorer 的核心 MVP 版本。该页面将以瀑布流形式展示从 GitHub API 获取的 20 个热门 AI 相关项目（包括 LLM, CV, 多模态）。核心功能包括：GitHub 数据抓取、本地 JSON 缓存、响应式瀑布流布局、智能描述截断、悬停详情显示以及点击跳转。

## 2. 核心功能 (Core Features)
- **GitHub API 集成**：使用 GitHub REST API 获取高星 AI 项目（LLM, CV, Multi-modal）。
- **本地数据缓存**：在 Next.js 服务端将 API 数据缓存为本地 JSON 文件，实现按需更新。
- **响应式瀑布流布局**：使用 Vanilla CSS (CSS Modules) 实现自适应屏幕宽度的瀑布流布局。
- **现代化 AI 感 UI 卡片**：
    - 视觉风格：电光蓝/紫色调，带渐变发光边缘和悬浮动画。
    - 智能截断：卡片中的项目描述自动截断前 100 个字符。
    - 悬停预览：鼠标悬停显示完整描述和其他元数据。
- **外部跳转**：点击卡片在浏览器新标签页中打开 GitHub 项目链接。

## 3. 技术要求 (Technical Requirements)
- **前端框架**：Next.js (React + TypeScript)
- **样式方案**：Vanilla CSS (CSS Modules)
- **数据源**：GitHub REST API
- **部署平台**：Vercel
- **代码规范**：TypeScript, ESLint, Prettier

## 4. 验收标准 (Acceptance Criteria)
- [ ] 页面能成功展示至少 20 个高星 AI 项目。
- [ ] 页面布局在桌面和移动端均能保持响应式的瀑布流效果。
- [ ] 项目描述超过 100 字符时被正确截断。
- [ ] 鼠标悬停在卡片上时显示完整描述。
- [ ] 点击卡片能正确跳转至对应的 GitHub 页面。
- [ ] 本地 JSON 缓存文件能正确生成并存储数据。
- [ ] 视觉风格符合“现代化 AI 感”定义（电光蓝/紫，发光边缘）。
- [ ] 代码测试覆盖率 > 80%。
