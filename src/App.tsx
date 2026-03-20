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

export default function App() {
  const [user, setUser] = useState<FirebaseUser | LocalUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Check local auth first
    const localUser = localAuth.getCurrentUser();
    if (localUser) {
      setUser(localUser);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    localAuth.logout();
    auth.signOut();
    setUser(null);
    setCurrentPage('home');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-fabrick-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-fabrick-lava border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Landing onLoginSuccess={(u) => setUser(u)} />;
  }

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

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage} onLogout={handleLogout}>
      {renderPage()}
      <SupportChat />
    </Layout>
  );
}
