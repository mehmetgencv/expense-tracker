package com.expensetracker.expensetracker.mapper;

import com.expensetracker.expensetracker.dto.ExpenseDTO;
import com.expensetracker.expensetracker.model.Expense;
import com.expensetracker.expensetracker.request.ExpenseSaveRequest;
import com.expensetracker.expensetracker.request.ExpenseUpdateRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ExpenseMapper {
    ExpenseMapper INSTANCE = Mappers.getMapper(ExpenseMapper.class);

    ExpenseDTO convertToExpenseDTO(Expense expense);

    List<ExpenseDTO> convertToExpenseDTOs(List<Expense> expenses);

    Expense convertToExpense(ExpenseSaveRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "createDate", ignore = true)
    Expense updateExpenseFields(@MappingTarget Expense expense, ExpenseUpdateRequest request);
}

