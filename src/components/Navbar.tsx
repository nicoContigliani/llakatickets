// src/app/components/Navbar.tsx
'use client'

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('inicio')

  useEffect(() => {
    setIsMounted(true)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(`.${styles.mobileMenu}`) && !target.closest(`.${styles.mobileMenuButton}`)) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleLinkClick = (link: string) => {
    setActiveLink(link)
    setIsMobileMenuOpen(false)
  }

  // Loading state
  if (!isMounted) {
    return (
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.skeleton}>
            <div className={styles.skeletonLogo}></div>
            <div className={styles.skeletonNav}>
              <div className={styles.skeletonNavItem}></div>
              <div className={styles.skeletonNavItem}></div>
              <div className={styles.skeletonNavItem}></div>
              <div className={styles.skeletonNavItem}></div>
            </div>
            <div className={styles.skeletonAuth}>
              <div className={styles.skeletonButton}></div>
              <div className={styles.skeletonButton}></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Logo */}
          <a href="/" className={styles.logo} onClick={() => handleLinkClick('inicio')}>
            <div className={styles.logoIcon}>
              <span className={styles.logoLetter}>R</span>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoPrimary}>Reserva</span>
              <span className={styles.logoSecondary}>Universal</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className={styles.navigation}>
            <a 
              href="/" 
              className={`${styles.navLink} ${activeLink === 'inicio' ? styles.navLinkActive : ''}`}
              onClick={() => handleLinkClick('inicio')}
            >
              Inicio
            </a>
            <a 
              href="/events" 
              className={`${styles.navLink} ${activeLink === 'eventos' ? styles.navLinkActive : ''}`}
              onClick={() => handleLinkClick('eventos')}
            >
              Eventos
            </a>
            <a 
              href="/categories" 
              className={`${styles.navLink} ${activeLink === 'categorias' ? styles.navLinkActive : ''}`}
              onClick={() => handleLinkClick('categorias')}
            >
              Categorías
            </a>
            <a 
              href="/support" 
              className={`${styles.navLink} ${activeLink === 'soporte' ? styles.navLinkActive : ''}`}
              onClick={() => handleLinkClick('soporte')}
            >
              Soporte
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`${styles.mobileMenuButton} ${
              isMobileMenuOpen ? styles.mobileMenuOpen : ''
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menú de navegación"
          >
            <span className={styles.menuLine}></span>
            <span className={styles.menuLine}></span>
            <span className={styles.menuLine}></span>
          </button>

          {/* Auth Section */}
          <div className={styles.authSection}>
            <SignedOut>
              <SignInButton mode="modal">
                <button className={styles.loginButton}>
                  Iniciar Sesión
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className={styles.signupButton}>
                  Crear Cuenta
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <div className={styles.userSection}>
                <button className={styles.iconButton} aria-label="Notificaciones">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M13.73 21a2 2 0 0 1-3.46 0" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-10 h-10",
                      userButtonOuterIdentifier: "text-sm font-medium"
                    }
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.mobileMenuOpen : ''
        }`}>
          <nav className={styles.mobileNav}>
            <a 
              href="/" 
              className={`${styles.mobileNavLink} ${activeLink === 'inicio' ? styles.mobileNavLinkActive : ''}`}
              onClick={() => handleLinkClick('inicio')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.mobileNavIcon}>
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Inicio
            </a>
            <a 
              href="/events" 
              className={`${styles.mobileNavLink} ${activeLink === 'eventos' ? styles.mobileNavLinkActive : ''}`}
              onClick={() => handleLinkClick('eventos')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.mobileNavIcon}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Eventos
            </a>
            <a 
              href="/categories" 
              className={`${styles.mobileNavLink} ${activeLink === 'categorias' ? styles.mobileNavLinkActive : ''}`}
              onClick={() => handleLinkClick('categorias')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.mobileNavIcon}>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Categorías
            </a>
            <a 
              href="/support" 
              className={`${styles.mobileNavLink} ${activeLink === 'soporte' ? styles.mobileNavLinkActive : ''}`}
              onClick={() => handleLinkClick('soporte')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.mobileNavIcon}>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="m9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Soporte
            </a>
          </nav>
        </div>
      </div>
    </nav>
  )
}