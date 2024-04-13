const express = require('express') 
const { check, validationResult} = require("express-validator");
const Post = require("../models/post")
const User = require("../models/user")

const router = express.Router()

/*

Verb              GET
URI               /api/user
Action            index
Authentication    Required
Description       Show Users

*/
router.get('/api/:var(user|users)', (req, res) => {
  /* Check for Authenticated User */
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })
  
  /* Get Users */
  User.find({})
  .then(result => {
    if (result) {
      res.json(result)
    } else {
      /* No User Found */
      return res.status(404).json({
        errors: [{
          status: "USER_ERROR",
          msg: "Users Not Found"
        }]
      })
    }
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Getting Users"
      }]
    })
  })
})


/*

Verb              GET
URI               /api/user/{id}
Action            show
Authentication    Required
Description       Show User

*/
router.get('/api/:var(user|users)/:id', (req, res) => {
  /* Check for Authenticated User */
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })
  
  /* Get User by ID */
  User.findById(req.params.id)
  .then(result => {
    if (result) {
      /* Return Found User */
      res.json(result)
    } else {
      /* No User Found */
      return res.status(404).json({
        errors: [{
          status: "USER_ERROR",
          msg: "User ID Not Found"
        }]
      })
    }
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Getting User"
      }]
    })
  })
})

module.exports = router
