
import { Project } from '../types';

const PROJECT_KEY = 'fabrick_project_data';

const DEFAULT_PROJECT: Project = {
  id: '1',
  name: 'RESIDENCIA VALLE AZUL',
  progress: 64,
  activePhase: 'Obra Gris',
  lastUpdated: 'hace 2 horas',
  deliveryCountdown: 142,
  constructionPhaseProgress: 75
};

export const localProject = {
  getProject: (): Project => {
    const stored = localStorage.getItem(PROJECT_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_PROJECT;
  },

  saveProject: (project: Project) => {
    localStorage.setItem(PROJECT_KEY, JSON.stringify(project));
  },

  updateProgress: (progress: number) => {
    const project = localProject.getProject();
    const updated = { ...project, progress, lastUpdated: 'Recién actualizado' };
    localProject.saveProject(updated);
    return updated;
  }
};
