
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'client';
  name: string;
}

const USERS: User[] = [
  {
    id: 'admin-1',
    email: 'faubricioedms@gmail.com',
    role: 'admin',
    name: 'Administrador Fabrick'
  },
  {
    id: 'client-1',
    email: 'cliente@fabrick.cl',
    role: 'client',
    name: 'Cliente Fabrick'
  }
];

const AUTH_KEY = 'fabrick_auth_user';

export const localAuth = {
  login: (email: string, password: string): User | null => {
    // Check for specific email and password (12345678)
    if (password === '12345678') {
      const user = USERS.find(u => u.email === email);
      if (user) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        return user;
      }
    }
    return null;
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(AUTH_KEY);
  }
};
