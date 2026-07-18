import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="glass-panel text-center" style={{ padding: '2rem', marginTop: '2rem', borderLeft: '4px solid var(--danger)' }}>
      <h3 style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>Oops! Algo salió mal.</h3>
      <p style={{ color: 'var(--text-muted)' }}>{message}</p>
    </div>
  );
};
