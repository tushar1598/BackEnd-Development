
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// authentication using passport:-
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },

    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("error in finding user:- passport");
          return done(err);
        }

        if (!user || user.password != password) {
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);




// Serialiaze user function:-

passport.serializeUser (function(user,done){
    done(null , user.id);
})






// Deserialiaze user function:-
passport.deserializeUser (function(id,done){
    User.findById(id,function(err,user){
        if(err){console.log("error"); return done(err)}
        return done(null,user);
    })
})




// check if user is authenticated:-
passport.CheckAuthentication = function(req,res,next){

  // if the user is sign-in then pass request to the next function which is my controller action:-
  if(req.isAuthenticated()){
    return next();
  }

  // if the user is not sign-in:-
  return res.redirect('/user/sign-in');

}


passport.setAuthenticatedUser = function(req,res,next){

  if(req.isAuthenticated()){
    // req.user contains the current sign user from th session cookie and we are sending just thel locals for the views:-
    res.locals.user = req.user;
  }

  next();
}



module.exports = passport;