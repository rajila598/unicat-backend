const Contact = require("../model/Contact");
const User = require("../model/User");

const fetchMessage = async(req, res, next) => {
    try{
        let sort = req.query.sort || "dateAsc";
        let sortBy = {
            createdAt: -1,
        }
        if(sort == "dateDesc"){
            sortBy = { createdAt: 1 };
        }
        let contact = await Contact.find().populate("createdBy").sort(sortBy)
        res.send(contact);
    }catch(err){
        next(err);
    }
    console.log("message fetched");
}

const createMessage = async( req, res, next) => {
    try{
        
        let contact = await Contact.create({
            ...req.body
        })
        res.send(contact)
        console.log("message created");
    } catch(err) {
        next(err);
    }
}

module.exports = {
    fetchMessage,
    createMessage
}