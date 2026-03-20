// vite.config.ts
export default defineConfig(({mode}) => {
  // ...
  return {
    // ...
    server: {
      // HMR solo se activa en desarrollo, evitando errores de WebSocket en Vercel
      hmr: mode === 'development' && process.env.DISABLE_HMR !== 'true',
    },
  };
});
