const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true,
    
    },
    password:{
        type:String,
        require:true,
    }
});
const user = mongoose.model("user", userschema);
const app = express();
app.use(express.json());
const SECRET_KEY ="secretkey";
app.post("/signup", async (req, res) => {
    try{
        const{email,phone,password} = req.body;
        const hashepassword = await bcrypt.hash(password, 10);
        const newUser = new user({email, phone, password: hashepassword});
        await user.save();
        res.status(201).json({messsage:"user created"});
    } catch (error){
        res.status(500).json({error: "signup failed"});

        
    }

    }
);
app.post("/login", async (req, res) => {
    try{
        const{email,password} = req.body;
        const user = await user.findOne({email});
        if(!user){
            return res.status(400).json({error:"user not found"});
        const ispasswordvalid = await bcrypt.compare(password, user.password);
        if (!ispasswordvalid) {
            return res.status(400).json({error: "invalid password"});
        }
        const token = jwt.sign({id: user._id, email: user.email}, SECRET_KEY, {expiresIn: "1h"});
        res.json({messsage: "login success", token});
    } 
}
    catch (error) {
        res.status(500).json({error: "login failed"});
    }
});
app.listen(3000, () => {    
    console.log("server is running on port 3000");
});



