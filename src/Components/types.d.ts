export type Transaction = {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
  userId: string;
  cardId: string;
}

export type CreditCard = {
  _id: string;
  userId: string;
  creditLimit: number;
  annualFee: number;
  currentBalance: number;
  transactions: Transaction[];
  minPayment: number;
  name: string;
}
export type User = {
  _id: string;
  email: string;
  creditScore: number;
  exp: number;
  level: number;
  gold: number;
  token: string;
  cards: CreditCard[];
}