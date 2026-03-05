import MasonryGrid from '@/components/MasonryGrid';
import ProjectCard from '@/components/ProjectCard';
import { fetchGithubProjects } from '@/lib/github';
import { getProjectsFromCache, saveProjectsToCache } from '@/lib/cache';

export default async function Home() {
  let projects = await getProjectsFromCache();

  if (!projects || projects.length === 0) {
    try {
      projects = await fetchGithubProjects();
      await saveProjectsToCache(projects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      projects = [];
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
        &copy; 2026 AI GitHub Explorer • Powered by Next.js & Gemini
      </footer>
    </main>
  );
}
