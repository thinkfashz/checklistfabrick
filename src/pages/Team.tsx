import React from 'react';
import { Users, CheckCircle2, AlertCircle, Clock, HardHat, Construction, ShieldCheck } from 'lucide-react';
import TechBackground from '../components/TechBackground';

const teamMembers = [
  { id: 1, name: 'Arq. Roberto Méndez', role: 'Director de Proyecto', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
  { id: 2, name: 'Ing. Carla Soto', role: 'Ingeniera Estructural', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
  { id: 3, name: 'Juan Pérez', role: 'Capataz de Obra', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' },
];

const constructionProgress = [
  {
    id: 1,
    title: 'Cimentación y Radier',
    status: 'Completado',
    date: '15 Mar 2024',
    details: 'Excavación profunda, instalación de enfierradura y vaciado de hormigón H-30. Pruebas de resistencia aprobadas.',
    icon: ShieldCheck,
    color: 'text-fabrick-yellow'
  },
  {
    id: 2,
    title: 'Estructura Soportante',
    status: 'En Progreso',
    date: 'En curso',
    details: 'Montaje de muros de carga y vigas maestras. Avance del 75% en la planta baja.',
    icon: Construction,
    color: 'text-fabrick-lava'
  },
  {
    id: 3,
    title: 'Instalaciones Sanitarias',
    status: 'Pendiente',
    date: 'Próximamente',
    details: 'Trazado de tuberías de agua potable y alcantarillado según plano sanitario.',
    icon: HardHat,
    color: 'text-fabrick-gray'
  }
];

const resolvedIssues = [
  {
    id: 1,
    issue: 'Desviación en nivelación de terreno sector norte',
    solution: 'Se realizó relleno controlado con estabilizado y compactación mecánica. Nivelación verificada con láser.',
    status: 'Resuelto',
    date: '05 Mar 2024'
  },
  {
    id: 2,
    issue: 'Retraso en entrega de enfierradura por proveedor',
    solution: 'Se activó proveedor de respaldo local para evitar paralización de faena. Costo absorbido por contingencia.',
    status: 'Resuelto',
    date: '10 Mar 2024'
  }
];

export default function Team() {
  return (
    <div className="container mx-auto px-6 py-12 relative">
      <TechBackground 
        className="opacity-20 fixed"
      />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-headline font-bold uppercase tracking-tighter text-white">Equipo y Avance</h2>
            <p className="text-fabrick-gray font-body mt-2">Detalle técnico de la obra y personal a cargo.</p>
          </div>
          <div className="flex -space-x-4">
            {teamMembers.map(member => (
              <div 
                key={member.id} 
                className="w-12 h-12 rounded-full border-2 border-fabrick-black overflow-hidden relative group cursor-pointer hover:z-10 transition-all"
              >
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-fabrick-lava/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Users size={16} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Details */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-headline text-xl font-bold uppercase tracking-widest text-fabrick-yellow mb-6">Bitácora de Obra</h3>
            <div className="space-y-4">
              {constructionProgress.map((item, i) => (
                <div 
                  key={item.id}
                  className="android-card p-6 border-l-4 border-white/10 hover:border-fabrick-lava transition-all cursor-default active-scale"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 bg-white/5 rounded-2xl ${item.color}`}>
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-headline font-bold text-lg text-white">{item.title}</h4>
                        <p className="text-[10px] uppercase tracking-widest text-fabrick-gray">{item.date}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-lg border ${
                      item.status === 'Completado' ? 'border-fabrick-yellow/30 text-fabrick-yellow bg-fabrick-yellow/5' :
                      item.status === 'En Progreso' ? 'border-fabrick-lava/30 text-fabrick-lava bg-fabrick-lava/5' :
                      'border-white/10 text-fabrick-gray bg-white/5'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-fabrick-gray leading-relaxed">{item.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resolved Issues */}
          <div className="space-y-6">
            <h3 className="font-headline text-xl font-bold uppercase tracking-widest text-fabrick-lava mb-6">Incidencias Resueltas</h3>
            <div className="space-y-4">
              {resolvedIssues.map((issue, i) => (
                <div 
                  key={issue.id}
                  className="p-5 bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden cursor-default active-scale"
                >
                  <div className="absolute top-0 right-0 p-2">
                    <CheckCircle2 size={14} className="text-fabrick-yellow" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle size={14} className="text-fabrick-lava" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white">Reporte #{issue.id}</p>
                  </div>
                  <h5 className="text-xs font-bold text-white mb-2">{issue.issue}</h5>
                  <p className="text-[11px] text-fabrick-gray mb-3 italic">" {issue.solution} "</p>
                  <div className="flex justify-between items-center text-[9px] uppercase font-bold text-fabrick-gray">
                    <span>{issue.date}</span>
                    <span className="text-fabrick-yellow">Cerrado</span>
                  </div>
                </div>
              ))}
              
              <div 
                className="p-6 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center"
              >
                <Clock size={32} className="text-fabrick-gray mb-3 opacity-30" />
                <p className="text-xs text-fabrick-gray uppercase tracking-widest font-bold">Sin incidencias críticas activas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
