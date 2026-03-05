import fs from 'fs';
import path from 'path';
import { GithubProject } from './github';

const CACHE_DIR = path.join(process.cwd(), 'data');
const CACHE_FILE = path.join(CACHE_DIR, 'projects.json');

export async function getCacheStats() {
  if (!fs.existsSync(CACHE_FILE)) return { exists: false, mtime: 0 };
  const stats = fs.statSync(CACHE_FILE);
  return { exists: true, mtime: stats.mtimeMs };
}

export async function saveProjectsToCache(projects: GithubProject[]): Promise<void> {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
  // Limit total projects to 200 to keep cache manageable
  const limitedProjects = projects.slice(0, 200);
  fs.writeFileSync(CACHE_FILE, JSON.stringify(limitedProjects, null, 2));
}

export async function getProjectsFromCache(): Promise<GithubProject[] | null> {
  if (!fs.existsSync(CACHE_FILE)) {
    return null;
  }

  try {
    const data = fs.readFileSync(CACHE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to parse cache file:', error);
    return null;
  }
}
