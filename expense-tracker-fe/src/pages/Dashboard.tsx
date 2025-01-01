import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import Layout from '../components/Layout';
import { expenseService } from '../services/api';
import { Expense, ExpenseCategoryReport } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
  const [monthlyTotal, setMonthlyTotal] = useState<number>(0);
  const [categoryReport, setCategoryReport] = useState<ExpenseCategoryReport[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get current month's expenses
        const now = new Date();
        const monthlyExpenses = await expenseService.getMonthlyReport(
          now.getFullYear(),
          now.getMonth() + 1
        );
        
        // Calculate monthly total
        const total = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        setMonthlyTotal(total);

        // Get recent expenses (last 5)
        const allExpenses = await expenseService.getAllExpenses();
        setRecentExpenses(allExpenses.slice(0, 5));

        // Get category report for current month
        const startDate = format(new Date(now.getFullYear(), now.getMonth(), 1), 'yyyy-MM-dd');
        const endDate = format(new Date(now.getFullYear(), now.getMonth() + 1, 0), 'yyyy-MM-dd');
        const categories = await expenseService.getCategoryReport(startDate, endDate);
        setCategoryReport(categories);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Layout>
      <Grid container spacing={3}>
        {/* Monthly Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Monthly Total
            </Typography>
            <Typography component="p" variant="h4">
              ${monthlyTotal.toFixed(2)}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              {format(new Date(), 'MMMM yyyy')}
            </Typography>
          </Paper>
        </Grid>

        {/* Top Categories */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Top Categories
            </Typography>
            <List>
              {categoryReport.slice(0, 3).map((category) => (
                <ListItem key={category.category}>
                  <ListItemText
                    primary={category.category}
                    secondary={`$${category.totalAmount.toFixed(2)} (${category.count} expenses)`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Quick Actions
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/expenses/new')}
              sx={{ mb: 2 }}
            >
              Add New Expense
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/reports')}
            >
              View Reports
            </Button>
          </Paper>
        </Grid>

        {/* Recent Expenses */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Recent Expenses
            </Typography>
            <List>
              {recentExpenses.map((expense, index) => (
                <React.Fragment key={expense.id}>
                  <ListItem>
                    <ListItemText
                      primary={expense.description}
                      secondary={`${format(new Date(expense.date), 'MMM dd, yyyy')} - ${expense.category}`}
                    />
                    <Typography variant="body2" color="text.secondary">
                      ${expense.amount.toFixed(2)}
                    </Typography>
                  </ListItem>
                  {index < recentExpenses.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            {recentExpenses.length > 0 && (
              <Button
                color="primary"
                onClick={() => navigate('/expenses')}
                sx={{ mt: 2 }}
              >
                View All Expenses
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard; 