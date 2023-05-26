const Post = require("../models/post");
const User = require("../models/user");
module.exports.create = function (req, res) {
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      User.find({}, function (err, users) {
        return res.render("home", {
          post: posts,
          all_users: users,
        });
      });
    });
};
