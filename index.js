const express = require("express");
const app = express();
const courseRoutes = require("./route/courses");
const userRoutes = require("./route/auth");
const handleServerError = require("./middleware/handleServerError");
const fileUpload = require("express-fileupload");
require('dotenv').config()


app.use(express.json());
app.use(fileUpload());
app.use('/uploads', express.static('uploads'));
app.use("/api/courses", courseRoutes);
app.use("/api/auth", userRoutes);

app.use(handleServerError);

require("./config/database");

app.listen(5000, () => {
    console.log("Server Started");
});
