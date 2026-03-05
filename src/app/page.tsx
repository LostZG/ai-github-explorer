import MasonryGrid from '@/components/MasonryGrid';
import ProjectCard from '@/components/ProjectCard';
import { fetchGithubProjects } from '@/lib/github';
import { getProjectsFromCache, saveProjectsToCache, getCacheStats } from '@/lib/cache';

export default async function Home() {
  const cachedProjects = await getProjectsFromCache() || [];
  const { mtime, exists } = await getCacheStats();
  
  // 缓存过期时间（1小时 = 3600000ms）
  const REFRESH_INTERVAL = 3600000;
  const isOld = Date.now() - mtime > REFRESH_INTERVAL;

  let projects = cachedProjects;

  // 如果缓存为空或已过期，则触发抓取并执行“增量合并”
  if (!exists || projects.length === 0 || isOld) {
    try {
      const newFetchedProjects = await fetchGithubProjects();
      
      // 增量合并逻辑：使用 Map 按 ID 去重
      const projectMap = new Map();
      
      // 先放入旧项目
      cachedProjects.forEach(p => projectMap.set(p.id, p));
      // 用新抓取的项目覆盖/增加 (这样能更新 Star 数和描述)
      newFetchedProjects.forEach(p => projectMap.set(p.id, p));
      
      // 转回数组并按 Star 数降序排序
      projects = Array.from(projectMap.values())
        .sort((a, b) => b.stargazers_count - a.stargazers_count);
      
      await saveProjectsToCache(projects);
      console.log(`Incremental update successful: ${projects.length} total projects.`);
    } catch (error) {
      console.error('Failed to fetch/merge projects:', error);
      // 如果抓取失败，至少退而求其次展示旧缓存
      projects = cachedProjects;
    }
  }

  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      minHeight: '100vh',
      padding: '4rem 2rem'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 800,
          marginBottom: '1rem',
          background: 'linear-gradient(to right, var(--primary-blue), var(--primary-purple))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em'
        }}>
          AI GitHub Explorer
        </h1>
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.6)', 
          fontSize: '1.2rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          探索全球最热门的 AI 开源项目。实时抓取、智能截断、极速预览。
        </p>
      </header>

      {projects.length > 0 ? (
        <MasonryGrid>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </MasonryGrid>
      ) : (
        <div style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>
          <p>未能加载项目，请稍后重试。</p>
        </div>
      )}

      <footer style={{ marginTop: 'auto', padding: '4rem 0', opacity: 0.4, fontSize: '0.9rem' }}>
        &copy; 2026 LostZG
      </footer>
    </main>
  );
}
