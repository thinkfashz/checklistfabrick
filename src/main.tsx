import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('App starting...');

// Global error listener for early crashes
window.onerror = (message, source, lineno, colno, error) => {
  console.error('Global error caught:', { message, source, lineno, colno, error });
  const root = document.getElementById('root');
  if (root && root.innerHTML === '') {
    root.innerHTML = `<div style="color: white; padding: 20px; background: #141414; font-family: sans-serif;">
      <h2 style="color: #ef4444;">Error Crítico Detectado</h2>
      <p style="font-size: 12px; color: #a1a1aa;">${message}</p>
      <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #FACC15; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Reintentar</button>
    </div>`;
  }
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="color: white; padding: 20px;">Error fatal: No se encontró el elemento raíz del DOM.</div>';
} else {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Error during initial render:', error);
    rootElement.innerHTML = `<div style="color: white; padding: 20px;">Error de renderizado inicial: ${error instanceof Error ? error.message : String(error)}</div>`;
  }
}
