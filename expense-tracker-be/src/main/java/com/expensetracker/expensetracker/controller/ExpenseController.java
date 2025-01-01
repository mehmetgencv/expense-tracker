package com.expensetracker.expensetracker.controller;

import com.expensetracker.expensetracker.dto.ExpenseCategoryReportDTO;
import com.expensetracker.expensetracker.dto.ExpenseDTO;
import com.expensetracker.expensetracker.general.RestResponse;
import com.expensetracker.expensetracker.request.ExpenseSaveRequest;
import com.expensetracker.expensetracker.request.ExpenseUpdateRequest;
import com.expensetracker.expensetracker.service.ExpenseService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/expenses")
@SecurityRequirement(name = "bearerAuth")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping
    public ResponseEntity<RestResponse<List<ExpenseDTO>>> getAllExpenses() {
        return ResponseEntity.ok(RestResponse.of(expenseService.getAllExpenses()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RestResponse<ExpenseDTO>> getExpenseById(@PathVariable Long id) {
        return ResponseEntity.ok(RestResponse.of(expenseService.getExpenseById(id)));
    }

    @PostMapping
    public ResponseEntity<RestResponse<ExpenseDTO>> addExpense(@RequestBody ExpenseSaveRequest request) {
        return ResponseEntity.ok(RestResponse.of(expenseService.addExpense(request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<RestResponse<Boolean>> deleteExpense(@PathVariable Long id) {
        return ResponseEntity.ok(RestResponse.of(expenseService.deleteExpenseById(id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RestResponse<ExpenseDTO>> updateExpense(@PathVariable Long id,
                                                                 @RequestBody ExpenseUpdateRequest request) {
        return ResponseEntity.ok(RestResponse.of(expenseService.updateExpenseById(id, request)));
    }

    @GetMapping("/between")
    public ResponseEntity<RestResponse<List<ExpenseDTO>>> getExpenseBetweenDates(@RequestParam("startDate") String startDate,
                                                                                @RequestParam("endDate") String endDate) {
        return ResponseEntity.ok(RestResponse.of(expenseService.getExpensesBetweenDates(startDate, endDate)));
    }

    @GetMapping("/reports/monthly")
    public ResponseEntity<RestResponse<List<ExpenseDTO>>> getExpenseMonthlyReports(@RequestParam int year,
                                                                                  @RequestParam int month) {
        return ResponseEntity.ok(RestResponse.of(expenseService.getMonthlyReport(year, month)));
    }

    @GetMapping("/reports/yearly")
    public ResponseEntity<RestResponse<List<ExpenseDTO>>> getExpenseYearlyReports(@RequestParam int year) {
        return ResponseEntity.ok(RestResponse.of(expenseService.getYearlyReport(year)));
    }

    @GetMapping("/reports/category")
    public ResponseEntity<RestResponse<List<ExpenseCategoryReportDTO>>> getExpenseCategoryReports(@RequestParam("startDate") String startDate,
                                                                                                 @RequestParam("endDate") String endDate) {
        return ResponseEntity.ok(RestResponse.of(expenseService.getCategoryReport(startDate, endDate)));
    }
}
