package com.expensetracker.expensetracker.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class ExpenseException extends RuntimeException {
    public ExpenseException(final String message) {super(message);}
}
