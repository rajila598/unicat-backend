const Joi = require("joi");
const Courses = require("../model/Courses");
const path = require("path");
const fs = require("fs");

const fetchCourses = async (req, res, err) => {
    try {
        let sort = req.query.sort || "dateDesc";
        let priceFrom = parseFloat(req.query.priceForm) || 0;
        let priceTo = parseFloat(req.query.priceTo) || 99999999;
        let perPage = parseInt(req.query.perPage) || 6;
        let page = parseInt(req.query.page) || 1;
        let sortBy = {
            createdAt: -1,
        };
        if (sort == "priceAsc") {
            sortBy = { price: 1 };
        } else if (sort == "priceDes") {
            sortBy = { price: -1 };
        } else if (sort == "titleAsc") {
            sortBy = { title: -1 };
        } else if (sort == "titleDes") {
            sortBy = { title: -1 };
        }

        let courseFilter = {
            title: new RegExp(req.query.search, "i"),
            $and: [{ price: { $gte: priceFrom } }, { price: { $lte: priceTo } }],
        };
        let courses = await Courses.find(courseFilter)
            .populate("createdBy")
            .sort(sortBy)
            .skip((page - 1) * perPage)
            .limit(perPage);

        let totalCourses = await Courses.countDocuments(courseFilter);
        console.log("Fetch Products");
        res.send({
            page: page,
            perPage: perPage,
            total: totalCourses,
            data: courses,
        });
    } catch (err) {
        next(err);
    }
};
const createCourses = async (req, res, next) => {
    try {
        let imagePath = null;
        if (req.files?.image) {
            let rootPath = path.resolve();
            let uniqueTimestamp = Date.now() + Math.floor(Math.random() * 1000);
            imagePath = path.join("/", "uploads", `${uniqueTimestamp}-${req.files.image.name}`).replaceAll("\\", "/");
            req.files.image.mv(path.join(rootPath, imagePath));
            console.log(imagePath);
        }
        let courses = await Courses.create({ ...req.body, image: imagePath, createdBy: req.user._id });
        console.log("Create Products");
        res.send(courses);
    } catch (err) {
        next(err);
    }
};

const updateCourses = async (req, res, next) => {
    try {
        let matched = await Courses.findById(req.params._id);
        if (!matched) {
            let error = new Error();
            error.statusCode = 404;
            error.msg = "Not Found";
            throw error;
        }
        console.log("Update Products");
        res.send(`${req.params._id} Updated`);
    } catch (err) {
        next(err);
    }
};

const deleteCourses = async (req, res, next) => {
    try {
        let matched = await Courses.findById(req.params._id);
        if (!matched) {
            let error = new Error();
            error.statusCode = 404;
            error.msg = "Not Found";
            throw error;
        }
        let course = await Courses.findByIdAndDelete(req.params._id);
        fs.unlinkSync(path.join(path.resolve(), course.image));
        console.log("Delete Products");
        res.send(`${req.params._id} Deleted`);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    fetchCourses,
    createCourses,
    updateCourses,
    deleteCourses,
};
