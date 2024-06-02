package com.expensetracker.expensetracker.service;

import com.expensetracker.expensetracker.dto.ExpenseDTO;
import com.expensetracker.expensetracker.exception.ExpenseNotFoundException;
import com.expensetracker.expensetracker.mapper.ExpenseMapper;
import com.expensetracker.expensetracker.model.Expense;
import com.expensetracker.expensetracker.repository.ExpenseRepository;
import com.expensetracker.expensetracker.request.ExpenseSaveRequest;
import com.expensetracker.expensetracker.request.ExpenseUpdateRequest;
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

    public Expense findExpenseById(Long id) {
        return expenseRepository.findById(id).orElseThrow(() -> new ExpenseNotFoundException("Expense not found"));
    }

    public ExpenseDTO getExpenseById(Long id) {
        Expense expense = findExpenseById(id);
        return ExpenseMapper.INSTANCE.convertToExpenseDTO(expense);
    }

    public ExpenseDTO addExpense(ExpenseSaveRequest request) {
        Expense expense = ExpenseMapper.INSTANCE.convertToExpense(request);
        expense = expenseRepository.save(expense);
        return ExpenseMapper.INSTANCE.convertToExpenseDTO(expense);
    }

    public Boolean deleteExpenseById(Long id) {
        if (expenseRepository.existsById(id)) {
            expenseRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public ExpenseDTO updateExpenseById(Long id, ExpenseUpdateRequest request) {
        Expense expense = findExpenseById(id);
        expense = ExpenseMapper.INSTANCE.updateExpenseFields(expense, request);
        expense = expenseRepository.save(expense);
        return ExpenseMapper.INSTANCE.convertToExpenseDTO(expense);
    }
}
