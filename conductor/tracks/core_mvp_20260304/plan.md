# Implementation Plan: core_mvp_20260304 - AI 高星项目瀑布流展示页 (智能截断与悬停预览)

## Phase 1: 基础环境搭建
- [ ] Task: 初始化 Next.js (TypeScript) 项目
    - [ ] 使用 `create-next-app` 初始化项目，并配置 TypeScript, ESLint, Prettier。
    - [ ] 配置项目的全局样式 (CSS Modules)，设置核心色调 (电光蓝/紫)。
- [ ] Task: Conductor - User Manual Verification '基础环境搭建' (Protocol in workflow.md)

## Phase 2: 数据集成与抓取模块
- [ ] Task: 编写 GitHub API 抓取函数
    - [ ] 实现针对 AI 类别 (LLM, CV, Multi-modal) 的热门项目查询。
    - [ ] 为该模块编写单元测试 (Red Phase)。
    - [ ] 实现抓取逻辑并确保护航测试通过 (Green Phase)。
- [ ] Task: 本地 JSON 缓存模块
    - [ ] 实现将抓取数据写入本地文件的逻辑。
    - [ ] 编写相关测试并实现功能。
- [ ] Task: Conductor - User Manual Verification '数据集成与抓取模块' (Protocol in workflow.md)

## Phase 3: UI 组件开发
- [ ] Task: 瀑布流布局组件
    - [ ] 编写测试验证响应式布局逻辑。
    - [ ] 使用 CSS Grid 实现响应式瀑布流。
- [ ] Task: 现代化 AI 感项目卡片组件
    - [ ] 编写测试验证描述截断和悬停逻辑。
    - [ ] 实现带渐变发光效果和悬浮动画的 UI 卡片。
    - [ ] 集成描述截断功能和悬浮预览 (Tooltip/Overlay)。
- [ ] Task: Conductor - User Manual Verification 'UI 组件开发' (Protocol in workflow.md)

## Phase 4: 部署与上线
- [ ] Task: 配置 Vercel 部署流程
    - [ ] 设置环境变量 (如 GitHub Token)。
    - [ ] 确保在 Vercel 环境下能正确运行。
- [ ] Task: Conductor - User Manual Verification '部署与上线' (Protocol in workflow.md)
