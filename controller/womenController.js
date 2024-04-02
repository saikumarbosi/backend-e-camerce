const Women = require('../models/Women')

const createWomens = async(req, res) => {
    try{
        const {title, description, price, imageUrl} = req.body 
        const womens = new Women({title, description, price, imageUrl})
        await womens.save()
        res.status(200).json(womens)
    }
    catch(e){
        console.log("Err:", e)
        res.status(500).send("Server Error")
    }
}

const getWomens = async(req, res) => {
    try{
        const womens = await Women.find()
        res.status(200).json(womens)
    }
    catch(e){
        console.log("Err:", e)
        res.status(500).send("Server Error")
    }
}

module.exports = {createWomens, getWomens}