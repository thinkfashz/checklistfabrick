import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('App starting...');

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
