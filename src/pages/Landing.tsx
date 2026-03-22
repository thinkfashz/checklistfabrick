import React, { useState, Suspense } from 'react';
import { ChevronRight, Play, ArrowUpRight, Box, Shield, Zap, MousePointer2, CheckCircle2, X, Lock, Mail } from 'lucide-react';
import { signInWithGoogle } from '../firebase';
import { localAuth, User } from '../services/authService';
import TechBackground from '../components/TechBackground';

interface LandingProps {
  onLoginSuccess?: (user: User) => void;
}

export default function Landing({ onLoginSuccess }: LandingProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLocalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = localAuth.login(email, password);
    if (user) {
      onLoginSuccess?.(user);
    } else {
      setError('Credenciales inválidas. Usa 12345678 como contraseña.');
    }
  };

  return (
    <div className="min-h-screen bg-fabrick-black overflow-hidden relative">
      {/* Background Tech */}
      <TechBackground 
        className="opacity-80"
      />

      {/* Subtle Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-1">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-fabrick-lava/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-fabrick-yellow/5 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 pt-32 pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div 
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-fabrick-yellow/10 border border-fabrick-yellow/20 mb-10 shadow-ios"
            >
              <div className="w-2 h-2 rounded-full bg-fabrick-yellow animate-ping" />
              <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-fabrick-yellow font-black">
                Tu Obra, Bajo Control Total
              </span>
            </div>
            
            <h1 
              className="font-headline text-5xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase mb-10 text-white"
            >
              CONSTRUYE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fabrick-yellow to-fabrick-lava italic">SIN MIEDO</span> <br />
              AL ABANDONO
            </h1>
            
            <p 
              className="font-body text-fabrick-gray text-lg md:text-xl max-w-xl mb-14 leading-relaxed font-medium"
            >
              En <span className="text-white font-bold">CASAS FABRICK</span> eliminamos la incertidumbre. Nuestra plataforma combate el abandono de obras y los sobrecostos mediante transparencia absoluta, reportes semanales de avance y un proceso certificado en Metalcom.
            </p>

            <div 
              className="flex flex-col sm:flex-row gap-6"
            >
              <button 
                onClick={() => setShowLoginModal(true)}
                className="group relative px-12 py-6 bg-fabrick-lava text-white font-headline text-xs uppercase tracking-[0.2em] font-black rounded-3xl overflow-hidden transition-all shadow-ios active-scale"
              >
                <span className="relative z-10 flex items-center justify-center gap-4">
                  ACCESO CLIENTES <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-fabrick-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1]" />
              </button>
              
              <button 
                onClick={signInWithGoogle}
                className="px-12 py-6 border-2 border-white/10 text-white font-headline text-xs uppercase tracking-[0.2em] font-black rounded-3xl transition-all flex items-center justify-center gap-4 active-scale backdrop-blur-sm"
              >
                GOOGLE LOGIN <ArrowUpRight size={20} />
              </button>
            </div>

            <div 
              className="mt-20 grid grid-cols-3 gap-10 border-t border-white/5 pt-10"
            >
              {[
                { icon: Shield, label: 'Seguridad' },
                { icon: Zap, label: 'Transparencia' },
                { icon: Box, label: 'Garantía' },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="flex flex-col gap-3 group cursor-default"
                >
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-fabrick-yellow/10 transition-colors">
                    <item.icon size={20} className="text-fabrick-yellow group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[10px] font-headline uppercase tracking-[0.25em] font-black text-white/60 group-hover:text-white transition-colors">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element Section */}
          <div
            className="relative h-[600px] lg:h-[800px] w-full hidden lg:block"
          >
            {/* Stylized Architectural Graphic */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-md max-h-md">
                <div 
                  className="absolute inset-0 border-[1px] border-white/5 rounded-full"
                />
                <div 
                  className="absolute inset-10 border-[1px] border-fabrick-yellow/10 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-fabrick-yellow/5 blur-[120px] rounded-full animate-pulse" />
                  <div className="relative z-10 text-center">
                    <div className="w-32 h-32 bg-fabrick-yellow rounded-3xl flex items-center justify-center shadow-yellow-glow mx-auto mb-8 transform rotate-12">
                      <span className="text-6xl font-headline font-black text-fabrick-black">F</span>
                    </div>
                    <p className="text-[10px] font-headline font-black uppercase tracking-[0.5em] text-fabrick-yellow">Proceso Metalcom</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating UI Elements */}
            <div 
              className="absolute top-20 right-10 glass-panel p-6 rounded-3xl border border-white/10 z-20 shadow-ios"
            >
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full bg-fabrick-yellow shadow-[0_0_15px_rgba(250,204,21,0.5)] animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-white">Avance Semanal</span>
              </div>
            </div>

            <div 
              className="absolute bottom-20 left-10 glass-panel p-6 rounded-3xl border border-white/10 z-20 shadow-ios"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-fabrick-yellow/10 rounded-xl">
                  <Shield size={18} className="text-fabrick-yellow" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-white">Cero Abandono</span>
              </div>
            </div>
          </div>
        </div>

        {/* Problem & Solution Section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div
          className="space-y-8"
        >
          <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
            EL PROBLEMA DEL <br />
            <span className="text-fabrick-lava">MAESTRO AUSENTE</span>
          </h2>
          <p className="text-fabrick-gray text-lg leading-relaxed">
            Sabemos que el mayor miedo al construir es el abandono de la obra, los cobros inesperados y la falta de comunicación. Muchos proyectos quedan a medias, drenando tus ahorros y tu tranquilidad.
          </p>
          <div className="space-y-4">
            {[
              'Cobros por materiales no utilizados',
              'Retrasos injustificados sin aviso',
              'Falta de supervisión profesional',
              'Incertidumbre en el proceso Metalcom'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-white/80 font-bold text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-fabrick-lava" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          className="android-card p-10 border-fabrick-yellow/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Shield size={120} className="text-fabrick-yellow" />
          </div>
          <h3 className="font-headline text-3xl font-black uppercase text-fabrick-yellow mb-6">LA SOLUCIÓN FABRICK</h3>
          <p className="text-white/90 text-lg leading-relaxed mb-8">
            Nuestra aplicación es el puente entre tu inversión y tu casa terminada. A través de tecnología y transparencia, garantizamos que cada clavo y cada perfil de Metalcom esté en su lugar.
          </p>
          <div className="grid grid-cols-1 gap-6">
            {[
              { title: 'Transparencia Total', desc: 'Acceso 24/7 a gastos, facturas y estados de cuenta.' },
              { title: 'Reportes Semanales', desc: 'Resúmenes detallados con fotos y videos del avance real.' },
              { title: 'Garantía Estructural', desc: 'Certificación de procesos constructivos en Metalcom.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1">
                  <CheckCircle2 size={20} className="text-fabrick-yellow" />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase text-xs tracking-widest mb-1">{item.title}</h4>
                  <p className="text-fabrick-gray text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-32 border-t border-white/5 pt-16">
          {[
            { label: 'Obras Entregadas', value: '100%' },
            { label: 'Ahorro en Costos', value: '15%' },
            { label: 'Reportes Semanales', value: '52/año' },
            { label: 'Garantía Estructural', value: '10 años' },
          ].map((stat, i) => (
            <div
              key={i}
              className="cursor-default group"
            >
              <p className="text-5xl md:text-6xl font-headline font-black mb-2 text-fabrick-yellow tracking-tighter group-hover:scale-110 transition-transform origin-left">{stat.value}</p>
              <p className="text-[10px] font-headline uppercase tracking-[0.3em] text-fabrick-gray font-black group-hover:text-white transition-colors">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div 
            onClick={() => setShowLoginModal(false)}
            className="absolute inset-0 bg-fabrick-black/90 backdrop-blur-md"
          />
          <div 
            className="glass-panel p-10 w-full max-w-md relative z-10 border-fabrick-yellow/30 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="font-headline text-3xl font-black uppercase text-white tracking-tighter">ACCESO</h3>
                <p className="text-[10px] font-headline uppercase tracking-[0.3em] text-fabrick-yellow font-black">Portal de Clientes</p>
              </div>
              <button onClick={() => setShowLoginModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-fabrick-gray hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleLocalLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-fabrick-gray ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-fabrick-gray" size={18} />
                  <input 
                    type="email" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-fabrick-yellow transition-all text-white placeholder:text-white/20"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-fabrick-gray ml-1">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-fabrick-gray" size={18} />
                  <input 
                    type="password" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-fabrick-yellow transition-all text-white placeholder:text-white/20"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <p 
                  className="text-xs text-fabrick-lava font-bold text-center"
                >
                  {error}
                </p>
              )}

              <button 
                type="submit"
                className="w-full py-5 bg-fabrick-yellow text-fabrick-black font-headline font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-yellow-glow hover:brightness-110 transition-all active-scale mt-4"
              >
                INGRESAR AL SISTEMA
              </button>

              <p className="text-[9px] text-center text-fabrick-gray uppercase font-black tracking-widest mt-6">
                ¿Olvidaste tu acceso? Contacta a soporte
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
