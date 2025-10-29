'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  Search, MapPin, Calendar, Users, Filter, Star, ChevronRight, 
  Sparkles, Clock, Shield, Zap, Music, Palette, Camera, 
  Play, Pause, Mic, Theater, Heart, Eye, Share2
} from 'lucide-react'
import styles from './page.module.css'

// Interfaces y tipos
interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  pulse: number
}

interface SearchType {
  name: string
  icon: React.ComponentType<any>
  gradient: string
  filters: Record<string, any>
}

interface Category {
  id: string
  name: string
  icon: string
  count: string
  gradient: string
}

interface Listing {
  id: number
  title: string
  location: string
  price: string
  period: string
  rating: number
  reviews: number
  image: string
  details: string
  gradient: string
  discipline?: string
}

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  type: string
  gradient: string
}

interface Stat {
  number: string
  label: string
  icon: string
  gradient: string
}

// Función auxiliar para colores aleatorios
const getRandomColor = (): string => {
  const colors = [
    'rgba(102, 126, 234,', // Purple
    'rgba(116, 250, 210,', // Teal
    'rgba(255, 107, 107,', // Coral
    'rgba(255, 206, 107,', // Gold
    'rgba(168, 85, 247,',  // Deep Purple
    'rgba(34, 211, 238,',  // Cyan
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export default function Home() {
  // Estados principales
  const [isMounted, setIsMounted] = useState(false)
  const [searchType, setSearchType] = useState<string>('artists')
  const [location, setLocation] = useState('')
  const [filters, setFilters] = useState<Record<string, any>>({})
  const [showFilters, setShowFilters] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  
  // Referencias
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  // Configuraciones
  const searchTypes: Record<string, SearchType> = {
    artists: {
      name: 'Artistas',
      icon: Palette,
      gradient: 'from-purple-500 to-blue-600',
      filters: {
        discipline: ['Música', 'Artes Visuales', 'Teatro', 'Danza', 'Literatura', 'Cine'],
        experience: ['Emergente', 'Establecido', 'Consagrado'],
        availability: ['Disponible', 'Por proyecto', 'En gira'],
        priceRange: { min: 0, max: 10000 }
      }
    },
    events: {
      name: 'Eventos',
      icon: Calendar,
      gradient: 'from-pink-500 to-rose-600',
      filters: {
        eventType: ['Concierto', 'Exposición', 'Obra de Teatro', 'Festival', 'Taller', 'Conferencia'],
        audience: ['Familiar', 'Adultos', 'Infantil', 'Especializado'],
        date: 'Fecha específica',
        priceRange: { min: 0, max: 500 }
      }
    },
    spaces: {
      name: 'Espacios',
      icon: Theater,
      gradient: 'from-green-500 to-emerald-600',
      filters: {
        spaceType: ['Galería', 'Teatro', 'Estudio', 'Sala de ensayo', 'Al aire libre'],
        capacity: ['Pequeño (<50)', 'Mediano (50-200)', 'Grande (200+)'],
        amenities: ['Iluminación', 'Sonido', 'Backstage', 'Catering'],
        priceRange: { min: 0, max: 2000 }
      }
    },
    collaborations: {
      name: 'Colaboraciones',
      icon: Users,
      gradient: 'from-orange-500 to-red-600',
      filters: {
        projectType: ['Interdisciplinario', 'Comunitario', 'Experimental', 'Comercial'],
        duration: ['Corto plazo', 'Mediano plazo', 'Largo plazo'],
        budget: ['Voluntario', 'Honorarios', 'Presupuesto asignado']
      }
    }
  }

  const categories: Category[] = [
    { id: 'artists', name: 'Artistas', icon: '🎨', count: '1.2K', gradient: 'from-purple-500 to-blue-500' },
    { id: 'events', name: 'Eventos', icon: '🎭', count: '856', gradient: 'from-pink-500 to-rose-500' },
    { id: 'spaces', name: 'Espacios', icon: '🏛️', count: '312', gradient: 'from-green-500 to-emerald-500' },
    { id: 'collaborations', name: 'Colaboraciones', icon: '🤝', count: '478', gradient: 'from-orange-500 to-red-500' }
  ]

  const featuredListings: Record<string, Listing[]> = {
    artists: [
      {
        id: 1,
        title: "María López - Artista Visual",
        location: "Madrid, España",
        price: "Desde €150",
        period: "sesión",
        rating: 4.98,
        reviews: 89,
        image: "🎨",
        details: "Pintura abstracta · Instalaciones · Talleres personalizados",
        gradient: "from-purple-500 to-blue-500",
        discipline: "Artes Visuales"
      },
      {
        id: 2,
        title: "Carlos Rodríguez - Músico",
        location: "Barcelona, España",
        price: "Desde €200",
        period: "presentación",
        rating: 4.9,
        reviews: 124,
        image: "🎵",
        details: "Jazz contemporáneo · Composición · Sesiones en vivo",
        gradient: "from-blue-500 to-cyan-500",
        discipline: "Música"
      },
      {
        id: 3,
        title: "Ana Torres - Bailarina",
        location: "Sevilla, España",
        price: "Desde €180",
        period: "clase",
        rating: 4.95,
        reviews: 67,
        image: "💃",
        details: "Danza contemporánea · Coreografía · Talleres intensivos",
        gradient: "from-pink-500 to-rose-500",
        discipline: "Danza"
      }
    ],
    events: [
      {
        id: 1,
        title: "Festival de Arte Urbano",
        location: "Valencia, España",
        price: "Gratuito",
        period: "entrada",
        rating: 4.8,
        reviews: 234,
        image: "🖌️",
        details: "15-20 Dic 2024 · Murales en vivo · Talleres participativos",
        gradient: "from-pink-500 to-rose-500"
      },
      {
        id: 2,
        title: "Noche de Micrófono Abierto",
        location: "Café Literario, Madrid",
        price: "€5",
        period: "entrada",
        rating: 4.7,
        reviews: 156,
        image: "🎤",
        details: "Cada viernes · Poesía · Música acústica · Stand-up",
        gradient: "from-orange-500 to-red-500"
      }
    ],
    spaces: [
      {
        id: 1,
        title: "Galería Luna Roja",
        location: "Centro Histórico, Sevilla",
        price: "Desde €80",
        period: "día",
        rating: 4.95,
        reviews: 203,
        image: "🏛️",
        details: "120m² · Iluminación profesional · Capacidad 100 personas",
        gradient: "from-green-500 to-emerald-500"
      },
      {
        id: 2,
        title: "Estudio Creativo Aurora",
        location: "Barcelona, España",
        price: "Desde €120",
        period: "día",
        rating: 4.88,
        reviews: 145,
        image: "🎬",
        details: "200m² · Equipo profesional · Natural light · Estacionamiento",
        gradient: "from-blue-500 to-cyan-500"
      }
    ],
    collaborations: [
      {
        id: 1,
        title: "Proyecto Interdisciplinario",
        location: "Remoto/Madrid",
        price: "Presupuesto",
        period: "colaboración",
        rating: 4.9,
        reviews: 89,
        image: "🌟",
        details: "Fusión música y artes visuales · 3 meses · Equipo internacional",
        gradient: "from-orange-500 to-red-500"
      }
    ]
  }

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Ana Martínez",
      role: "Artista plástica",
      content: "Conecté con otros artistas para una exposición colectiva. La plataforma hizo el proceso increíblemente fácil.",
      rating: 5,
      type: "Colaboración",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      id: 2,
      name: "David Chen",
      role: "Organizador de eventos",
      content: "Encontré músicos excepcionales para nuestro festival. La calidad de los perfiles y portfolio es excelente.",
      rating: 5,
      type: "Eventos",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      id: 3,
      name: "Elena Torres",
      role: "Gestora cultural",
      content: "Perfecta para descubrir talento emergente y espacios únicos. Ha revolucionado cómo trabajamos.",
      rating: 5,
      type: "Artistas",
      gradient: "from-green-500 to-emerald-500"
    }
  ]

  const stats: Stat[] = [
    { number: "5K+", label: "Artistas Registrados", icon: "🎨", gradient: "from-purple-500 to-blue-500" },
    { number: "2K+", label: "Eventos Mensuales", icon: "📅", gradient: "from-pink-500 to-rose-500" },
    { number: "98%", label: "Conexiones Exitosas", icon: "💫", gradient: "from-green-500 to-emerald-500" },
    { number: "150+", label: "Ciudades Activas", icon: "🌍", gradient: "from-orange-500 to-red-500" }
  ]

  // Efectos
  useEffect(() => {
    setIsMounted(true)
    initBackgroundAnimation()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Animación de fondo
  const initBackgroundAnimation = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 50

    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: getRandomColor(),
        opacity: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2
      })
    }

    const animate = () => {
      if (!isPlaying) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // Limpiar canvas con transparencia para efecto de rastro
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dibujar conexiones
      ctx.strokeStyle = 'rgba(102, 126, 234, 0.1)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            ctx.globalAlpha = 0.1 * (1 - distance / 100)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Actualizar y dibujar partículas
      particles.forEach(particle => {
        // Actualizar posición
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.pulse += 0.05

        // Rebote en bordes
        if (particle.x > canvas.width) particle.x = 0
        else if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        else if (particle.y < 0) particle.y = canvas.height

        // Efecto de pulso
        particle.opacity = 0.2 + Math.sin(particle.pulse) * 0.3

        // Dibujar partícula
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color + particle.opacity + ')'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Efecto de brillo
        ctx.shadowBlur = 15
        ctx.shadowColor = particle.color + '0.8)'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }

  // Manejadores
  const handleFilterChange = (filterType: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const handleSearch = () => {
    // Aquí iría la lógica de búsqueda real
    console.log('Buscando:', { searchType, location, filters })
    // En una implementación real, esto dispararía una búsqueda en la base de datos
    alert(`Buscando ${searchTypes[searchType].name.toLowerCase()} en ${location || 'todas las ubicaciones'}`)
  }

  // Renderizado de filtros dinámicos
  const renderDynamicFilters = () => {
    const currentType = searchTypes[searchType]
    if (!currentType) return null

    return Object.entries(currentType.filters).map(([key, options]) => (
      <div key={key} className={styles.filterGroup}>
        <label className={styles.filterLabel}>
          {key === 'discipline' ? 'Disciplina' : 
           key === 'experience' ? 'Experiencia' :
           key === 'eventType' ? 'Tipo de Evento' :
           key === 'spaceType' ? 'Tipo de Espacio' :
           key === 'projectType' ? 'Tipo de Proyecto' :
           key.charAt(0).toUpperCase() + key.slice(1)}
        </label>
        {Array.isArray(options) ? (
          <div className={styles.filterOptions}>
            {options.map((option: string) => (
              <button
                key={option}
                className={`${styles.filterOption} ${
                  filters[key] === option ? styles.active : ''
                }`}
                onClick={() => handleFilterChange(key, option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : key === 'priceRange' && typeof options === 'object' ? (
          <div className={styles.rangeSlider}>
            <input
              type="range"
              min={options.min}
              max={options.max}
              value={filters.priceRange || options.min}
              onChange={(e) => handleFilterChange('priceRange', parseInt(e.target.value))}
              className={styles.rangeInput}
            />
            <div className={styles.rangeLabels}>
              <span>€{options.min}</span>
              <span>Hasta €{filters.priceRange || options.min}</span>
            </div>
          </div>
        ) : (
          <input
            type="text"
            placeholder={`Buscar ${key}...`}
            className={styles.filterInput}
            onChange={(e) => handleFilterChange(key, e.target.value)}
          />
        )}
      </div>
    ))
  }

  // Icono actual para la sección
  const CurrentIcon = searchTypes[searchType]?.icon || Palette

  return (
    <main className={styles.main}>
      {/* Fondo Animado */}
      <canvas 
        ref={canvasRef} 
        className={styles.animatedBackground}
        style={{ opacity: isPlaying ? 1 : 0.5 }}
      />
      
      {/* Control de Animación */}
      <button 
        className={styles.animationControl}
        onClick={() => setIsPlaying(!isPlaying)}
        title={isPlaying ? 'Pausar animación' : 'Reanudar animación'}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      {/* Sección Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          {/* Encabezado Principal */}
          <div className={styles.heroHeader}>
            <div className={styles.badge}>
              <Sparkles size={16} />
              <span>Plataforma Artística del Futuro</span>
            </div>
            <h1 className={styles.title}>
              <span className={styles.titleLine}>Conecta con el</span>
              <span className={styles.titleAccent}>Universo Artístico</span>
            </h1>
            <p className={styles.subtitle}>
              Donde la creatividad se encuentra con la tecnología. Conecta artistas, 
              espacios y audiencias en una experiencia única.
            </p>
          </div>

          {/* Búsqueda Principal */}
          <div className={styles.searchSection}>
            <div className={styles.searchContainer}>
              {/* Pestañas de Tipo de Búsqueda */}
              <div className={styles.searchTypeTabs}>
                {Object.entries(searchTypes).map(([key, type]) => {
                  const IconComponent = type.icon
                  return (
                    <button
                      key={key}
                      className={`${styles.searchTypeTab} ${
                        searchType === key ? styles.active : ''
                      }`}
                      onClick={() => setSearchType(key)}
                    >
                      <IconComponent size={18} />
                      <span>{type.name}</span>
                      <div className={styles.tabGlow}></div>
                    </button>
                  )
                })}
              </div>

              {/* Campos de Búsqueda */}
              <div className={styles.searchGrid}>
                {/* Ubicación */}
                <div className={styles.searchField}>
                  <MapPin size={20} className={styles.fieldIcon} />
                  <div className={styles.fieldContent}>
                    <label className={styles.fieldLabel}>Ubicación</label>
                    <input
                      type="text"
                      placeholder="¿En qué ciudad buscas?"
                      className={styles.fieldInput}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className={styles.fieldGlow}></div>
                </div>

                {/* Categoría Principal */}
                <div className={styles.searchField}>
                  <Filter size={20} className={styles.fieldIcon} />
                  <div className={styles.fieldContent}>
                    <label className={styles.fieldLabel}>
                      {searchType === 'artists' ? 'Disciplina' :
                       searchType === 'events' ? 'Tipo de evento' :
                       searchType === 'spaces' ? 'Tipo de espacio' :
                       'Tipo de proyecto'}
                    </label>
                    <select 
                      className={styles.fieldInput}
                      onChange={(e) => {
                        const filterKey = 
                          searchType === 'artists' ? 'discipline' : 
                          searchType === 'events' ? 'eventType' : 
                          searchType === 'spaces' ? 'spaceType' : 'projectType'
                        handleFilterChange(filterKey, e.target.value)
                      }}
                    >
                      <option value="">Todas las categorías</option>
                      {searchTypes[searchType]?.filters[
                        searchType === 'artists' ? 'discipline' : 
                        searchType === 'events' ? 'eventType' : 
                        searchType === 'spaces' ? 'spaceType' : 'projectType'
                      ]?.map((option: string) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.fieldGlow}></div>
                </div>

                {/* Botón de Búsqueda */}
                <button 
                  className={styles.searchButton}
                  onClick={handleSearch}
                >
                  <div className={styles.buttonContent}>
                    <Search size={20} />
                    <span>
                      {searchType === 'artists' ? 'Descubrir artistas' :
                       searchType === 'events' ? 'Explorar eventos' :
                       searchType === 'spaces' ? 'Buscar espacios' :
                       'Encontrar colaboraciones'}
                    </span>
                  </div>
                  <div className={styles.buttonGlow}></div>
                  <div className={styles.buttonPulse}></div>
                </button>
              </div>

              {/* Filtros Avanzados */}
              <div className={styles.filterSection}>
                <button 
                  className={styles.filterToggle}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={18} />
                  <span>Filtros Avanzados</span>
                  <ChevronRight size={16} className={`${styles.chevron} ${showFilters ? styles.rotated : ''}`} />
                </button>

                {showFilters && (
                  <div className={styles.advancedFilters}>
                    <div className={styles.filterGrid}>
                      {renderDynamicFilters()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Categorías Rápidas */}
          <div className={styles.categoriesSection}>
            <h3 className={styles.categoriesTitle}>Explorar por Categoría</h3>
            <div className={styles.categoriesGrid}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.categoryCard} ${
                    searchType === category.id ? styles.categoryActive : ''
                  }`}
                  onClick={() => setSearchType(category.id)}
                >
                  <div className={styles.categoryIconWrapper}>
                    <div className={styles.categoryIcon}>{category.icon}</div>
                    <div className={styles.categoryHalo}></div>
                  </div>
                  <div className={styles.categoryInfo}>
                    <span className={styles.categoryName}>{category.name}</span>
                    <span className={styles.categoryCount}>{category.count} disponibles</span>
                  </div>
                  <div className={styles.categoryBeam}></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Destacados */}
      <section className={styles.listingsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleWrapper}>
              <CurrentIcon size={24} className={styles.sectionIcon} />
              <h2 className={styles.sectionTitle}>
                {searchTypes[searchType]?.name} <span className={styles.titleHighlight}>Destacados</span>
              </h2>
            </div>
            <p className={styles.sectionSubtitle}>
              Talentos y oportunidades seleccionados por nuestra comunidad
            </p>
          </div>
          
          <div className={styles.listingsGrid}>
            {(featuredListings[searchType] || []).map((listing) => (
              <div key={listing.id} className={styles.listingCard}>
                <div className={styles.listingHologram}></div>
                <div className={styles.listingImage}>
                  {listing.image}
                  <div className={styles.listingGlow}></div>
                  <button className={styles.favoriteButton}>
                    <Heart size={20} />
                  </button>
                </div>
                <div className={styles.listingContent}>
                  <div className={styles.listingHeader}>
                    <div className={styles.listingRating}>
                      <Star size={14} fill="currentColor" />
                      <span>{listing.rating}</span>
                      <span className={styles.reviews}>({listing.reviews})</span>
                    </div>
                    {listing.discipline && (
                      <div className={styles.listingDiscipline}>
                        {listing.discipline}
                      </div>
                    )}
                    <div className={styles.listingPulse}></div>
                  </div>
                  <h3 className={styles.listingTitle}>{listing.title}</h3>
                  <p className={styles.listingLocation}>
                    <MapPin size={14} />
                    {listing.location}
                  </p>
                  <p className={styles.listingDetails}>{listing.details}</p>
                  <div className={styles.listingFooter}>
                    <div className={styles.listingPrice}>
                      <span className={styles.price}>{listing.price}</span>
                      <span className={styles.period}>/{listing.period}</span>
                    </div>
                    <div className={styles.listingActions}>
                      <button className={styles.viewButton}>
                        <Eye size={16} />
                        Ver
                      </button>
                      <button className={styles.connectButton}>
                        <span>Conectar</span>
                        <ChevronRight size={16} />
                        <div className={styles.buttonOrb}></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statOrb}></div>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statParticles}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Experiencias <span className={styles.titleHighlight}>Reales</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Lo que nuestra comunidad artística dice sobre nosotros
            </p>
          </div>
          
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={styles.testimonialCard}>
                <div className={styles.testimonialHologram}></div>
                <div className={styles.testimonialType}>{testimonial.type}</div>
                <div className={styles.testimonialContent}>
                  <div className={styles.quoteOrb}></div>
                  <p className={styles.testimonialText}>"{testimonial.content}"</p>
                </div>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorHalo}></div>
                  <div className={styles.authorInfo}>
                    <h4 className={styles.authorName}>{testimonial.name}</h4>
                    <p className={styles.authorRole}>{testimonial.role}</p>
                  </div>
                  <div className={styles.testimonialRating}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Llamada a la Acción */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaHologram}></div>
          <div className={styles.ctaContent}>
            <div className={styles.ctaBadge}>
              <Zap size={16} />
              <span>Únete a la Revolución</span>
            </div>
            <h2 className={styles.ctaTitle}>
              Forma Parte del <span className={styles.titleHighlight}>Ecosistema</span> Artístico
            </h2>
            <p className={styles.ctaDescription}>
              Donde cada conexión es una oportunidad creativa. 
              Tecnología avanzada al servicio del arte y la cultura.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/register" className={styles.ctaButtonPrimary}>
                <span>Crear Perfil Artístico</span>
                <ChevronRight size={20} />
                <div className={styles.ctaOrb}></div>
              </Link>
              <Link href="/explore" className={styles.ctaButtonSecondary}>
                <span>Explorar Talento</span>
                <div className={styles.portalGlow}></div>
              </Link>
            </div>
          </div>
          <div className={styles.ctaFeatures}>
            <div className={styles.feature}>
              <Shield className={styles.featureIcon} />
              <span>Portfolio Seguro</span>
            </div>
            <div className={styles.feature}>
              <Clock className={styles.featureIcon} />
              <span>Gestión de Agenda</span>
            </div>
            <div className={styles.feature}>
              <Sparkles className={styles.featureIcon} />
              <span>Recomendaciones IA</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}