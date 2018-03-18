const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
const config=require('./config/database');
const app=express();

//connect with mongoose
mongoose.connect(config.database, { useMongoClient: true});

//on connection
mongoose.connection.on('connected',()=>{
    console.log('connected with database'+config.database);
});


//on error
mongoose.connection.on('error',(err)=>{
    console.log('error while connecting to database'+err);
});


const users=require('./routes/users');

const port= process.env.PORT || 8080;
//CORS Middleware
app.use(cors());

//set static path
app.use(express.static(path.join(__dirname,'public')));

//Body Parser Middlenware
app.use(bodyParser.json());
 
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);
//Index route
app.get('/',(req,res)=>{
    res.send('invalid Endpoint');
});

app.get('**',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


//Server started
app.listen(port,()=>{
    console.log('server started on port'+port);
});