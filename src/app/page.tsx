// app/page.tsx
'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{delay: string; duration: string; x: string; y: string; size: string}>>([]);

  useEffect(() => {
    setIsMounted(true);
    
    // Generar partículas solo en el cliente
    const generatedParticles = Array.from({ length: 30 }).map(() => ({
      delay: `${Math.random() * 5}s`,
      duration: `${5 + Math.random() * 10}s`,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: `${2 + Math.random() * 4}px`,
    }));
    
    setParticles(generatedParticles);
  }, []);

  return (
    <main suppressHydrationWarning className={styles.main}>
      <section className={styles.hero}>
        {/* Background Particles - Solo se renderiza en cliente */}
        {isMounted && (
          <div className={styles.particles}>
            {particles.map((particle, i) => (
              <div 
                key={i} 
                className={styles.particle}
                style={{
                  '--delay': particle.delay,
                  '--duration': particle.duration,
                  '--x': particle.x,
                  '--y': particle.y,
                  '--size': particle.size,
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        <div className={styles.heroContent}>
          {/* Main Title with Enhanced Animation */}
          <div className={styles.titleWrapper}>
            <h1 className={`${styles.title} ${isMounted ? styles.titleReveal : ''}`}>
              <span className={styles.titleGradient}>Universal</span>
              <span className={styles.titleSub}>Reserva cualquier cosa, en cualquier momento</span>
            </h1>
            <div className={styles.titleUnderline}></div>
          </div>
          
          {/* Enhanced Subtitle */}
          <p className={`${styles.subtitle} ${isMounted ? styles.subtitleReveal : ''}`}>
            La plataforma definitiva para reservas y alquileres.{' '}
            <span className={styles.highlight}>Desde tickets de eventos</span> hasta{' '}
            <span className={styles.highlight}>espacios profesionales</span>,{' '}
            <span className={styles.highlight}>experiencias únicas</span> y{' '}
            <span className={styles.highlight}>servicios especializados</span>.
            Conectamos oferta y demanda de forma inteligente.
          </p>
          
          {/* Enhanced CTA Section */}
          <div className={`${styles.ctaGroup} ${isMounted ? styles.ctaReveal : ''}`}>
            <Link 
              href="/explore" 
              className={`${styles.ctaButton} ${styles.ctaPrimary}`}
            >
              <span className={styles.buttonText}>Explorar Disponibilidad</span>
              <div className={styles.buttonIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M5 12H19M12 5L19 12L12 19" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={styles.buttonGlow}></div>
            </Link>
            
            <Link 
              href="/host" 
              className={`${styles.ctaButton} ${styles.ctaSecondary}`}
            >
              <span className={styles.buttonText}>Ofrecer Servicios</span>
              <div className={styles.buttonIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </Link>
          </div>

          {/* Enhanced Stats Section */}
          <div className={`${styles.platformStats} ${isMounted ? styles.statsReveal : ''}`}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>50K+</div>
              <div className={styles.statLabel}>Servicios Activos</div>
              <div className={styles.statBar}></div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>200K+</div>
              <div className={styles.statLabel}>Reservas Mensuales</div>
              <div className={styles.statBar}></div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>150+</div>
              <div className={styles.statLabel}>Categorías</div>
              <div className={styles.statBar}></div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>98.7%</div>
              <div className={styles.statLabel}>Satisfacción</div>
              <div className={styles.statBar}></div>
            </div>
          </div>

          {/* Universal Categories Grid */}
          <div className={`${styles.categories} ${isMounted ? styles.categoriesReveal : ''}`}>
            <h3 className={styles.categoriesTitle}>Todo lo que puedes reservar</h3>
            <div className={styles.categoryGrid}>
              {/* Eventos y Entretenimiento */}
              <div className={styles.categoryCard}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryIcon}>🎭</div>
                  <h4>Eventos & Entretenimiento</h4>
                </div>
                <div className={styles.categoryItems}>
                  <span>Conciertos</span>
                  <span>Teatro</span>
                  <span>Deportes</span>
                  <span>Festivales</span>
                  <span>Cine</span>
                  <span>Espectáculos</span>
                </div>
              </div>

              {/* Espacios & Propiedades */}
              <div className={styles.categoryCard}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryIcon}>🏠</div>
                  <h4>Espacios & Propiedades</h4>
                </div>
                <div className={styles.categoryItems}>
                  <span>Alquiler vacacional</span>
                  <span>Oficinas</span>
                  <span>Salas de eventos</span>
                  <span>Estudios</span>
                  <span>Locales comerciales</span>
                  <span>Parking</span>
                </div>
              </div>

              {/* Servicios Profesionales */}
              <div className={styles.categoryCard}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryIcon}>💼</div>
                  <h4>Servicios Profesionales</h4>
                </div>
                <div className={styles.categoryItems}>
                  <span>Consultorías</span>
                  <span>Terapias</span>
                  <span>Clases</span>
                  <span>Asesorías</span>
                  <span>Consultas médicas</span>
                  <span>Servicios técnicos</span>
                </div>
              </div>

              {/* Experiencias & Actividades */}
              <div className={styles.categoryCard}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryIcon}>🎯</div>
                  <h4>Experiencias & Actividades</h4>
                </div>
                <div className={styles.categoryItems}>
                  <span>Tours guiados</span>
                  <span>Talleres</span>
                  <span>Actividades deportivas</span>
                  <span>Gastronomía</span>
                  <span>Aventura</span>
                  <span>Cultura</span>
                </div>
              </div>

              {/* Equipamiento & Herramientas */}
              <div className={styles.categoryCard}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryIcon}>🛠️</div>
                  <h4>Equipamiento & Herramientas</h4>
                </div>
                <div className={styles.categoryItems}>
                  <span>Equipos profesionales</span>
                  <span>Herramientas</span>
                  <span>Tecnología</span>
                  <span>Mobiliario</span>
                  <span>Vehículos</span>
                  <span>Instrumentos</span>
                </div>
              </div>

              {/* Servicios Diarios */}
              <div className={styles.categoryCard}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryIcon}>📅</div>
                  <h4>Servicios Diarios</h4>
                </div>
                <div className={styles.categoryItems}>
                  <span>Beauty & Wellness</span>
                  <span>Delivery premium</span>
                  <span>Mantenimiento</span>
                  <span>Transporte</span>
                  <span>Cuidado personal</span>
                  <span>Hogar</span>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className={`${styles.howItWorks} ${isMounted ? styles.worksReveal : ''}`}>
            <h3 className={styles.worksTitle}>Cómo funciona Universal</h3>
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <h4>Explora</h4>
                <p>Encuentra entre miles de servicios, espacios y experiencias disponibles</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <h4>Reserva</h4>
                <p>Selecciona fecha, horario y confirma tu reserva al instante</p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <h4>Disfruta</h4>
                <p>Accede a tu reserva y vive la experiencia sin complicaciones</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        {isMounted && (
          <div className={styles.scrollIndicator}>
            <div className={styles.scrollText}>Descubre el universo de posibilidades</div>
            <div className={styles.scrollArrow}>
              <div className={styles.arrowLine}></div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}