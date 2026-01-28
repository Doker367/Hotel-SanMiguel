import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useParallax } from '../hooks/useScroll.js';
import { ScrollReveal, FadeIn, StaggerContainer, StaggerItem } from '../components/Animations.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

export default function Home() {
  const parallaxOffset = useParallax(0.3);

  return (
    <main>
      {/* Hero Section with Parallax */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 w-full h-[120%]"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <img
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920"
            alt="Hotel colonial en pueblo mágico"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-white max-w-3xl px-6"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-primary-light mb-6 block">
              San Miguel de Allende · Pueblo Mágico
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
              Donde el tiempo se detiene<br />
              <span className="text-primary-light">para que tú descanses</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
              Un hotel boutique que celebra la tradición mexicana, el confort moderno 
              y la calidez de un hogar lejos de casa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/hotel-sanmiguel/reservaciones" className="btn-primary text-base px-8 py-4">
                Reservar mi estancia
              </Link>
              <Link to="/hotel-sanmiguel/habitaciones" className="btn-outline border-white text-white hover:bg-white hover:text-stone-800 text-base px-8 py-4">
                Explorar habitaciones
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
        >
          <span className="text-white/60 text-xs uppercase tracking-[0.2em] block mb-3">Descubrir más</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent mx-auto"
          />
        </motion.div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block">
                  Bienvenido a Casa del Sol
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-800 mb-8 leading-tight">
                  Más que un hotel,<br />un abrazo que te recibe
                </h2>
                <p className="text-stone-600 text-lg leading-relaxed max-w-2xl mx-auto">
                  Aquí no eres un número de habitación. Eres nuestro invitado, y queremos 
                  que cada momento de tu estancia se sienta como llegar a casa después 
                  de un largo viaje.
                </p>
              </div>
            </ScrollReveal>

            {/* Philosophy Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              <ScrollReveal delay={0}>
                <div className="text-center p-8 bg-cream rounded-sm">
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl text-stone-800 mb-3">Hospitalidad genuina</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    Nuestro equipo te recibe con una sonrisa sincera y el café recién hecho. 
                    Conocemos tu nombre, tus preferencias y cómo te gusta despertar.
                  </p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.1}>
                <div className="text-center p-8 bg-cream rounded-sm">
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl text-stone-800 mb-3">Ritmo pausado</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    Aquí no hay prisa. Desayuna hasta tarde, toma una siesta en el patio, 
                    piérdete en un libro. El tiempo es tuyo para disfrutarlo.
                  </p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <div className="text-center p-8 bg-cream rounded-sm">
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl text-stone-800 mb-3">Detalles con alma</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    Flores frescas en tu habitación, jabones artesanales, textiles tejidos 
                    a mano. Cada detalle cuenta una historia de México.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-stone-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
                  alt="Patio colonial con fuente"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute -bottom-8 -right-8 w-2/3 aspect-[4/3] hidden lg:block">
                  <img
                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600"
                    alt="Detalle de habitación"
                    className="w-full h-full object-cover border-8 border-white shadow-xl"
                  />
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right">
              <div className="lg:pl-8">
                <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block">
                  La experiencia Casa del Sol
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-6 leading-tight">
                  ¿Qué hace especial una estancia con nosotros?
                </h2>
                
                <div className="space-y-6 mb-10">
                  <p className="text-stone-600 leading-relaxed">
                    <strong className="text-stone-800">Despertarás con el aroma del café de Veracruz</strong> 
                    {' '}mientras los pájaros cantan en el jardín. Tu desayuno te espera en el 
                    patio, junto a la fuente de cantera que ha estado aquí por más de un siglo.
                  </p>
                  <p className="text-stone-600 leading-relaxed">
                    <strong className="text-stone-800">Caminarás por calles empedradas</strong> hacia 
                    talleres de artesanos, galerías de arte y mercados llenos de color. 
                    Regresarás al hotel y encontrarás tu habitación lista para la siesta.
                  </p>
                  <p className="text-stone-600 leading-relaxed">
                    <strong className="text-stone-800">Al atardecer</strong>, un mezcal te esperará 
                    en la terraza mientras el sol pinta el cielo de naranjas y rosas sobre 
                    los techos de teja.
                  </p>
                </div>

                <Link 
                  to="/hotel-sanmiguel/historia" 
                  className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300 font-medium"
                >
                  Conoce nuestra historia
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container">
          <ScrollReveal>
            <SectionHeader 
              title="Descubre Casa del Sol" 
              subtitle="Cada rincón de nuestro hotel ha sido pensado para tu bienestar"
            />
          </ScrollReveal>
          
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title="Historia"
              description="Una casona del siglo XIX restaurada con amor y respeto por la tradición"
              to="/hotel-sanmiguel/historia"
              image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
            />
            <FeatureCard
              title="Habitaciones"
              description="12 habitaciones únicas, cada una con su propia personalidad"
              to="/hotel-sanmiguel/habitaciones"
              image="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"
            />
            <FeatureCard
              title="Bienestar"
              description="Spa, yoga en la terraza y tratamientos con ingredientes locales"
              to="/hotel-sanmiguel/servicios"
              image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800"
            />
            <FeatureCard
              title="Gastronomía"
              description="Cocina regional que celebra los sabores del Bajío mexicano"
              to="/hotel-sanmiguel/restaurante"
              image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
            />
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-cream">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <svg className="w-12 h-12 text-primary/30 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <blockquote className="font-serif text-2xl md:text-3xl text-stone-700 leading-relaxed mb-8">
                "Llegamos como huéspedes y nos fuimos sintiéndonos parte de una familia. 
                Casa del Sol no es solo un lugar donde dormir, es una experiencia que 
                se queda en el corazón."
              </blockquote>
              <div>
                <p className="font-medium text-stone-800">María Elena y Roberto</p>
                <p className="text-sm text-stone-500">Ciudad de México · Febrero 2026</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <span className="text-xs uppercase tracking-[0.3em] text-primary-light mb-4 block">
                Ubicación privilegiada
              </span>
              <h2 className="font-serif text-3xl md:text-4xl mb-6 leading-tight">
                En el corazón de San Miguel de Allende
              </h2>
              <p className="text-white/70 leading-relaxed mb-8">
                A solo dos cuadras del Jardín Principal y la icónica Parroquia, nuestro 
                hotel te pone a pasos de todo lo que hace mágico a este pueblo: galerías, 
                restaurantes, tiendas de artesanías y siglos de historia.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="border-l-2 border-primary pl-4">
                  <p className="font-serif text-2xl text-white">2 min</p>
                  <p className="text-white/60 text-sm">al Jardín Principal</p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <p className="font-serif text-2xl text-white">5 min</p>
                  <p className="text-white/60 text-sm">al Mercado de Artesanías</p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <p className="font-serif text-2xl text-white">1 hr</p>
                  <p className="text-white/60 text-sm">desde Aeropuerto BJX</p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <p className="font-serif text-2xl text-white">3 hrs</p>
                  <p className="text-white/60 text-sm">desde CDMX</p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right">
              <div className="aspect-square bg-stone-800 rounded-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800"
                  alt="San Miguel de Allende"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920"
            alt="Vista del hotel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 to-stone-900/70" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-xl">
            <ScrollReveal>
              <span className="text-xs uppercase tracking-[0.3em] text-primary-light mb-4 block">
                Tu próxima escapada
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
                Empieza a crear recuerdos inolvidables
              </h2>
              <p className="text-white/70 mb-10 text-lg leading-relaxed">
                Reserva directamente con nosotros y recibe un upgrade de cortesía, 
                desayuno incluido y late checkout cuando esté disponible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/hotel-sanmiguel/reservaciones" className="btn-primary text-base px-8 py-4">
                  Reservar ahora
                </Link>
                <Link to="/hotel-sanmiguel/contacto" className="btn-outline border-white text-white hover:bg-white hover:text-stone-800 text-base px-8 py-4">
                  Contactarnos
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, description, to, image }) {
  return (
    <StaggerItem>
      <Link to={to} className="group block">
        <div className="relative overflow-hidden aspect-[3/4] mb-5">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-serif text-xl text-white mb-2 group-hover:text-primary-light transition-colors">
              {title}
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">{description}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all duration-300">
          Descubrir
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </Link>
    </StaggerItem>
  );
}
