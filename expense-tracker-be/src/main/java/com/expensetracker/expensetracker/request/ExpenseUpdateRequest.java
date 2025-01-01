package com.expensetracker.expensetracker.request;

import com.expensetracker.expensetracker.model.ExpenseCategory;
import com.expensetracker.expensetracker.model.PaymentMethod;

import java.time.LocalDateTime;

public record ExpenseUpdateRequest(String description,
                                   Double amount,
                                   LocalDateTime date,
                                   PaymentMethod paymentMethod,
                                   ExpenseCategory category,
                                   boolean isRecurring) {
}
