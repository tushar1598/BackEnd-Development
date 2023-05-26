const User = require("../models/user");

module.exports.profile = function (req, res) {
  // if (req.cookies.user_id) {
  //   User.findById(req.cookies.user_id, function (err, user) {
  //     if (user) {
  //       return res.render("user", {
  //         user: user,
  //       });
  //     }
  //     return res.redirect("/user/sign-in");
  //   });
  // } else {
  //   return res.redirect("/user/sign-in");
  // }

  return res.render("user");
};

module.exports.signUp = function (req, res) {

  if(req.isAuthenticated()){
    return res.redirect('/user/profile');
  }
  return res.render("user_sign_up");
};

module.exports.signIn = function (req, res) {

  if(req.isAuthenticated()){
    return res.redirect('/user/profile');
  }
  return res.render("user_sign_in");
};

// get the sign-up data:-
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signning up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("cratting user by signinnig up");
          return;
        }
        return res.redirect("/user/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

// sign-in:-
// module.exports.createSession = function (req, res) {
//   User.findOne({ email: req.body.email }, function (err, user) {
//     if (err) {
//       console.log("error");
//       return;
//     }

//     if (user) {
//       if (user.password != req.body.password) {
//         return res.redirect("back");
//       }
//       res.cookie("user_id", user.id);
//       return res.redirect("/user/profile");
//     } else {
//       return res.redirect("back");
//     }
//   });
// };



// we will do this using passport:-


module.exports.createSession = function (req, res) {
  return res.redirect('/');
}



module.exports.DestroySession = function(req,res,next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
}

 