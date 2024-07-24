const express = require('express')
const path = require('path')
const {ConnectionToMongoDB}= require('./connection')
const URL = require('./Models/url');
const cookieParser = require('cookie-parser')
const {restrictToLoggedinUserOnly,CheckAuth}= require('./middlewares/auth')

const staticRoute = require('./Routes/staticRoute')
const urlroute = require("./Routes/url");
const userroute = require('./Routes/userRoute')

const app= express();
const PORT =8000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//mongodb://localhost:27017/url-shortner
ConnectionToMongoDB('mongodb+srv://jayprakashbts2004:PY5ybu9tofKuFpwh@cluster0.egnxprp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=> console.log("MongoDb Connected"))
.catch((error)=> console.log("Error Occurred",error));

app.use('/url',restrictToLoggedinUserOnly,urlroute)
app.use('/', CheckAuth,staticRoute)
app.use('/user',CheckAuth, userroute)

app.set("view engine", "ejs");
app.set('views',path.resolve("./View"))



app.listen(PORT, ()=> console.log(`server started running at: ${PORT}`));
