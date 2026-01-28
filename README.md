# Hotel Boutique Mágico — Sistema Web Completo

Proyecto full-stack para un hotel boutique inspirado en arquitectura colonial mexicana, con frontend en React (Vite + Tailwind + Framer Motion) y backend en Node.js + Express + MongoDB. Incluye Docker para ambiente productivo.

## Stack
- Frontend: React (Vite), TailwindCSS, React Router, Framer Motion
- Backend: Node.js, Express, Mongoose, CORS, Morgan
- DB: MongoDB (Docker)
- Deploy local: Docker Compose

## Arquitectura
- frontend/
  - src/
    - components/
    - pages/
    - layouts/
    - services/
- backend/
  - src/
    - controllers/
    - routes/
    - models/
    - config/

## Endpoints
Base: `http://localhost:4000/api`
- `GET /rooms` — Lista de habitaciones
- `GET /services` — Lista de servicios
- `GET /restaurant/menu` — Menú agrupado (Desayunos, Comidas, Bebidas)
- `GET /history` — Historia del hotel
- `POST /contact` — Formulario de contacto
  - Body: `{ name, email, phone?, message }`
  - Respuesta: `{ success: true, contactId }`

## Datos
- Habitaciones: Estándar, Junior Suite, Suite (precios en MXN, imágenes reales de Unsplash)
- Servicios: Spa, Alberca, Restaurante, WiFi, Room Service, Tours, Transporte
- Restaurante: menú realista con platillos y bebidas regionales

## Ejecutar con Docker
Requisitos: Docker Desktop

```bash
docker-compose up --build
```
- Frontend: http://localhost:5173
- Backend: http://localhost:4000/api
- MongoDB: localhost:27017 (DB: `hotelmagico`)

Para sembrar datos manualmente (si fuera necesario):
```bash
# Dentro del contenedor backend (opcional si se requiere reseed)
# O localmente con Node instalado, configurando MONGODB_URI
npm run seed --prefix backend
```

## Variables de entorno
- backend/.env
  - `PORT=4000`
  - `MONGODB_URI=mongodb://mongo:27017/hotelmagico`
- frontend: `VITE_API_URL=http://localhost:4000/api`

## UI/UX
- Paleta: terracota, dorado, verde colonial
- Tipografía elegante (serif para títulos)
- Navbar fijo, responsivo y con hover profesional
- Animaciones sutiles en secciones y microinteracciones en tarjetas

## Notas de producción
- Contenedores preparados para `vite preview` (frontend) y `node` (backend)
- Añadir proxy/CDN para assets si se requiere
- Ajustar CORS si se despliega en dominios específicos

## Licencias y contenido
- Imágenes de Unsplash (URLs públicas). Sustituir por material propio si aplica.
