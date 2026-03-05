import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MasonryGrid from './MasonryGrid';

describe('MasonryGrid', () => {
  it('should render all items provided', () => {
    const items = [
      <div key="1">Item 1</div>,
      <div key="2">Item 2</div>,
      <div key="3">Item 3</div>,
    ];
    render(<MasonryGrid>{items}</MasonryGrid>);
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('should have a grid layout class', () => {
    const { container } = render(<MasonryGrid><div>Test</div></MasonryGrid>);
    const grid = container.firstChild as HTMLElement;
    // We expect it to use a container with display: grid or similar
    expect(grid).toHaveStyle({ display: 'grid' });
  });
});
