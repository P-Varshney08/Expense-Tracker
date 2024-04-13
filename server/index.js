const express = require( 'express');
const dotenv = require( 'dotenv');
const mongoose = require('mongoose')
dotenv.config();
const userRoutes = require('./routes/user.route.js')

const  app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port ${PORT}`);
})

app.use('/api/user', userRoutes);

// mongo db connection
MONGO_URL=process.env.MONGO_URL;

try {
    mongoose.connect( MONGO_URL )
        .then(()=>console.log("MongoDB Connected"))
} catch (error) {
    console.log(error);
}