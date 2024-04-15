import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date

  type Transaction {
    _id: ID!
    transaction_type: String!
    name: String
    Amount: Float
    Date: Date
    tag: String
    saving_food: Float
    saving_Education: Float
    saving_Housing: Float
    setting_limit_food: Float
    setting_limit_Education: Float
    setting_limit_Housing: Float
    createdAt: Date
    updatedAt: Date
  }

  type ExpensesPerItem { 
    food: Float
    Education: Float
    Housing: Float
  }

  type RemainingSavings {
    food: Float
    Education: Float
    Housing: Float
  }

  type MonthlyReport {
    totalExpenses: Float!
    totalExpensesPerItem: ExpensesPerItem
    remainingSavings: RemainingSavings
    filteredTransactions: [Transaction]
    arr: [Float]  
  }

  type Query {
    welcome: String!
  }

  type Mutation {
    processMonthlyReport(date: Date!, userId: ID!): MonthlyReport!
  }
`;

export default typeDefs;
