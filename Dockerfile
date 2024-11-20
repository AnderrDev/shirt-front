# Usar la imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el código al contenedor
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Usar una imagen más ligera para servir la aplicación (opcional)
FROM nginx:alpine

# Copiar los archivos de construcción al servidor Nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Exponer el puerto 80 para servir la aplicación
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
