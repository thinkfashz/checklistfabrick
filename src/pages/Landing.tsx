import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Play, ArrowUpRight, Box, Shield, Zap } from 'lucide-react';
import { signInWithGoogle } from '../firebase';
const Spline = React.lazy(() => import('@splinetool/react-spline'));

export default function Landing() {
  return (
    <div className="min-h-screen bg-fabrick-black overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-fabrick-lava/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-fabrick-yellow/10 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 pt-24 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-fabrick-lava animate-ping" />
              <span className="font-headline text-[9px] uppercase tracking-[0.2em] text-white font-bold">
                Nueva Versión 2.0 Disponible
              </span>
            </div>
            
            <h1 className="font-headline text-6xl md:text-8xl font-bold leading-[0.85] tracking-tighter uppercase mb-8 text-white">
              CASAS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fabrick-yellow to-fabrick-lava italic">INTELIGENTES</span> <br />
              FABRICK
            </h1>
            
            <p className="font-body text-fabrick-gray text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
              La plataforma definitiva para la gestión de proyectos arquitectónicos. Control total, transparencia absoluta y diseño de vanguardia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={signInWithGoogle}
                className="group relative px-10 py-5 bg-fabrick-lava text-white font-headline text-xs uppercase tracking-widest font-bold rounded-sm overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(255,61,0,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  ACCESO CLIENTES <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-fabrick-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              
              <button className="px-10 py-5 border border-white/20 text-white font-headline text-xs uppercase tracking-widest font-bold rounded-sm hover:bg-white/5 transition-all flex items-center gap-3">
                EXPLORAR DISEÑOS <ArrowUpRight size={18} />
              </button>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
              {[
                { icon: Box, label: 'Diseño 3D' },
                { icon: Shield, label: 'Garantía' },
                { icon: Zap, label: 'Eficiencia' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <item.icon size={20} className="text-fabrick-yellow" />
                  <span className="text-[10px] font-headline uppercase tracking-widest font-bold text-white">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Spline / 3D Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative h-[500px] lg:h-[700px] w-full"
          >
            <div className="absolute inset-0 z-0">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-12 h-12 border-4 border-fabrick-lava border-t-transparent rounded-full animate-spin" />
                </div>
              }>
                <Spline scene="https://prod.spline.design/6Wq1Q7YInYq6y86S/scene.splinecode" />
              </Suspense>
            </div>
            
            {/* Floating UI Elements over Spline */}
            <div className="absolute top-10 right-0 glass-panel p-4 border border-white/10 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Renderizado en Vivo</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 border-t border-white/10 pt-12">
          {[
            { label: 'Proyectos en Chile', value: '150+' },
            { label: 'm² Construidos', value: '25k' },
            { label: 'Arquitectos', value: '18' },
            { label: 'Años de Exp.', value: '10' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <p className="text-4xl font-headline font-bold mb-1 text-fabrick-yellow">{stat.value}</p>
              <p className="text-[10px] font-headline uppercase tracking-widest text-fabrick-gray">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
