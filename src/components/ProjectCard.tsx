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
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(project.html_url, '_blank')}
      style={{
        position: 'relative',
        cursor: 'pointer',
        // 关键：外层容器高度完全固定，不随 Hover 变化
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <article
        role="article"
        style={{
          flex: 1,
          position: 'relative',
          background: 'rgba(25, 25, 25, 0.8)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          // 优化：仅针对必要属性进行过渡，使用 will-change 开启硬件加速
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease',
          willChange: 'transform, box-shadow',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          zIndex: isHovered ? 50 : 1,
          borderColor: isHovered ? 'rgba(0, 210, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)',
          boxShadow: isHovered 
            ? '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 210, 255, 0.15)' 
            : '0 4px 12px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <h3 style={{ 
            margin: 0, 
            fontSize: '1.2rem', 
            fontWeight: 700,
            color: 'var(--primary-blue)',
            wordBreak: 'break-all',
            transition: 'color 0.3s ease'
          }}>
            {project.name}
          </h3>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: 'rgba(255, 255, 255, 0.05)', 
            padding: '4px 10px', 
            borderRadius: '20px',
            fontSize: '0.8rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <span style={{ color: '#ffd700', marginRight: '4px' }}>★</span>
            {project.stargazers_count}
          </div>
        </div>

        <p style={{ 
          fontSize: '0.9rem', 
          lineHeight: '1.6', 
          color: 'rgba(255, 255, 255, 0.7)',
          marginBottom: '1.5rem',
          minHeight: '3em' // 保持高度一致性
        }}>
          {truncate(project.description, 100)}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {project.topics.slice(0, 3).map(topic => (
            <span key={topic} style={{
              fontSize: '0.7rem',
              padding: '2px 8px',
              background: 'rgba(157, 80, 187, 0.1)',
              border: '1px solid rgba(157, 80, 187, 0.2)',
              borderRadius: '4px',
              color: 'var(--primary-purple)'
            }}>
              #{topic}
            </span>
          ))}
        </div>

        {/* 悬浮层：相对于 article 定位，不再受外层容器波动影响 */}
        {isHovered && project.description && project.description.length > 100 && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 12px)',
            left: '0',
            right: '0',
            zIndex: 100,
            background: 'rgba(10, 10, 10, 0.98)',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid var(--primary-purple)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)',
            fontSize: '0.85rem',
            lineHeight: '1.5',
            color: 'rgba(255, 255, 255, 0.9)',
            pointerEvents: 'none',
            animation: 'slideUpFade 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}>
            <style>{`
              @keyframes slideUpFade {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
            {project.description}
          </div>
        )}
      </article>
    </div>
  );
};

export default ProjectCard;
