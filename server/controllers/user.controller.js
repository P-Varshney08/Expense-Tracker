
const User = require('../models/User.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const signin = async(req, res) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email: email}).populate("Expense_details").populate("");
        console.log(validUser);
        if(!validUser){
            return res.status(404).json({message: 'User not found'});
        }
        const validPassword = await bcryptjs.compare(password, validUser.password);
        if(!validPassword){
            return res.status(401).json({message: 'Invalid Credentials'});
        }
        const {_id, password: hashedPassword, ...userInfo} = validUser._doc;
        const token = jwt.sign({id: _id}, process.env.JWT_SECRET_KEY);
        console.log('Generated token', token); 
        console.log('userInfo : ', userInfo);
        return res.cookie('jwt', token, {httpOnly: true}).status(200).json({token: token, user: validUser._doc});

    } catch (error) {
        console.log('Error Signing In', error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}
const signup = async(req, res) => {
    const {username, email, password} = req.body;
    const hashedPassword = await bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username, email, password: hashedPassword
    });
    try {
        await newUser.save();
        console.log('New User created');
        res.status(200).json(newUser); 
        
    } catch (error) {
        console.log('Error Signing Up', error.message);
        if (!err.message.includes("E11000")) {     
            return res.status(500).json({message: err})
        } else {
            return res.status(409).send("Error: Email already in use");
        }
    }
}
    const profile=async(req,res)=>{
        const {id}=req.params;
        try {
            const user=await User.findById(id).populate("Expense_details")
            if(!user){
                return res.status(404).send({message:"user not found"});
             }
             return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({message:"server error",error:error})
            
        }
    }

    const userById=async(req,res,next)=> {
        try {
            const { id } = req.params 
            const user = await User.findById(id).populate("Expense_details").populate("loans");
            if(!user) return res.status(404).send({message:'User  Not Found'})
            return res.status(200).json({user})
            
            
        } catch (error) {
            console.log(error);
            return res.status(500).send({message:error});
            
        }
    }
   



module.exports = { signin, signup,profile,userById };