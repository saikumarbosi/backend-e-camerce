const Mens = require('../models/Mens')

const createMens = async(req, res) => {
    try{
        const {title, description, price, imageUrl} = req.body 
        const mens = new Mens({title, description, price, imageUrl})
        await mens.save()
        res.status(200).json(mens)
    }
    catch(e){
        console.log("Err:", e)
        res.status(500).send("Server Error")
    }
}

const getMens = async(req, res) => {
    try{
        const mens = await Mens.find()
        res.status(200).json(mens)
    }
    catch(e){
        console.log("Err:", e)
        res.status(500).send("Server Error")
    }
}

module.exports = {createMens, getMens}