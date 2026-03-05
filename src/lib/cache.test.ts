import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'fs';
import { saveProjectsToCache, getProjectsFromCache } from './cache';
import { GithubProject } from './github';

describe('Cache Module', () => {
  const mockProjects: GithubProject[] = [
    {
      id: 1,
      name: 'test-project',
      full_name: 'user/test-project',
      description: 'test description',
      stargazers_count: 100,
      html_url: 'https://github.com/user/test-project',
      language: 'TypeScript',
      topics: ['ai'],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('saveProjectsToCache', () => {
    it('should create directory and save projects to JSON file', async () => {
      // Setup mocks
      const existsSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(false);
      const mkdirSpy = vi.spyOn(fs, 'mkdirSync').mockImplementation(() => undefined as any);
      const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => undefined as any);
      
      await saveProjectsToCache(mockProjects);

      expect(existsSpy).toHaveBeenCalled();
      expect(mkdirSpy).toHaveBeenCalledWith(expect.stringContaining('data'), { recursive: true });
      expect(writeSpy).toHaveBeenCalledWith(
        expect.stringContaining('projects.json'),
        JSON.stringify(mockProjects, null, 2)
      );
    });
  });

  describe('getProjectsFromCache', () => {
    it('should return projects if cache file exists', async () => {
      vi.spyOn(fs, 'existsSync').mockReturnValue(true);
      vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(mockProjects));

      const projects = await getProjectsFromCache();

      expect(projects).toEqual(mockProjects);
    });

    it('should return null if cache file does not exist', async () => {
      vi.spyOn(fs, 'existsSync').mockReturnValue(false);

      const projects = await getProjectsFromCache();

      expect(projects).toBeNull();
    });

    it('should return null and handle error if JSON is malformed', async () => {
      vi.spyOn(fs, 'existsSync').mockReturnValue(true);
      vi.spyOn(fs, 'readFileSync').mockReturnValue('invalid-json');

      const projects = await getProjectsFromCache();

      expect(projects).toBeNull();
    });
  });
});
