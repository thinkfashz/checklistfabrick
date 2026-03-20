import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Settings, 
  Plus, 
  Users, 
  Grid, 
  Camera,
  LayoutGrid,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, signInWithGoogle, logout } from '../firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Layout({ children, currentPage, onPageChange }: LayoutProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'timeline', label: 'Cronograma', icon: Calendar },
    { id: 'docs', label: 'Documentos', icon: FileText },
    { id: 'team', label: 'Equipo', icon: Users },
    { id: 'settings', label: 'Ajustes', icon: Settings },
  ];

  const mobileNavItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'timeline', label: 'Cronograma', icon: Calendar },
    { id: 'plus', label: 'Nuevo', icon: Plus, isAction: true },
    { id: 'docs', label: 'Documentos', icon: FileText },
    { id: 'team', label: 'Equipo', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-fabrick-black text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 ios-blur px-6 py-3 flex justify-between items-center safe-top">
        <div className="flex items-center gap-3 group cursor-pointer active-scale" onClick={() => onPageChange('home')}>
          <div className="w-9 h-9 bg-fabrick-yellow rounded-xl flex items-center justify-center shadow-yellow-glow transform group-hover:rotate-6 transition-transform duration-500">
             <span className="font-headline font-black text-fabrick-black text-lg">F</span>
          </div>
          <h1 className="font-headline font-black tracking-tight uppercase text-xl text-white">
            CASAS <span className="text-fabrick-yellow">FABRIS</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6 font-label text-[10px] uppercase tracking-[0.2em] font-bold">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`transition-all duration-300 relative py-2 active-scale ${currentPage === item.id ? 'text-fabrick-yellow' : 'text-fabrick-gray hover:text-white'}`}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-fabrick-yellow rounded-full"
                  />
                )}
              </button>
            ))}
          </nav>
          
          {user ? (
            <div className="relative group">
              <button className="w-10 h-10 rounded-full bg-fabrick-card overflow-hidden border border-white/10 active-scale">
                <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt="Profile" className="w-full h-full object-cover" />
              </button>
              <div className="absolute right-0 mt-3 w-56 glass-panel rounded-2xl shadow-ios opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-3 z-[60]">
                <div className="px-3 py-2 border-b border-white/5 mb-2">
                  <p className="text-sm font-bold truncate">{user.displayName}</p>
                  <p className="text-[10px] text-fabrick-gray truncate">{user.email}</p>
                </div>
                <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 text-xs text-red-400 hover:bg-white/5 transition-colors rounded-xl">
                  <LogOut size={16} /> Cerrar Sesión
                </button>
              </div>
            </div>
          ) : (
            <button onClick={signInWithGoogle} className="px-5 py-2.5 bg-fabrick-yellow text-fabrick-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:brightness-110 transition-all shadow-yellow-glow active-scale">
              Iniciar Sesión
            </button>
          )}
          
          <button className="md:hidden text-fabrick-yellow p-2 active-scale" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pb-24 md:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-6 left-6 right-6 z-50 md:hidden">
        <nav className="flex justify-around items-center px-2 py-3 glass-panel rounded-[2.5rem] shadow-ios">
          {mobileNavItems.map(item => {
            if (item.isAction) {
              return (
                <button 
                  key={item.id}
                  className="bg-fabrick-yellow text-fabrick-black p-4 rounded-full shadow-yellow-glow active-scale transform -translate-y-2"
                >
                  <item.icon size={24} strokeWidth={3} />
                </button>
              );
            }
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex flex-col items-center justify-center transition-all px-4 py-2 rounded-2xl active-scale ${currentPage === item.id ? 'text-fabrick-yellow bg-white/5' : 'text-fabrick-gray opacity-60 hover:opacity-100'}`}
              >
                <item.icon size={20} className={currentPage === item.id ? 'scale-110' : ''} />
                <span className="font-body text-[8px] uppercase tracking-[0.1rem] font-black mt-1">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[60] glass-panel p-8 flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-fabrick-yellow rounded-lg flex items-center justify-center">
                   <span className="font-headline font-black text-fabrick-black text-sm">F</span>
                </div>
                <h2 className="font-headline font-black text-lg tracking-tight">MENÚ</h2>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/5 rounded-full active-scale"><X size={24} /></button>
            </div>
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-5 p-5 rounded-3xl transition-all active-scale ${currentPage === item.id ? 'bg-fabrick-yellow text-fabrick-black' : 'bg-white/5 text-white'}`}
                >
                  <item.icon size={24} />
                  <span className="text-xl font-headline font-black uppercase tracking-tight">{item.label}</span>
                </motion.button>
              ))}
            </div>
            
            <div className="mt-auto pt-8 border-t border-white/10">
               {user && (
                 <button onClick={logout} className="w-full flex items-center justify-center gap-3 p-5 bg-red-500/10 text-red-500 rounded-3xl font-bold active-scale">
                   <LogOut size={20} /> Cerrar Sesión
                 </button>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
