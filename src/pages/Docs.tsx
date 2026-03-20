import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  MoreVertical, 
  Plus,
  File,
  X,
  Eye,
  Shield,
  Gavel,
  Map as MapIcon,
  ExternalLink,
  Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectFile } from '../types';
import TechBackground from '../components/TechBackground';
import { localDocs } from '../services/docService';

export default function Docs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [files, setFiles] = useState<ProjectFile[]>([]);

  useEffect(() => {
    setFiles(localDocs.getFiles());
  }, []);

  const handleUpload = () => {
    // Mock upload
    const newFile: Omit<ProjectFile, 'id'> = {
      projectId: '1',
      name: `Nuevo_Documento_${new Date().getTime()}.pdf`,
      date: new Date().toISOString().split('T')[0],
      size: '1.2 MB',
      category: 'legal'
    };
    const updated = localDocs.addFile(newFile);
    setFiles(updated);
  };

  const categories = [
    { id: 'all', label: 'Todos los Archivos' },
    { id: 'blueprints', label: 'Planos' },
    { id: 'legal', label: 'Legal' },
    { id: 'safety', label: 'Seguridad' },
  ];

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || file.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-6 py-8 relative">
      <TechBackground 
        className="opacity-20 fixed"
      />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-[10px] font-label uppercase tracking-[0.3em] text-fabrick-lava font-bold mb-2 block">
              Gestión de Archivos
            </span>
            <h2 className="text-4xl font-headline font-bold tracking-tighter uppercase text-white">DOCUMENTACIÓN</h2>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUpload}
            className="flex items-center gap-3 px-6 py-4 bg-fabrick-yellow text-fabrick-black font-black uppercase tracking-widest rounded-xl shadow-yellow-glow hover:brightness-110 transition-all"
          >
            <Upload size={18} />
            Subir Archivo
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="android-card p-6"
            >
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-fabrick-gray" size={18} />
                <input 
                  type="text"
                  placeholder="Buscar archivos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-fabrick-yellow transition-all text-white"
                />
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-fabrick-gray mb-4">Categorías</p>
                {categories.map((cat, idx) => (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all active-scale ${
                      activeCategory === cat.id 
                        ? 'bg-fabrick-yellow text-fabrick-black shadow-yellow-glow' 
                        : 'text-fabrick-gray hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="text-[10px] opacity-60">
                      {cat.id === 'all' ? files.length : files.filter(f => f.category === cat.id).length}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="android-card p-6 bg-fabrick-lava/10 border-fabrick-lava/20"
            >
              <div className="flex items-center gap-3 mb-4 text-fabrick-lava">
                <FileText size={20} />
                <h4 className="font-headline font-black uppercase tracking-tight">Espacio Utilizado</h4>
              </div>
              <div className="h-2 bg-white/5 rounded-full mb-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-fabrick-lava"
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-fabrick-gray">
                <span>1.2 GB de 2 GB</span>
                <span>65%</span>
              </div>
            </motion.div>
          </div>

          {/* File Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredFiles.map((file, idx) => (
                  <motion.div
                    key={file.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedFile(file)}
                    className="android-card p-6 group relative overflow-hidden cursor-pointer active-scale"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-fabrick-gray hover:text-white">
                        <MoreVertical size={18} />
                      </button>
                    </div>

                    <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-fabrick-yellow/10 transition-colors">
                      {file.category === 'blueprints' && <MapIcon className="text-fabrick-yellow" size={32} />}
                      {file.category === 'legal' && <Gavel className="text-fabrick-yellow" size={32} />}
                      {file.category === 'safety' && <Shield className="text-fabrick-yellow" size={32} />}
                    </div>

                    <h4 className="text-sm font-black uppercase mb-1 text-white truncate pr-6">{file.name}</h4>
                    <p className="text-[10px] text-fabrick-gray uppercase font-bold tracking-widest mb-4">
                      {file.category === 'blueprints' ? 'Planos' : file.category === 'legal' ? 'Legal' : 'Seguridad'} • {file.size}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-[9px] text-fabrick-gray font-bold">{file.date}</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedFile(file); }}
                          className="p-2 bg-white/5 text-fabrick-gray hover:text-white hover:bg-white/10 rounded-xl transition-all active-scale"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 bg-white/5 text-fabrick-gray hover:text-white hover:bg-white/10 rounded-xl transition-all active-scale"
                        >
                          <Download size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredFiles.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="p-6 bg-white/5 rounded-full w-fit mx-auto mb-6">
                  <Search size={48} className="text-fabrick-gray opacity-20" />
                </div>
                <h3 className="text-xl font-headline font-black uppercase text-white mb-2">No se encontraron archivos</h3>
                <p className="text-fabrick-gray text-sm">Intenta ajustar los filtros o la búsqueda.</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedFile && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFile(null)}
              className="absolute inset-0 bg-fabrick-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel p-8 w-full max-w-2xl relative z-10 border-fabrick-yellow/30"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-fabrick-yellow/10 rounded-xl">
                    <FileText className="text-fabrick-yellow" size={24} />
                  </div>
                  <div>
                    <h3 className="font-headline text-xl font-black uppercase text-white">{selectedFile.name}</h3>
                    <p className="text-xs text-fabrick-gray uppercase font-bold tracking-widest">
                      {selectedFile.category === 'blueprints' ? 'Planos' : selectedFile.category === 'legal' ? 'Legal' : 'Seguridad'} • {selectedFile.size}
                    </p>
                  </div>
                </div>
                <button onClick={() => setSelectedFile(null)} className="text-fabrick-gray hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="aspect-video bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-8">
                <div className="text-center">
                  <FileText size={64} className="text-fabrick-gray opacity-20 mx-auto mb-4" />
                  <p className="text-sm text-fabrick-gray uppercase font-bold tracking-widest">Vista previa no disponible para este formato</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-fabrick-yellow text-fabrick-black font-black uppercase tracking-widest rounded-xl shadow-yellow-glow hover:brightness-110 transition-all flex items-center justify-center gap-2">
                  <Download size={18} />
                  Descargar
                </button>
                <button className="flex-1 py-4 bg-white/5 text-white font-black uppercase tracking-widest rounded-xl border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  <ExternalLink size={18} />
                  Abrir Externamente
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
