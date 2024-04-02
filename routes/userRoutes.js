const controller = require('../controller/userController')
const mensController = require('../controller/mensController')
const womenControllers = require('../controller/womenController')
const kidsController = require('../controller/kidsController')
const jwt = require('jsonwebtoken')
const express = require('express')
const userRouter = express.Router()

const middleware = (req, res, next)=> {
    try{
        let token = req.header('x-token')
        if(!token){
            res.status(400).send("Token Not Found")
        }
        let decode = jwt.verify(token, "myToken")
        req.user = decode.user
        next() 
    }
    catch(e){
        console.log("Error: ", e)
        res.status(500).send("Server Error token")
    }
}
// user
userRouter.post('/register', controller.userRegister)
userRouter.post('/login', controller.userLogin)
userRouter.get('/myprofile', middleware, controller.myProfile)

// mens

userRouter.post('/createMen', mensController.createMens)
userRouter.get('/mens', mensController.getMens)

// womens

userRouter.post('/createWomen', womenControllers.createWomens)
userRouter.get('/womens', womenControllers.getWomens)

//kids

userRouter.post('/createKid', kidsController.createKids)
userRouter.get('/kids', kidsController.getKids)

module.exports = userRouter