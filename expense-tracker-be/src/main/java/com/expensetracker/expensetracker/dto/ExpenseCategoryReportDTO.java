package com.expensetracker.expensetracker.dto;

import com.expensetracker.expensetracker.model.ExpenseCategory;

public record ExpenseCategoryReportDTO(
        ExpenseCategory category,
        int count,
        Double totalAmount
) {
}
