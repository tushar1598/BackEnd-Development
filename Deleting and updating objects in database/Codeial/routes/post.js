const express = require("express");
const router = express.Router();
const passport = require("passport");

const postController = require("../controller/postController");

router.post("/create", passport.CheckAuthentication , postController.create);
router.get('/destroy/:id', passport.CheckAuthentication, postController.Destroy);

module.exports = router;
