const Transaction = require("../models/Transaction.js");
const User = require("../models/User.js");
const Notification = require("../models/Notification.js");



module.exports.User_management = async (req, res) => {
    console.log(req.body);

    try {
        const { id } = req.params;
        const { transaction_type, name, Amount, Date, tag } = req.body;
    
       
         const user = await User.findById(id).populate("Expense_details");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const lastTransaction = user.Expense_details
            .slice()
            .reverse()
            .find(txn => txn.tag === tag);

        let newAmount = Amount;
        // if (lastTransaction) {
        //     newAmount = lastTransaction.Amount;
        // }

        const newTransaction = new Transaction({
            transaction_type,
            name,
            Amount: newAmount,
            Date,
            tag,
            setting_limit_food:user.limit_food,
            setting_limit_Education:user.limit_Education,
            setting_limit_Housing:user.limit_Housing
          });

        const currentSavingKey = `saving_${tag}`;
        const currentLimitKey = `setting_limit_${tag}`;
        
        const currentSaving = newTransaction[currentSavingKey];
        const currentLimit = newTransaction[currentLimitKey];
       
        
        let limitExceeded = false;
        let notification;
        if (transaction_type === "Expense") {
            if(Amount>user.current_balance){
                return res.status(404).json({message:"Current balance is lower than existing one"})
            }
            const updatedSaving = currentSaving + newAmount;
            console.log(updatedSaving);
            if (updatedSaving > currentLimit) {
                limitExceeded = true;
                const message = `${tag} limit exceeded`;
                notification = new Notification({ message });
                await notification.save();
                
    
                user.Notification.push(notification._id);
            }
        }
     const savedTransaction = await newTransaction.save();

     if (transaction_type === "Income") {
            user.total_income += Amount;
        } else {
            user.total_expenses += Amount;
        }
        user.current_balance = user.total_income - user.total_expenses;
        user.current_balance = Math.max(user.current_balance, 0);

        user.Expense_details.push(savedTransaction._id);
        await user.save();

        const populatedUser = await User.findById(id).populate("Expense_details");
        if (limitExceeded) {
            return res.status(400).json({ message: `${tag} limit exceeded` });
        }

        return res.status(200).json({ user: populatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


module.exports.Set_Limit = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const { limit_food, limit_Education, limit_Housing, savings_limit,limit_stock } = req.body;
    console.log(req.body)
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        if (limit_food !== undefined) {
            user.limit_food = limit_food;
        }
        if (limit_Education !== undefined) {
            user.limit_Education = limit_Education;
        }
        if (limit_Housing !== undefined) {
            user.limit_Housing = limit_Housing;
        }
        if(savings_limit!==undefined){
            user.savings_limit = savings_limit;
        }
        if(savings_limit!==undefined){
            user.savings_limit = savings_limit;
        }
        if(limit_stock!==undefined){ 
            user.money_for_stock=limit_stock;
        }
         await user.save();
        return res.status(200).json({ message: "Limits updated successfully", user });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// const { User } = require("../models/User"); // Adjust the import path as necessary

module.exports.MonthExpenSaving = async (req, res) => {
    const { date } = req.body;
    const { id } = req.params;

    try {
        let initial_saving=0;
        const user = await User.findById(id).populate("Expense_details");
        const saving=user.limit_Housing+user.limit_food+user.limit_Education;
        initial_saving+=saving;
        console.log(initial_saving);
        const arr=[];

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const transactions = user.Expense_details;

        const targetDate = new Date(date);
        const startOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
        const endOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);
        const filteredTransactions = transactions.filter(transaction => {
            const transactionDate = new Date(transaction.Date);
            return transactionDate >= startOfMonth && transactionDate <= endOfMonth;
        });
 
        let totalExpenses = 0;
        let totalExpenses_per_item = {
            food: 0,
            Education: 0,
            Housing: 0,
        };

        filteredTransactions.forEach(transaction => {
    
            if (transaction.transaction_type === 'Expense') {
                totalExpenses += transaction.Amount;
                if (transaction.tag === 'food') {
                    totalExpenses_per_item.food += transaction.Amount;
                    const val=initial_saving-transaction.Amount;
                    arr.push(val);
                } else if (transaction.tag === 'Education') {
                    totalExpenses_per_item.Education += transaction.Amount;
                    const val=initial_saving-transaction.Amount;
                    arr.push(val);
                } else if (transaction.tag === 'Housing') {
                    totalExpenses_per_item.Housing += transaction.Amount;
                    const val=initial_saving-transaction.Amount;
                    arr.push(val);
                }
            }
        });
    
    
         return res.status(200).json({
            totalExpenses,
            totalExpenses_per_item,
            filteredTransactions,
            arr
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


