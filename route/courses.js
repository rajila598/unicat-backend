const express = require("express");
const router = express.Router();
const { fetchCourses, createCourses, updateCourses, deleteCourses } = require("../controller/courses");
const { checkAuthentication, isLecturer } = require("../middleware/auth");
const Joi = require("joi");
const { checkValidationSchema } = require("../middleware/checkValidationSchema");

const courseValidationSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    // description: Joi.string().required(),
    // price: Joi.string().required(),
    image: Joi.object({
        size: Joi.number()
            .max(2 * 1024 * 1024)
            .messages({ "number.max": "file must be less than 2mb" }),
        mimetype: Joi.string().valid("image/jpeg", "image/png", "image/jpg", "image/webp", "image/svg"),
    }).required(),
});



router.get("", fetchCourses);
router.post("", checkAuthentication, isLecturer, checkValidationSchema(courseValidationSchema), createCourses);
router.put("/:_id", checkAuthentication, updateCourses);
router.delete("/:_id", deleteCourses);

module.exports = router;
