const {setUser}= require('../service/auth');
const {v4: uuidV4}= require('uuid')

const User = require('../Models/user');

async function UserSignup(req,res){

    const {name, email, password}= req.body;

    await User.create({
        name,
        email,
        password
    });
    return res.redirect('/');
}

async function UserLogin(req,res){

    const { email, password}= req.body;
const user= await User.findOne({email, password});

if(!user){
    
    return res.render("login",{
error:"Invalid Username or Password",
    });
}

    
   const token = setUser( user);
    res.cookie('uid', token)

    return res.redirect('/');
}
module.exports = {
    UserSignup,
    UserLogin
}