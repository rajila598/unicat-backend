const express = require("express");
const app = express();
const courseRoutes = require("./route/courses");
const userRoutes = require("./route/auth");
const handleServerError = require("./middleware/handleServerError");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const cloudinary = require("cloudinary");
const cors = require("cors");
// import {v2 as cloudinary} from 'cloudinary';

app.use(express.json());
app.use(fileUpload());

const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,
};

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/api/courses", courseRoutes);
app.use("/api/auth", userRoutes);

app.use(handleServerError);

require("./config/database");

app.listen(process.env.PORT, () => {
    console.log("Server Started");
});
