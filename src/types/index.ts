export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
  userId: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}