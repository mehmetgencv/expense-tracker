package com.expensetracker.expensetracker.mapper;


import com.expensetracker.expensetracker.dto.ExpenseDTO;
import com.expensetracker.expensetracker.model.Expense;
import com.expensetracker.expensetracker.request.ExpenseSaveRequest;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ExpenseMapper {
    ExpenseMapper INSTANCE = Mappers.getMapper(ExpenseMapper.class);

    List<ExpenseDTO> convertToExpenseDTOs(List<Expense> expenses);
    List<Expense> convertToExpenses(List<ExpenseDTO> expenseDTOs);

    ExpenseDTO convertToExpenseDTO(Expense expenses);
    Expense convertToExpense(ExpenseDTO expenseDTO);
    Expense convertToExpense(ExpenseSaveRequest request);
}

