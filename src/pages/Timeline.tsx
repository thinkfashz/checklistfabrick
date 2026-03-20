import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  Circle,
  Plus,
  Bell,
  StickyNote,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Deadline } from '../types';
import TechBackground from '../components/TechBackground';
import { localTimeline, TimelineNote, TimelineAlarm } from '../services/timelineService';

export default function Timeline() {
  const [currentMonth, setCurrentMonth] = useState('Marzo 2024');
  const [selectedDate, setSelectedDate] = useState<number | null>(20);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [notes, setNotes] = useState<TimelineNote>({});
  const [alarms, setAlarms] = useState<TimelineAlarm>({});
  const [selectedDeadline, setSelectedDeadline] = useState<Deadline | null>(null);

  useEffect(() => {
    setNotes(localTimeline.getNotes());
    setAlarms(localTimeline.getAlarms());
  }, []);

  const saveNote = (day: number, text: string) => {
    const updated = { ...notes, [day]: text };
    setNotes(updated);
    localTimeline.saveNotes(updated);
  };

  const toggleAlarm = (day: number) => {
    const updated = { ...alarms, [day]: !alarms[day] };
    setAlarms(updated);
    localTimeline.saveAlarms(updated);
  };
  
  const deadlines: Deadline[] = [
    { id: '1', projectId: '1', title: 'Vaciado de Losa', date: '2024-03-25', sector: 'Sector A', priority: 'critical' },
    { id: '2', projectId: '1', title: 'Instalación Eléctrica', date: '2024-04-02', sector: 'Planta Alta', priority: 'active' },
    { id: '3', projectId: '1', title: 'Revisión Municipal', date: '2024-04-10', sector: 'General', priority: 'routine' },
    { id: '4', projectId: '1', title: 'Impermeabilización', date: '2024-03-28', sector: 'Azotea', priority: 'active' },
    { id: '5', projectId: '1', title: 'Colocación de Pisos', date: '2024-04-15', sector: 'Planta Baja', priority: 'routine' },
    { id: '6', projectId: '1', title: 'Pintura Exterior', date: '2024-04-20', sector: 'Fachada', priority: 'active' },
    { id: '7', projectId: '1', title: 'Entrega de Carpintería', date: '2024-03-30', sector: 'General', priority: 'critical' },
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="container mx-auto px-6 py-8 relative">
      <TechBackground 
        className="opacity-20 fixed"
      />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-[10px] font-label uppercase tracking-[0.3em] text-fabrick-lava font-bold mb-2 block">
              Calendario del Proyecto
            </span>
            <h2 className="text-4xl font-headline font-bold tracking-tighter uppercase text-white">CRONOGRAMA</h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-sm border border-white/10">
              <button className="text-fabrick-gray hover:text-white transition-colors"><ChevronLeft size={18} /></button>
              <span className="text-xs font-bold uppercase tracking-widest min-w-[100px] text-center text-white">{currentMonth}</span>
              <button className="text-fabrick-gray hover:text-white transition-colors"><ChevronRight size={18} /></button>
            </div>
            <button className="px-4 py-2 bg-fabrick-lava text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:brightness-110 transition-all">
              Agregar Evento
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar Grid */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="android-card p-8"
            >
              <div className="grid grid-cols-7 gap-6 mb-8">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
                  <div key={day} className="text-center text-[11px] font-headline uppercase tracking-[0.2em] text-fabrick-gray font-black">
                    {day}
                  </div>
                ))}
                {days.map((day, idx) => {
                  const hasDeadline = deadlines.find(d => d.date.endsWith(`-${day < 10 ? '0' + day : day}`));
                  const hasNote = notes[day];
                  const hasAlarm = alarms[day];
                  const isSelected = selectedDate === day;

                  return (
                    <motion.div 
                      key={day} 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.01 * idx }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedDate(day)}
                      className={`aspect-square flex flex-col items-center justify-center rounded-2xl border transition-all cursor-pointer relative group active-scale ${
                        isSelected ? 'border-fabrick-yellow bg-fabrick-yellow/10 shadow-yellow-glow' :
                        hasDeadline ? 'border-fabrick-yellow/40 bg-fabrick-yellow/5 hover:bg-fabrick-yellow/10' : 
                        'border-white/5 hover:border-white/20'
                      }`}
                    >
                      <span className={`text-sm font-black ${isSelected || hasDeadline ? 'text-white' : 'text-fabrick-gray'}`}>{day}</span>
                      
                      <div className="absolute bottom-2 flex gap-1">
                        {hasDeadline && (
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            hasDeadline.priority === 'critical' ? 'bg-red-500' : 'bg-fabrick-yellow'
                          }`} />
                        )}
                        {hasNote && <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                        {hasAlarm && <div className="w-1.5 h-1.5 rounded-full bg-fabrick-yellow animate-pulse" />}
                      </div>

                      {/* Hover tooltip for quick note preview */}
                      {hasNote && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 ios-blur border border-white/10 p-2 rounded-lg text-[8px] uppercase font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 w-24 text-center">
                          {hasNote}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Selected Date Details */}
            <AnimatePresence mode="wait">
              {selectedDate && (
                <motion.div 
                  key={selectedDate}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="android-card p-6 border-l-4 border-fabrick-yellow"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-headline text-xl font-black uppercase tracking-tight text-white">
                      Detalles: {selectedDate} de Marzo
                    </h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => toggleAlarm(selectedDate)}
                        className={`p-2 rounded-xl transition-all active-scale ${alarms[selectedDate] ? 'bg-fabrick-yellow text-fabrick-black' : 'bg-white/5 text-fabrick-gray hover:text-white'}`}
                      >
                        <Bell size={18} />
                      </button>
                      <button 
                        onClick={() => setShowNoteModal(true)}
                        className="p-2 bg-white/5 text-fabrick-gray hover:text-white rounded-xl transition-all active-scale"
                      >
                        <StickyNote size={18} />
                      </button>
                    </div>
                  </div>

                  {notes[selectedDate] ? (
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 mb-4">
                      <p className="text-sm text-fabrick-gray italic">"{notes[selectedDate]}"</p>
                    </div>
                  ) : (
                    <p className="text-xs text-fabrick-gray uppercase font-bold tracking-widest mb-4">Sin notas para este día</p>
                  )}

                  {deadlines.filter(d => d.date.endsWith(`-${selectedDate < 10 ? '0' + selectedDate : selectedDate}`)).map(d => (
                    <div key={d.id} className="flex items-center gap-4 p-4 bg-fabrick-yellow/5 rounded-2xl border border-fabrick-yellow/20 active-scale cursor-pointer">
                      <div className="p-2 bg-fabrick-yellow/20 rounded-xl text-fabrick-yellow">
                        <AlertCircle size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black uppercase text-white">{d.title}</h4>
                        <p className="text-[10px] text-fabrick-gray uppercase font-bold">{d.sector}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Upcoming List */}
          <div className="space-y-6">
            <h3 className="font-headline text-2xl font-black tracking-tighter uppercase text-white">Próximos Hitos</h3>
            <div className="space-y-4">
              {deadlines.map((deadline, idx) => (
                <motion.div 
                  key={deadline.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  onClick={() => setSelectedDeadline(deadline)}
                  className={`android-card p-5 border-l-4 cursor-pointer transition-all active-scale ${
                    selectedDeadline?.id === deadline.id ? 'border-fabrick-yellow bg-fabrick-yellow/5' : 'border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-fabrick-yellow">{deadline.date}</span>
                    {deadline.priority === 'critical' && <AlertCircle size={14} className="text-red-500" />}
                  </div>
                  <h4 className="text-sm font-black uppercase mb-1 text-white">{deadline.title}</h4>
                  <p className="text-[10px] text-fabrick-gray uppercase font-bold tracking-widest">{deadline.sector}</p>
                  
                  <AnimatePresence>
                    {selectedDeadline?.id === deadline.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 pt-4 border-t border-white/5 space-y-2 overflow-hidden"
                      >
                        <p className="text-[10px] text-fabrick-gray leading-relaxed">
                          Esta etapa requiere la supervisión del Arq. Roberto Silva y la validación de materiales previa.
                        </p>
                        <div className="flex items-center gap-2 text-[9px] text-fabrick-yellow uppercase font-black">
                          <Clock size={10} />
                          <span>Prioridad: {deadline.priority}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Note Modal */}
      <AnimatePresence>
        {showNoteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNoteModal(false)}
              className="absolute inset-0 bg-fabrick-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel p-8 w-full max-w-md relative z-10 border-fabrick-yellow/30"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline text-xl font-black uppercase text-white">Añadir Nota</h3>
                <button onClick={() => setShowNoteModal(false)} className="text-fabrick-gray hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <textarea 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-fabrick-yellow transition-all h-32 mb-6 text-white"
                placeholder="Escribe tu nota aquí..."
                value={notes[selectedDate || 0] || ''}
                onChange={(e) => saveNote(selectedDate || 0, e.target.value)}
              />
              <button 
                onClick={() => setShowNoteModal(false)}
                className="w-full py-4 bg-fabrick-yellow text-fabrick-black font-black uppercase tracking-widest rounded-xl shadow-yellow-glow hover:brightness-110 transition-all"
              >
                Guardar Nota
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
