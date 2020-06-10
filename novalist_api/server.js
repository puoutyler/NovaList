//DEPENDENCIES
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

//GLOBALS
const PORT = process.env.PORT || 3000
const novalistController = require('./controllers/novalist.js')
const db = mongoose.connection
const MONGODB_URI = process.env.MONGODB_URL || 'mongodb://localhost:27017/novalist'
const whitelist = ['http://localhost:1985']
const corsOptions = {
    origin: function (origin, callback){
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else{
            callback(new Error('Not allowed by CORS'))
        }
    }
}


//DATABASE CONNECT
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
db.on('open', () => {
    console.log('Mongo is Connected')
})

//MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use('/novalist', novalistController)

//LISTENER
app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`)
})