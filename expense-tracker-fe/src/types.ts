export enum ExpenseCategory {
  FOOD = 'FOOD',
  TRANSPORTATION = 'TRANSPORTATION',
  ENTERTAINMENT = 'ENTERTAINMENT',
  SHOPPING = 'SHOPPING',
  UTILITIES = 'UTILITIES',
  HEALTH = 'HEALTH',
  OTHER = 'OTHER'
}

export enum PaymentMethod {
  IBAN = 'IBAN',
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD'
}

export interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
  paymentMethod: PaymentMethod;
  isRecurring: boolean;
  createDate: string;
  updateDate: string;
}

export interface ExpenseCategoryReport {
  category: ExpenseCategory;
  count: number;
  totalAmount: number;
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
  roles?: string[];
}

export interface ExpenseUpdateRequest {
  description: string;
  amount: number;
  date: string;
  paymentMethod: PaymentMethod;
  category: ExpenseCategory;
  isRecurring: boolean;
} 