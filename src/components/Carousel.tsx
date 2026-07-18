import React, { useRef } from 'react';
import { Character } from '../types';
import { CharacterCard } from './CharacterCard';

interface CarouselProps {
  title: string;
  characters: Character[];
  onCharacterClick: (character: Character) => void;
}

export const Carousel: React.FC<CarouselProps> = ({ title, characters, onCharacterClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -window.innerWidth * 0.8, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: window.innerWidth * 0.8, behavior: 'smooth' });
    }
  };

  if (characters.length === 0) return null;

  return (
    <div style={{ margin: '3rem 0', position: 'relative' }}>
      <h2 style={{ 
        paddingLeft: '4%', 
        marginBottom: '1rem', 
        fontSize: '1.4rem', 
        fontWeight: 600,
        color: '#e5e5e5'
      }}>
        {title}
      </h2>
      
      <div 
        className="carousel-container"
        style={{ position: 'relative' }}
      >
        <button 
          className="scroll-btn left"
          onClick={scrollLeft}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '4%',
            background: 'rgba(0,0,0,0.5)',
            border: 'none',
            color: 'white',
            fontSize: '2rem',
            zIndex: 10,
            cursor: 'pointer',
            opacity: 0,
            transition: 'opacity 0.2s'
          }}
        >
          ‹
        </button>

        <div 
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '0.4rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            padding: '0 4%',
            scrollBehavior: 'smooth',
          }}
        >
          {characters.map((character, index) => (
            <div 
              key={character.id} 
              style={{ 
                scrollSnapAlign: 'start', 
                flex: '0 0 auto',
                scrollInitialTarget: index === 0 ? 'nearest' : 'none'
              }}
            >
              <CharacterCard character={character} onClick={onCharacterClick} />
            </div>
          ))}
        </div>

        <button 
          className="scroll-btn right"
          onClick={scrollRight}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '4%',
            background: 'rgba(0,0,0,0.5)',
            border: 'none',
            color: 'white',
            fontSize: '2rem',
            zIndex: 10,
            cursor: 'pointer',
            opacity: 0,
            transition: 'opacity 0.2s'
          }}
        >
          ›
        </button>
      </div>

      <style>{`
        .carousel-container:hover .scroll-btn {
          opacity: 1 !important;
        }
        .carousel-container .scroll-btn:hover {
          background: rgba(0,0,0,0.8) !important;
        }
      `}</style>
    </div>
  );
};
