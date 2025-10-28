'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)',
      textAlign: 'center'
    }}>
      <div className="container">
        <div style={{
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          ⚠️
        </div>
        
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          fontWeight: 600,
          color: '#ffffff',
          marginBottom: '1rem'
        }}>
          Algo salió mal
        </h1>
        
        <p style={{
          color: '#a3a3a3',
          marginBottom: '2rem',
          maxWidth: '400px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
        </p>
        
        <button
          onClick={reset}
          style={{
            padding: '1rem 2rem',
            background: '#6366f1',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontSize: '1rem',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}