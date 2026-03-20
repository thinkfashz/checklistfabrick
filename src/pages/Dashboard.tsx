import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Clock, 
  Calendar, 
  ChevronRight, 
  ArrowUpRight, 
  Activity,
  CheckCircle2,
  Circle,
  AlertCircle,
  Calculator,
  Home,
  ListTodo,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion } from 'motion/react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { Project, Phase, Deadline, Post } from '../types';

export default function Dashboard() {
  const [project, setProject] = useState<Project | null>(null);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Calculator state
  const [area, setArea] = useState<number>(120);
  const pricePerM2 = 750000;
  const totalEstimatedCost = area * pricePerM2;

  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>(null);
  const [phaseTasks, setPhaseTasks] = useState<Record<string, { id: string; label: string; completed: boolean }[]>>({
    '1': [
      { id: '1-1', label: 'Limpieza de terreno', completed: true },
      { id: '1-2', label: 'Nivelación', completed: true },
      { id: '1-3', label: 'Excavaciones', completed: false },
    ],
    '2': [
      { id: '2-1', label: 'Instalación de faenas', completed: false },
      { id: '2-2', label: 'Trazado', completed: false },
    ],
    '3': [
      { id: '3-1', label: 'Enfierradura', completed: false },
      { id: '3-2', label: 'Hormigonado', completed: false },
    ],
  });

  const toggleTask = (phaseId: string, taskId: string) => {
    setPhaseTasks(prev => ({
      ...prev,
      [phaseId]: prev[phaseId].map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
    }));
  };

  const calculateProgress = (phaseId: string) => {
    const tasks = phaseTasks[phaseId] || [];
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  useEffect(() => {
    // Mock data in Spanish
    const mockProject: Project = {
      id: '1',
      name: 'RESIDENCIA VALLE AZUL',
      progress: 64,
      activePhase: 'Obra Gris',
      lastUpdated: 'hace 2 horas',
      deliveryCountdown: 142,
      constructionPhaseProgress: 75
    };
    setProject(mockProject);

    const mockPhases: Phase[] = [
      { id: '1', projectId: '1', name: 'Cimentación', status: 'completed', progress: 100, order: 1 },
      { id: '2', projectId: '1', name: 'Estructura', status: 'completed', progress: 100, order: 2 },
      { id: '3', projectId: '1', name: 'Obra Gris', status: 'in-progress', progress: 45, order: 3 },
      { id: '4', projectId: '1', name: 'Instalaciones', status: 'pending', progress: 0, order: 4 },
      { id: '5', projectId: '1', name: 'Acabados', status: 'pending', progress: 0, order: 5 },
      { id: '6', projectId: '1', name: 'Exteriores', status: 'pending', progress: 0, order: 6 },
    ];
    setPhases(mockPhases);

    const mockDeadlines: Deadline[] = [
      { id: '1', projectId: '1', title: 'Vaciado de Losa', date: '25 Mar', sector: 'Sector A', priority: 'critical' },
      { id: '2', projectId: '1', title: 'Instalación Eléctrica', date: '02 Abr', sector: 'Planta Alta', priority: 'active' },
      { id: '3', projectId: '1', title: 'Revisión Municipal', date: '10 Abr', sector: 'General', priority: 'routine' },
      { id: '4', projectId: '1', title: 'Entrega de Ventanería', date: '15 Abr', sector: 'Fachada', priority: 'active' },
    ];
    setDeadlines(mockDeadlines);

    const mockPosts: Post[] = [
      { 
        id: '1', 
        projectId: '1', 
        authorId: 'a1', 
        authorName: 'Arq. Roberto Silva', 
        authorRole: 'Director de Obra', 
        content: 'REPORTE: Se ha completado la inspección de la estructura principal. Todo cumple con los estándares de seguridad y el cronograma. Avance del 100% en radier.',
        timestamp: '2024-03-19T14:30:00Z',
        priority: 'high',
        avatar: 'https://i.pravatar.cc/150?u=roberto'
      },
      { 
        id: '2', 
        projectId: '1', 
        authorId: 'a2', 
        authorName: 'Ing. Elena Torres', 
        authorRole: 'Estructuralista', 
        content: 'ERROR RESUELTO: Se corrigió la desviación en el sector norte. Se aplicó relleno compactado y nivelación láser exitosa.',
        timestamp: '2024-03-18T09:15:00Z',
        priority: 'high',
        avatar: 'https://i.pravatar.cc/150?u=elena'
      },
      { 
        id: '3', 
        projectId: '1', 
        authorId: 'u1', 
        authorName: 'Juan Pérez', 
        authorRole: 'Propietario', 
        content: 'Confirmado el cambio de azulejos para el baño principal. Gracias por la rápida gestión.',
        timestamp: '2024-03-17T16:45:00Z',
        avatar: 'https://i.pravatar.cc/150?u=juan'
      },
      { 
        id: '4', 
        projectId: '1', 
        authorId: 'a1', 
        authorName: 'Arq. Roberto Silva', 
        authorRole: 'Director de Obra', 
        content: 'AVANCE: Iniciamos montaje de muros de carga en planta baja. Materiales de instalaciones sanitarias recibidos.',
        timestamp: '2024-03-16T11:00:00Z',
        avatar: 'https://i.pravatar.cc/150?u=roberto'
      },
      { 
        id: '5', 
        projectId: '1', 
        authorId: 'a3', 
        authorName: 'Lic. Martha Gómez', 
        authorRole: 'Gestoría', 
        content: 'El permiso de habitabilidad parcial ha sido ingresado a la municipalidad. Esperamos respuesta en 5 días hábiles.',
        timestamp: '2024-03-16T11:00:00Z',
        avatar: 'https://i.pravatar.cc/150?u=martha'
      }
    ];
    setRecentPosts(mockPosts);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-12 h-12 border-4 border-fabrick-lava border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-8 relative overflow-hidden border-t-4 border-fabrick-yellow shadow-yellow-glow"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-fabrick-yellow/5 blur-[100px] rounded-full -mr-32 -mt-32 animate-pulse" />
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <span className="text-[10px] font-headline uppercase tracking-[0.4em] text-fabrick-yellow font-black mb-2 block">
                  Estado del Proyecto
                </span>
                <h2 className="text-5xl font-headline font-black tracking-tighter uppercase text-white leading-none">
                  RESIDENCIA <span className="text-fabrick-yellow">VALLE AZUL</span>
                </h2>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-fabrick-yellow/10 rounded-full border border-fabrick-yellow/20">
                <div className="w-2 h-2 bg-fabrick-yellow rounded-full animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-widest text-fabrick-yellow">En Construcción</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <p className="text-[10px] font-headline uppercase tracking-widest text-fabrick-gray">Progreso General</p>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-headline font-bold text-white">{project?.progress}%</span>
                  <TrendingUp size={20} className="text-fabrick-yellow mb-2" />
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${project?.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-fabrick-yellow to-fabrick-lava" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-headline uppercase tracking-widest text-fabrick-gray">Fase Actual</p>
                <p className="text-2xl font-headline font-bold uppercase italic text-fabrick-yellow">{project?.activePhase}</p>
                <div className="flex items-center gap-2 text-xs text-fabrick-gray">
                  <Clock size={14} />
                  <span>Actualizado {project?.lastUpdated}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-headline uppercase tracking-widest text-fabrick-gray">Días para Entrega</p>
                <p className="text-5xl font-headline font-bold text-white">{project?.deliveryCountdown}</p>
                <p className="text-[10px] font-headline uppercase tracking-widest text-fabrick-lava font-bold">Cuenta Regresiva</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Calculator Section */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-8 border-l-4 border-fabrick-yellow bg-gradient-to-br from-fabrick-card to-fabrick-yellow/5 relative overflow-hidden"
          >
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-fabrick-yellow/10 blur-3xl rounded-full" />
            
            <h3 className="font-headline text-[12px] uppercase tracking-[0.2em] font-black mb-6 flex items-center gap-3 text-white">
              <Calculator size={18} className="text-fabrick-yellow" /> 
              <span>Calculadora de Presupuesto</span>
            </h3>
            
            <div className="space-y-6 relative z-10">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase text-fabrick-gray font-black tracking-widest">Superficie (m²)</label>
                  <span className="text-fabrick-yellow font-headline font-bold">{area} m²</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="500" 
                  step="5"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-fabrick-yellow"
                />
                <div className="flex justify-between text-[8px] text-fabrick-gray font-bold uppercase">
                  <span>40 m²</span>
                  <span>500 m²</span>
                </div>
              </div>

              <div className="p-6 bg-fabrick-black/40 rounded-xl border border-white/5 shadow-inner group transition-all hover:border-fabrick-yellow/20">
                <p className="text-[10px] text-fabrick-gray uppercase mb-2 font-black tracking-widest flex items-center gap-2">
                  Inversión Estimada Total
                  <ArrowUpRight size={12} className="text-fabrick-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-headline font-black text-white tracking-tighter">
                    ${totalEstimatedCost.toLocaleString('es-CL')}
                  </p>
                  <span className="text-xs text-fabrick-yellow font-black uppercase">CLP</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[10px] text-fabrick-gray bg-white/5 p-3 rounded-lg border border-white/5">
                <div className="w-8 h-8 rounded-full bg-fabrick-yellow/10 flex items-center justify-center shrink-0">
                  <AlertCircle size={14} className="text-fabrick-yellow" />
                </div>
                <p className="leading-tight">
                  Basado en un valor de <span className="text-white font-bold">$750.000 CLP</span> por metro cuadrado de construcción llave en mano.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Phases List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end">
            <h3 className="font-headline text-2xl font-bold tracking-tighter uppercase text-white">Fases de Construcción</h3>
            <button className="text-[10px] font-bold uppercase tracking-widest text-fabrick-yellow flex items-center gap-1">
              Cronograma Completo <ArrowUpRight size={12} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {phases.map((phase) => (
                <div 
                  key={phase.id} 
                  onClick={() => setSelectedPhaseId(phase.id)}
                  className={`glass-panel p-5 transition-all cursor-pointer group relative ${
                    selectedPhaseId === phase.id ? 'border-fabrick-yellow ring-1 ring-fabrick-yellow/50' : 'hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        phase.status === 'completed' ? 'bg-fabrick-yellow text-fabrick-black' :
                        phase.status === 'in-progress' ? 'bg-fabrick-yellow/20 text-fabrick-yellow' :
                        'bg-white/5 text-fabrick-gray'
                      }`}>
                        {phase.status === 'completed' ? <CheckCircle2 size={20} /> : 
                         phase.status === 'in-progress' ? <Activity size={20} className="animate-pulse" /> : 
                         <Circle size={20} />}
                      </div>
                      <div>
                        <p className="text-sm font-black uppercase tracking-widest text-white">{phase.name}</p>
                        <p className="text-[10px] text-fabrick-gray uppercase font-bold">
                          {phase.status === 'completed' ? 'Completado' : phase.status === 'in-progress' ? 'En Ejecución' : 'Pendiente'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-headline font-black text-white">{phase.progress}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${phase.progress}%` }}
                      className={`h-full transition-all duration-1000 ${
                        phase.status === 'completed' ? 'bg-fabrick-yellow' : 'bg-fabrick-yellow/50'
                      }`} 
                    />
                  </div>
                  {selectedPhaseId === phase.id && (
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-fabrick-yellow rounded-full hidden md:block" />
                  )}
                </div>
              ))}
            </div>

            {/* Checklist for selected phase */}
            <div className="glass-panel p-6 border-fabrick-yellow/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-fabrick-yellow/10 rounded-lg">
                  <ListTodo size={20} className="text-fabrick-yellow" />
                </div>
                <h4 className="font-headline font-black text-lg uppercase tracking-tight">
                  Tareas: {phases.find(p => p.id === selectedPhaseId)?.name}
                </h4>
              </div>

              <div className="space-y-3">
                {phaseTasks[selectedPhaseId || '']?.map((task) => (
                  <div 
                    key={task.id}
                    onClick={() => toggleTask(selectedPhaseId!, task.id)}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                      task.completed ? 'bg-fabrick-yellow border-fabrick-yellow text-fabrick-black' : 'border-white/20 group-hover:border-fabrick-yellow/50'
                    }`}>
                      {task.completed && <CheckCircle2 size={14} strokeWidth={3} />}
                    </div>
                    <span className={`text-sm font-medium transition-all ${
                      task.completed ? 'text-fabrick-gray line-through' : 'text-white'
                    }`}>
                      {task.label}
                    </span>
                  </div>
                )) || (
                  <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
                    <ListTodo size={40} className="mb-4" />
                    <p className="text-xs uppercase font-black tracking-widest">Selecciona una fase para ver tareas</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity / Wall */}
        <div className="space-y-6">
          <h3 className="font-headline text-2xl font-bold tracking-tighter uppercase text-white">Muro del Proyecto</h3>
          <div className="glass-panel p-6 space-y-6 max-h-[500px] overflow-y-auto hide-scrollbar">
            {recentPosts.map((post) => (
              <div key={post.id} className="relative pl-4 border-l border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <img src={post.avatar} alt={post.authorName} className="w-6 h-6 rounded-full" />
                  <div>
                    <p className="text-[10px] font-bold text-white">{post.authorName}</p>
                    <p className="text-[8px] text-fabrick-gray uppercase tracking-widest">{post.authorRole}</p>
                  </div>
                </div>
                <p className="text-xs text-fabrick-gray leading-relaxed mb-2">{post.content}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[8px] text-fabrick-gray uppercase">hace poco</span>
                  {post.priority === 'high' && (
                    <span className="flex items-center gap-1 text-[8px] text-fabrick-lava font-bold uppercase">
                      <AlertCircle size={8} /> Importante
                    </span>
                  )}
                </div>
              </div>
            ))}
            <button className="w-full py-3 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-colors rounded-sm">
              Ver Toda la Actividad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
