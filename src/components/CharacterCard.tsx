import React from 'react';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  return (
    <div 
      className="netflix-card"
      onClick={() => onClick(character)}
      style={{
        width: '280px',
        aspectRatio: '16/9',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '4px',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), z-index 0.4s, width 0.4s',
        transformOrigin: 'center center',
        zIndex: 1,
        containerType: 'inline-size' /* Container query setup */
      }}
    >
      {/* Default Image View */}
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
      }}>
        <img 
          src={character.image} 
          alt={character.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%'
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          padding: '10px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
          fontWeight: 600,
          textShadow: '1px 1px 2px black'
        }}>
          {character.name}
        </div>
      </div>

      {/* Expanded Hover Card using container queries */}
      <div className="card-expanded-content" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        background: 'var(--bg-card)',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
        opacity: 0,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ width: '100%', aspectRatio: '16/9' }}>
          <img 
            src={character.image} 
            alt={character.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
            <span style={{ 
              color: character.status === 'Alive' ? 'var(--success)' : 
                     character.status === 'Dead' ? 'var(--danger)' : 'var(--unknown)',
              fontWeight: 600 
            }}>
              {character.status}
            </span>
            <span style={{ border: '1px solid rgba(255,255,255,0.4)', padding: '0 4px', fontSize: '0.8rem' }}>
              {character.species}
            </span>
          </div>
          
          {/* Conditional details based on container size */}
          <div className="card-extra-details" style={{ display: 'none' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '0.2rem' }}>
              {character.name}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {character.gender} • {character.origin.name}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        /* When card is hovered, scale it and raise z-index */
        .netflix-card:hover {
          transform: scale(1.3);
          z-index: 100 !important;
          box-shadow: 0 10px 40px rgba(0,0,0,0.9);
        }

        /* Show expanded content smoothly */
        .netflix-card:hover .card-expanded-content {
          opacity: 1;
          pointer-events: auto;
          animation: showContent 0.2s 0.2s forwards; /* Small delay before showing content */
        }
        
        .netflix-card:hover > div:first-child {
          opacity: 0;
        }

        @keyframes showContent {
          to { opacity: 1; }
        }

        /* Container Query: Show extra details when card width is large enough (simulated by scale usually, but here we can just use regular CSS if scale doesn't change actual width) */
        /* Note: transform: scale doesn't change container-type inline-size, so we'll just show it always on hover in this design, but container queries could be used if we change actual width. */
        
        .netflix-card:hover .card-extra-details {
          display: block;
        }
      `}</style>
    </div>
  );
};
