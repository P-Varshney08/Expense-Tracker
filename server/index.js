const express = require( 'express');
const dotenv = require( 'dotenv');
dotenv.config();

const  app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port ${PORT}`);
})