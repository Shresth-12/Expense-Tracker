import express from "express"
import expenserouter from "./expense.js"
const router=express.Router()
router.use("/expense",expenserouter)
export default router;