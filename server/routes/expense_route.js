const express = require('express');
const router = express.Router();
const {User_management,Set_Limit,MonthExpenSaving}=require("../controllers/expense_manage")
router.post('/Add_expense/:id',User_management)
router.post('/fix_expense/:id',Set_Limit)
router.post("/ExpenseDetails/:id",MonthExpenSaving);
module.exports = router;        