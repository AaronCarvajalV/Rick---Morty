import React, { useState } from 'react';
import { useCharacters } from './hooks/useCharacters';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { CharacterList } from './components/CharacterList';
import { CharacterModal } from './components/CharacterModal';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { Character } from './types';

const App: React.FC = () => {
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const { characters, loading, error } = useCharacters({ nameFilter, statusFilter });

  return (
    <div className="container">
      <Header />
      
      <Filters 
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {loading && <Loader />}
      
      {!loading && error && <ErrorMessage message={error} />}
      
      {!loading && !error && characters.length > 0 && (
        <CharacterList 
          characters={characters} 
          onCharacterClick={(char) => setSelectedCharacter(char)} 
        />
      )}

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
