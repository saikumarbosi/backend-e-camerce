const express = require('express')
const mongoose = require('mongoose')
const dotEnv = require('dotenv')
const bodyParser = require('body-parser')
const userRouter = require('./routes/userRoutes')
const cors = require('cors')

const app = express()
dotEnv.config()
mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    console.log("MongoDb connected")
})
.catch((e) => {
    console.log("ERR:", e)
})

app.use(bodyParser.json())
app.use(cors({origin:"*"}))
app.use(userRouter)


const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`)
})