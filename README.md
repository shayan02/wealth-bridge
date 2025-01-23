# Wealth Bridge

Wealth Bridge is a comprehensive financial management application designed to streamline data handling and provide users with an intuitive interface for managing their finances. Built with Laravel 9 for the backend and React.js for the frontend, it ensures a robust and dynamic user experience.

## Features

- **User Authentication**: Secure login and registration system using JWT (JSON Web Tokens).
- **Financial Dashboard**: Overview of financial metrics and data visualizations.
- **Transaction Management**: Add, edit, and delete income and expense transactions.
- **Budget Tracking**: Set and monitor budgets to manage spending effectively.
- **Reporting**: Generate detailed financial reports over specified periods.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (with npm)
- [Composer](https://getcomposer.org/)
- [PHP](https://www.php.net/) (compatible with Laravel 9)
- A web server (e.g., Apache, Nginx)
- A database server (e.g., MySQL, PostgreSQL)

## Installation

### Backend (Laravel 9)

1. **Clone the repository**:

   ```bash
   git clone https://github.com/shayan-mudassar/wealth-bridge.git
   ```

2. **Navigate to the API directory**:

   ```bash
   cd wealth-bridge/Api
   ```

3. **Install dependencies**:

   ```bash
   composer install
   ```

4. **Configure environment variables**:

   - Duplicate the `.env.example` file and rename it to `.env`.
   - Update the `.env` file with your database credentials and other necessary configurations.

5. **Generate application key**:

   ```bash
   php artisan key:generate
   ```

6. **Run database migrations**:

   ```bash
   php artisan migrate
   ```

7. **Generate JWT secret**:

   ```bash
   php artisan jwt:secret
   ```

8. **Start the development server**:

   ```bash
   php artisan serve
   ```

   The backend should now be running at `http://localhost:8000`.

### Frontend (React.js)

1. **Navigate to the frontend directory**:

   ```bash
   cd wealth-bridge/src
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm start
   ```

   The frontend should now be running at `http://localhost:3000`.

## Usage

- Access the application by navigating to `http://localhost:3000` in your web browser.
- Register a new account or log in with existing credentials.
- Utilize the dashboard to manage your financial transactions, set budgets, and generate reports.

## Contributing

We welcome contributions to enhance Wealth Bridge. To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request detailing your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

For any inquiries or support, please contact [support@shayanmudassar.com](mailto:support@shayanmudassar.com). 
