const express = require('express');
const {UserSignup,UserLogin} = require('../Controllers/user')

const route = express.Router();

route.post('/',UserSignup)
route.post('/login',UserLogin)

module.exports = route