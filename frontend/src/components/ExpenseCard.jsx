import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export function ExpenseCard({ header, description, amount, id, category }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedHeader, setEditedHeader] = useState(header);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedAmount, setEditedAmount] = useState(amount/100);
    const [editedCategory, setEditedCategory] = useState(category);
    const categoryColors = {
        Food: "bg-green-100 text-green-700",
        Transport: "bg-yellow-100 text-yellow-700",
        Shopping: "bg-purple-100 text-purple-700",
        Bills: "bg-red-100 text-red-700",
        Entertainment: "bg-blue-100 text-blue-700",
        Other: "bg-gray-100 text-gray-700",
    };

    async function handleDelete() {
        try {
            await axios.delete(`https://expense-tracker-backend-pqny.onrender.com/api/v1/expense/delete/${id}`);
            toast.success("Expense Deleted Successfully");
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error("Error while Deleting. Please try again.");
        }
    }

    async function handleSave() {
        try {
            await axios.put(`https://expense-tracker-backend-pqny.onrender.com/api/v1/expense/edit/${id}`, {
                name: editedHeader,
                description: editedDescription,
                amount: editedAmount*100,
                category:editedCategory
            });
            toast.success("Expense Updated Successfully");
            setIsEditing(false);
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error("Error while updating. Please try again.");
        }
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm border border-gray-200">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedHeader}
                        onChange={(e) => setEditedHeader(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        placeholder="Expense Name"
                    />
                    <input
                        type="number"
                        value={editedAmount}
                        onChange={(e) => setEditedAmount(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        placeholder="Amount"
                    />
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        placeholder="Description"
                    />
                     <select
                        value={editedCategory}
                        onChange={(e) => setEditedCategory(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    >
                        {Object.keys(categoryColors).map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800">{header}</h2>
                        <h2 className="text-lg font-bold text-blue-600">Rs. {amount/100}</h2>
                    </div>
                    <p className="text-gray-600 mt-2">{description}</p>
                    <div className={`inline-block px-3 py-1 text-sm font-medium rounded-full mt-2 ${categoryColors[category]}`}>
                        {category}
                    </div>
                </>
            )}
            <div className="flex justify-end gap-2 mt-4">
                {isEditing ? (
                    <button
                        className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                ) : (
                    <button
                        className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                )}
                <button
                    className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 flex items-center gap-1 transition"
                    onClick={handleDelete}
                >
                    Delete 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}
