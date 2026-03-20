# Casas Fabris - Gestión de Proyectos

Aplicación full-stack unificada para la gestión de obras y proyectos de construcción.

## Estructura del Proyecto

- `/src`: Frontend en React + Vite + Tailwind CSS.
- `/api`: Backend en Express (optimizado para Vercel).
- `server.ts`: Servidor de desarrollo unificado (Vite + Express).

## Despliegue en Vercel

Esta aplicación está configurada para funcionar "out-of-the-box" en Vercel:

1. Conecta tu repositorio de GitHub a Vercel.
2. Vercel detectará automáticamente la configuración de `vercel.json`.
3. El frontend se compilará a `dist/` y el backend se ejecutará como Serverless Functions en `/api`.

## Desarrollo Local

```bash
npm install
npm run dev
```

El servidor correrá en el puerto 3000.

## Tecnologías

- **Frontend**: React 19, Framer Motion, Lucide React, Tailwind CSS.
- **Backend**: Node.js, Express.
- **Base de Datos**: Firebase Firestore & Auth.
- **IA**: Google Gemini API.
