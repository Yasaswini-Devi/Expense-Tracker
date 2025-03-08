# Expense Tracker

An easy-to-use web application to track and manage personal expenses. The app allows users to add, view, and categorize their expenses. It provides a visual overview with a chart or table view for better expense management.

## Features

- **Add Expense**: Allows users to add a new expense with title, amount, and category.
- **View Expenses**: View expenses in a table format or as a chart for a more visual representation.
- **Delete Expenses**: Delete individual or multiple selected expenses.
- **Responsive Design**: The app is fully responsive and works across devices of various screen sizes.

## Tech Stack

- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Charting**: Chart.js for visualizing expenses

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (Node Package Manager) installed on your machine
- A MongoDB database running locally or in the cloud (e.g., MongoDB Atlas)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install Backend Dependencies:

   Navigate to the backend folder and install the required dependencies:   
   ```bash
   cd backend
   npm install
   ```

3. Install Frontend Dependencies:

   Navigate to the frontend folder and install the required dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Configure MongoDB:

   Make sure your MongoDB database is set up (either locally or using MongoDB Atlas). Update the MongoDB URI in the backend code where necessary.

5. Run the Application:

   To run the application locally:

   Start the backend server:
   ```bash
   cd backend
   npm start
   ```

7. Start the frontend server:

   ```bash
   cd ../frontend
   npm start
   ```

   Your application will be available at http://localhost:3000.

Usage

   Add Expense: Fill out the form with a title, amount, and category, then click "Add Expense."
   View Expenses: Switch between the table and chart view to visualize your expenses.
   Delete Expenses: Select multiple expenses and click "Delete Selected" to remove them from the list.