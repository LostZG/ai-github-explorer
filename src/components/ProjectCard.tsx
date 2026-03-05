'use client';

import React, { useState } from 'react';
import { GithubProject } from '@/lib/github';

interface ProjectCardProps {
  project: GithubProject;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  const truncate = (text: string | null, limit: number) => {
    if (!text) return '';
    if (text.length <= limit) return text;
    return text.slice(0, limit) + '...';
  };

  return (
    <article
      role="article"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(project.html_url, '_blank')}
      style={{
        position: 'relative',
        background: 'rgba(20, 20, 20, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0)',
        zIndex: isHovered ? 50 : 1,
        boxShadow: isHovered 
          ? '0 15px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 210, 255, 0.2)' 
          : '0 5px 15px rgba(0, 0, 0, 0.3)',
        overflow: 'visible',
        cursor: 'pointer'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h3 style={{ 
          margin: 0, 
          fontSize: '1.25rem', 
          fontWeight: 700,
          color: 'var(--primary-blue)',
          wordBreak: 'break-all'
        }}>
          {project.name}
        </h3>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          background: 'rgba(255, 255, 255, 0.05)', 
          padding: '4px 10px', 
          borderRadius: '20px',
          fontSize: '0.85rem'
        }}>
          <span style={{ color: '#ffd700', marginRight: '4px' }}>★</span>
          {project.stargazers_count}
        </div>
      </div>

      <p style={{ 
        fontSize: '0.95rem', 
        lineHeight: '1.6', 
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: '1.5rem'
      }}>
        {truncate(project.description, 100)}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {project.topics.slice(0, 3).map(topic => (
          <span key={topic} style={{
            fontSize: '0.75rem',
            padding: '4px 8px',
            background: 'rgba(157, 80, 187, 0.1)',
            border: '1px solid rgba(157, 80, 187, 0.2)',
            borderRadius: '4px',
            color: 'var(--primary-purple)'
          }}>
            #{topic}
          </span>
        ))}
      </div>

      {/* Hover Overlay / Tooltip */}
      {isHovered && project.description && project.description.length > 100 && (
        <>
          {/* Bridge to prevent flickering when moving mouse to tooltip */}
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, height: '12px', zIndex: 99 }} />
          
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 100,
            marginTop: '10px',
            background: 'rgba(15, 15, 15, 0.95)',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid var(--primary-purple)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            animation: 'fadeIn 0.2s ease-out',
            pointerEvents: 'none'
          }}>
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-5px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
            {project.description}
          </div>
        </>
      )}
    </article>
  );
};

export default ProjectCard;
