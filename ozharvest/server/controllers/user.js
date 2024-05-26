const express = require('express') 
const { check, validationResult} = require("express-validator");
const User = require("../models/user")
const bcrypt = require("bcrypt")

const router = express.Router()

/*

Verb              GET
URI               /api/user
Action            index
Authentication    Required
Description       Show Users

*/
router.get('/api/:var(user|users)', (req, res) => {
  /* Check for Authenticated Admin */
  if (!req.user || req.user['role'] !== 'admin' ) return res.status(403).json({
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


/*

Verb              PUT
URI               /api/user/{id}
Action            update
Authentication    Required
Description       Update User

*/
router.put('/api/:var(user|users)/:userid',
  [
    check("password", "Please enter a valid password").isLength({
      min: 6
    }).optional({ nullable: true })
  ],
  async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({
          errors: errors.array()
      });
  }
    
  /* Check for Authenticated User */
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })
  
  // Get the id parameter from the request
  const userid = req.params.userid;
  
  // Limit Role changes to admin users
  if(req.user['role'] !== 'admin' && userid !== req.user.id)  {
    return res.status(401).json({
      errors: [{
        status: "USER_ERROR",
        msg: "User change is unauthorised"
      }]
    })
  }
  
  // Limit users to self changes
  if(req.body['role'] && req.user['role'] !== 'admin')   {
    return res.status(401).json({
      errors: [{
        status: "USER_ERROR",
        msg: "Role change is unauthorised"
      }]
    })
  }
  
  // Initiate userUpdate
  const userUpdate = {};
  
  // Set userUpdate name value
  if(req.body['name']) {
    userUpdate.name = req.body['name']
  }
  
  // Set userUpdate email value
  if(req.body['email']) {
    userUpdate.email = req.body['email']
  }
  
  // Set userUpdate role value
  if(req.body['role']) {
    userUpdate.role = req.body['role']
  }
  
  // Set userUpdate password value
  if(req.body['password']) {
    const salt = await bcrypt.genSalt(10);
    userUpdate.password = await bcrypt.hash(req.body['password'], salt);
  }
  
  // Update user by ID
  await User.findByIdAndUpdate(req.params.userid, userUpdate, {runValidators: true, returnOriginal: false})
  .then(result => {
    if (result) {
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
        msg: "Error updating user"
      }]
    })
  })
})


/*

Verb              PUT
URI               /api/user/{userid}
Action            destroy
Authentication    Required
Description       Remove User

*/
router.delete('/api/:var(user|users)/:userid',  async (req, res) => {
  /* Check for Authenticated Admin */
  if (!req.user || req.user['role'] !== 'admin' ) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })
  
  User.findByIdAndDelete(req.params.userid)
  .then(result => {
    res.json(result)
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Deleting Customer"
      }]
    })
  })
})

module.exports = router
