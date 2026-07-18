import React from 'react';

interface FiltersProps {
  nameFilter: string;
  setNameFilter: (name: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  nameFilter,
  setNameFilter,
  statusFilter,
  setStatusFilter
}) => {
  return (
    <div className="glass-panel" style={{
      display: 'flex',
      flexDirection: 'row',
      gap: '1rem',
      padding: '1.5rem',
      marginBottom: '2rem',
      flexWrap: 'wrap'
    }}>
      <div style={{ flex: '1 1 250px' }}>
        <label htmlFor="name-filter" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Buscar por nombre
        </label>
        <input
          id="name-filter"
          type="text"
          placeholder="Ej: Rick, Morty, Summer..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(0, 0, 0, 0.2)',
            color: 'var(--text-light)',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
        />
      </div>
      
      <div style={{ flex: '1 1 200px' }}>
        <label htmlFor="status-filter" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Filtrar por estado
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(0, 0, 0, 0.2)',
            color: 'var(--text-light)',
            fontSize: '1rem',
            outline: 'none',
            cursor: 'pointer',
            transition: 'border-color 0.2s',
            appearance: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
        >
          <option value="" style={{ background: '#1e293b' }}>Todos</option>
          <option value="Alive" style={{ background: '#1e293b' }}>Alive</option>
          <option value="Dead" style={{ background: '#1e293b' }}>Dead</option>
          <option value="unknown" style={{ background: '#1e293b' }}>Unknown</option>
        </select>
      </div>
    </div>
  );
};
