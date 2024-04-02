const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userRegister = async(req, res) => {
    try{
        const {username, email, password} = req.body 
        const exist = await User.findOne({email})
        if(exist){
            return res.status(400).send("Email allready exists")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({username, email, password: hashedPassword})
        await user.save()
        res.status(200).send("Register Successfully")

    }
    catch(e){
        console.log("Error: ", e)
        res.status(500).send("Server Error")
    }
}

const userLogin = async(req, res) => {
    try{
        const {email, password} = req.body 
        const exist = await User.findOne({email})
        if(!exist || !await bcrypt.compare(password, exist.password)){
            return res.status(400).send("Email And Password Not Found")
        }
        // const payload = {
        //     user: {
        //         id: exist.id
        //     }
        // }
        const token = jwt.sign({userId: exist._id}, "myToken")
        res.json({
            email: exist.email,
            password: exist.password,
            token
        })
    }
    catch(e){
        console.log("Error: ", e)
        res.status(500).send("Server Error")
    }
}

const myProfile =  async(req, res) => {
    try{
        let exist = await User.findById(req.user.id)
        if(!exist){
            res.status(400).send("User Not Found")
        }
        res.json(exist)
    }
    catch(e){
        console.log("Error: ", e)
        res.status(500).send("Server Error a")
    }

}

module.exports = {userRegister, userLogin, myProfile} 