const express = require("express");
const URL = require("../Models/url");

const router = express.Router();

router.get('/', async (req,res)=>{
    if(!req.user) return res.redirect('/login')
    const AllURLs = await URL.find({createdBy: req.user._id});

    return res.render("home",{
        urls:AllURLs
    });
});

router.get('/signup', (req,res)=>{

    return res.render('signup');
});

router.get('/login', (req,res)=>{
    return res.render('login');
});
module.exports = router;