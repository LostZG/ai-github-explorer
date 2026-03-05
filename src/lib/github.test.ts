import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchGithubProjects } from './github';

describe('fetchGithubProjects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch AI related projects from GitHub API', async () => {
    const mockResponse = {
      items: [
        {
          id: 1,
          name: 'project-1',
          full_name: 'user/project-1',
          description: 'A great AI project description that might be longer than 100 characters to test truncation later.',
          stargazers_count: 5000,
          html_url: 'https://github.com/user/project-1',
          language: 'Python',
          topics: ['ai', 'llm'],
        },
      ],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const projects = await fetchGithubProjects();

    expect(global.fetch).toHaveBeenCalled();
    expect(projects).toHaveLength(1);
    expect(projects[0]).toEqual(mockResponse.items[0]);
  });

  it('should throw an error if the fetch fails', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
    });

    await expect(fetchGithubProjects()).rejects.toThrow('GitHub API failed: 403 Forbidden');
  });
});
