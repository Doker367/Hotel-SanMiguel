import { ScrollReveal, FadeIn } from '../components/Animations.jsx';

export default function History() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center bg-stone-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920"
            alt="Arquitectura colonial"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 to-stone-900/70" />
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl px-6">
          <FadeIn>
            <span className="text-xs tracking-[0.3em] uppercase text-primary-light mb-4 block">
              Nuestra historia
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Una casa con alma
            </h1>
            <p className="text-lg text-white/70 max-w-xl mx-auto">
              Más de un siglo de muros que guardan historias, risas y sueños
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
                  alt="Fachada histórica del hotel"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 hidden md:block">
                  <p className="font-serif text-4xl">1892</p>
                  <p className="text-xs uppercase tracking-wider">Año de construcción</p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block">
                  Los orígenes
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-8 leading-tight">
                  Todo comenzó con un sueño de cantera rosa
                </h2>
                
                <div className="space-y-6 text-stone-600 leading-relaxed">
                  <p>
                    En 1892, don Aurelio Mendoza —un comerciante de textiles que se enamoró 
                    de San Miguel durante una visita de negocios— decidió construir aquí la 
                    casa de sus sueños. Contrató a los mejores canteros de la región y tardó 
                    tres años en completar lo que hoy conocemos como Casa del Sol.
                  </p>
                  <p>
                    La leyenda cuenta que don Aurelio eligió el nombre porque el patio 
                    central recibe los primeros rayos del sol cada mañana, un espectáculo 
                    que él contemplaba religiosamente con su café en mano.
                  </p>
                  <p>
                    Durante generaciones, la casa fue hogar de la familia Mendoza. Aquí 
                    se celebraron bodas, bautizos y cenas navideñas que reunían a todo el 
                    pueblo. Los vecinos aún recuerdan el aroma del mole negro que salía 
                    de su cocina en días de fiesta.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline Quote */}
      <section className="py-20 bg-cream">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <svg className="w-10 h-10 text-primary/30 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <blockquote className="font-serif text-2xl md:text-3xl text-stone-700 leading-relaxed italic">
                "Las paredes de una casa son como las páginas de un diario. 
                Guardan cada risa, cada lágrima, cada abrazo."
              </blockquote>
              <p className="text-stone-500 mt-6">— Doña Carmen Mendoza, última heredera de la familia</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Transformation Story */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left" className="order-2 lg:order-1">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block">
                  Un nuevo capítulo
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-8 leading-tight">
                  De casa familiar a refugio para viajeros
                </h2>
                
                <div className="space-y-6 text-stone-600 leading-relaxed">
                  <p>
                    En 2018, cuando doña Carmen decidió que la casa merecía una nueva 
                    vida, buscó a alguien que la amara tanto como ella. Encontró a 
                    Sofía y Miguel, una pareja de arquitectos restauradores que se 
                    especializan en preservar edificios históricos.
                  </p>
                  <p>
                    Durante dos años, trabajaron codo a codo con artesanos locales: 
                    los mismos herreros que forjaron las ventanas originales, los 
                    descendientes de los canteros que tallaron las columnas del patio. 
                    Cada baldosa fue limpiada a mano, cada viga de madera tratada con 
                    técnicas ancestrales.
                  </p>
                  <p>
                    Hoy, Casa del Sol abre sus puertas como un hotel boutique de 
                    12 habitaciones, pero conserva intacto su espíritu de hogar. 
                    Doña Carmen aún nos visita cada domingo para tomar café en 
                    "su" banca del jardín.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right" className="order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600"
                  alt="Detalle de cantera restaurada"
                  className="w-full aspect-square object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600"
                  alt="Patio interior"
                  className="w-full aspect-square object-cover mt-8"
                />
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600"
                  alt="Escalera colonial"
                  className="w-full aspect-square object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600"
                  alt="Herrería original"
                  className="w-full aspect-square object-cover mt-8"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.3em] text-primary-light mb-4 block">
                Nuestra filosofía
              </span>
              <h2 className="font-serif text-3xl md:text-4xl mb-4">
                Lo que nos guía cada día
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                No somos un hotel más. Somos guardianes de una historia que ahora 
                te incluye a ti.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-12">
            <ScrollReveal delay={0}>
              <div className="text-center">
                <div className="w-16 h-16 border border-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl mb-4">Autenticidad</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Cada mueble, cada textil, cada obra de arte cuenta una historia real. 
                  No hay réplicas aquí, solo piezas con alma creadas por manos mexicanas.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="text-center">
                <div className="w-16 h-16 border border-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl mb-4">Comunidad</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Trabajamos con 40 familias de artesanos, agricultores y productores 
                  locales. Tu estancia apoya directamente a la economía de San Miguel.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="text-center">
                <div className="w-16 h-16 border border-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl mb-4">Sostenibilidad</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Energía solar, huerto orgánico y cero plásticos de un solo uso. 
                  Cuidamos la casa para que siga aquí otros 130 años.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cream">
        <div className="container text-center">
          <ScrollReveal>
            <h2 className="font-serif text-2xl md:text-3xl text-stone-800 mb-4">
              Ahora esta historia también es tuya
            </h2>
            <p className="text-stone-600 mb-8 max-w-lg mx-auto">
              Ven a escribir tu propio capítulo en Casa del Sol
            </p>
            <a
              href="/reservaciones"
              className="inline-block px-8 py-4 bg-primary text-white uppercase tracking-wider text-sm hover:bg-primary/90 transition-all"
            >
              Reservar mi estancia
            </a>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
