const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create =  function (req, res) {
  Post.findById(req.body.post, async function (err, post) {
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        function (err, comment) {
          post.comments.push(comment);
          post.save();

          res.redirect("/");
        }
      );
    }
  });
};



module.exports.Destroy = function(req,res){
  Comment.findById(req.params.id, function(err,comment){

    if(comment.user == req.user.id){


      let postId = comment.post;
      comment.remove();

      Post.findByIdAndUpdate(postId , {$pull: {comments : req.params.id}}, function(err,post){
        return res.redirect('back');
      })


    }else{
      return res.redirect('back');
    }

  })
}
