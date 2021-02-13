const express=require('express')
const mongoose = require('mongoose');
const { MONGO_URI } = require('./keys');
const authRoute=require('./route/authRoutes')
var bodyParser = require('body-parser');
const postRoute=require('./route/postRoutes')
const cors=require('cors')
const userProfile=require('./route/userProfile')



const app=express()
const PORT= process.env.PORT || 4000


//middleware

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

//routes

app.use('/auth',authRoute)
app.use('/post', postRoute)
app.use('/profile',userProfile )




 mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log('Database connected')
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
});
