const mongoose=require("mongoose")

const userSchema = new mongoose.Schema(
  {
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
    current_balance:{
      type:Number,
      default:0,
    },
    total_income:{
      type:Number,
      default:0
    },
    total_expenses:{
      type:Number,
      default:0
    },
    limit_food:{
      type:Number,
      default:0,
    },
    limit_Housing:{
      type:Number,
      default:0
    },
    limit_Education:{
      type:Number,
      default:0
    },
    savings_limit:{
      type:Number,
      default:0
    },
    Expense_details:[{
      type:mongoose.Schema.ObjectId,
      ref:"Transaction"
    }],
    Notification:[{
     type:mongoose.Schema.ObjectId,
     ref:"Notification"
    }],

  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports=User;
