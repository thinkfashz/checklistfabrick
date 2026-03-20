import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  MoreVertical, 
  Plus,
  File,
  Image as ImageIcon,
  FileCode,
  ExternalLink,
  X,
  Eye,
  Shield,
  Gavel,
  Map as MapIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectFile } from '../types';

export default function Docs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  
  const files: ProjectFile[] = [
    { id: '1', projectId: '1', name: 'Planos_Arquitectonicos_V2.pdf', date: '2024-03-15', size: '12.4 MB', category: 'blueprints' },
    { id: '2', projectId: '1', name: 'Permiso_Construccion_Municipal.pdf', date: '2024-02-28', size: '2.1 MB', category: 'legal' },
    { id: '3', projectId: '1', name: 'Calculo_Estructural_Final.pdf', date: '2024-03-10', size: '8.7 MB', category: 'blueprints' },
    { id: '4', projectId: '1', name: 'Contrato_Obra_Civil.pdf', date: '2024-01-15', size: '1.5 MB', category: 'legal' },
    { id: '5', projectId: '1', name: 'Seguro_Riesgos_Laborales.pdf', date: '2024-03-01', size: '0.8 MB', category: 'safety' },
    { id: '6', projectId: '1', name: 'Render_Fachada_Principal.jpg', date: '2024-03-18', size: '4.2 MB', category: 'blueprints' },
    { id: '7', projectId: '1', name: 'Protocolo_Seguridad_COVID.pdf', date: '2024-02-10', size: '0.9 MB', category: 'safety' },
    { id: '8', projectId: '1', name: 'Escritura_Terreno_Notaria.pdf', date: '2024-01-20', size: '5.5 MB', category: 'legal' },
  ];

  const categories = [
    { id: 'all', label: 'Todos los Archivos' },
    { id: 'blueprints', label: 'Planos' },
    { id: 'legal', label: 'Legal' },
    { id: 'safety', label: 'Seguridad' },
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <span className="text-[10px] font-label uppercase tracking-[0.3em] text-fabrick-lava font-bold mb-2 block">
            Repositorio del Proyecto
          </span>
          <h2 className="text-4xl font-headline font-bold tracking-tighter uppercase">DOCUMENTOS</h2>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-fabrick-gray" size={16} />
            <input 
              type="text" 
              placeholder="Buscar archivos..."
              className="w-full bg-white/5 border border-white/10 rounded-sm py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-fabrick-lava transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 transition-colors">
            <Filter size={18} />
          </button>
          <button className="px-4 py-2 bg-fabrick-lava text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:brightness-110 transition-all flex items-center gap-2">
            <Plus size={14} /> Subir
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <div className="space-y-2">
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full text-left px-5 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-between ${
                activeCategory === cat.id ? 'bg-fabrick-yellow text-fabrick-black shadow-yellow-glow' : 'text-fabrick-gray hover:bg-white/5 border border-transparent hover:border-white/10'
              }`}
            >
              {cat.label}
              {cat.id === 'blueprints' && <MapIcon size={14} />}
              {cat.id === 'legal' && <Gavel size={14} />}
              {cat.id === 'safety' && <Shield size={14} />}
            </button>
          ))}
          
          <div className="mt-12 p-6 glass-panel border-dashed border-white/10 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Plus className="text-fabrick-gray" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-fabrick-gray">Arrastra archivos aquí para subir</p>
          </div>
        </div>

        {/* Files List */}
        <div className="lg:col-span-3">
          <div className="glass-panel overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-label uppercase tracking-widest text-fabrick-gray">
                  <th className="px-6 py-4 font-bold">Nombre</th>
                  <th className="px-6 py-4 font-bold">Categoría</th>
                  <th className="px-6 py-4 font-bold">Fecha</th>
                  <th className="px-6 py-4 font-bold">Tamaño</th>
                  <th className="px-6 py-4 font-bold"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {files
                  .filter(f => activeCategory === 'all' || f.category === activeCategory)
                  .filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((file) => (
                  <tr 
                    key={file.id} 
                    onClick={() => setSelectedFile(file)}
                    className="group hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-fabrick-yellow group-hover:bg-fabrick-yellow/10 transition-colors">
                          <FileText size={20} />
                        </div>
                        <span className="text-sm font-bold group-hover:text-fabrick-yellow transition-colors">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-white/5 text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10 text-fabrick-gray">
                        {file.category === 'blueprints' ? 'Planos' : file.category === 'legal' ? 'Legal' : 'Seguridad'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-[11px] text-fabrick-gray font-bold uppercase">{file.date}</td>
                    <td className="px-6 py-5 text-[11px] text-fabrick-gray font-bold uppercase">{file.size}</td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:text-fabrick-yellow transition-colors bg-white/5 rounded-lg"><Download size={18} /></button>
                        <button className="p-2 hover:text-fabrick-yellow transition-colors bg-white/5 rounded-lg"><Eye size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* File Preview Modal */}
      <AnimatePresence>
        {selectedFile && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFile(null)}
              className="absolute inset-0 bg-fabrick-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-panel p-0 w-full max-w-4xl relative z-10 border-fabrick-yellow/30 overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-fabrick-yellow text-fabrick-black rounded-xl">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-headline text-xl font-black uppercase tracking-tight">{selectedFile.name}</h3>
                    <p className="text-[10px] text-fabrick-gray uppercase font-bold tracking-widest">{selectedFile.category} • {selectedFile.size}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedFile(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-12 flex flex-col items-center justify-center bg-fabrick-black/40 min-h-[400px]">
                <div className="w-24 h-24 bg-fabrick-yellow/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <FileText size={48} className="text-fabrick-yellow" />
                </div>
                <h4 className="text-2xl font-headline font-black uppercase mb-2">Vista Previa No Disponible</h4>
                <p className="text-fabrick-gray text-center max-w-md mb-8">
                  El archivo <span className="text-white font-bold">{selectedFile.name}</span> está listo para ser descargado o revisado en el visor externo.
                </p>
                <div className="flex gap-4">
                  <button className="px-8 py-4 bg-fabrick-yellow text-fabrick-black font-black uppercase tracking-widest rounded-xl shadow-yellow-glow hover:brightness-110 transition-all flex items-center gap-2">
                    <Download size={20} /> Descargar Archivo
                  </button>
                  <button className="px-8 py-4 bg-white/5 text-white font-black uppercase tracking-widest rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                    Abrir en Visor
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
