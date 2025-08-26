import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Transaction } from '@/types';
import { getTransactions } from '@/lib/transactions';
import { logout } from '@/lib/auth';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';
import { PlusCircle, DollarSign, TrendingUp, TrendingDown, LogOut } from 'lucide-react';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, [user.id]);

  const loadTransactions = () => {
    const userTransactions = getTransactions(user.id);
    setTransactions(userTransactions);
  };

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ExpenseTracker
            </h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <span className={balance >= 0 ? 'text-success' : 'text-destructive'}>
                  ${balance.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {balance >= 0 ? 'Available balance' : 'Negative balance'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                ${totalIncome.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                From {transactions.filter(t => t.type === 'income').length} sources
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                ${totalExpenses.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                From {transactions.filter(t => t.type === 'expense').length} transactions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <PlusCircle className="w-4 h-4" />
            Add Transaction
          </Button>
        </div>

        {/* Transaction List */}
        <TransactionList 
          transactions={transactions} 
          onUpdate={loadTransactions}
        />

        {/* Transaction Form Modal */}
        {showForm && (
          <TransactionForm
            userId={user.id}
            onClose={() => setShowForm(false)}
            onSuccess={() => {
              setShowForm(false);
              loadTransactions();
            }}
          />
        )}
      </div>
    </div>
  );
};