import { Card } from "../components/Card";
import { MonthlyExpensesChart } from "../components/Chart";
import { NavBar } from "../components/NavBar";
import piggy from "../assets/piggy.png";
import wallet from "../assets/wallet.png";
import cash from "../assets/cash.png"
import axios from "axios";
import { useEffect, useState } from "react";

export function Home()
{
    const [amount,setAmount]=useState("")
    const [number,setNumber]=useState("")
    const [expenses, setExpenses] = useState([]);
    async function GetAmount()
{
    try {
        const response=await axios.get("http://localhost:3000/api/v1/expense/amount")
        setAmount(response.data.totalAmount)
        setNumber(response.data.totalExpenses);
    } catch (error) {
        console.log(error)
    }
}

useEffect(()=>{
GetAmount()
},[])

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
    return  <div className="bg-gray-100 min-h-screen">
          <NavBar />
          <div className="max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-2 gap-14">
              <Card svg={piggy} budget={amount/100} header={"Total Spent"} />
              <Card svg={wallet} budget={number} header={"Number of Budgets"} />
            </div>
            <div className="grid grid-cols-3 gap-6 mt-6">
              <div className="col-span-2 bg-white p-6  rounded-lg">
                <MonthlyExpensesChart />
              </div>
              <div className="flex flex-col gap-12">
                <h1 className="text-2xl font-bold ml-2 underline">Latest Budgets</h1>
                {expenses.slice(0,2).map((expense) => (
  <Card key={expense._id} svg={cash} budget={`Rs.${expense.amount/100}`} header={expense.name} />
))}
              </div>
            </div>
          </div>
        </div>
}