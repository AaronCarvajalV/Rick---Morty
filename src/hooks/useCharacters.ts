import { useState, useEffect } from 'react';
import { Character, ApiResponse } from '../types';

interface UseCharactersProps {
  nameFilter: string;
  statusFilter: string;
}

export const useCharacters = ({ nameFilter, statusFilter }: UseCharactersProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = 'https://rickandmortyapi.com/api/character/?';
        if (nameFilter) url += `name=${nameFilter}&`;
        if (statusFilter) url += `status=${statusFilter}&`;

        const response = await fetch(url);
        if (!response.ok) {
          if (response.status === 404) {
            setCharacters([]);
            throw new Error('No characters found matching your criteria.');
          }
          throw new Error('Failed to fetch characters');
        }

        const data: ApiResponse = await response.json();
        setCharacters(data.results);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    // Debounce to avoid too many requests while typing
    const timeoutId = setTimeout(() => {
      fetchCharacters();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [nameFilter, statusFilter]);

  return { characters, loading, error };
};
