const express = require('express');
const users = require("./userDb") //ok
const posts = require("../posts/postDb")
const {validateUserId} = require("../middleware/validateUserID")
const validatePost = require("../middleware/validatePost");

const router = express.Router();

//Middleware

//Create a new user
router.post('/' ,(req, res) => {
    users.insert(req.body)
      .then((user) => {
        res.status(201).json(user)
      })
      .catch((error) => {
        console.log("Catch Error", error)
      })
});

//new post by user
router.post('/users/:id/posts' ,validatePost(),(req, res, next) => {
    posts.insert(req.body)
      .then((post) => {
        res.status(201).json(post)
      })
      .catch((err) => {
        res.status(500).json({
            message: "There was an error posting this comment"
        })
      })
      next()

    })
    

//Get users
router.get('/users', (req, res, next) => {
  users
  .get()
  .then((users) => {
    res.status(200).json(users)
  })
  .catch((err) => {
    next(err)
  })
});

//get User by ID
router.get('/users/:id', validateUserId(), (req, res) => {
   res.status(200).json(req.user)
});

//posts by user
router.get('/user/:id/posts', (req, res, next) => {
  users
  .getUserPosts(req.params.id)
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch(next)
});

router.delete('/users/:id', validateUserId(), (req, res, next) => {
  users
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The user has been removed",
        })
      } else {
        res.status(404).json({
          message: "The user could not be found",
        })
      }
    })
    .catch(next)
});

router.put('/:id',validateUserId(), (req, res, next) => {
  users
    .update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch(next)
});


// function validateUser(req, res, next) {
//   // do your magic!
//   // console.log(req.body);
//   if (req.body){
//     next()
//     console.log("Successful")
//   }else{
//     res.status(400).json({
//       message: "Error Here"
//     })
//   }
// }

module.exports = router;
