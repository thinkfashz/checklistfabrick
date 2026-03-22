import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from './firebase';
import { localAuth, User as LocalUser } from './services/authService';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Timeline from './pages/Timeline';
import Docs from './pages/Docs';
import Team from './pages/Team';
import Settings from './pages/Settings';
import SupportChat from './components/SupportChat';
import ErrorAdapter from './components/ErrorAdapter';
import AppAnalyzer from './components/AppAnalyzer';

export default function App() {
  const [user, setUser] = useState<FirebaseUser | LocalUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    console.log('App component mounted, starting auth check...');
    // Safety timeout to prevent permanent black screen
    const timeout = setTimeout(() => {
      console.warn('Auth check timed out after 5s, forcing app start');
      setLoading(false);
    }, 5000);

    try {
      // Check local auth first
      const localUser = localAuth.getCurrentUser();
      if (localUser) {
        setUser(localUser);
        setLoading(false);
        clearTimeout(timeout);
        return;
      }
    } catch (e) {
      console.error('Local auth error:', e);
    }

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      clearTimeout(timeout);
    }, (error) => {
      console.error('Firebase auth error:', error);
      setLoading(false);
      clearTimeout(timeout);
    });

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Dashboard />;
      case 'timeline':
        return <Timeline />;
      case 'docs':
        return <Docs />;
      case 'team':
        return <Team />;
      case 'settings':
        return <Settings onLogout={handleLogout} />;
      default:
        return <Dashboard />;
    }
  };

  const handleLogout = () => {
    localAuth.logout();
    auth.signOut();
    setUser(null);
    setCurrentPage('home');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-fabrick-black flex flex-col items-center justify-center gap-8 p-6">
        <div className="relative">
          <div className="w-24 h-24 bg-fabrick-yellow rounded-3xl flex items-center justify-center shadow-yellow-glow transform rotate-12">
            <span className="text-5xl font-headline font-black text-fabrick-black">F</span>
          </div>
          <div className="absolute -inset-4 border-2 border-fabrick-yellow/20 rounded-[2.5rem] animate-pulse" />
        </div>
        
        <div className="flex flex-col items-center gap-4 text-center max-w-xs">
          <h2 className="text-white font-headline font-black uppercase tracking-[0.5em] text-xl">
            CASAS <span className="text-fabrick-yellow">FABRIS</span>
          </h2>
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-fabrick-yellow to-transparent" />
          <p className="text-fabrick-gray text-[10px] uppercase tracking-[0.25em] font-bold leading-relaxed">
            Sincronizando datos de obra y gestión de proyectos
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-fabrick-gray text-[9px] uppercase tracking-widest">Si la carga demora demasiado:</p>
          <button 
            onClick={() => setLoading(false)}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-fabrick-gray text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all active:scale-95"
          >
            Forzar inicio de aplicación
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorAdapter>
      {!user ? (
        <Landing onLoginSuccess={(u) => setUser(u)} />
      ) : (
        <Layout currentPage={currentPage} onPageChange={setCurrentPage} onLogout={handleLogout}>
          {renderPage()}
          <SupportChat />
          <AppAnalyzer />
        </Layout>
      )}
    </ErrorAdapter>
  );
}
