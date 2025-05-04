# 💰 Expense Tracker App

A full-stack web application that helps users manage their personal finances by tracking expenses, setting budgets, and visualizing spending trends.

---

## 🚀 Features

### 👤 Authentication & Profile
- User Signup, Login, Logout
- Update profile details and upload profile picture
- Reset password

### 📊 Dashboard
- Add and manage expenses
- Set monthly budgets by category
- View all expenses and filter by category/date
- Pie chart for category-wise or item-wise expense visualization

### 📅 Summary
- **Monthly Summary**: Budget vs Expenses visualized using progress bars
- **Yearly Summary**: Expenditure per month shown using pie charts

---

## 🛠 Tech Stack

- **Frontend**: React, Vite, Bootstrap, Chart.js
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT
- **File Uploads**: Multer

---

## Installation

To get a local copy of this project up and running, follow these steps.

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB (for local development or use MongoDB Atlas for cloud database)

### 1. Clone the repository

```bash
git clone https://github.com/Yasaswini-Devi/Expense-Tracker.git
cd Expense-Tracker
```

### 2. Install Dependencies

For both client and server, run the following command in both directories:

```bash
npm install
```

### 3. Setting up environment variables

Create .env file in server:

```ini
MONGO_URI=mongodb://localhost:27017/expenseTracker
JWT_SECRET=your_jwt_secret
```

Create .env file in client:

```ini
VITE_API_URL=http://localhost:5000/api/
```

### 4. Run the Application

Run the following command in client:

```bash
npm run dev
```

Frontend runs on: http://localhost:5173

Run the following command in backend:

```bash
nodemon server.js
```

Backend runs on: http://localhost:5000
