import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="container py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl text-white mb-4">Casa del Sol</h3>
            <p className="text-sm leading-relaxed max-w-md">
              Un refugio de tranquilidad en el corazón de un Pueblo Mágico de México. 
              Arquitectura colonial, gastronomía regional y hospitalidad auténtica.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white text-sm uppercase tracking-wider mb-4">Explorar</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/hotel-sanmiguel/historia" className="hover:text-white transition-colors">Historia</Link></li>
              <li><Link to="/hotel-sanmiguel/habitaciones" className="hover:text-white transition-colors">Habitaciones</Link></li>
              <li><Link to="/hotel-sanmiguel/servicios" className="hover:text-white transition-colors">Servicios</Link></li>
              <li><Link to="/hotel-sanmiguel/restaurante" className="hover:text-white transition-colors">Restaurante</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm uppercase tracking-wider mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>Centro Histórico</li>
              <li>San Miguel de Allende, Gto.</li>
              <li className="pt-2">+52 (415) 000 0000</li>
              <li>reservas@casadelsol.mx</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} Hotel Casa del Sol. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
