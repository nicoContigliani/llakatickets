// page.tsx
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main suppressHydrationWarning>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.title} ${styles.fadeIn}`}>
            TicketElegance
          </h1>
          
          <p className={`${styles.subtitle} ${styles.fadeIn} ${styles.delay1}`}>
            Tu puerta de entrada a experiencias únicas. Desde conciertos épicos hasta eventos exclusivos, 
            conectamos pasiones con momentos inolvidables.
          </p>
          
          <div className={`${styles.ctaGroup} ${styles.fadeIn} ${styles.delay2}`}>
            <Link href="/events" className={`${styles.ctaButton} ${styles.ctaPrimary}`}>
              Explorar Eventos
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            
            <Link href="/about" className={`${styles.ctaButton} ${styles.ctaSecondary}`}>
              Conocer Más
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
            </Link>
          </div>

          {/* Estadísticas de la empresa */}
          <div className={`${styles.eventStats} ${styles.fadeIn} ${styles.delay3}`}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Eventos Activos</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>50K+</div>
              <div className={styles.statLabel}>Clientes Satisfechos</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>15+</div>
              <div className={styles.statLabel}>Años de Experiencia</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>98%</div>
              <div className={styles.statLabel}>Rating Positivo</div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollArrow}></div>
        </div>
      </section>
    </main>
  );
}