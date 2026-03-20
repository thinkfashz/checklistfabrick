
export interface Task {
  id: string;
  label: string;
  completed: boolean;
}

export type PhaseTasks = Record<string, Task[]>;

const CHECKLIST_KEY = 'fabrick_checklist_data';

const DEFAULT_TASKS: PhaseTasks = {
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
};

export const localChecklist = {
  getTasks: (): PhaseTasks => {
    const stored = localStorage.getItem(CHECKLIST_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_TASKS;
  },

  saveTasks: (tasks: PhaseTasks) => {
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(tasks));
  },

  toggleTask: (phaseId: string, taskId: string): PhaseTasks => {
    const tasks = localChecklist.getTasks();
    const updated = {
      ...tasks,
      [phaseId]: tasks[phaseId].map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
    };
    localChecklist.saveTasks(updated);
    return updated;
  }
};
