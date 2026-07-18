import React, { useState, useEffect } from 'react';

interface HeaderProps {
  nameFilter: string;
  setNameFilter: (name: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ nameFilter, setNameFilter }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 100,
      padding: '0 4%',
      height: '68px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: isScrolled ? 'var(--bg-dark)' : 'linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, transparent)',
      transition: 'background-color 0.4s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <h1 style={{ 
          fontSize: '1.8rem', 
          fontWeight: 800, 
          color: 'var(--primary)',
          letterSpacing: '-1px',
          margin: 0,
          cursor: 'pointer'
        }}>
          MULTIVERSE
        </h1>
        <nav style={{ display: 'flex', gap: '1.2rem', fontSize: '0.9rem', fontWeight: 600 }}>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Inicio</span>
          <span style={{ cursor: 'pointer', color: 'var(--text-muted)', transition: 'color 0.2s' }}>Personajes</span>
          <span style={{ cursor: 'pointer', color: 'var(--text-muted)', transition: 'color 0.2s' }}>Mi Lista</span>
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          background: searchOpen ? 'rgba(0, 0, 0, 0.7)' : 'transparent',
          border: searchOpen ? '1px solid rgba(255, 255, 255, 0.8)' : '1px solid transparent',
          padding: searchOpen ? '5px 10px' : '5px',
          transition: 'all 0.3s',
        }}>
          <span 
            onClick={() => setSearchOpen(!searchOpen)}
            style={{ cursor: 'pointer', fontSize: '1.2rem', marginRight: searchOpen ? '10px' : '0' }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Títulos, personas, géneros"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            style={{
              width: searchOpen ? '200px' : '0px',
              opacity: searchOpen ? 1 : 0,
              background: 'transparent',
              border: 'none',
              color: 'white',
              outline: 'none',
              transition: 'width 0.3s, opacity 0.3s',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>
    </header>
  );
};
