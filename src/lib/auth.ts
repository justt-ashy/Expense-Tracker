import { User, AuthState } from '@/types';

const AUTH_KEY = 'expense-tracker-auth';
const USERS_KEY = 'expense-tracker-users';

export const getAuthState = (): AuthState => {
  const stored = localStorage.getItem(AUTH_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return { user: null, isAuthenticated: false };
};

export const setAuthState = (state: AuthState) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(state));
};

export const getUsers = (): User[] => {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const login = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (user) {
    const authState = { user, isAuthenticated: true };
    setAuthState(authState);
    return user;
  }
  return null;
};

export const register = (name: string, email: string, password: string): User => {
  const user: User = {
    id: Date.now().toString(),
    name,
    email
  };
  saveUser(user);
  const authState = { user, isAuthenticated: true };
  setAuthState(authState);
  return user;
};

export const logout = () => {
  setAuthState({ user: null, isAuthenticated: false });
};