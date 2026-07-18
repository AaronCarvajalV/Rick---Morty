import React from 'react';
import { Character } from '../types';

interface HeroProps {
  character: Character | null;
  onMoreInfo: (character: Character) => void;
}

export const Hero: React.FC<HeroProps> = ({ character, onMoreInfo }) => {
  if (!character) return <div style={{ height: '70vh', background: 'var(--bg-dark)' }} />;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '80vh',
      minHeight: '600px',
      overflow: 'hidden',
    }}>
      {/* Background Image */}
      <img 
        src={character.image} 
        alt={character.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 20%',
          filter: 'brightness(0.6)'
        }}
      />
      
      {/* Gradient Overlays */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to right, rgba(20,20,20,0.9) 0%, rgba(20,20,20,0.4) 40%, transparent 100%)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '30%',
        background: 'linear-gradient(to top, var(--bg-dark) 0%, transparent 100%)'
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '4%',
        width: '40%',
        minWidth: '300px'
      }}>
        <h1 style={{ 
          fontSize: '4.5rem', 
          fontWeight: 800, 
          marginBottom: '1rem',
          lineHeight: 1.1,
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          {character.name}
        </h1>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem', fontWeight: 600, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          <span style={{ color: 'var(--success)' }}>98% de coincidencia</span>
          <span>{character.species}</span>
          <span style={{ border: '1px solid rgba(255,255,255,0.4)', padding: '0 0.4rem' }}>{character.status}</span>
        </div>

        <p style={{ 
          fontSize: '1.2rem', 
          marginBottom: '2rem', 
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          maxWidth: '600px'
        }}>
          Un destacado habitante de {character.origin.name}. Su última ubicación conocida fue {character.location.name}. Descubre su historia a través del multiverso.
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-secondary" onClick={() => onMoreInfo(character)}>
            <span style={{ fontSize: '1.4rem', borderRadius: '50%', border: '2px solid white', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>i</span> 
            Más información
          </button>
        </div>
      </div>
    </div>
  );
};
