package com.expensetracker.expensetracker.request;

import com.expensetracker.expensetracker.model.ExpenseCategory;
import com.expensetracker.expensetracker.model.PaymentMethod;

import java.time.LocalDateTime;

public record ExpenseSaveRequest(
        String description,
        Double amount,
        PaymentMethod paymentMethod,
        ExpenseCategory category,
        boolean isRecurring
) {
}
