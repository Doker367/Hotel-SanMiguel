import { Link } from 'react-router-dom';

export default function RoomCard({ room }) {
  return (
    <article className="card group overflow-hidden">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={room.images?.[0]}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-6">
        <span className="text-xs uppercase tracking-wider text-stone-400">{room.type}</span>
        <h3 className="font-serif text-xl text-stone-800 mt-1 mb-2">{room.name}</h3>
        <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 mb-4">
          {room.description}
        </p>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs text-stone-400">Desde</span>
            <p className="font-serif text-lg text-primary">
              ${room.pricePerNightMXN?.toLocaleString('es-MX')} <span className="text-sm font-sans text-stone-400">MXN/noche</span>
            </p>
          </div>
          <Link 
            to="/hotel-sanmiguel/contacto" 
            className="text-sm text-primary hover:underline underline-offset-4 transition-all"
          >
            Reservar
          </Link>
        </div>
      </div>
    </article>
  );
}
