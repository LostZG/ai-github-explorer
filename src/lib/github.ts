export interface GithubProject {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  html_url: string;
  language: string | null;
  topics: string[];
}

export async function fetchGithubProjects(): Promise<GithubProject[]> {
  // Use the correct uppercase OR syntax for searching multiple keywords on GitHub.
  const query = 'ai OR llm OR "machine-learning" OR "computer-vision" stars:>5000';
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=100`;

  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'AI-GitHub-Explorer-App',
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`GitHub API failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  
  // Transform data to our interface
  return data.items.map((item: any) => ({
    id: item.id,
    name: item.name,
    full_name: item.full_name,
    description: item.description,
    stargazers_count: item.stargazers_count,
    html_url: item.html_url,
    language: item.language,
    topics: item.topics || [],
  }));
}
