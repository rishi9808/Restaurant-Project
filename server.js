const express = require('express')
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const app =express()
//Port setting
const PORT = process.env.PORT || 3300
//Assets
app.use(express.static('public'))


app.get('/',(req,res)=>{
    res.render('home')
})

//set Template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')





app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})