const express = require( 'express');
const dotenv = require( 'dotenv');
const mongoose = require('mongoose')
const cors = require('cors');

dotenv.config();
const userRoutes = require('./routes/user.route.js')
const userExpense=require('./routes/expense_route.js')

const app = express();
app.use(express.json());
app.use(cors());
 
const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port ${PORT}`);
})

app.use('/api/user', userRoutes);
app.use('/api/user',userExpense);





MONGO_URL=process.env.MONGO_URL;

try {
    mongoose.connect( MONGO_URL )
        .then(()=>console.log("MongoDB Connected")) 
} catch (error) {
    console.log(error);
}