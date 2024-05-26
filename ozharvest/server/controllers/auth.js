const express = require('express') 
const { check, validationResult} = require("express-validator");
const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const SECRET = process.env.SECRET

const router = express.Router()


/*

Verb              POST
URI               /api/auth/signup
Action            store
Authentication    Not Required
Description       Store a new user

*/
router.post(["/api/auth/signup", "/api/signup"],
  [
    check("username", "Please Enter a Valid Username").not().isEmpty(),
    check("username", "Username must be between 2 and 32 characters").isLength({
      min: 2,
      max: 32
    }),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    /* Build Input */
    const {
        username,
        password
    } = req.body;
    
    /* Check Unique Username */
    await User.findOne({
      username
    })
    .then(async user => {
      if (user) {
        return res.status(400).json({
          errors: [{
            status: "AUTH_ERROR",
            msg: "Username Already Exists",
            param: "username",
            location: "body"
          }]
        })
      } else {
        /* Check Restricted Usernames */
        const restrictedUsernames = ["admin", "user", "root", "guest"];
        if (restrictedUsernames.includes(username.toLowerCase())) {
          return res.status(400).json({
            errors: [{
              status: "AUTH_ERROR",
              msg: "Restricted Username",
              param: "username",
              location: "body"
            }]
          })
        }
        
        
        await User.countDocuments({})
        .then(userCount => {
          if (userCount == 0) {
            role = "admin"
          } else {
            role = "user"
          }
        })
        .catch((err) => {
          console.log(err)
          return res.status(500).json({
            errors: [{
              status: "SERVER_ERROR",
              msg: "Error Getting User Count"
            }]
          })
        })
        
        user = new User({
          username: username,
          password: password,
          role: role
        });
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        
        await user.save()
        .then(save => {
          const payload = {
            user: { id: user.id, role: user.role }
          }
          
          jwt.sign(
            payload,
            SECRET, { expiresIn: 10000 },
            (err, token) => {
              if (err) throw err;
              res.cookie('token', token, { httpOnly: true });
              return res.status(200).json({
                token
              });
            }
          )
        })
        .catch((err) => {
          console.log(err)
          return res.status(500).json({
            errors: [{
              status: "SERVER_ERROR",
              msg: "Error Saving User"
            }]
          })
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
  }
);


/*

Verb              POST
URI               /api/auth/login
Action            authenticate
Authentication    Required
Description       Authenticate User

*/
router.post(["/api/auth/login", "/api/login"],
  [
    check("username", "Please Enter a Valid Username").not().isEmpty(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { 
      username, 
      password 
    } = req.body;
  
    await User.findOne({username})
    .select('+password')
    .then(async user => {
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({
            errors: [{
              status: "AUTH_ERROR",
              msg: "Incorrect Password"
            }]
          })
        }
        
        const payload = {
          user: {id: user.id, role: user.role}
        }

        jwt.sign(
          payload,
          SECRET,
          { expiresIn: 10000 },
          (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { httpOnly: true });
            return res.status(200).json({
              token
            });
          }
        )
      } else {
        return res.status(400).json({
          errors: [{
            status: "USER_ERROR",
            msg: "User Does Not Exist"
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
  }
);

/*

Verb              GET
URI               /api/auth/logout
Action            destroy
Authentication    Not Required
Description       Logout

*/
router.get(["/api/auth/logout", "/api/logout"],  (req, res) => {
  res.clearCookie('token');
  return res.status(204).end()
});

/*

Verb              GET
URI               /api/auth/whoami
Action            show
Authentication    Optional
Description       Show Self User

*/
router.get(["/api/auth/whoami", "/api/me"],  (req, res) => {
  if (!req.user) return res.json({
    username: "guest" 
  })
  
  User.findById(req.user.id)
  .then(result => {
    if (result) {
      res.json(result)
    } else {
      return res.status(404).json({
        errors: [{
          status: "POST_ERROR",
          msg: "Invalid User ID"
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
});

module.exports = router
