import { useState, useEffect } from "react";
import { ExpenseCard } from "../components/ExpenseCard";
import { NavBar } from "../components/NavBar";
import axios from "axios";

export function Expenses() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        async function fetchExpenses() {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/expense/get-expenses");
                const sortedExpenses = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setExpenses(sortedExpenses);
            } catch (error) {
                console.error("Error fetching expenses", error);
            }
        }
        fetchExpenses();
    }, []);

    return (
        <div>
            <NavBar />
            <div className="mt-4 ml-4 flex flex-wrap gap-4 justify-center">
                {expenses.map((expense, index) => (
                    <ExpenseCard key={index} id={expense._id} header={expense.name} amount={expense.amount} description={expense.description} category={expense.category} />
                ))}
            </div>
        </div>
    );
}
