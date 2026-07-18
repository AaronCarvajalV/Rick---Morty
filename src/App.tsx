import React, { useState } from 'react';
import { useCharacters } from './hooks/useCharacters';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Carousel } from './components/Carousel';
import { CharacterList } from './components/CharacterList';
import { CharacterModal } from './components/CharacterModal';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { Character } from './types';

const App: React.FC = () => {
  const [nameFilter, setNameFilter] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  // We fetch characters based on nameFilter.
  const { characters, loading, error } = useCharacters({ nameFilter, statusFilter: '' });

  // For the Netflix view, we categorize the characters
  const aliveCharacters = characters.filter(c => c.status === 'Alive');
  const deadCharacters = characters.filter(c => c.status === 'Dead');
  const unknownCharacters = characters.filter(c => c.status === 'unknown');
  
  // Featured hero character
  const heroCharacter = characters.length > 0 ? characters[0] : null;

  return (
    <div className="container-fluid">
      <Header nameFilter={nameFilter} setNameFilter={setNameFilter} />

      {/* Show Hero and Carousels if no search is active */}
      {!nameFilter && !loading && !error && (
        <>
          <Hero character={heroCharacter} onMoreInfo={setSelectedCharacter} />
          
          <div style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
            <Carousel 
              title="Populares en el Multiverso" 
              characters={aliveCharacters} 
              onCharacterClick={setSelectedCharacter} 
            />
            
            <Carousel 
              title="Personajes Caídos" 
              characters={deadCharacters} 
              onCharacterClick={setSelectedCharacter} 
            />
            
            <Carousel 
              title="Misterios del Multiverso" 
              characters={unknownCharacters} 
              onCharacterClick={setSelectedCharacter} 
            />
          </div>
        </>
      )}

      {/* Show search results if searching */}
      {nameFilter && (
        <div style={{ padding: '100px 4% 0' }}>
          <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Resultados para "{nameFilter}"</h2>
          {loading && <Loader />}
          {!loading && error && <ErrorMessage message={error} />}
          {!loading && !error && characters.length > 0 && (
            <CharacterList 
              characters={characters} 
              onCharacterClick={setSelectedCharacter} 
            />
          )}
        </div>
      )}

      {/* Handle empty or initial loading state when not searching */}
      {!nameFilter && loading && <div style={{ paddingTop: '100px' }}><Loader /></div>}
      {!nameFilter && !loading && error && <div style={{ paddingTop: '100px' }}><ErrorMessage message={error} /></div>}

      {/* Modal */}
      {selectedCharacter && (
        <CharacterModal 
          character={selectedCharacter} 
          onClose={() => setSelectedCharacter(null)} 
        />
      )}
    </div>
  );
};

export default App;
