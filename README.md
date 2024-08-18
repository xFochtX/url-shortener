# Instrucciones de Configuración

Sigue estos pasos para configurar y ejecutar el proyecto:

1. **Instalar las dependencias**  
  Ejecuta el siguiente comando para instalar todas las dependencias necesarias:
  npm install

2. **Archivo .env**  
  Crear el archivo .env en la raíz del proyecto y configurar el DATABASE_URL según la siguiente estructura:
  DATABASE_URL = "[provider]://[user]:[password]@[host]:[port]/[database_name]"
  Configuración de ejemplo:
  DATABASE_URL = "postgresql://focht:focht@localhost:5432/url-shortener"
  Puedes leer más sobre configuración de Connection URLs aquí:
  [Prisma Connection URLs](https://www.prisma.io/docs/orm/reference/connection-urls)
  

3. **Migración con prisma**  
  npx prisma migrate dev --init

4. **Iniciar el proyecto**  
  npm run dev

# Aplicación desplegada de ejemplo

Puedes encontrar un ejemplo de la aplicación en producción aquí: 
[App Deploy](https://focht.netlify.app/)
