import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';
import * as github from '@/lib/github';
import * as cache from '@/lib/cache';

vi.mock('@/lib/github');
vi.mock('@/lib/cache');

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the main title', async () => {
    vi.mocked(cache.getCacheStats).mockResolvedValue({ exists: true, mtime: Date.now() });
    vi.mocked(cache.getProjectsFromCache).mockResolvedValue([
      {
        id: 1,
        name: 'test-project',
        full_name: 'user/test-project',
        description: 'test description',
        stargazers_count: 100,
        html_url: 'https://github.com/user/test-project',
        language: 'TypeScript',
        topics: ['ai'],
      }
    ]);

    const Page = await Home();
    render(Page);
    
    expect(screen.getByRole('heading', { level: 1, name: /AI GitHub Explorer/i })).toBeInTheDocument();
    expect(screen.getByText('test-project')).toBeInTheDocument();
  });

  it('should show error message when no projects found', async () => {
    vi.mocked(cache.getCacheStats).mockResolvedValue({ exists: false, mtime: 0 });
    vi.mocked(cache.getProjectsFromCache).mockResolvedValue([]);
    vi.mocked(github.fetchGithubProjects).mockRejectedValue(new Error('Fetch failed'));

    const Page = await Home();
    render(Page);
    
    expect(screen.getByText(/未能加载项目，请稍后重试。/i)).toBeInTheDocument();
  });
});
