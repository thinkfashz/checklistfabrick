import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Globe, 
  Mail, 
  Phone, 
  Camera,
  Save,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../firebase';
import TechBackground from '../components/TechBackground';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [profile, setProfile] = useState({
    name: auth.currentUser?.displayName || 'Faubricio',
    email: auth.currentUser?.email || 'faubricioedms@gmail.com',
    phone: '+56 9 1234 5678',
    role: 'Propietario',
    bio: 'Construyendo el hogar de mis sueños con CASAS FABRIS.'
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'security', label: 'Seguridad', icon: Lock },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'privacy', label: 'Privacidad', icon: Shield },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-6 py-12 relative">
      <TechBackground 
        className="opacity-20 fixed"
      />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl font-headline font-black uppercase tracking-tight mb-2">Ajustes</h1>
            <p className="text-fabrick-gray font-bold uppercase tracking-widest text-xs">Gestiona tu cuenta y preferencias</p>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-4 bg-fabrick-yellow text-fabrick-black font-black uppercase tracking-widest rounded-xl shadow-yellow-glow hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-fabrick-black/30 border-t-fabrick-black rounded-full animate-spin" />
            ) : (
              <Save size={20} />
            )}
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
          {/* Sidebar Tabs */}
          <div className="space-y-2">
            {tabs.map((tab, idx) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${
                  activeTab === tab.id 
                    ? 'bg-fabrick-yellow text-fabrick-black border-fabrick-yellow shadow-yellow-glow' 
                    : 'text-fabrick-gray hover:bg-white/5 border-transparent hover:border-white/10'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="android-card space-y-8"
                >
                  <div className="flex items-center gap-8 pb-8 border-b border-white/5">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-3xl bg-fabrick-yellow flex items-center justify-center text-fabrick-black text-4xl font-black shadow-yellow-glow overflow-hidden active-scale cursor-pointer">
                        {profile.name.charAt(0)}
                      </div>
                      <button className="absolute -bottom-2 -right-2 p-3 bg-white text-fabrick-black rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity active-scale">
                        <Camera size={20} />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-2xl font-headline font-black uppercase mb-1">{profile.name}</h3>
                      <p className="text-fabrick-yellow text-[10px] font-black uppercase tracking-widest">{profile.role}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-fabrick-gray px-1">Nombre Completo</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-fabrick-gray" size={18} />
                        <input 
                          type="text" 
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-fabrick-yellow outline-none transition-colors text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-fabrick-gray px-1">Correo Electrónico</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-fabrick-gray" size={18} />
                        <input 
                          type="email" 
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-fabrick-yellow outline-none transition-colors text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-fabrick-gray px-1">Teléfono de Contacto</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-fabrick-gray" size={18} />
                        <input 
                          type="tel" 
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-fabrick-yellow outline-none transition-colors text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-fabrick-gray px-1">Biografía</label>
                      <textarea 
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        rows={1}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-sm font-bold focus:border-fabrick-yellow outline-none transition-colors resize-none text-white"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="android-card space-y-8"
                >
                  <div className="pb-8 border-b border-white/5">
                    <h3 className="text-2xl font-headline font-black uppercase mb-1">Seguridad</h3>
                    <p className="text-fabrick-gray text-[10px] font-black uppercase tracking-widest">Actualiza tu contraseña y protege tu cuenta</p>
                  </div>

                  <div className="max-w-md space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-fabrick-gray px-1">Contraseña Actual</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-fabrick-gray" size={18} />
                        <input 
                          type="password" 
                          value={security.currentPassword}
                          onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-fabrick-yellow outline-none transition-colors text-white"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-fabrick-gray px-1">Nueva Contraseña</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-fabrick-gray" size={18} />
                        <input 
                          type="password" 
                          value={security.newPassword}
                          onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-fabrick-yellow outline-none transition-colors text-white"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-fabrick-gray px-1">Confirmar Nueva Contraseña</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-fabrick-gray" size={18} />
                        <input 
                          type="password" 
                          value={security.confirmPassword}
                          onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-fabrick-yellow outline-none transition-colors text-white"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 bg-fabrick-yellow text-fabrick-black px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50"
          >
            <CheckCircle2 size={24} />
            <span className="font-black uppercase tracking-widest text-xs">Cambios guardados con éxito</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
