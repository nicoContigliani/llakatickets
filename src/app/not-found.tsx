"use client"


import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div>
        {/* Código de error */}
        <div className={styles.errorCode}>
          404
        </div>
        
        {/* Título */}
        <h1 className={styles.title}>
          Página No Encontrada
        </h1>
        
        {/* Descripción */}
        <p className={styles.description}>
          La página que buscas no existe o ha sido movida. 
          Regresa al inicio para descubrir experiencias increíbles.
        </p>
        
        {/* Botones de acción */}
        <div className={styles.buttonGroup}>
          <Link href="/" className={styles.primaryButton}>
            Volver al Inicio
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className={styles.secondaryButton}
          >
            Regresar
          </button>
        </div>
        
        {/* Elemento decorativo */}
        <div className={styles.decorator}>
          <div className={styles.line}></div>
          <p className={styles.footerText}>
            Error 404 • Página no disponible
          </p>
        </div>
      </div>
    </div>
  );
}