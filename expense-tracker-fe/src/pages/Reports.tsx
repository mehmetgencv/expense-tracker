import React, { useEffect, useState, useCallback } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  TextField,
} from '@mui/material';
import { format, startOfYear, endOfYear } from 'date-fns';
import Layout from '../components/Layout';
import { expenseService } from '../services/api';
import { Expense, ExpenseCategoryReport } from '../types';

const Reports: React.FC = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState<Expense[]>([]);
  const [yearlyExpenses, setYearlyExpenses] = useState<Expense[]>([]);
  const [categoryReport, setCategoryReport] = useState<ExpenseCategoryReport[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  const fetchReports = useCallback(async () => {
    try {
      // Fetch monthly report
      const monthly = await expenseService.getMonthlyReport(
        selectedYear,
        selectedMonth
      );
      setMonthlyExpenses(monthly);

      // Fetch yearly report
      const yearly = await expenseService.getYearlyReport(selectedYear);
      setYearlyExpenses(yearly);

      // Fetch category report for the year
      const start = format(startOfYear(new Date(selectedYear, 0)), 'yyyy-MM-dd');
      const end = format(endOfYear(new Date(selectedYear, 0)), 'yyyy-MM-dd');
      const categories = await expenseService.getCategoryReport(start, end);
      setCategoryReport(categories);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const calculateTotal = (expenses: Expense[]) =>
    expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <Layout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Expense Reports
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              {months.map((month) => (
                <MenuItem key={month.value} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {/* Monthly Summary */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Summary ({months.find((m) => m.value === selectedMonth)?.label} {selectedYear})
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {monthlyExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>
                        {format(new Date(expense.date), 'MMM dd')}
                      </TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell align="right">
                        ${expense.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography variant="subtitle1">Total</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle1">
                        ${calculateTotal(monthlyExpenses).toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Category Summary */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Category Summary ({selectedYear})
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Total Amount</TableCell>
                    <TableCell align="right">Number of Expenses</TableCell>
                    <TableCell align="right">Average</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categoryReport.map((category) => (
                    <TableRow key={category.category}>
                      <TableCell>{category.category}</TableCell>
                      <TableCell align="right">
                        ${category.totalAmount.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">{category.count}</TableCell>
                      <TableCell align="right">
                        ${(category.totalAmount / category.count).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Yearly Summary */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Yearly Summary ({selectedYear})
            </Typography>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Total: ${calculateTotal(yearlyExpenses).toFixed(2)}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Monthly Average: $
              {(calculateTotal(yearlyExpenses) / 12).toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Reports; 