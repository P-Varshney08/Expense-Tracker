const express = require( 'express');
const dotenv = require( 'dotenv');
const mongoose = require('mongoose')
const cors = require('cors');
const path=require('path');

dotenv.config();
const userRoutes = require('./routes/user.route.js')
const userExpense=require('./routes/expense_route.js')
const stockRoutes=require('./routes/stock_routes.js')
const bankRoutes=require('./routes/Bank_route.js')
const chat_route=require('./routes/chat_route.js')
const app = express();
app.use(express.json());
app.use(cors());
 
const PORT = process.env.PORT || 5000; 

app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port ${PORT}`);
})

app.use('/api/user', userRoutes);
app.use('/api/user',userExpense);
app.use('/api/stock',stockRoutes);
app.use('/api/bank',bankRoutes);
app.use('/api/chat',chat_route);

// Use client app
// console.log(path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client/dist')))

// Render client for ant path
app.get("*", (req, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html ')))

MONGO_URL=process.env.MONGO_URL;

try {
    mongoose.connect( MONGO_URL )
        .then(()=>console.log("MongoDB Connected")) 
} catch (error) {
    console.log(error);
}