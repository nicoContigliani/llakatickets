import styles from './page.module.css';

export default function Home() {
  const events = [
    {
      title: "Symphony No.9",
      description: "Una experiencia orquestal en la sala de conciertos más prestigiosa de la ciudad.",
      date: "15 MAR",
      price: "$89",
      location: "Teatro Nacional"
    },
    {
      title: "Jazz & Wine Night", 
      description: "Velada íntima con los mejores músicos de jazz y selección premium de vinos.",
      date: "22 MAR",
      price: "$65",
      location: "Club Privé"
    },
    {
      title: "Digital Art Gala",
      description: "Exclusiva exhibición de arte digital con realidad aumentada y artistas internacionales.",
      date: "30 MAR",
      price: "$75",
      location: "Museo Moderno"
    }
  ];

  const features = [
    {
      title: "Reservas Instantáneas",
      description: "Acceso inmediato a los mejores eventos con confirmación al instante."
    },
    {
      title: "Experiencias Premium", 
      description: "Acceso privilegiado a eventos exclusivos y meet & greet con artistas."
    },
    {
      title: "Soporte Dedicado",
      description: "Asistencia personalizada para cada etapa de tu experiencia."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>TicketElegance</h1>
          <p className={styles.subtitle}>
            Donde cada evento se convierte en una experiencia memorable. 
            Descubre la excelencia en entretenimiento.
          </p>
          <div className={styles.ctaGroup}>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>
              Explorar Eventos
            </button>
            <button className={`${styles.btn} ${styles.btnSecondary}`}>
              Conocer Más
            </button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className={styles.events}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Eventos Destacados</h2>
          <div className={styles.grid}>
            {events.map((event, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.date}>{event.date}</div>
                  <div className={styles.price}>{event.price}</div>
                </div>
                <h3 className={styles.cardTitle}>{event.title}</h3>
                <p className={styles.cardDescription}>{event.description}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.location}>{event.location}</span>
                  <button className={styles.btn}>
                    Reservar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Por Qué Elegirnos</h2>
          <div className={styles.featureGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.feature}>
                <div className={styles.featureIcon}>
                  <span>✦</span>
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}