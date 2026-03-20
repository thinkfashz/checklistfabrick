import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Play, ArrowUpRight, Box, Shield, Zap, MousePointer2 } from 'lucide-react';
import { signInWithGoogle } from '../firebase';
import TechBackground from '../components/TechBackground';

export default function Landing() {
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
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-10 shadow-ios"
            >
              <div className="w-2 h-2 rounded-full bg-fabrick-lava animate-ping" />
              <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-white font-black">
                Nueva Versión 2.0 Disponible
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-headline text-6xl md:text-9xl font-black leading-[0.8] tracking-tighter uppercase mb-10 text-white"
            >
              CASAS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fabrick-yellow to-fabrick-lava italic">PREMIUM</span> <br />
              FABRICK
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-fabrick-gray text-lg md:text-2xl max-w-xl mb-14 leading-relaxed font-medium"
            >
              La plataforma definitiva para la gestión de proyectos arquitectónicos. Control total, transparencia absoluta y diseño de vanguardia.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={signInWithGoogle}
                className="group relative px-12 py-6 bg-fabrick-lava text-white font-headline text-xs uppercase tracking-[0.2em] font-black rounded-3xl overflow-hidden transition-all shadow-ios active-scale"
              >
                <span className="relative z-10 flex items-center justify-center gap-4">
                  ACCESO CLIENTES <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-fabrick-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1]" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 border-2 border-white/10 text-white font-headline text-xs uppercase tracking-[0.2em] font-black rounded-3xl transition-all flex items-center justify-center gap-4 active-scale backdrop-blur-sm"
              >
                EXPLORAR DISEÑOS <ArrowUpRight size={20} />
              </motion.button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="mt-20 grid grid-cols-3 gap-10 border-t border-white/5 pt-10"
            >
              {[
                { icon: Box, label: 'Diseño 3D' },
                { icon: Shield, label: 'Garantía' },
                { icon: Zap, label: 'Eficiencia' },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -8 }}
                  className="flex flex-col gap-3 group cursor-default"
                >
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-fabrick-yellow/10 transition-colors">
                    <item.icon size={20} className="text-fabrick-yellow group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[10px] font-headline uppercase tracking-[0.25em] font-black text-white/60 group-hover:text-white transition-colors">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Element Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.4, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[600px] lg:h-[800px] w-full hidden lg:block"
          >
            {/* Stylized Architectural Graphic */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-md max-h-md">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-[1px] border-white/5 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-10 border-[1px] border-fabrick-yellow/10 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-fabrick-yellow/5 blur-[120px] rounded-full animate-pulse" />
                  <div className="relative z-10 text-center">
                    <div className="w-32 h-32 bg-fabrick-yellow rounded-3xl flex items-center justify-center shadow-yellow-glow mx-auto mb-8 transform rotate-12">
                      <span className="text-6xl font-headline font-black text-fabrick-black">F</span>
                    </div>
                    <p className="text-[10px] font-headline font-black uppercase tracking-[0.5em] text-fabrick-yellow">Arquitectura Digital</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-10 glass-panel p-6 rounded-3xl border border-white/10 z-20 shadow-ios"
            >
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-white">Renderizado en Vivo</span>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 left-10 glass-panel p-6 rounded-3xl border border-white/10 z-20 shadow-ios"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-fabrick-yellow/10 rounded-xl">
                  <MousePointer2 size={18} className="text-fabrick-yellow" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-white">Interactúa con el Futuro</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-32 border-t border-white/5 pt-16">
          {[
            { label: 'Proyectos en Chile', value: '150+' },
            { label: 'm² Construidos', value: '25k' },
            { label: 'Arquitectos', value: '18' },
            { label: 'Años de Exp.', value: '10' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
              whileHover={{ y: -10 }}
              className="cursor-default group"
            >
              <p className="text-5xl md:text-6xl font-headline font-black mb-2 text-fabrick-yellow tracking-tighter group-hover:scale-110 transition-transform origin-left">{stat.value}</p>
              <p className="text-[10px] font-headline uppercase tracking-[0.3em] text-fabrick-gray font-black group-hover:text-white transition-colors">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
