
# Expense Tracker

## Overview

Expense Tracker is a RESTful web application that allows users to track their expenses, generate reports, and visualize data through various endpoints. This application is built using Spring Boot for the backend services.

## Features

- Add, update, delete, and retrieve expenses
- Generate monthly and yearly expense reports
- Generate category-based expense reports
- Filter expenses between specific dates



## Setup

### Prerequisites

- Java 11 or higher
- Maven

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/mehmetgencv/expense-tracker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd expensetracker
   ```
3. Build the project:
   ```bash
   mvn clean install
   ```
4. Run the application:
   ```bash
   mvn spring-boot:run
   ```
5. Access the API at `http://localhost:8080/api/v1/expenses`

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.

## License

This project is licensed under the MIT License.

---
## Endpoints

### Expense Endpoints

#### Get All Expenses

- **URL:** `/api/v1/expenses`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "status": "SUCCESS",
    "data": []
  }
  ```

#### Get Expense By ID

- **URL:** `/api/v1/expenses/{id}`
- **Method:** `GET`
- **Path Variables:**
    - `id` (Long): Expense ID
- **Response:**
  ```json
  {
    "status": "SUCCESS",
    "data": {}
  }
  ```

#### Add Expense

- **URL:** `/api/v1/expenses`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "description": "string",
    "amount": "double",
    "date": "LocalDateTime",
    "paymentMethod": "enum",
    "category": "enum",
    "isRecurring": "boolean"
  }
  ```
- **Response:**
  ```json
  {
    "status": "SUCCESS",
    "data": {}
  }
  ```

#### Delete Expense

- **URL:** `/api/v1/expenses/{id}`
- **Method:** `DELETE`
- **Path Variables:**
    - `id` (Long): Expense ID
- **Response:**
  ```json
  {
    "status": "SUCCESS",
    "data": true
  }
  ```

#### Update Expense

- **URL:** `/api/v1/expenses/{id}`
- **Method:** `PUT`
- **Path Variables:**
    - `id` (Long): Expense ID
- **Request Body:**
  ```json
  {
    "description": "string",
    "amount": "double",
    "date": "LocalDateTime",
    "paymentMethod": "enum",
    "category": "enum",
    "isRecurring": "boolean"
  }
  ```
- **Response:**
  ```json
  {
    "status": "SUCCESS",
    "data": {}
  }
  ```

#### Get Expenses Between Dates

- **URL:** `/api/v1/expenses/between`
- **Method:** `GET`
- **Query Parameters:**
    - `startDate` (String): Start date in `yyyy-MM-dd` format
    - `endDate` (String): End date in `yyyy-MM-dd` format
- **Response:**
  ```json
  {
    "status": "SUCCESS",
    "data": []
  }
  ```

### Report Endpoints

#### Monthly Report

- **URL:** `/api/v1/expenses/reports/monthly`
- **Method:** `GET`
- **Query Parameters:**
    - `year` (int): Year for the report
    - `month` (int): Month for the report
- **Response:**
  ```json
  {
    "status": "SUCCESS",
    "data": []
  }
  ```

#### Yearly Report

- **URL:** `/api/v1/expenses/reports/yearly`
- **Method:** `GET`
- **Query Parameters:**
    - `year` (int): Year for the report
- **Response:**
  ```json
  {
    "status": "SUCCESS",
    "data": []
  }
  ```

#### Category Report

- **URL:** `/api/v1/expenses/reports/category`
- **Method:** `GET`
- **Query Parameters:**
    - `startDate` (String): Start date in `yyyy-MM-dd` format
    - `endDate` (String): End date in `yyyy-MM-dd` format
- **Response:**
  ```json
  {
    "status": "SUCCESS",
    "data": []
  }
  ```