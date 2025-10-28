import Link from 'next/link';

export default function Home() {
  return (
    <main suppressHydrationWarning>
      <section style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#000000',
        color: 'white',
        textAlign: 'center'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '3rem',
            fontWeight: 700,
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #fff 0%, #6366f1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            TicketElegance
          </h1>
          
          <p style={{ 
            color: '#a3a3a3', 
            fontSize: '1.25rem',
            marginBottom: '2rem'
          }}>
            Experiencias premium optimizadas
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link 
              href="/events"
              style={{
                padding: '1rem 2rem',
                background: '#6366f1',
                borderRadius: '8px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 500
              }}
            >
              Explorar Eventos
            </Link>
            
            <Link 
              href="/about"
              style={{
                padding: '1rem 2rem',
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 500
              }}
            >
              Conocer Más
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}