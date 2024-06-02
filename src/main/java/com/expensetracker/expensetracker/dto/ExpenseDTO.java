package com.expensetracker.expensetracker.dto;


import com.expensetracker.expensetracker.model.ExpenseCategory;
import com.expensetracker.expensetracker.model.PaymentMethod;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDateTime;

public record ExpenseDTO(
        String description,
        Double amount,
        LocalDateTime date,
        PaymentMethod paymentMethod,
        ExpenseCategory category,
        boolean isRecurring

) {}
