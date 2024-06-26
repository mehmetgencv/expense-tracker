package com.expensetracker.expensetracker.service;

import com.expensetracker.expensetracker.dto.ExpenseCategoryReportDTO;
import com.expensetracker.expensetracker.dto.ExpenseDTO;
import com.expensetracker.expensetracker.exception.ExpenseNotFoundException;
import com.expensetracker.expensetracker.mapper.ExpenseMapper;
import com.expensetracker.expensetracker.model.Expense;
import com.expensetracker.expensetracker.repository.ExpenseRepository;
import com.expensetracker.expensetracker.request.ExpenseSaveRequest;
import com.expensetracker.expensetracker.request.ExpenseUpdateRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

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
        expense.setCreateDate(LocalDateTime.now());
        expense.setUpdateDate(LocalDateTime.now());
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
        expense.setUpdateDate(LocalDateTime.now());
        expense = expenseRepository.save(expense);
        return ExpenseMapper.INSTANCE.convertToExpenseDTO(expense);
    }

    public List<ExpenseDTO> getExpensesBetweenDates(String startDate, String endDate) {

        LocalDateTime start = LocalDateTime.parse(startDate);
        LocalDateTime end = LocalDateTime.parse(endDate);

        List<Expense> expenses = expenseRepository.findExpensesBetweenDates(start, end);
        return ExpenseMapper.INSTANCE.convertToExpenseDTOs(expenses);
    }

    public List<ExpenseDTO> getMonthlyReport(int year, int month) {
        LocalDateTime start = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime end = start.plusMonths(1);
        List<Expense> expenses = expenseRepository.findExpensesBetweenDates(start, end);

        return ExpenseMapper.INSTANCE.convertToExpenseDTOs(expenses);

    }

    public List<ExpenseDTO> getYearlyReport(int year) {
        LocalDateTime start = LocalDateTime.of(year, 1, 1, 0, 0);
        LocalDateTime end = start.plusYears(1);
        List<Expense> expenses = expenseRepository.findExpensesBetweenDates(start, end);

        return ExpenseMapper.INSTANCE.convertToExpenseDTOs(expenses);

    }

    public List<ExpenseCategoryReportDTO> getCategoryReport(String startDate, String endDate) {

        LocalDateTime start = LocalDateTime.parse(startDate);
        LocalDateTime end = LocalDateTime.parse(endDate);

        List<Expense> expenses = expenseRepository.findExpensesBetweenDates(start, end);

        return expenses.stream()
                .collect(Collectors.groupingBy(Expense::getCategory))
                .entrySet().stream()
                .map(entry -> new ExpenseCategoryReportDTO(entry.getKey(), entry.getValue().size(), entry.getValue().stream().mapToDouble(Expense::getAmount).sum()))
                .collect(Collectors.toList());

    }
}
