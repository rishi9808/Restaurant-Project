require('dotenv').config( )
const express = require('express')
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const app =express()
var mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')

//Database Connection
const url = 'mongodb://localhost/viva-napoli'
mongoose.set('strictQuery', true);
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology:true});
const connection = mongoose.connection;
connection.on('error',(err)=>{
    console.log("Connection failed");
})
connection.once('open', () => {
    console.log('Database connected..')
})

exports.test = function(req,res) {
  res.render('test');
};

//Port setting
const PORT = process.env.PORT || 3300


//Session Config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave:false,
    store: MongoDbStore.create({
        mongoUrl: 'mongodb://localhost/viva-napoli',
    }),
    saveUninitialized:false,
    cookie: { maxAge: 1000 * 60 * 60 * 24}  //24 hours
}))


app.use(flash())

//Assets
app.use(express.static('public'))

//set Template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')


//route page
require('./routes/web')(app)

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})