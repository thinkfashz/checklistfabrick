
export interface TimelineNote {
  [day: number]: string;
}

export interface TimelineAlarm {
  [day: number]: boolean;
}

const NOTES_KEY = 'fabrick_timeline_notes';
const ALARMS_KEY = 'fabrick_timeline_alarms';

export const localTimeline = {
  getNotes: (): TimelineNote => {
    const stored = localStorage.getItem(NOTES_KEY);
    return stored ? JSON.parse(stored) : {
      20: 'Revisión de materiales en bodega',
      25: 'Vaciado de losa sector A - Confirmar camiones'
    };
  },

  saveNotes: (notes: TimelineNote) => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  },

  getAlarms: (): TimelineAlarm => {
    const stored = localStorage.getItem(ALARMS_KEY);
    return stored ? JSON.parse(stored) : {
      25: true
    };
  },

  saveAlarms: (alarms: TimelineAlarm) => {
    localStorage.setItem(ALARMS_KEY, JSON.stringify(alarms));
  }
};
