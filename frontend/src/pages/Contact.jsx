import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FadeIn, ScrollReveal } from '../components/Animations.jsx';
import api from '../services/api.js';

const contactInfo = [
  {
    title: 'Nuestra dirección',
    content: [
      import.meta.env.VITE_HOTEL_ADDRESS?.split(', ')[0] || 'Calle Aldama 12, Centro Histórico',
      import.meta.env.VITE_HOTEL_ADDRESS?.split(', ').slice(1).join(', ') || 'San Miguel de Allende, Gto. 37700, México'
    ].filter(Boolean),
    extra: 'A dos cuadras del Jardín Principal',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Llámanos',
    content: [import.meta.env.VITE_HOTEL_PHONE || '+52 (415) 123-4567'],
    extra: 'WhatsApp disponible',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: 'Escríbenos',
    content: [import.meta.env.VITE_HOTEL_EMAIL || 'reservas@casadelsol.mx'],
    extra: 'Respuesta en menos de 24 horas',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Horarios',
    content: ['Recepción 24 horas', 'Check-in: 15:00', 'Check-out: 12:00'],
    extra: 'Siempre hay alguien disponible',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const faqs = [
  {
    question: '¿Incluye desayuno?',
    answer: 'Sí, todos nuestros huéspedes disfrutan de un desayuno completo incluido, servido de 7:00 a 11:00 am.',
  },
  {
    question: '¿Hay estacionamiento?',
    answer: 'Tenemos convenio con estacionamiento público a 100 metros del hotel. El costo es de $50 MXN por día.',
  },
  {
    question: '¿Reciben mascotas?',
    answer: 'Con mucho gusto recibimos a sus compañeros de cuatro patas por un costo adicional de $200 MXN por noche.',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!form.email.trim()) newErrors.email = 'El email es obligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email inválido';
    if (!form.message.trim()) newErrors.message = 'El mensaje es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(err => ({ ...err, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus({ loading: true, success: null, error: null });
    try {
      const res = await api.post('/contact', form);
      if (res.data?.success) {
        setStatus({ 
          loading: false, 
          success: '¡Mensaje enviado! Nos pondremos en contacto contigo muy pronto. Gracias por considerarnos para tu próxima estancia.', 
          error: null 
        });
        setForm({ name: '', email: '', phone: '', message: '' });
      }
    } catch (err) {
      const message = err.response?.data?.error || 'Algo salió mal. Por favor intenta de nuevo o llámanos directamente.';
      setStatus({ loading: false, success: null, error: message });
    }
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-stone-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920"
            alt="Recepción Casa del Sol"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/30 to-stone-900/80" />
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl px-6">
          <FadeIn>
            <span className="text-xs tracking-[0.3em] uppercase text-primary-light mb-4 block">
              Nos encanta conocerte
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Hablemos
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Ya sea para una reservación, una pregunta sobre nuestros servicios, 
              o simplemente para contar una solicitud especial, estamos aquí para escucharte.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-cream">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="left">
                <div className="bg-white p-8 md:p-12 shadow-soft">
                  <span className="text-xs tracking-[0.3em] uppercase text-primary mb-2 block">
                    Cuéntanos
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl text-stone-800 mb-2">
                    ¿En qué podemos ayudarte?
                  </h2>
                  <p className="text-stone-500 mb-8">
                    Queremos que tu estancia sea perfecta. Comparte con nosotros cualquier 
                    duda, solicitud especial o simplemente salúdanos —nos encanta conocer 
                    a nuestros futuros huéspedes.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-stone-600 mb-2">¿Cómo te llamas? *</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border ${errors.name ? 'border-red-400' : 'border-stone-200'} focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all`}
                          placeholder="Tu nombre completo"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm text-stone-600 mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border ${errors.email ? 'border-red-400' : 'border-stone-200'} focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all`}
                          placeholder="tu@correo.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-stone-600 mb-2">Teléfono (opcional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-stone-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="+52 555 123 4567"
                      />
                      <p className="text-xs text-stone-400 mt-1">Por si prefieres que te llamemos</p>
                    </div>

                    <div>
                      <label className="block text-sm text-stone-600 mb-2">¿Qué quieres contarnos? *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full px-4 py-3 border ${errors.message ? 'border-red-400' : 'border-stone-200'} focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none`}
                        placeholder="Fechas de tu visita, número de huéspedes, solicitudes especiales, preguntas sobre el hotel, o cualquier cosa que quieras compartir con nosotros..."
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={status.loading}
                      className="w-full py-4 bg-primary text-white uppercase tracking-wider text-sm hover:bg-primary/90 transition-all disabled:bg-stone-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status.loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Enviando mensaje...
                        </>
                      ) : (
                        <>
                          ✨ Enviar mensaje
                        </>
                      )}
                    </button>

                    <AnimatePresence>
                      {status.error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-600 text-sm text-center p-4 bg-red-50 border border-red-200 rounded"
                        >
                          <span className="font-medium">Ups... </span>
                          {status.error}
                        </motion.div>
                      )}
                      {status.success && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-green-700 text-sm text-center p-4 bg-green-50 border border-green-200 rounded"
                        >
                          <span className="font-medium">¡Perfecto! </span>
                          {status.success}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </ScrollReveal>
            </div>

            {/* Info */}
            <div className="lg:col-span-2">
              <ScrollReveal direction="right">
                <div className="space-y-6 mb-8">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white p-6 shadow-soft flex gap-4 hover:shadow-lg transition-shadow"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm uppercase tracking-wider text-primary mb-1 font-medium">
                          {info.title}
                        </h3>
                        {info.content.map((line, i) => (
                          <p key={i} className="text-stone-700 leading-relaxed">{line}</p>
                        ))}
                        <p className="text-xs text-stone-400 mt-1">{info.extra}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 shadow-soft mb-6">
                  <h3 className="font-medium text-stone-800 mb-4">Acceso rápido</h3>
                  <div className="space-y-3">
                    <a
                      href="https://wa.me/524151234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 transition-colors rounded text-sm"
                    >
                      <span>📱</span>
                      <span>WhatsApp</span>
                    </a>
                    <Link
                      to="/hotel-sanmiguel/reservaciones"
                      className="flex items-center gap-3 p-3 bg-primary/5 hover:bg-primary/10 transition-colors rounded text-sm"
                    >
                      <span>🗓️</span>
                      <span>Hacer reservación</span>
                    </Link>
                  </div>
                </div>

                {/* Map */}
                <div className="aspect-video bg-stone-100 overflow-hidden shadow-soft rounded-lg">
                  <iframe
                    title="Casa del Sol - San Miguel de Allende"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.3!2d-100.745!3d20.914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDU0JzUwLjQiTiAxMDDCsDQ0JzQyLjAiVw!5e0!3m2!1ses!2smx!4v1700000000000"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
                Preguntas frecuentes
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-6">
                Todo lo que necesitas saber
              </h2>
            </div>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="bg-cream p-6 border-l-4 border-primary">
                  <h3 className="font-medium text-stone-800 mb-2">{faq.question}</h3>
                  <p className="text-stone-600 leading-relaxed">{faq.answer}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="container text-center">
          <ScrollReveal>
            <span className="text-4xl mb-6 block">🌟</span>
            <h2 className="font-serif text-2xl md:text-3xl mb-4">
              ¿Listo para crear recuerdos inolvidables?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              La magia de San Miguel de Allende te está esperando. 
              Reserva ahora y vive la experiencia Casa del Sol.
            </p>
            <Link
              to="/hotel-sanmiguel/reservaciones"
              className="inline-block px-8 py-4 bg-primary text-white uppercase tracking-wider text-sm hover:bg-primary/90 transition-all"
            >
              Hacer reservación
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
