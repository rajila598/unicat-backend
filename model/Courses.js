const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CoursesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        // required: true,

    },
    price: {
        type: Number,
        // required: true,
        default: 0
    },
    createdBy: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    image:{
        type: String
    },
    
},{
    timestamps: true,
})

const Courses = mongoose.model("Courses", CoursesSchema);

module.exports = Courses;