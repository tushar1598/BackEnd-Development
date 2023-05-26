const Post = require("../models/post");

module.exports.create = function (req, res) {
  Post.find({})
    .populate("user")
    .populate({
      path : 'comments',
      populate : {
        path : 'user'
      }
    })
    .exec(function (err, posts) {
      return res.render("home", {
        post : posts,
      });
    });
};
