const express = require("express");
const { fetchMessage, createMessage } = require("../controller/contact");
const { checkAuthentication } = require("../middleware/auth");
const router = express.Router();


router.get("", fetchMessage);
router.post("",checkAuthentication, createMessage)

module.exports = router;