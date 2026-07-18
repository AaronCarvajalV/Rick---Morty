import React, { useState, useEffect } from 'react';

interface HeaderProps {
  nameFilter: string;
  setNameFilter: (name: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ nameFilter, setNameFilter, statusFilter, setStatusFilter }) => {
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
        
        {/* Status Filter (Netflix category style) */}
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            background: 'transparent',
            color: 'var(--text-light)',
            border: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="" style={{ background: 'var(--bg-dark)' }}>Todos los estados</option>
          <option value="Alive" style={{ background: 'var(--bg-dark)' }}>Vivos (Alive)</option>
          <option value="Dead" style={{ background: 'var(--bg-dark)' }}>Caídos (Dead)</option>
          <option value="unknown" style={{ background: 'var(--bg-dark)' }}>Desconocidos (Unknown)</option>
        </select>
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
            placeholder="Buscar personaje..."
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
