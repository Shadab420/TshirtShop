const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
const path = require('path');

const app = express();


//connect to mongoDB
mongoose.connect('mongodb://localhost:27017/tshirtshop', { useNewUrlParser: true });

mongoose.connection.on('connected', (err)=>{

    if(err) console.log('error to connect mongo');
    else console.log("Connected to mongodb at 27017");
})

//port
const port = 5000;

//use middlewares cors
app.use(cors()); 

//bodyparser middleware
app.use(express.json());

//use assets folder
app.use(express.static('./assets'));


//App Routes
app.use('/api/products/', require('./routes/api/products'));
app.use('/api/users/', require('./routes/api/users'));
app.use('/api/auth/', require('./routes/api/auth'));

//start the frontend app
app.listen(port, ()=>{
  console.log('Server started at port: ' + port);
});