export interface TransactionSummary {
  totalTransactions: number;
  totalAmount: number;
  averageAmount: number;
  recentTransactions: Transaction[];
}

export interface Transaction {
  id: string;
  amount: number;
  awardingCompany: string;
  createdAt: string;
  status: 'pending' | 'completed' | 'failed';
}