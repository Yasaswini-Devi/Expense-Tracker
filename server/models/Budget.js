// models/Budget.js
import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  month: {
    type: Number, // 1 to 12
    required: true,
  },
  year: {
    type: Number, // e.g., 2025
    required: true,
  },
  budgets: {
    type: Map,
    of: Number, // category => amount
    required: true,
  }
});

export default mongoose.model("Budget", BudgetSchema);
