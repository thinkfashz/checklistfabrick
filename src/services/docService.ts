
import { ProjectFile } from '../types';

const DOCS_KEY = 'fabrick_docs_data';

const DEFAULT_FILES: ProjectFile[] = [
  { id: '1', projectId: '1', name: 'Planos_Arquitectonicos_V2.pdf', date: '2024-03-15', size: '12.4 MB', category: 'blueprints' },
  { id: '2', projectId: '1', name: 'Permiso_Construccion_Municipal.pdf', date: '2024-02-28', size: '2.1 MB', category: 'legal' },
  { id: '3', projectId: '1', name: 'Calculo_Estructural_Final.pdf', date: '2024-03-10', size: '8.7 MB', category: 'blueprints' },
  { id: '4', projectId: '1', name: 'Contrato_Obra_Civil.pdf', date: '2024-01-15', size: '1.5 MB', category: 'legal' },
  { id: '5', projectId: '1', name: 'Seguro_Riesgos_Laborales.pdf', date: '2024-03-01', size: '0.8 MB', category: 'safety' },
  { id: '6', projectId: '1', name: 'Render_Fachada_Principal.jpg', date: '2024-03-18', size: '4.2 MB', category: 'blueprints' },
  { id: '7', projectId: '1', name: 'Protocolo_Seguridad_Obra.pdf', date: '2024-02-10', size: '0.9 MB', category: 'safety' },
  { id: '8', projectId: '1', name: 'Escritura_Terreno_Notaria.pdf', date: '2024-01-20', size: '5.5 MB', category: 'legal' },
];

export const localDocs = {
  getFiles: (): ProjectFile[] => {
    const stored = localStorage.getItem(DOCS_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_FILES;
  },

  saveFiles: (files: ProjectFile[]) => {
    localStorage.setItem(DOCS_KEY, JSON.stringify(files));
  },

  addFile: (file: Omit<ProjectFile, 'id'>): ProjectFile[] => {
    const files = localDocs.getFiles();
    const newFile = { ...file, id: Math.random().toString(36).substr(2, 9) };
    const updated = [newFile, ...files];
    localDocs.saveFiles(updated);
    return updated;
  }
};
