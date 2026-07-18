import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-1px', margin: '0 0 10px 0' }}>
        <span style={{ color: 'var(--primary)' }}>Rick and Morty</span> Explorer
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
        Discover your favorite characters across the multiverse
      </p>
    </header>
  );
};
