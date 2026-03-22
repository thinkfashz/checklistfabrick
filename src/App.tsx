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
  console.log('App function executing...');
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
    console.log('App is in loading state');
    return (
      <div style={{ backgroundColor: '#050505', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'sans-serif' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: '#FACC15', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '40px', fontWeight: 'bold', color: 'black' }}>F</span>
        </div>
        <h2 style={{ letterSpacing: '0.5em', fontWeight: '900' }}>CASAS FABRIS</h2>
        <p style={{ color: '#71717A', fontSize: '10px', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
          Cargando sistema de gestión...
        </p>
        <button 
          onClick={() => {
            console.log('Manual override: setting loading to false');
            setLoading(false);
          }}
          style={{ marginTop: '40px', padding: '10px 20px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '10px', cursor: 'pointer' }}
        >
          FORZAR INICIO
        </button>
      </div>
    );
  }

  console.log('App is rendering main content, user:', user?.email || 'none');
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
