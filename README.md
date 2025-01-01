# Expense Tracker Application

A full-stack expense tracking application built with Spring Boot and React. This application helps users track their expenses, categorize them, and generate reports.

## Features

- User authentication with JWT
- Add, edit, and delete expenses
- Categorize expenses
- Multiple payment methods support
- Date-based filtering
- Monthly and yearly reports
- Category-wise expense analysis
- Responsive design

## Tech Stack

### Backend
- Java 21
- Spring Boot 3.4.1
- Spring Security with JWT
- PostgreSQL
- MapStruct
- OpenAPI (Swagger)

### Frontend
- React 18
- TypeScript
- Material-UI (MUI)
- Axios
- React Router
- date-fns

## Prerequisites

- Java 21
- Node.js and npm
- Docker (for PostgreSQL)
- Maven

## Setup Instructions

### 1. Database Setup

Start the PostgreSQL database using Docker:

```bash
docker-compose up -d
```

This will start PostgreSQL on port 5433 with the following credentials:
- Database: expense_tracker
- Username: postgres
- Password: postgres

### 2. Backend Setup

Navigate to the backend directory and run:

```bash
cd expense-tracker-be
mvn clean install
mvn spring-boot:run
```

The backend server will start on http://localhost:8080

API Documentation will be available at:
- Swagger UI: http://localhost:8080/swagger-ui.html

### 3. Frontend Setup

Navigate to the frontend directory and run:

```bash
cd expense-tracker-fe
npm install
npm start
```

The frontend application will start on http://localhost:3000

## Usage

1. Register a new account or login with existing credentials
2. Add new expenses using the "Add Expense" button
3. View all expenses in the expense list
4. Edit or delete expenses as needed
5. Use the dashboard to view expense summaries
6. Generate reports based on categories and date ranges

## API Endpoints

### Authentication
- POST /api/auth/signin - Login
- POST /api/auth/signup - Register

### Expenses
- GET /api/v1/expenses - Get all expenses
- GET /api/v1/expenses/{id} - Get expense by ID
- POST /api/v1/expenses - Add new expense
- PUT /api/v1/expenses/{id} - Update expense
- DELETE /api/v1/expenses/{id} - Delete expense

### Reports
- GET /api/v1/expenses/between - Get expenses between dates
- GET /api/v1/expenses/reports/monthly - Get monthly report
- GET /api/v1/expenses/reports/yearly - Get yearly report
- GET /api/v1/expenses/reports/category - Get category-wise report

## Security

- JWT-based authentication
- Password encryption using BCrypt
- Protected API endpoints
- CORS configuration for development

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 