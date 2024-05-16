const express = require("express");
const { signup, login, fetchTutor } = require("../controller/auth");
const { checkValidationSchema } = require("../middleware/checkValidationSchema");
const Joi = require("joi");
const router = express.Router();

const signupValidationSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid("tutor", "student").required(),
    password: Joi.string().min(8).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});
const loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

router.post("/signup", checkValidationSchema(signupValidationSchema), signup);
router.post("/login", checkValidationSchema(loginValidationSchema), login);
router.get("/tutor", fetchTutor);

module.exports = router;
