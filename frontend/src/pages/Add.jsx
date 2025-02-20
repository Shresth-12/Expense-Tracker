import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";

export function Add() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Food");
  const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"];
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (name.trim() === "") return toast.error("Expense name is required");
    if (amount.trim() === "" || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Enter a valid amount greater than 0");
    if (date.trim() === "") return toast.error("Date is required");
    try {
        const response = await axios.post("http://localhost:3000/api/v1/expense/add", {
         name:name,
         amount:amount*100,
         date:date,
         description:description,
         category:category
        });
        toast.success("Expense added successfully!");
        setName("");
        setAmount("");
        setDate("");
        setDescription("");
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error("Failed to add Expense.Please try again.");
      }
    }
  return (<>
    <div>
        <NavBar/>
    </div>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-96 bg-white border border-gray-300 p-6 rounded-lg shadow-md">
        <legend className="text-lg font-semibold text-gray-700">Add Expense</legend>
        <label className="block text-gray-600 mt-4">Name of Expense</label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Name of Expense"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="block text-gray-600 mt-4">Amount</label>
        <input
          type="number"
          className="input input-bordered w-full"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <label className="block text-gray-600 mt-4">Date</label>
        <input
          type="date"
          className="input input-bordered w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
                <label className="block text-gray-600 mt-4">Category</label>
        <select  value={category} 
        onChange={(e) => setCategory(e.target.value)} className="select">
   {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
</select>
        <label className="block text-gray-600 mt-4">Description</label>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit" className="btn btn-primary w-full mt-6">
          Add Expense
        </button>
      </form>
    </div>
    </>
  );
}
