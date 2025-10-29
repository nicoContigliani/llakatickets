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

  useEffect(() => {
    setIsMounted(true)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
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
          <a href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <span style={{color: 'white', fontSize: '14px', fontWeight: '600'}}>M</span>
            </div>
            <span className={styles.logoText}>MiApp</span>
          </a>

          {/* Desktop Navigation */}
          <div className={styles.navigation}>
            <a href="/" className={`${styles.navLink} ${styles.navLinkActive}`}>
              Inicio
            </a>
            <a href="/products" className={styles.navLink}>
              Productos
            </a>
            <a href="/features" className={styles.navLink}>
              Características
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`${styles.mobileMenuButton} ${
              isMobileMenuOpen ? styles.mobileMenuOpen : ''
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                  Entrar
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className={styles.signupButton}>
                  Registrar
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <div className={styles.userSection}>
                <button className={styles.iconButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M15 17h5l-5 5v-5zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-9 h-9",
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
              className={`${styles.mobileNavLink} ${styles.mobileNavLinkActive}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </a>
            <a 
              href="/products" 
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Productos
            </a>
            <a 
              href="/features" 
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Características
            </a>
          </nav>
        </div>
      </div>
    </nav>
  )
}