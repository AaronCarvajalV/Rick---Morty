import React from 'react';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  const getStatusColor = (status: string) => {
    if (status === 'Alive') return 'var(--primary)';
    if (status === 'Dead') return 'var(--danger)';
    return 'var(--unknown)';
  };

  return (
    <div 
      className="glass-panel"
      onClick={() => onClick(character)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(151, 206, 76, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.3)';
      }}
    >
      <div style={{ position: 'relative', paddingTop: '100%' }}>
        <img 
          src={character.image} 
          alt={character.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(4px)',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            background: getStatusColor(character.status) 
          }}></span>
          {character.status}
        </div>
      </div>
      
      <div style={{ padding: '1.2rem' }}>
        <h2 style={{ 
          fontSize: '1.4rem', 
          marginBottom: '0.5rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {character.name}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <div><strong>Especie:</strong> <span style={{ color: 'var(--text-light)' }}>{character.species}</span></div>
          <div><strong>Género:</strong> <span style={{ color: 'var(--text-light)' }}>{character.gender}</span></div>
        </div>
      </div>
    </div>
  );
};
