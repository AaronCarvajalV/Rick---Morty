import React from 'react';
import { Character } from '../types';

interface CharacterModalProps {
  character: Character;
  onClose: () => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({ character, onClose }) => {
  const getStatusColor = (status: string) => {
    if (status === 'Alive') return 'var(--primary)';
    if (status === 'Dead') return 'var(--danger)';
    return 'var(--unknown)';
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: 'white',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          ×
        </button>

        <div style={{ flex: '1', minWidth: '40%' }}>
          <img 
            src={character.image} 
            alt={character.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        
        <div style={{ flex: '1.5', padding: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.2rem', color: 'var(--primary)' }}>
            {character.name}
          </h2>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            marginBottom: '1.5rem',
            fontSize: '1.1rem'
          }}>
            <span style={{ 
              width: '10px', 
              height: '10px', 
              borderRadius: '50%', 
              background: getStatusColor(character.status) 
            }}></span>
            {character.status} - {character.species}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
            <div>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Género</div>
              <div style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>{character.gender}</div>
            </div>
            
            <div>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Origen</div>
              <div style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>{character.origin.name}</div>
            </div>
            
            <div>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Última ubicación conocida</div>
              <div style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>{character.location.name}</div>
            </div>
            
            <div>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Apariciones en episodios</div>
              <div style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>{character.episode.length} episodios</div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 600px) {
          .glass-panel {
            flex-direction: column !important;
          }
          .glass-panel > div:first-of-type {
            min-height: 250px;
          }
        }
      `}</style>
    </div>
  );
};
