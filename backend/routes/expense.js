import express from "express"
import { Expense } from "../db.js"
const router=express.Router()

router.post("/add",async (req,res)=>{
    try {
        const name=req.body.name
        const amount=req.body.amount
        const date=req.body.date
        const description=req.body.description
        const category=req.body.category
        const expense=await Expense.create({
            name:name,
            amount:amount,
            date:date,
            description:description,
            category:category
          })
          return res.json({
              message:"Expense Saved",
          })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
})
router.get("/get-expenses", async (req, res) => {
    try {
        const expenses = await Expense.find();
        return res.json(expenses);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
router.put("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const name=req.body.name
        const amount=req.body.amount
        const date=req.body.date
        const description=req.body.description
        const category=req.body.category
        const updatedExpense = await Expense.findByIdAndUpdate(
            id,
            {name, amount, date, description ,category },
            { new: true }
        );
        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        return res.json({ message: "Expense Updated", updatedExpense });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        return res.json({ message: "Expense Deleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
router.get("/monthly-expenses", async (req, res) => {
    try {
      const monthlyExpenses = await Expense.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
            totalAmount: { $sum: "$amount" },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      const formattedData = monthlyExpenses.map((item) => {
        const [year, month] = item._id.split("-");
        const monthName = new Date(year, month - 1).toLocaleString("en-US", { month: "short" });
        return {
          month: monthName,
          amount: item.totalAmount / 100,
        };
      });
      res.json(formattedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
});

  router.get("/amount", async (req, res) => {
    try {
        const totalAmount = await Expense.aggregate([
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
        ]);
        const count = await Expense.countDocuments();
        res.json({
            totalAmount: totalAmount.length ? totalAmount[0].totalAmount : 0,
            totalExpenses: count
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
export default router;