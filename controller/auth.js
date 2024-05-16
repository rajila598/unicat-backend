const User = require("../model/User");
const bcrypt = require("bcrypt");
const Joi = require("joi");
var jwt = require("jsonwebtoken");
const { TUTOR } = require("../constant/role");

const signup = async (req, res, next) => {
    try {
        let hashed_password = await bcrypt.hash(req.body.password, 10);
        let user = await User.create({ ...req.body, password: hashed_password });
        user.password = undefined;
        res.send(user);
        console.log("User Create");
    } catch (err) {
        next(err);
        console.log(err);
    }
};
const login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email }).select("+password");
        if (user) {
            //check password
            let match = await bcrypt.compare(req.body.password, user.password);
            if (match) {
                user = user.toObject();
                user.password = undefined;
                const token = jwt.sign(user, process.env.JWT_SECRET);
                console.log(token);
                return res.send({ token, user });
            }
            return res.status(401).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }

    res.status(401).send("Invalid Credentials");
    console.log("User login");
};

const fetchTutor = async (req, res, next) => {
    try{
        let perPage = parseInt(req.query.perPage) || 4;
        let page = parseInt(req.query.page) || 1;
        let tutorFilter = {
            title: new RegExp(req.query.search, "i"),
        };

        let tutor = await User.find({ role: TUTOR }).skip((page-1) * perPage).limit(perPage);
        let totalTutor = await User.countDocuments(tutorFilter);
        console.log("User fetched")
        res.send({
            page: page,
            perPage: perPage,
            total: totalTutor,
            data: tutor
        })
    }catch(err) {
        next(err);
    }
}

module.exports = {
    signup,
    login,
    fetchTutor,
};
