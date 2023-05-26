const express = require("express");
const router = express.Router();
const passport = require("passport");

const postController = require("../controller/postController");

router.post("/create", passport.CheckAuthentication , postController.create);

module.exports = router;
