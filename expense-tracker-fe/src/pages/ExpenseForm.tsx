import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Grid,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import Layout from '../components/Layout';
import { expenseService } from '../services/api';
import { ExpenseCategory, PaymentMethod } from '../types';

const categories = Object.values(ExpenseCategory);
const paymentMethods = Object.values(PaymentMethod);

interface FormData {
  amount: string;
  description: string;
  category: ExpenseCategory;
  paymentMethod: PaymentMethod;
  date: Date;
}

const ExpenseForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<FormData>({
    amount: '',
    description: '',
    category: ExpenseCategory.FOOD,
    paymentMethod: PaymentMethod.CASH,
    date: new Date(),
  });
  const [errors, setErrors] = useState({
    amount: '',
    description: '',
    category: '',
    paymentMethod: '',
  });

  const fetchExpense = useCallback(async () => {
    try {
      const expense = await expenseService.getExpenseById(Number(id));
      setFormData({
        amount: expense.amount.toString(),
        description: expense.description,
        category: expense.category,
        paymentMethod: expense.paymentMethod,
        date: new Date(expense.date),
      });
    } catch (error) {
      console.error('Error fetching expense:', error);
      navigate('/expenses');
    }
  }, [id, navigate]);

  useEffect(() => {
    if (id) {
      fetchExpense();
    }
  }, [id, fetchExpense]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      amount: '',
      description: '',
      category: '',
      paymentMethod: '',
    };

    if (!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
      isValid = false;
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Payment method is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const expenseData = {
      amount: Number(formData.amount),
      description: formData.description.trim(),
      category: formData.category,
      paymentMethod: formData.paymentMethod,
      date: format(formData.date, "yyyy-MM-dd'T'HH:mm:ss"),
      isRecurring: false,
      createDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      updateDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")
    };

    try {
      if (id) {
        await expenseService.updateExpense(Number(id), expenseData);
      } else {
        await expenseService.addExpense(expenseData);
      }
      navigate('/expenses');
    } catch (error: any) {
      console.error('Error saving expense:', error);
      if (error.response?.status !== 401) {
        alert('Failed to save expense. Please try again.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'category' ? value as ExpenseCategory :
              name === 'paymentMethod' ? value as PaymentMethod :
              value,
    }));
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            {id ? 'Edit Expense' : 'Add New Expense'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  error={!!errors.amount}
                  helperText={errors.amount}
                  InputProps={{
                    startAdornment: '$',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  error={!!errors.category}
                  helperText={errors.category}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Payment Method"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  error={!!errors.paymentMethod}
                  helperText={errors.paymentMethod}
                >
                  {paymentMethods.map((method) => (
                    <MenuItem key={method} value={method}>
                      {method.replace('_', ' ')}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  label="Date"
                  value={formData.date}
                  onChange={(newDate) =>
                    setFormData((prev) => ({
                      ...prev,
                      date: newDate || new Date(),
                    }))
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  {id ? 'Update' : 'Add'} Expense
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/expenses')}
                  fullWidth
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
};

export default ExpenseForm; 