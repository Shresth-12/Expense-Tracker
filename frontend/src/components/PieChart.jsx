import { PieChart as RechartPieChart, Pie, Tooltip, Cell, Legend } from "recharts";

export function ExpensePieChart({ expenses }) {
    const categoryData = expenses.reduce((acc, expense) => {
        const existingCategory = acc.find((c) => c.name === expense.category);
        if (existingCategory) {
            existingCategory.value += expense.amount / 100;
        } else {
            acc.push({ name: expense.category, value: expense.amount / 100 });
        }
        return acc;
    }, []);

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF3366", "#3399FF"];

    return (
        <div className="flex justify-center mt-6">
            <RechartPieChart width={600} height={400}>
                <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                >
                    {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value) => `Rs. ${value}`} />
                <Legend />
            </RechartPieChart>
        </div>
    );
}
