import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FadeIn, ScrollReveal, StaggerContainer, StaggerItem } from '../components/Animations.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import RoomCard from '../components/RoomCard.jsx';
import api from '../services/api.js';

const amenities = [
  { name: 'WiFi de alta velocidad', icon: '📶' },
  { name: 'Aire acondicionado', icon: '❄️' },
  { name: 'Amenidades artesanales', icon: '🧴' },
  { name: 'Room service', icon: '🍽️' },
  { name: 'Smart TV', icon: '📺' },
  { name: 'Caja de seguridad', icon: '🔐' },
  { name: 'Mini bar', icon: '🍷' },
  { name: 'Ropa de cama premium', icon: '🛏️' },
];

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/rooms')
      .then(res => setRooms(res.data))
      .catch(() => setRooms([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center bg-stone-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1920"
            alt="Habitación elegante"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 to-stone-900/70" />
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl px-6">
          <FadeIn>
            <span className="text-xs tracking-[0.3em] uppercase text-primary-light mb-4 block">
              Alojamiento
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Habitaciones
            </h1>
            <p className="text-lg text-white/70 max-w-xl mx-auto">
              12 espacios únicos donde el descanso se convierte en arte
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block">
                Tu refugio personal
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-6 leading-tight">
                Cada habitación cuenta su propia historia
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed">
                No encontrarás dos habitaciones iguales en Casa del Sol. Cada una ha sido 
                decorada con piezas de arte locales, textiles artesanales y muebles de época 
                restaurados. Lo que sí comparten: camas increíblemente cómodas, luz natural 
                abundante y ese silencio que solo encuentras en los pueblos mágicos.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-20 bg-cream">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              title="Nuestras habitaciones"
              subtitle="Encuentra el espacio perfecto para tu escapada"
            />
          </ScrollReveal>

          {loading ? (
            <div className="text-center py-16">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-stone-500">Cargando habitaciones...</p>
            </div>
          ) : (
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map(room => (
                <StaggerItem key={room._id}>
                  <RoomCard room={room} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

          <ScrollReveal>
            <div className="text-center mt-12">
              <p className="text-stone-500 mb-6">
                ¿No encuentras lo que buscas? Contáctanos para opciones personalizadas.
              </p>
              <Link 
                to="/hotel-sanmiguel/contacto" 
                className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
              >
                Hacer una consulta
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20 bg-white">
        <div className="container">
          <ScrollReveal>
            <SectionHeader 
              title="Todo lo que necesitas" 
              subtitle="Amenidades incluidas en todas las habitaciones" 
            />
          </ScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {amenities.map((amenity, i) => (
              <ScrollReveal key={amenity.name} delay={i * 0.05}>
                <div className="text-center p-6 bg-cream rounded-sm">
                  <span className="text-2xl mb-3 block">{amenity.icon}</span>
                  <p className="text-sm text-stone-600">{amenity.name}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Special Details */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <span className="text-xs uppercase tracking-[0.3em] text-primary-light mb-4 block">
                Los pequeños detalles
              </span>
              <h2 className="font-serif text-3xl md:text-4xl mb-6 leading-tight">
                Lo que hace la diferencia
              </h2>
              <div className="space-y-6 text-white/70 leading-relaxed">
                <p>
                  <strong className="text-white">Despertar con aroma a café.</strong>{' '}
                  Cada mañana, un termo de café de Veracruz recién hecho espera en tu puerta.
                </p>
                <p>
                  <strong className="text-white">Jabones que cuentan historias.</strong>{' '}
                  Nuestras amenidades son hechas a mano por doña Lupita, una jabonera 
                  de Dolores Hidalgo con 40 años de experiencia.
                </p>
                <p>
                  <strong className="text-white">Silencio que descansa.</strong>{' '}
                  Los gruesos muros de adobe y las ventanas de madera mantienen 
                  afuera el mundo exterior.
                </p>
                <p>
                  <strong className="text-white">Turndown service con mezcal.</strong>{' '}
                  Por las noches, preparamos tu habitación con una copita de mezcal 
                  artesanal y chocolate oaxaqueño.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600"
                  alt="Detalle de habitación"
                  className="w-full aspect-square object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=600"
                  alt="Amenidades artesanales"
                  className="w-full aspect-square object-cover mt-8"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container text-center">
          <ScrollReveal>
            <h2 className="font-serif text-2xl md:text-3xl mb-4">
              ¿Listo para descansar de verdad?
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Reserva directamente y obtén el mejor precio garantizado
            </p>
            <Link
              to="/hotel-sanmiguel/reservaciones"
              className="inline-block px-8 py-4 bg-white text-stone-800 uppercase tracking-wider text-sm hover:bg-white/90 transition-all"
            >
              Reservar ahora
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
