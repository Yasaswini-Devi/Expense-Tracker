import React from "react";
import ExpenseTracker from "./components/ExpenseTracker";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container mt-4">
      <header className="text-center mb-5">
        <h1 className="fw-bold text-primary">Expense Tracker</h1>
      </header>
      <ExpenseTracker />
    </div>
  );
}

export default App;