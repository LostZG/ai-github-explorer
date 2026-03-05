import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {
  it('should render the main title', () => {
    render(<Home />);
    const title = screen.getByText(/AI GitHub Explorer/i);
    expect(title).toBeInTheDocument();
  });

  it('should render the building message', () => {
    render(<Home />);
    const message = screen.getByText(/正在构建 AI 项目瀑布流展示页.../i);
    expect(message).toBeInTheDocument();
  });
});
