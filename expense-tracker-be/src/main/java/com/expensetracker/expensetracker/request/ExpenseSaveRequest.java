package com.expensetracker.expensetracker.request;

import com.expensetracker.expensetracker.model.ExpenseCategory;
import com.expensetracker.expensetracker.model.PaymentMethod;

import java.time.LocalDateTime;

public class ExpenseSaveRequest {
    private String description;
    private double amount;
    private LocalDateTime date;
    private PaymentMethod paymentMethod;
    private ExpenseCategory category;
    private boolean isRecurring;

    // Getters and Setters
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public ExpenseCategory getCategory() {
        return category;
    }

    public void setCategory(ExpenseCategory category) {
        this.category = category;
    }

    public boolean isRecurring() {
        return isRecurring;
    }

    public void setRecurring(boolean recurring) {
        isRecurring = recurring;
    }
}
