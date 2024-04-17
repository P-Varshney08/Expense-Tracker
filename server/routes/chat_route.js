const router=require("express").Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");


router.post('/send_msg',async(req,res)=>{
    const {msg}=req.body
    try {
     const genAI = new GoogleGenerativeAI(" AIzaSyB2DNK4-fmJ3ygYHmEqjCFL08txKZ-fgAg");

async function run() {

  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = `${msg}`

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return res.status(200).send({message:text})
}
run();
        
    } catch (err) {
        console.log(err);
        return res.status(500).send({message:err});
        
    } 
})
module.exports=router;