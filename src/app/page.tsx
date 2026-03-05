export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        marginBottom: '1rem',
        background: 'linear-gradient(to right, var(--primary-blue), var(--primary-purple))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        AI GitHub Explorer
      </h1>
      <p style={{ opacity: 0.8, maxWidth: '600px' }}>
        正在构建 AI 项目瀑布流展示页...
      </p>
    </main>
  );
}
