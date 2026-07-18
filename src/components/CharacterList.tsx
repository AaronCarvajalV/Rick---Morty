import React from 'react';
import { Character } from '../types';
import { CharacterCard } from './CharacterCard';

interface CharacterListProps {
  characters: Character[];
  onCharacterClick: (character: Character) => void;
}

export const CharacterList: React.FC<CharacterListProps> = ({ characters, onCharacterClick }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '2rem'
    }}>
      {characters.map(character => (
        <CharacterCard 
          key={character.id} 
          character={character} 
          onClick={onCharacterClick} 
        />
      ))}
    </div>
  );
};
