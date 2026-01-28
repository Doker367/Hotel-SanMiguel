import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Room from './models/Room.js';
import { Service } from './models/Service.js';
import { MenuItem } from './models/MenuItem.js';
import { History } from './models/History.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hotelmagico';

async function seed() {
  await connectDB(MONGODB_URI);

  await Promise.all([
    Room.deleteMany({}),
    Service.deleteMany({}),
    MenuItem.deleteMany({}),
    History.deleteMany({}),
  ]);

  const rooms = [
    {
      name: 'Habitación Girasol',
      type: 'Estándar',
      description: 'Tu rincón acogedor con vista al jardín interior. Perfecta para viajeros que buscan paz y autenticidad. La luz de la mañana entra suave por la ventana de madera, invitándote a despertar sin prisa.',
      pricePerNightMXN: 1800,
      capacity: 2,
      amenities: ['Cama queen size', 'Baño con regadera lluvia', 'WiFi', 'Smart TV', 'Jabones artesanales de lavanda'],
      images: [
        'https://images.unsplash.com/photo-1560067174-8942b62a1c7b?w=1600',
        'https://images.unsplash.com/photo-1534889156217-d2d7f1f5a8ff?w=1600'
      ],
    },
    {
      name: 'Habitación Bugambilia',
      type: 'Estándar',
      description: 'Llamada así por las flores que adornan su balcón. Desde aquí escucharás el murmullo de la fuente del patio y el canto de los pájaros que visitan nuestro jardín cada mañana.',
      pricePerNightMXN: 1900,
      capacity: 2,
      amenities: ['Cama queen size', 'Balcón privado', 'WiFi', 'Smart TV', 'Amenidades orgánicas'],
      images: [
        'https://images.unsplash.com/photo-1560185008-ccd92c3f7e9c?w=1600',
        'https://images.unsplash.com/photo-1560185009-5bf9f2849488?w=1600'
      ],
    },
    {
      name: 'Suite Cantera',
      type: 'Junior Suite',
      description: 'Un espacio generoso con techos de vigas originales y pisos de pasta hidráulica de 1890. Incluye una pequeña sala de estar perfecta para leer con una copa de vino después de explorar el pueblo.',
      pricePerNightMXN: 2800,
      capacity: 3,
      amenities: ['Cama king size', 'Sala de estar', 'Balcón con vista al centro', 'Mini bar con productos locales', 'Bata y pantuflas'],
      images: [
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1600',
        'https://images.unsplash.com/photo-1560067288-7f8f28fa25a5?w=1600'
      ],
    },
    {
      name: 'Suite Agave',
      type: 'Junior Suite',
      description: 'Inspirada en los tonos del desierto mexicano, esta suite combina textiles oaxaqueños con muebles de mezquite tallados a mano. Su terraza privada es el lugar ideal para ver el atardecer con un mezcal.',
      pricePerNightMXN: 3200,
      capacity: 3,
      amenities: ['Cama king size', 'Terraza privada', 'Tina de hidromasaje', 'Cafetera Nespresso', 'Selección de mezcales'],
      images: [
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600',
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1600'
      ],
    },
    {
      name: 'Gran Suite Parroquia',
      type: 'Suite',
      description: 'Nuestra joya. Ocupa lo que fue la recámara principal de la casona original. Desde su terraza puedes ver las torres de la Parroquia al atardecer mientras el pueblo se tiñe de dorado. Incluye servicio de mayordomo.',
      pricePerNightMXN: 4500,
      capacity: 4,
      amenities: ['Cama king size', 'Sala y comedor', 'Terraza con vista a la Parroquia', 'Servicio de mayordomo', 'Champagne de bienvenida', 'Check-in privado'],
      images: [
        'https://images.unsplash.com/photo-1554995207-80a3b1a5d0f4?w=1600',
        'https://images.unsplash.com/photo-1560185127-6a7eb8c10b79?w=1600'
      ],
    },
    {
      name: 'Suite Familiar Jacaranda',
      type: 'Familiar',
      description: 'Perfecta para familias que viajan juntas. Dos recámaras conectadas con un espacio común, decoradas con colores alegres inspirados en el arte popular mexicano. Los niños amarán el pequeño rincón de lectura.',
      pricePerNightMXN: 3800,
      capacity: 5,
      amenities: ['Una cama king + dos camas individuales', 'Dos baños completos', 'Sala familiar', 'Juegos de mesa mexicanos', 'Mini bar con opciones para niños'],
      images: [
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1600',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600'
      ],
    },
  ];

  const services = [
    { name: 'Spa Xochitl', icon: 'spa', description: 'Masajes con aceites de copal y tratamientos faciales con miel de agave. Nuestras terapeutas son originarias de Michoacán y traen consigo técnicas ancestrales.' },
    { name: 'Alberca y jardín', icon: 'pool', description: 'Piscina climatizada rodeada de buganvilias y naranjos. El lugar perfecto para flotar bajo el sol de San Miguel.' },
    { name: 'Restaurante El Patio', icon: 'restaurant', description: 'Cocina de mercado que cambia con las estaciones. Cada mañana, nuestro chef visita el tianguis para traer lo más fresco.' },
    { name: 'WiFi de cortesía', icon: 'wifi', description: 'Conexión de alta velocidad en todas las áreas, aunque te recomendamos desconectarte de vez en cuando.' },
    { name: 'Desayuno incluido', icon: 'breakfast', description: 'Despierta con el aroma del café de Veracruz. Desayuno completo servido en el patio de 7:00 a 11:00.' },
    { name: 'Tours y experiencias', icon: 'tour', description: 'Visitas a viñedos, talleres de artesanías, recorridos gastronómicos y más. Nosotros organizamos todo.' },
    { name: 'Traslados', icon: 'shuttle', description: 'Te recogemos en el aeropuerto de Guanajuato o Querétaro. Viaja sin preocupaciones.' },
    { name: 'Yoga al amanecer', icon: 'yoga', description: 'Clases de yoga en la terraza con vista a los tejados del pueblo. Incluidas para nuestros huéspedes.' },
  ];

  const menu = [
    // Desayunos
    { name: 'Chilaquiles de la abuela', category: 'Desayunos', description: 'Totopos bañados en salsa roja o verde, con pollo deshebrado, queso añejo desmoronado, crema y cebolla. Servidos con frijoles refritos.', priceMXN: 165 },
    { name: 'Huevos divorciados', category: 'Desayunos', description: 'Dos huevos estrellados, uno con salsa verde y otro con salsa roja, separados por una muralla de frijoles refritos. Acompañados de chilaquiles.', priceMXN: 155 },
    { name: 'Enfrijoladas de requesón', category: 'Desayunos', description: 'Tortillas rellenas de requesón fresco, bañadas en frijoles negros molidos con epazote. Coronadas con crema y queso fresco.', priceMXN: 145 },
    { name: 'Molletes San Miguel', category: 'Desayunos', description: 'Bolillo artesanal con frijoles refritos, queso manchego gratinado y pico de gallo. Opción de agregar chorizo de Toluca.', priceMXN: 125 },
    { name: 'Hot cakes de elote', category: 'Desayunos', description: 'Esponjosos hot cakes con elote fresco, servidos con miel de piloncillo y mantequilla batida.', priceMXN: 140 },
    
    // Comidas
    { name: 'Cochinita pibil', category: 'Comidas', description: 'Cerdo marinado en achiote y naranja agria, cocinado lentamente en hoja de plátano. Servido con cebolla morada encurtida y tortillas hechas a mano.', priceMXN: 285 },
    { name: 'Mole negro oaxaqueño', category: 'Comidas', description: 'Pierna de pollo bañada en nuestro mole de 28 ingredientes, preparado según la receta de doña Carmen. Servido con arroz rojo.', priceMXN: 295 },
    { name: 'Tacos de barbacoa', category: 'Comidas', description: 'Res cocinada en hoyo durante 12 horas, servida en tortillas de maíz azul con cebolla, cilantro y salsa borracha. Orden de 4 tacos.', priceMXN: 245 },
    { name: 'Enchiladas mineras', category: 'Comidas', description: 'Típicas de Guanajuato: tortillas rellenas de pollo, bañadas en salsa de chile guajillo, acompañadas de papas, zanahorias y lechuga.', priceMXN: 225 },
    { name: 'Pozole rojo de Jalisco', category: 'Comidas', description: 'Caldo rojo con maíz cacahuazintle y carne de cerdo. Servido con orégano, rábanos, lechuga, tostadas y mucho limón.', priceMXN: 195 },
    { name: 'Filete a la tampiqueña', category: 'Comidas', description: 'Arrachera de res a la parrilla con rajas con crema, guacamole, enchilada verde, frijoles charros y quesadilla de flor de calabaza.', priceMXN: 385 },
    
    // Bebidas
    { name: 'Agua de horchata', category: 'Bebidas', description: 'Receta tradicional con arroz, canela y un toque de vainilla. Refrescante y reconfortante.', priceMXN: 65 },
    { name: 'Agua de jamaica', category: 'Bebidas', description: 'Flor de jamaica orgánica de Oaxaca, ligeramente endulzada con piloncillo.', priceMXN: 60 },
    { name: 'Café de olla', category: 'Bebidas', description: 'Café de Veracruz preparado con piloncillo y canela en olla de barro. Servido caliente.', priceMXN: 55 },
    { name: 'Mezcalita Casa del Sol', category: 'Bebidas', description: 'Mezcal espadín con jugo de toronja, limón, miel de agave y sal de chapulín. Nuestra firma.', priceMXN: 145 },
    { name: 'Margarita de tamarindo', category: 'Bebidas', description: 'Tequila reposado, licor de naranja, pulpa de tamarindo y un toque de chile. Con o sin sal.', priceMXN: 135 },
    { name: 'Vuelo de mezcales', category: 'Bebidas', description: 'Tres mezcales artesanales de diferentes regiones: Oaxaca, Durango y Guerrero. Con rodajas de naranja.', priceMXN: 195 },
  ];

  const history = {
    title: 'Casa del Sol',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920',
    content: 'Construida en 1892 por don Aurelio Mendoza, Casa del Sol fue durante generaciones el hogar de una de las familias más queridas de San Miguel. En 2018, la casona fue cuidadosamente restaurada para convertirse en un hotel boutique que honra su historia mientras ofrece todas las comodidades modernas. Hoy, te invitamos a ser parte de esta historia.'
  };

  await Room.insertMany(rooms);
  await Service.insertMany(services);
  await MenuItem.insertMany(menu);
  await History.create(history);

  console.log('✓ Datos sembrados correctamente');
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
