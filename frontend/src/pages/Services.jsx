import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FadeIn, ScrollReveal } from '../components/Animations.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import api from '../services/api.js';

// Service categories with icons
const serviceCategories = {
  bienestar: {
    title: 'Bienestar',
    subtitle: 'Renueva cuerpo y mente',
    icon: '🧘',
    services: ['Spa Xochitl', 'Yoga al amanecer', 'Alberca y jardín']
  },
  confort: {
    title: 'Confort',
    subtitle: 'Todo para tu comodidad',
    icon: '🛎️',
    services: ['WiFi de cortesía', 'Desayuno incluido', 'Traslados']
  },
  experiencias: {
    title: 'Experiencias',
    subtitle: 'Descubre San Miguel',
    icon: '🎨',
    services: ['Tours y experiencias', 'Restaurante El Patio']
  }
};

const experiences = [
  {
    title: 'Talleres de artesanías',
    description: 'Aprende a hacer papel picado, pintar talavera o tejer en telar de cintura con maestros artesanos de la región.',
    image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600',
  },
  {
    title: 'Ruta del vino',
    description: 'Visita los viñedos de la región, conoce el proceso de elaboración y disfruta una cata maridada con quesos locales.',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600',
  },
  {
    title: 'Clase de cocina mexicana',
    description: 'Acompaña a nuestro chef al mercado, selecciona los ingredientes y aprende a preparar platillos tradicionales.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600',
  },
  {
    title: 'Paseo en globo',
    description: 'Contempla los viñedos y la campiña guanajuatense desde las alturas al amanecer. Una experiencia inolvidable.',
    image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=600',
  },
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/services')
      .then(res => setServices(res.data))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  // Group services by category
  const getServicesByCategory = (categoryServices) => {
    return services.filter(s => categoryServices.includes(s.name));
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center bg-stone-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920"
            alt="Spa y bienestar"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 to-stone-900/80" />
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl px-6">
          <FadeIn>
            <span className="text-xs tracking-[0.3em] uppercase text-primary-light mb-4 block">
              Tu bienestar es nuestra prioridad
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Servicios & Experiencias
            </h1>
            <p className="text-lg text-white/70 max-w-xl mx-auto">
              Desde un masaje relajante hasta una aventura en globo, 
              tenemos todo para hacer de tu estancia algo extraordinario.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-24 bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block">
                A tu servicio
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-6">
                Lo que incluye tu estancia
              </h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                Queremos que te preocupes solo por descansar. Por eso, hemos pensado 
                en cada detalle para que tu experiencia sea perfecta.
              </p>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(serviceCategories).map(([key, category], categoryIndex) => (
                <ScrollReveal key={key} delay={categoryIndex * 0.1}>
                  <div className="bg-cream p-8 h-full">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="font-serif text-2xl text-stone-800 mb-2">{category.title}</h3>
                    <p className="text-stone-500 text-sm mb-6">{category.subtitle}</p>
                    <ul className="space-y-4">
                      {getServicesByCategory(category.services).map((service) => (
                        <li key={service._id} className="border-b border-stone-200 pb-4 last:border-0 last:pb-0">
                          <h4 className="font-medium text-stone-800 mb-1">{service.name}</h4>
                          <p className="text-sm text-stone-500 leading-relaxed">{service.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Spa Section */}
      <section className="py-24 bg-stone-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800"
                  alt="Spa Xochitl"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 -z-10" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <span className="text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
                Spa Xochitl
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-6">
                Rituales de bienestar
              </h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                Nuestro spa toma su nombre de la palabra náhuatl para "flor". Aquí, 
                cada tratamiento es una celebración de los ingredientes que la tierra 
                mexicana nos regala.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center pb-3 border-b border-stone-200">
                  <div>
                    <h4 className="font-medium text-stone-800">Masaje relajante</h4>
                    <p className="text-sm text-stone-500">60 min · Aceites esenciales de copal</p>
                  </div>
                  <span className="font-serif text-primary">$1,200</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-stone-200">
                  <div>
                    <h4 className="font-medium text-stone-800">Facial de miel de agave</h4>
                    <p className="text-sm text-stone-500">45 min · Hidratación profunda</p>
                  </div>
                  <span className="font-serif text-primary">$950</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-stone-200">
                  <div>
                    <h4 className="font-medium text-stone-800">Ritual de chocolate</h4>
                    <p className="text-sm text-stone-500">90 min · Exfoliación + masaje + facial</p>
                  </div>
                  <span className="font-serif text-primary">$2,400</span>
                </div>
              </div>
              <Link 
                to="/hotel-sanmiguel/contacto" 
                className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
              >
                Reservar tratamiento
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              light
              title="Experiencias que transforman"
              subtitle="Actividades diseñadas para que conozcas la verdadera esencia de San Miguel"
            />
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-xl mb-2">{exp.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <ScrollReveal>
            <div className="text-center mt-12">
              <p className="text-white/60 mb-6">
                Pregunta en recepción por disponibilidad y precios
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cream">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-2xl md:text-3xl text-stone-800 mb-4">
                ¿Tienes algo especial en mente?
              </h2>
              <p className="text-stone-600 mb-8">
                Si buscas algo que no ves aquí —una cena privada bajo las estrellas, 
                una serenata para tu pareja, un tour personalizado— solo cuéntanos. 
                Nos encanta hacer realidad los sueños de nuestros huéspedes.
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
