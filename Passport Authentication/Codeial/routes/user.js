
const express = require("express");
const router = express.Router();
const passport = require('passport');

const userController = require("../controller/userController");

router.get("/profile" , passport.CheckAuthentication , userController.profile);

router.get("/sign-up", userController.signUp);
router.get("/sign-in", userController.signIn);

router.post("/create", userController.create);

// router.post("/create-session", userController.createSession);
// using passport:-
router.post("/create-session", passport.authenticate('local',{failureRedirect : '/user/sign-in'}) ,userController.createSession);

router.get('/sign-out',userController.DestroySession);

module.exports = router;
