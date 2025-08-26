import { Transaction } from '@/types';

const TRANSACTIONS_KEY = 'expense-tracker-transactions';

export const getTransactions = (userId: string): Transaction[] => {
  const stored = localStorage.getItem(TRANSACTIONS_KEY);
  const allTransactions: Transaction[] = stored ? JSON.parse(stored) : [];
  return allTransactions.filter(t => t.userId === userId);
};

export const saveTransaction = (transaction: Transaction) => {
  const stored = localStorage.getItem(TRANSACTIONS_KEY);
  const transactions: Transaction[] = stored ? JSON.parse(stored) : [];
  transactions.push(transaction);
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
};

export const updateTransaction = (updatedTransaction: Transaction) => {
  const stored = localStorage.getItem(TRANSACTIONS_KEY);
  const transactions: Transaction[] = stored ? JSON.parse(stored) : [];
  const index = transactions.findIndex(t => t.id === updatedTransaction.id);
  if (index !== -1) {
    transactions[index] = updatedTransaction;
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  }
};

export const deleteTransaction = (transactionId: string) => {
  const stored = localStorage.getItem(TRANSACTIONS_KEY);
  const transactions: Transaction[] = stored ? JSON.parse(stored) : [];
  const filtered = transactions.filter(t => t.id !== transactionId);
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(filtered));
};