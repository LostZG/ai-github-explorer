# Technology Stack - AI GitHub Explorer

## 1. 前端框架 (Frontend Framework)
- **Next.js (React + TypeScript)**: 使用 App Router 架构，提供服务端渲染 (SSR) 和 静态生成 (SSG) 能力。
- **TypeScript**: 强类型检查，提升开发效率和代码健壮性。

## 2. 样式开发 (Styling & UI)
- **Vanilla CSS / CSS Modules**: 针对项目高度定制化的“现代化 AI 感”视觉需求，提供对渐变、投影和发光效果的精准控制。
- **Responsive Design**: 使用媒体查询 (Media Queries) 和 Flex/Grid 布局，适配各种屏幕尺寸的瀑布流。

## 3. 数据存储 with 集成 (Data & Storage)
- **GitHub REST API / GraphQL API**: 实时获取 AI 相关热门开源项目的元数据（Stars, Description, Title）。
- **Next.js File System (FS) / JSON**: 在服务端缓存 API 调用结果，实现本地文件级的数据持久化，减少 API 请求频率。

## 4. 部署与环境 (Deployment & Environment)
- **Vercel**: 与 Next.js 深度集成，提供零配置的自动化部署、预览和边缘缓存。
- **Local Dev Environment**: 支持通过 `npm run dev` 快速启动本地开发环境。

## 5. 代码质量工具 (Code Quality)
- **ESLint**: 静态代码分析，强制执行最佳实践和规范。
- **Prettier**: 自动化代码格式化，保持全项目风格统一。
