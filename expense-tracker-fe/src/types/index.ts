export enum ExpenseCategory {
  MAINTENANCE = 'MAINTENANCE',
  CREDIT_CARD = 'CREDIT_CARD',
  BILL = 'BILL',
  ENTERTAINMENT = 'ENTERTAINMENT',
  RENT = 'RENT',
  GROCERIES = 'GROCERIES',
  TECHNOLOGY = 'TECHNOLOGY',
  FOOD = 'FOOD',
  INVESTMENT = 'INVESTMENT',
  EDUCATION = 'EDUCATION',
  CHILD = 'CHILD',
  DEBT = 'DEBT'
}

export interface Expense {
  id: number;
  amount: number;
  description: string;
  category: ExpenseCategory;
  date: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
}

export interface ExpenseCategoryReport {
  category: string;
  totalAmount: number;
  count: number;
} 