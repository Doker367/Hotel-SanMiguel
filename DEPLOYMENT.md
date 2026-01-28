# Hotel San Miguel - Despliegue en Servidor

## Instrucciones de Instalación

### 1. Preparar el proyecto en tu servidor
```bash
# Subir el proyecto a ~/nginx_proxy/Hotel-SanMiguel/
scp -r Hotel-magico/ usuario@servidor:~/nginx_proxy/Hotel-SanMiguel/
```

### 2. Configurar nginx
Agregar la siguiente configuración a tu archivo `nginx/conf.d/res-japones.conf` (después de las otras configuraciones):

```nginx
# =====================================================
# =============== HOTEL SAN MIGUEL ====================
# =====================================================

# --- API Backend Hotel San Miguel ---
location /hotel-sanmiguel/api/ {
    rewrite ^/hotel-sanmiguel/(.*)$ /$1 break;
    proxy_pass http://hotel-sanmiguel-backend:4000;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

# --- Frontend Hotel San Miguel ---
location /hotel-sanmiguel/ {
    proxy_pass http://hotel-sanmiguel-frontend/;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### 3. Crear la red externa (si no existe)
```bash
docker network create web_proxy_network
```

### 4. Levantar el proyecto
```bash
cd ~/nginx_proxy/Hotel-SanMiguel/
docker compose up -d --build
```

### 5. Poblar la base de datos
```bash
docker compose exec backend node src/seed.js
```

### 6. Reiniciar nginx proxy
```bash
cd ~/nginx_proxy/nginx/
docker compose restart nginx-proxy
```

## Acceso
- Frontend: `http://tu-dominio.com/hotel-sanmiguel/`
- API: `http://tu-dominio.com/hotel-sanmiguel/api/`

## Estructura de Contenedores
- `hotel-sanmiguel-frontend` - Frontend en nginx (puerto 80)
- `hotel-sanmiguel-backend` - API en Node.js (puerto 4000)  
- `hotel-sanmiguel-mongo` - Base de datos MongoDB

## Variables de Entorno
Las variables están configuradas para producción:
- API URL: `/hotel-sanmiguel/api`
- Base path: `/hotel-sanmiguel/`