import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert } from 'lucide-react';

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
    console.error("Uncaught error caught by ErrorAdapter:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReset = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center text-white">
          <div className="p-10 max-w-xl w-full border border-red-500/30 bg-[#141414] rounded-3xl shadow-2xl">
            <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <ShieldAlert size={40} className="text-red-500" />
            </div>

            <h2 className="text-3xl font-bold uppercase tracking-tighter mb-4">
              Error de <span className="text-red-500">Sistema</span>
            </h2>
            
            <p className="text-gray-400 text-sm mb-8">
              Se ha detectado una anomalía. El Adaptador de Errores ha capturado el incidente.
            </p>

            <div className="bg-black/60 rounded-2xl p-6 border border-white/5 text-left mb-8">
              <p className="text-[11px] font-mono text-red-400 break-words">
                {this.state.error?.message || "Error desconocido"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 py-4 bg-white/5 text-white font-bold uppercase tracking-widest rounded-2xl border border-white/10 hover:bg-white/10"
              >
                Reintentar
              </button>
              <button
                onClick={this.handleReset}
                className="flex-1 py-4 bg-yellow-400 text-black font-bold uppercase tracking-widest rounded-2xl"
              >
                Limpiar y Reiniciar
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
