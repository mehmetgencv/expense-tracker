package com.expensetracker.expensetracker.service;

import com.expensetracker.expensetracker.dto.ExpenseDTO;
import com.expensetracker.expensetracker.exception.ExpenseNotFoundException;
import com.expensetracker.expensetracker.mapper.ExpenseMapper;
import com.expensetracker.expensetracker.model.Expense;
import com.expensetracker.expensetracker.repository.ExpenseRepository;
import com.expensetracker.expensetracker.request.ExpenseSaveRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public List<ExpenseDTO> getAllExpenses() {
        List<Expense> expenses = expenseRepository.findAll();
        return ExpenseMapper.INSTANCE.convertToExpenseDTOs(expenses);
    }

    public ExpenseDTO getExpenseById(Long id) {
        Expense expense = expenseRepository.findById(id).orElseThrow(() -> new ExpenseNotFoundException("Expense not found"));
        return ExpenseMapper.INSTANCE.convertToExpenseDTO(expense);
    }

    public ExpenseDTO addExpense(ExpenseSaveRequest request) {
        Expense expense = ExpenseMapper.INSTANCE.convertToExpense(request);
        expense = expenseRepository.save(expense);
        return ExpenseMapper.INSTANCE.convertToExpenseDTO(expense);
    }
}
