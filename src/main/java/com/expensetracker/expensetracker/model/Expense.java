package com.expensetracker.expensetracker.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String description;
    private double amount;
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    private ExpenseCategory category;

    private boolean isRecurring;

    public Expense() {
    }

    public Expense(String description, double amount, LocalDate date, PaymentMethod paymentMethod, ExpenseCategory category, boolean isRecurring) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.paymentMethod = paymentMethod;
        this.category = category;
        this.isRecurring = isRecurring;
    }

    // Getters and setters

    // toString, equals, hashCode methods if needed
}
