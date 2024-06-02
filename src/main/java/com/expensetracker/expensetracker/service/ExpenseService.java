package com.expensetracker.expensetracker.service;

import com.expensetracker.expensetracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }
}
