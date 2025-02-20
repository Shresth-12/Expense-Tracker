import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
mongoose.connect(process.env.DB_URL)

const expenseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    description: { type: String },
    category: { type: String, required: true, enum: ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"] }
}, { timestamps: true });


export const Expense = mongoose.model("Expense", expenseSchema);