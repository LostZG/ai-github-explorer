import React, { ReactNode } from 'react';

interface MasonryGridProps {
  children: ReactNode;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ children }) => {
  return (
    <div 
      className="masonry-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
        padding: '2rem',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto'
      }}
    >
      {children}
    </div>
  );
};

export default MasonryGrid;
