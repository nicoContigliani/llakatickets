import Link from 'next/link';

export default function EventsPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '4rem 2rem',
      background: '#000000',
      color: 'white'
    }}>
      <div className="container">
        <h1 style={{ 
          fontSize: '2.5rem',
          fontWeight: 700,
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Eventos
        </h1>
        <p style={{ 
          textAlign: 'center', 
          color: '#a3a3a3', 
          marginBottom: '3rem' 
        }}>
          Próximamente - Nuestra cartelera de eventos exclusivos
        </p>
        <div style={{ textAlign: 'center' }}>
          <Link 
            href="/"
            style={{
              padding: '0.75rem 1.5rem',
              background: '#6366f1',
              borderRadius: '6px',
              color: 'white',
              textDecoration: 'none'
            }}
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}