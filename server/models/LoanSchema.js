const mongoose=require("mongoose")
const loanSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bank_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
    loan_amount: Number,
    interest_rate: Number,
    interest_amount: Number,
    total_amount_due: Number,
    is_approved: Boolean,
    is_paid: Boolean,
    last_updated: Date 
  });
  const Loan=mongoose.model('Loan',loanSchema)
  module.exports = Loan;