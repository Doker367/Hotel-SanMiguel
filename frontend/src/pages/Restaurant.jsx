import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FadeIn, ScrollReveal, StaggerContainer, StaggerItem } from '../components/Animations.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import api from '../services/api.js';

export default function Restaurant() {
  const [menu, setMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Desayunos');

  useEffect(() => {
    api.get('/restaurant/menu')
      .then(res => setMenu(res.data))
      .catch(() => setMenu({}))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    { key: 'Desayunos', label: 'Desayunos', icon: '🌅' },
    { key: 'Comidas', label: 'Comidas', icon: '🍽️' },
    { key: 'Bebidas', label: 'Bebidas', icon: '🍹' },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center bg-stone-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920"
            alt="Restaurante El Patio"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 to-stone-900/80" />
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl px-6">
          <FadeIn>
            <span className="text-xs tracking-[0.3em] uppercase text-primary-light mb-4 block">
              Gastronomía del corazón
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
              Restaurante El Patio
            </h1>
            <p className="font-serif text-lg text-white/70 italic mb-6">
              "Donde cada platillo cuenta una historia de la tierra mexicana"
            </p>
            <p className="text-white/60 max-w-xl mx-auto">
              Cocina regional honesta, preparada con amor y los mejores ingredientes 
              de productores locales que conocemos por nombre.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <span className="text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
                Nuestra filosofía
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-6">
                De la milpa a tu mesa
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                En El Patio cocinamos como lo hacían nuestras abuelas: con paciencia, 
                con cariño y con ingredientes que respetan la tierra. Trabajamos directamente 
                con pequeños productores del Bajío que comparten nuestra pasión por la calidad.
              </p>
              <p className="text-stone-600 leading-relaxed mb-8">
                Nuestro chef, formado entre las cocinas de Oaxaca y las haciendas de Guanajuato, 
                interpreta las recetas de siempre con un toque personal. Aquí no encontrarás 
                cocina fusion ni experimentos extravagantes —solo sabores auténticos que saben 
                a México de verdad.
              </p>
              <div className="grid grid-cols-3 gap-6 border-t border-stone-100 pt-8">
                <div>
                  <p className="font-serif text-3xl text-primary mb-1">100%</p>
                  <p className="text-xs text-stone-500 uppercase tracking-wider">Ingredientes<br />locales</p>
                </div>
                <div>
                  <p className="font-serif text-3xl text-primary mb-1">15</p>
                  <p className="text-xs text-stone-500 uppercase tracking-wider">Productores<br />aliados</p>
                </div>
                <div>
                  <p className="font-serif text-3xl text-primary mb-1">0</p>
                  <p className="text-xs text-stone-500 uppercase tracking-wider">Conservadores<br />artificiales</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
                  alt="Platillo tradicional"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 -z-10" />
                <div className="absolute bottom-4 right-4 bg-white p-4 shadow-lg max-w-xs">
                  <p className="text-sm text-stone-600 italic">
                    "Cada mañana, Don Refugio nos trae sus tomates, Doña Chayo sus hierbas, 
                    y Don Memo su queso fresco. Ellos son parte de nuestra familia."
                  </p>
                  <p className="text-xs text-primary mt-2">— Chef Ricardo</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-24 bg-cream">
        <div className="container">
          <ScrollReveal>
            <SectionHeader 
              title="La Carta" 
              subtitle="Platillos que celebran la cocina tradicional mexicana" 
            />
          </ScrollReveal>

          {/* Category Tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((cat) => (
                <motion.button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-8 py-3 text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === cat.key
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white p-8 md:p-12 shadow-soft">
                <h3 className="font-serif text-2xl text-center mb-2 text-stone-800">
                  {activeCategory}
                </h3>
                <p className="text-center text-sm text-stone-500 mb-8 pb-6 border-b border-stone-100">
                  {activeCategory === 'Desayunos' && 'Servidos de 7:00 a 11:00 am · Incluye café o té'}
                  {activeCategory === 'Comidas' && 'Servidas de 13:00 a 17:00 · Acompañados de tortillas recién hechas'}
                  {activeCategory === 'Bebidas' && 'Preparadas con ingredientes frescos del día'}
                </p>
                <div className="space-y-6">
                  {(menu[activeCategory] || []).map((item, index) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex justify-between items-start group"
                    >
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <h4 className="font-medium text-stone-800 group-hover:text-primary transition-colors">
                            {item.name}
                          </h4>
                          <div className="flex-grow border-b border-dotted border-stone-300 mx-2" />
                          <span className="font-serif text-lg text-primary whitespace-nowrap">
                            ${item.priceMXN}
                          </span>
                        </div>
                        <p className="text-sm text-stone-500 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {(menu[activeCategory] || []).length === 0 && (
                  <p className="text-center text-stone-400 py-8">
                    Menú no disponible en este momento
                  </p>
                )}
              </div>
            </motion.div>
          )}
          
          <ScrollReveal>
            <p className="text-center text-sm text-stone-500 mt-8">
              🌱 Pregunta por nuestras opciones vegetarianas y veganas · 
              🌾 Podemos adaptar platillos para alergias
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Special Note */}
      <section className="py-16 bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <span className="text-4xl mb-4 block">☕</span>
              <h3 className="font-serif text-2xl text-stone-800 mb-4">
                El desayuno está incluido en tu estancia
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Cada mañana te espera un desayuno completo preparado con ingredientes frescos. 
                Puedes elegir de nuestra carta o dejarte sorprender por el especial del día. 
                Y el café... es de altura de Coatepec, tostado artesanalmente.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Hours & Reservations */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            <ScrollReveal direction="left">
              <span className="text-xs tracking-[0.3em] uppercase text-primary-light mb-4 block">
                Te esperamos
              </span>
              <h3 className="font-serif text-3xl mb-8">Horarios</h3>
              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="block">Desayuno</span>
                    <span className="text-xs text-white/50">Incluido para huéspedes</span>
                  </div>
                  <span className="text-primary-light font-medium">7:00 - 11:00</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="block">Comida</span>
                    <span className="text-xs text-white/50">Abierto al público</span>
                  </div>
                  <span className="text-primary-light font-medium">13:00 - 17:00</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="block">Cena</span>
                    <span className="text-xs text-white/50">Jueves a sábado</span>
                  </div>
                  <span className="text-primary-light font-medium">19:00 - 22:00</span>
                </div>
              </div>
              <p className="text-white/50 text-sm mt-6">
                * La cena se sirve únicamente de jueves a sábado o con reservación previa
              </p>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="bg-white/5 p-8 text-center backdrop-blur-sm">
                <span className="text-4xl mb-4 block">🍷</span>
                <h4 className="font-serif text-xl mb-4">Reservaciones</h4>
                <p className="text-white/60 text-sm mb-6">
                  Para grupos de 6 o más personas, cenas privadas o eventos especiales, 
                  recomendamos reservar con anticipación.
                </p>
                <a
                  href={`tel:${(import.meta.env.VITE_HOTEL_PHONE || '+52 (415) 123-4567').replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary/90 transition-all duration-300 mb-4"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {import.meta.env.VITE_HOTEL_PHONE || '+52 (415) 123-4567'}
                </a>
                <p className="text-xs text-white/40">
                  O escríbenos por WhatsApp
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="font-serif text-2xl text-stone-800 mb-4">
                ¿Tienes alguna solicitud especial?
              </h3>
              <p className="text-stone-600 mb-6">
                Celebraciones, menús personalizados, cenas románticas... cuéntanos qué necesitas 
                y haremos lo posible por hacerlo realidad.
              </p>
              <Link
                to="/hotel-sanmiguel/contacto"
                className="inline-block px-8 py-4 bg-primary text-white uppercase tracking-wider text-sm hover:bg-primary/90 transition-all"
              >
                Contáctanos
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
