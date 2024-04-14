const mongoose = require("mongoose");

const Transaction_Schema = new mongoose.Schema(
  {
    transaction_type: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    Amount: {
      type: Number,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
    tag: {
      type: String, 
      required: true,
      validate: {
        validator: function (value) {
          if (this.transaction_type === "Income") {
            const incomeTags = ["Salary", "Freelance", "Investment"];
            return incomeTags.includes(value);
          } else if (this.transaction_type === "Expense") {
            const expenseTags = ["food", "Education", "Housing"];
            return expenseTags.includes(value);
          }
          return false;
        },
        message: (props) =>
          `${props.value} is not a valid tag for transaction type ${props.instance.transaction_type}`,
      },
    },
    saving_food: {
      type: Number,
      default: 0,
    },
    saving_Education: {
      type: Number,
      default: 0,
    },
    saving_Housing: {
      type: Number,
      default: 0,
    },
    setting_limit_food:{
        type:Number,
        default:100,
    },
    setting_limit_Education:{
        type:Number,
        default:100,
    },
    setting_limit_Housing:{
        type:Number,
        default:100,
    },
    
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", Transaction_Schema);

module.exports = Transaction;
