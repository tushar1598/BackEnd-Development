const express = require("express");
const router = express.Router();
const passport = require("passport");

const commentController = require("../controller/commentController");

router.post("/create", passport.CheckAuthentication , commentController.create);

module.exports = router;
