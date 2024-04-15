const mongoose=require("mongoose");
const userStockSchema = new mongoose.Schema({
  symbol: {
      type: String,
      required: true
  },
  quantity: {
      type: Number,
      required: true,
      default: 0
  }
});
 

const userSchema = new mongoose.Schema({
  email: {
      type: String,
      required: true,
  },
  password: {
      type: String,
      required: true,
  },
  username: {
      type: String,
      required: true,
  },
  current_balance: {
      type: Number,
      default: 0,
  },
  total_income: {
      type: Number,
      default: 0
  },
  total_expenses: {
      type: Number,
      default: 0
  },
  limit_food: {
      type: Number,
      default: 0,
  },
  limit_Housing: {
      type: Number,
      default: 0
  },
  limit_Education: {
      type: Number,
      default: 0
  },
  savings_limit: {
      type: Number,
      default: 0
  },
  Expense_details: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction"
  }],
  Notification: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification"
  }],
  money_for_stock: {
      type: Number,
      default: 0
  },
  ownedStocks: {
      type: [userStockSchema],
      default: []
  },
  loans: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Loan"

  }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;