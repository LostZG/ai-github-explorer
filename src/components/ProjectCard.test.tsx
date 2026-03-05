import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectCard from './ProjectCard';
import { GithubProject } from '@/lib/github';

describe('ProjectCard', () => {
  const mockProject: GithubProject = {
    id: 1,
    name: 'test-ai-project',
    full_name: 'user/test-ai-project',
    description: 'This is a very long description that should be truncated because it exceeds one hundred characters. We want to make sure the UI stays clean and consistent across all cards in the masonry grid.',
    stargazers_count: 1234,
    html_url: 'https://github.com/user/test-ai-project',
    language: 'TypeScript',
    topics: ['ai', 'llm'],
  };

  it('should render project name and star count', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('test-ai-project')).toBeInTheDocument();
    expect(screen.getByText('1234')).toBeInTheDocument();
  });

  it('should truncate description to 100 characters', () => {
    render(<ProjectCard project={mockProject} />);
    const description = screen.getByText(/truncated/);
    expect(description.textContent?.length).toBeLessThanOrEqual(103); // 100 + '...'
    expect(description.textContent).toContain('...');
  });

  it('should show full description on hover (mocking logic)', async () => {
    render(<ProjectCard project={mockProject} />);
    const card = screen.getByRole('article');
    
    // Hover to trigger tooltip/expanded view
    fireEvent.mouseEnter(card);
    
    // The full description should now be visible (somewhere in the DOM)
    // Depending on implementation, it might be a tooltip
    expect(screen.getByText(mockProject.description!)).toBeInTheDocument();
  });
});
