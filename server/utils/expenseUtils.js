import Expense from "../models/Expense.js";
import mongoose from "mongoose";

export const getMonthlyTotalByCategory = async (userId, month, year) => {
  const expenses = await Expense.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        date: {
          $gte: new Date(`${year}-${month}-01`),
          $lt: new Date(`${year}-${month + 1}-01`),
        },
      },
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
  ]);

  const result = {};
  expenses.forEach((e) => {
    result[e._id] = e.total;
  });

  console.log(result);
  return result; // e.g., { Food: 3500, Travel: 1000 }
};
