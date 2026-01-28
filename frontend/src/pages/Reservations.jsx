import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FadeIn, ScrollReveal } from '../components/Animations.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Format date to YYYY-MM-DD for input
const formatDateForInput = (date) => {
  return date.toISOString().split('T')[0];
};

// Get minimum date (today)
const getMinDate = () => {
  return formatDateForInput(new Date());
};

// Get minimum checkout date (day after checkin)
const getMinCheckout = (checkIn) => {
  const date = new Date(checkIn);
  date.setDate(date.getDate() + 1);
  return formatDateForInput(date);
};

export default function Reservations() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  // Step 1: Date selection
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  // Step 2: Room selection
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Step 3: Guest info
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Calculate nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut) - new Date(checkIn);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Fetch available rooms when dates change
  const searchRooms = async () => {
    if (!checkIn || !checkOut) {
      setError('Por favor selecciona las fechas');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`${API_URL}/reservations/available-rooms`, {
        params: { checkIn, checkOut, guests },
      });

      if (response.data.success) {
        setAvailableRooms(response.data.data);
        if (response.data.data.length === 0) {
          setError('No hay habitaciones disponibles para las fechas seleccionadas');
        } else {
          setStep(2);
        }
      }
    } catch (err) {
      setError('Error al buscar habitaciones disponibles');
    } finally {
      setLoading(false);
    }
  };

  // Submit reservation
  const submitReservation = async () => {
    if (!guestName || !email || !phone) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/reservations`, {
        roomId: selectedRoom._id,
        checkIn,
        checkOut,
        guests,
        guestName,
        email,
        phone,
        specialRequests,
      });

      if (response.data.success) {
        setSuccess(response.data.data);
        setStep(4);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la reservación');
    } finally {
      setLoading(false);
    }
  };

  // Reset checkout when checkin changes
  useEffect(() => {
    if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
      setCheckOut('');
    }
  }, [checkIn]);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-stone-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 to-stone-900/80" />
        <div className="relative z-10 text-center text-white px-4">
          <FadeIn>
            <span className="text-xs tracking-[0.3em] uppercase text-primary-light mb-4 block">
              Reserve su estancia
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
              Reservaciones
            </h1>
            <p className="text-lg text-white/70 max-w-xl mx-auto">
              Complete su reservación en simples pasos
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20 bg-cream">
        <div className="container max-w-4xl">
          {/* Progress Steps */}
          <ScrollReveal>
            <div className="flex items-center justify-center mb-12">
              {[
                { num: 1, label: 'Fechas' },
                { num: 2, label: 'Habitación' },
                { num: 3, label: 'Datos' },
                { num: 4, label: 'Confirmación' },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      step >= s.num
                        ? 'bg-primary text-white'
                        : 'bg-stone-200 text-stone-400'
                    }`}
                  >
                    {step > s.num ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      s.num
                    )}
                  </div>
                  <span
                    className={`hidden sm:block ml-2 text-sm ${
                      step >= s.num ? 'text-stone-800' : 'text-stone-400'
                    }`}
                  >
                    {s.label}
                  </span>
                  {i < 3 && (
                    <div
                      className={`w-12 sm:w-20 h-0.5 mx-2 transition-all duration-300 ${
                        step > s.num ? 'bg-primary' : 'bg-stone-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 1: Date Selection */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 md:p-12 shadow-soft"
              >
                <h2 className="font-serif text-2xl text-center mb-8">
                  Seleccione sus fechas
                </h2>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block text-sm text-stone-600 mb-2">
                      Fecha de llegada
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={getMinDate()}
                      className="w-full px-4 py-3 border border-stone-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-stone-600 mb-2">
                      Fecha de salida
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn ? getMinCheckout(checkIn) : getMinDate()}
                      disabled={!checkIn}
                      className="w-full px-4 py-3 border border-stone-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:bg-stone-50 disabled:text-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-stone-600 mb-2">
                      Huéspedes
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-stone-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'huésped' : 'huéspedes'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {checkIn && checkOut && (
                  <p className="text-center text-stone-600 mb-6">
                    Estancia de{' '}
                    <span className="font-medium text-primary">
                      {calculateNights()} {calculateNights() === 1 ? 'noche' : 'noches'}
                    </span>
                  </p>
                )}

                <button
                  onClick={searchRooms}
                  disabled={loading || !checkIn || !checkOut}
                  className="w-full py-4 bg-primary text-white uppercase tracking-wider text-sm hover:bg-primary/90 transition-all disabled:bg-stone-300 disabled:cursor-not-allowed"
                >
                  {loading ? 'Buscando...' : 'Buscar habitaciones disponibles'}
                </button>
              </motion.div>
            )}

            {/* Step 2: Room Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 md:p-12 shadow-soft"
              >
                <h2 className="font-serif text-2xl text-center mb-2">
                  Seleccione su habitación
                </h2>
                <p className="text-center text-stone-500 mb-8">
                  {calculateNights()} noches · {guests} huéspedes
                </p>

                <div className="space-y-4 mb-8">
                  {availableRooms.map((room) => (
                    <div
                      key={room._id}
                      onClick={() => setSelectedRoom(room)}
                      className={`flex flex-col md:flex-row gap-4 p-4 border-2 cursor-pointer transition-all ${
                        selectedRoom?._id === room._id
                          ? 'border-primary bg-primary/5'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="w-full md:w-32 h-24 bg-stone-100 flex-shrink-0">
                        {room.images?.[0] ? (
                          <img
                            src={room.images[0]}
                            alt={room.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-serif text-lg mb-1">{room.name}</h3>
                        <p className="text-sm text-stone-500 mb-2">
                          {room.type} · Hasta {room.capacity} huéspedes
                        </p>
                        <p className="text-sm text-stone-600 line-clamp-2">
                          {room.description}
                        </p>
                      </div>
                      <div className="md:text-right flex-shrink-0">
                        <p className="text-2xl font-serif text-primary">
                          ${room.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-stone-500">por noche</p>
                        <p className="text-sm font-medium mt-2">
                          Total: ${(room.price * calculateNights()).toLocaleString()} MXN
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 border border-stone-300 text-stone-600 uppercase tracking-wider text-sm hover:bg-stone-50 transition-all"
                  >
                    Atrás
                  </button>
                  <button
                    onClick={() => selectedRoom && setStep(3)}
                    disabled={!selectedRoom}
                    className="flex-1 py-4 bg-primary text-white uppercase tracking-wider text-sm hover:bg-primary/90 transition-all disabled:bg-stone-300 disabled:cursor-not-allowed"
                  >
                    Continuar
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Guest Information */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 md:p-12 shadow-soft"
              >
                <h2 className="font-serif text-2xl text-center mb-8">
                  Datos del huésped
                </h2>

                {/* Summary */}
                <div className="bg-cream p-4 mb-8 flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <p className="text-sm text-stone-500">Habitación</p>
                    <p className="font-medium">{selectedRoom?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-stone-500">Fechas</p>
                    <p className="font-medium">
                      {new Date(checkIn).toLocaleDateString('es-MX')} -{' '}
                      {new Date(checkOut).toLocaleDateString('es-MX')}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-sm text-stone-500">Total</p>
                    <p className="font-medium text-primary">
                      ${(selectedRoom?.price * calculateNights()).toLocaleString()} MXN
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-stone-600 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Juan Pérez García"
                      className="w-full px-4 py-3 border border-stone-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-stone-600 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-4 py-3 border border-stone-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-stone-600 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+52 555 123 4567"
                      className="w-full px-4 py-3 border border-stone-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-stone-600 mb-2">
                      Solicitudes especiales (opcional)
                    </label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Preferencias de habitación, alergias, celebraciones especiales..."
                      rows={3}
                      className="w-full px-4 py-3 border border-stone-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 border border-stone-300 text-stone-600 uppercase tracking-wider text-sm hover:bg-stone-50 transition-all"
                  >
                    Atrás
                  </button>
                  <button
                    onClick={submitReservation}
                    disabled={loading || !guestName || !email || !phone}
                    className="flex-1 py-4 bg-primary text-white uppercase tracking-wider text-sm hover:bg-primary/90 transition-all disabled:bg-stone-300 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Procesando...' : 'Confirmar reservación'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && success && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 md:p-12 shadow-soft text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h2 className="font-serif text-3xl mb-4">
                  ¡Reservación confirmada!
                </h2>
                <p className="text-stone-600 mb-8">
                  Hemos enviado los detalles a su correo electrónico
                </p>

                <div className="bg-cream p-6 mb-8 text-left max-w-md mx-auto">
                  <div className="flex justify-between py-2 border-b border-stone-200">
                    <span className="text-stone-500">Código de confirmación</span>
                    <span className="font-mono font-medium text-primary">
                      {success.confirmationCode}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-200">
                    <span className="text-stone-500">Habitación</span>
                    <span className="font-medium">{success.room}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-200">
                    <span className="text-stone-500">Check-in</span>
                    <span className="font-medium">
                      {new Date(success.checkIn).toLocaleDateString('es-MX', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-200">
                    <span className="text-stone-500">Check-out</span>
                    <span className="font-medium">
                      {new Date(success.checkOut).toLocaleDateString('es-MX', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-stone-500">Total</span>
                    <span className="font-medium text-primary text-lg">
                      ${success.totalPrice.toLocaleString()} MXN
                    </span>
                  </div>
                </div>

                <p className="text-sm text-stone-500 mb-6">
                  Guarde su código de confirmación. Lo necesitará al momento del check-in.
                </p>

                <a
                  href="/"
                  className="inline-block px-8 py-4 bg-primary text-white uppercase tracking-wider text-sm hover:bg-primary/90 transition-all"
                >
                  Volver al inicio
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <ScrollReveal>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg mb-2">Check-in</h3>
                <p className="text-stone-600 text-sm">3:00 PM - 10:00 PM</p>
              </div>

              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg mb-2">Check-out</h3>
                <p className="text-stone-600 text-sm">Antes de 12:00 PM</p>
              </div>

              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg mb-2">Contacto</h3>
                <p className="text-stone-600 text-sm">+52 (123) 456-7890</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
