package com.expensetracker.expensetracker.service;

import com.expensetracker.expensetracker.dto.ExpenseCategoryReportDTO;
import com.expensetracker.expensetracker.dto.ExpenseDTO;
import com.expensetracker.expensetracker.exception.ExpenseNotFoundException;
import com.expensetracker.expensetracker.mapper.ExpenseMapper;
import com.expensetracker.expensetracker.model.Expense;
import com.expensetracker.expensetracker.model.User;
import com.expensetracker.expensetracker.repository.ExpenseRepository;
import com.expensetracker.expensetracker.repository.UserRepository;
import com.expensetracker.expensetracker.request.ExpenseSaveRequest;
import com.expensetracker.expensetracker.request.ExpenseUpdateRequest;
import com.expensetracker.expensetracker.security.UserDetailsImpl;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public ExpenseService(ExpenseRepository expenseRepository, UserRepository userRepository) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<ExpenseDTO> getAllExpenses() {
        User currentUser = getCurrentUser();
        List<Expense> expenses = expenseRepository.findByUser(currentUser);
        return ExpenseMapper.INSTANCE.convertToExpenseDTOs(expenses);
    }

    public Expense findExpenseById(Long id) {
        User currentUser = getCurrentUser();
        return expenseRepository.findByIdAndUser(id, currentUser)
                .orElseThrow(() -> new ExpenseNotFoundException("Expense not found"));
    }

    public ExpenseDTO getExpenseById(Long id) {
        Expense expense = findExpenseById(id);
        return ExpenseMapper.INSTANCE.convertToExpenseDTO(expense);
    }

    public ExpenseDTO addExpense(ExpenseSaveRequest request) {
        User currentUser = getCurrentUser();
        Expense expense = ExpenseMapper.INSTANCE.convertToExpense(request);
        expense.setUser(currentUser);
        expense.setCreateDate(LocalDateTime.now());
        expense.setUpdateDate(LocalDateTime.now());
        expense = expenseRepository.save(expense);
        return ExpenseMapper.INSTANCE.convertToExpenseDTO(expense);
    }

    public Boolean deleteExpenseById(Long id) {
        User currentUser = getCurrentUser();
        Optional<Expense> expense = expenseRepository.findByIdAndUser(id, currentUser);
        if (expense.isPresent()) {
            expenseRepository.delete(expense.get());
            return true;
        }
        return false;
    }

    public ExpenseDTO updateExpenseById(Long id, ExpenseUpdateRequest request) {
        Expense expense = findExpenseById(id);
        expense = ExpenseMapper.INSTANCE.updateExpenseFields(expense, request);
        expense.setUpdateDate(LocalDateTime.now());
        expense = expenseRepository.save(expense);
        return ExpenseMapper.INSTANCE.convertToExpenseDTO(expense);
    }

    public List<ExpenseDTO> getExpensesBetweenDates(String startDate, String endDate) {
        User currentUser = getCurrentUser();
        LocalDateTime start = LocalDateTime.parse(startDate);
        LocalDateTime end = LocalDateTime.parse(endDate);

        List<Expense> expenses = expenseRepository.findExpensesBetweenDatesAndUser(start, end, currentUser);
        return ExpenseMapper.INSTANCE.convertToExpenseDTOs(expenses);
    }

    public List<ExpenseDTO> getMonthlyReport(int year, int month) {
        User currentUser = getCurrentUser();
        LocalDateTime start = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime end = start.plusMonths(1);
        List<Expense> expenses = expenseRepository.findExpensesBetweenDatesAndUser(start, end, currentUser);
        return ExpenseMapper.INSTANCE.convertToExpenseDTOs(expenses);
    }

    public List<ExpenseDTO> getYearlyReport(int year) {
        User currentUser = getCurrentUser();
        LocalDateTime start = LocalDateTime.of(year, 1, 1, 0, 0);
        LocalDateTime end = start.plusYears(1);
        List<Expense> expenses = expenseRepository.findExpensesBetweenDatesAndUser(start, end, currentUser);
        return ExpenseMapper.INSTANCE.convertToExpenseDTOs(expenses);
    }

    public List<ExpenseCategoryReportDTO> getCategoryReport(String startDate, String endDate) {
        User currentUser = getCurrentUser();
        LocalDateTime start = LocalDateTime.parse(startDate);
        LocalDateTime end = LocalDateTime.parse(endDate);

        List<Expense> expenses = expenseRepository.findExpensesBetweenDatesAndUser(start, end, currentUser);

        return expenses.stream()
                .collect(Collectors.groupingBy(Expense::getCategory))
                .entrySet().stream()
                .map(entry -> new ExpenseCategoryReportDTO(entry.getKey(), entry.getValue().size(), entry.getValue().stream().mapToDouble(Expense::getAmount).sum()))
                .collect(Collectors.toList());
    }
}
