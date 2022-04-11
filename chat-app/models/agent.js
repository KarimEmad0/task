const mongoose= require('mongoose')
const AgentSchema= new mongoose.Schema({
   name:{
         type: String,
         required: [true,'Please enter your name'],
     },
     mobile:{
        type:String,
        required: [true,'Please enter your mobile number'],
     },
     email:{
        type: String,
        unique:true,
        required: [true,'Please enter your email'],
        //trim: true,
       // unique: true,
        //validate: [validateEmail, 'Please fill a valid email address'],
       // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
     }     
})
module.exports = mongoose.models.agents || mongoose.model('agents',AgentSchema);