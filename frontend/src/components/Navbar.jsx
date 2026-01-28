import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../hooks/useScroll.js';

// Base path for deployment with proxy
const basePath = '/hotel-sanmiguel';

const navItems = [
  { to: `${basePath}/`, label: 'Inicio' },
  { to: `${basePath}/historia`, label: 'Historia' },
  { to: `${basePath}/habitaciones`, label: 'Habitaciones' },
  { to: `${basePath}/servicios`, label: 'Servicios' },
  { to: `${basePath}/restaurante`, label: 'Restaurante' },
  { to: `${basePath}/contacto`, label: 'Contacto' },
];

export default function Navbar() {
  const scrolled = useScrollPosition(80);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <NavLink to={`${basePath}/`} className="group flex items-center gap-3">
          {/* Logo Icon */}
          <div className={`transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-primary-light'}`}>
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
              <circle cx="16" cy="16" r="6" />
              <g strokeWidth="2" stroke="currentColor" fill="none">
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="16" y1="26" x2="16" y2="30" />
                <line x1="2" y1="16" x2="6" y2="16" />
                <line x1="26" y1="16" x2="30" y2="16" />
                <line x1="5.5" y1="5.5" x2="8.3" y2="8.3" />
                <line x1="23.7" y1="23.7" x2="26.5" y2="26.5" />
                <line x1="5.5" y1="26.5" x2="8.3" y2="23.7" />
                <line x1="23.7" y1="8.3" x2="26.5" y2="5.5" />
              </g>
            </svg>
          </div>
          <span
            className={`font-serif text-xl tracking-wide transition-colors duration-300 ${
              scrolled ? 'text-stone-800' : 'text-white'
            }`}
          >
            Casa del Sol
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative px-4 py-2 text-xs tracking-wider uppercase transition-all duration-300 ${
                  scrolled
                    ? isActive
                      ? 'text-primary'
                      : 'text-stone-600 hover:text-primary'
                    : isActive
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className={`absolute bottom-0 left-4 right-4 h-0.5 ${
                        scrolled ? 'bg-primary' : 'bg-white'
                      }`}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          
          {/* Reservation CTA Button */}
          <NavLink
            to={`${basePath}/reservaciones`}
            className={`ml-4 px-5 py-2.5 text-xs tracking-wider uppercase transition-all duration-300 ${
              scrolled
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-white text-stone-800 hover:bg-white/90'
            }`}
          >
            Reservar
          </NavLink>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 transition-colors ${
            scrolled ? 'text-stone-800' : 'text-white'
          }`}
          aria-label="Menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-stone-100 overflow-hidden"
          >
            <nav className="container py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? 'text-primary bg-primary/5 font-medium'
                        : 'text-stone-600 hover:text-primary hover:bg-stone-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to={`${basePath}/reservaciones`}
                onClick={() => setMobileOpen(false)}
                className="mt-4 mx-4 py-3 bg-primary text-white text-center text-sm uppercase tracking-wider"
              >
                Reservar ahora
              </NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
