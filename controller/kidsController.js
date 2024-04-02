const Kids = require('../models/Kid')

const createKids = async(req, res) => {
    try{
        const {title, description, price, imageUrl} = req.body 
        const kids = new Kids({title, description, price, imageUrl})
        await kids.save()
        res.status(200).json(kids)
    }
    catch(e){
        console.log("Err:", e)
        res.status(500).send("Server Error")
    }
}

const getKids = async(req, res) => {
    try{
        const kids = await Kids.find()
        res.status(200).json(kids)
    }
    catch(e){
        console.log("Err:", e)
        res.status(500).send("Server Error")
    }
}

module.exports = {createKids, getKids}