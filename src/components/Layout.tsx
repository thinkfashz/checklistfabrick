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
      <header className="sticky top-0 z-50 bg-fabrick-black/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => onPageChange('home')}>
          <div className="w-10 h-10 bg-fabrick-yellow rounded-lg flex items-center justify-center shadow-yellow-glow transform group-hover:rotate-12 transition-transform duration-500">
             <span className="font-headline font-black text-fabrick-black text-xl">F</span>
          </div>
          <h1 className="font-headline font-black tracking-tight uppercase text-2xl text-white">
            CASAS <span className="text-fabrick-yellow">FABRIS</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-8 font-label text-[11px] uppercase tracking-[0.15em] font-bold">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`transition-all duration-300 relative py-2 ${currentPage === item.id ? 'text-fabrick-yellow' : 'text-fabrick-gray hover:text-white'}`}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-fabrick-yellow"
                  />
                )}
              </button>
            ))}
          </nav>
          
          {user ? (
            <div className="relative group">
              <button className="w-10 h-10 rounded-sm bg-fabrick-card overflow-hidden border border-white/10">
                <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt="Profile" className="w-full h-full object-cover" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-fabrick-card border border-white/10 rounded-sm shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2">
                <div className="px-3 py-2 border-b border-white/5 mb-2">
                  <p className="text-xs font-bold truncate">{user.displayName}</p>
                  <p className="text-[10px] text-fabrick-gray truncate">{user.email}</p>
                </div>
                <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-white/5 transition-colors">
                  <LogOut size={14} /> Cerrar Sesión
                </button>
              </div>
            </div>
          ) : (
            <button onClick={signInWithGoogle} className="px-5 py-2.5 bg-fabrick-yellow text-fabrick-black text-[10px] font-black uppercase tracking-widest rounded-sm hover:brightness-110 transition-all shadow-yellow-glow">
              Iniciar Sesión
            </button>
          )}
          
          <button className="md:hidden text-fabrick-yellow" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
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
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-fabrick-black border-t border-white/5 shadow-[0px_-12px_24px_rgba(0,0,0,0.6)] md:hidden">
        {mobileNavItems.map(item => {
          if (item.isAction) {
            return (
              <button 
                key={item.id}
                className="bg-fabrick-yellow text-fabrick-black p-4 rounded-2xl -mt-12 shadow-yellow-glow border-4 border-fabrick-black transition-transform active:scale-90"
              >
                <item.icon size={24} strokeWidth={3} />
              </button>
            );
          }
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`flex flex-col items-center justify-center transition-all ${currentPage === item.id ? 'text-fabrick-yellow' : 'text-fabrick-gray opacity-60 hover:opacity-100'}`}
            >
              <item.icon size={20} className={currentPage === item.id ? 'scale-110' : ''} />
              <span className="font-body text-[8px] uppercase tracking-[0.1rem] font-bold mt-1">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 z-[60] bg-fabrick-black p-6 flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <h2 className="font-headline font-bold text-xl">MENÚ</h2>
              <button onClick={() => setIsMenuOpen(false)}><X /></button>
            </div>
            <div className="flex flex-col gap-6">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-4 text-2xl font-headline font-bold text-left"
                >
                  <item.icon size={24} className="text-fabrick-yellow" />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
