import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, ShieldAlert, Terminal, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorAdapter extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReset = () => {
    // Clear local storage and session storage as a "fix"
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-fabrick-black flex flex-col items-center justify-center p-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="android-card p-10 max-w-xl w-full border-fabrick-lava/30 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-fabrick-lava/5 blur-[100px] rounded-full -mr-32 -mt-32" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-fabrick-lava/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <ShieldAlert size={40} className="text-fabrick-lava" />
              </div>

              <h2 className="text-3xl font-headline font-black uppercase tracking-tighter text-white mb-4">
                Error de <span className="text-fabrick-lava">Sistema</span> Detectado
              </h2>
              
              <p className="text-fabrick-gray text-sm mb-8 leading-relaxed font-medium">
                Se ha detectado una anomalía en la ejecución. El Adaptador de Errores ha capturado el incidente para prevenir una caída total del sistema.
              </p>

              <div className="bg-fabrick-black/60 rounded-2xl p-6 border border-white/5 text-left mb-8 overflow-hidden">
                <div className="flex items-center gap-2 text-fabrick-lava mb-4">
                  <Terminal size={14} />
                  <span className="text-[10px] uppercase font-black tracking-widest">Detalles Técnicos</span>
                </div>
                <div className="max-h-32 overflow-y-auto hide-scrollbar">
                  <p className="text-[11px] font-mono text-fabrick-lava/80 break-words leading-relaxed">
                    {this.state.error?.message || "Error desconocido"}
                  </p>
                  {this.state.errorInfo?.componentStack && (
                    <p className="text-[9px] font-mono text-fabrick-gray/50 mt-4 whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 py-4 bg-white/5 text-white font-black uppercase tracking-widest rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 active-scale"
                >
                  <RefreshCw size={18} />
                  Reintentar
                </button>
                <button
                  onClick={this.handleReset}
                  className="flex-1 py-4 bg-fabrick-yellow text-fabrick-black font-black uppercase tracking-widest rounded-2xl shadow-yellow-glow hover:brightness-110 transition-all flex items-center justify-center gap-2 active-scale"
                >
                  <XCircle size={18} />
                  Limpiar y Reiniciar
                </button>
              </div>
            </div>
          </motion.div>
          
          <p className="mt-12 text-[10px] text-fabrick-gray uppercase tracking-[0.3em] font-black opacity-50">
            Casas Fabris • Sistema de Adaptación de Errores v1.0
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
