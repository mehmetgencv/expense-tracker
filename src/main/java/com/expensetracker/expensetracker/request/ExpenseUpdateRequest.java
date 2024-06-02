package com.expensetracker.expensetracker.request;

import com.expensetracker.expensetracker.model.ExpenseCategory;
import com.expensetracker.expensetracker.model.PaymentMethod;

public record ExpenseUpdateRequest(String description,
                                   Double amount,
                                   PaymentMethod paymentMethod,
                                   ExpenseCategory category,
                                   boolean isRecurring) {
}
