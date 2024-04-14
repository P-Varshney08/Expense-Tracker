const mongoose=require("mongoose");

const Notification= new mongoose.Schema({
    message:{
        type:String,
    }
})
const Notification_schema = mongoose.model('Notification', Notification);
module.exports=Notification_schema;
