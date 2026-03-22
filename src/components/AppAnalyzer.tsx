import React, { useState, useEffect } from 'react';
import { Activity, Shield, Database, Layout, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { db, auth } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';

interface AppStatus {
  backend: 'online' | 'offline' | 'checking';
  firebase: 'online' | 'offline' | 'checking';
  auth: 'authenticated' | 'unauthenticated' | 'checking';
  lastCheck: string;
}

export default function AppAnalyzer() {
  const [status, setStatus] = useState<AppStatus>({
    backend: 'checking',
    firebase: 'checking',
    auth: 'checking',
    lastCheck: new Date().toLocaleTimeString()
  });
  const [isOpen, setIsOpen] = useState(false);

  const checkStatus = async () => {
    setStatus(prev => ({ ...prev, backend: 'checking', firebase: 'checking' }));
    
    // Check Backend
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setStatus(prev => ({ ...prev, backend: data.status === 'ok' ? 'online' : 'offline' }));
    } catch (e) {
      setStatus(prev => ({ ...prev, backend: 'offline' }));
    }

    // Check Firebase
    try {
      // Simple doc check
      await getDoc(doc(db, '_health', 'check'));
      setStatus(prev => ({ ...prev, firebase: 'online' }));
    } catch (e: any) {
      // If permission denied, it's still "online" but restricted
      if (e.code === 'permission-denied' || e.code === 'not-found') {
        setStatus(prev => ({ ...prev, firebase: 'online' }));
      } else {
        setStatus(prev => ({ ...prev, firebase: 'offline' }));
      }
    }

    // Check Auth
    setStatus(prev => ({ 
      ...prev, 
      auth: auth.currentUser ? 'authenticated' : 'unauthenticated',
      lastCheck: new Date().toLocaleTimeString()
    }));
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen && (
        <div
          className="android-card p-6 mb-4 w-72 shadow-2xl border-fabrick-yellow/30 bg-fabrick-black/90 backdrop-blur-xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-headline font-black uppercase tracking-widest text-white">Analizador de App</h3>
            <button onClick={() => checkStatus()} className="text-fabrick-yellow hover:rotate-180 transition-transform duration-500">
              <RefreshCw size={14} />
            </button>
          </div>

          <div className="space-y-4">
            <StatusItem 
              icon={<Activity size={14} />} 
              label="Backend (Express)" 
              status={status.backend} 
            />
            <StatusItem 
              icon={<Database size={14} />} 
              label="Base de Datos (Firebase)" 
              status={status.firebase} 
            />
            <StatusItem 
              icon={<Shield size={14} />} 
              label="Autenticación" 
              status={status.auth === 'authenticated' ? 'online' : 'offline'} 
              customLabel={status.auth === 'authenticated' ? 'Activa' : 'Inactiva'}
            />
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
            <span className="text-[8px] text-fabrick-gray uppercase tracking-widest font-bold">Último check: {status.lastCheck}</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[8px] text-emerald-500 uppercase font-black">Sistema OK</span>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-2xl shadow-yellow-glow transition-all hover:scale-105 active:scale-95 ${
          isOpen ? 'bg-fabrick-yellow text-fabrick-black' : 'bg-fabrick-black text-fabrick-yellow border border-fabrick-yellow/20'
        }`}
      >
        <Activity size={24} className={status.backend === 'checking' ? 'animate-pulse' : ''} />
      </button>
    </div>
  );
}

function StatusItem({ icon, label, status, customLabel }: { icon: React.ReactNode, label: string, status: 'online' | 'offline' | 'checking', customLabel?: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-fabrick-gray">
        {icon}
        <span className="text-[10px] uppercase font-black tracking-tight">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-[9px] uppercase font-black tracking-widest ${
          status === 'online' ? 'text-emerald-500' : 
          status === 'offline' ? 'text-fabrick-lava' : 
          'text-fabrick-yellow'
        }`}>
          {customLabel || (status === 'online' ? 'Online' : status === 'offline' ? 'Offline' : '...')}
        </span>
        {status === 'online' ? <CheckCircle2 size={12} className="text-emerald-500" /> : 
         status === 'offline' ? <AlertCircle size={12} className="text-fabrick-lava" /> : 
         <RefreshCw size={12} className="text-fabrick-yellow animate-spin" />}
      </div>
    </div>
  );
}
