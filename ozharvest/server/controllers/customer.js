const express = require('express') 
const { check, validationResult} = require("express-validator");
const Customer = require("../models/customer")
const User = require("../models/user")

const router = express.Router()


/*

Verb              POST
URI               /api/customer/register
Action            store
Authentication    Required
Description       Store a new customer

*/
router.post('/api/:var(customer|customers)/register', 
  [
    check("firstname", "Firstname can not be empty").not().isEmpty(),
    check("lastname", "Lastname can not be empty").not().isEmpty(),
  ],
  async (req, res) => {
    /* Check for Authenticated User */
    if (!req.user) return res.status(403).json({
      errors: [{
        status: "AUTH_ERROR",
        msg: "Access Denied"
      }]
    })
    
    /* Validate Input */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    /* Constuct New Customer */
    const {
      firstname,
      lastname,
      middlename,
      title,
      language
    } = req.body;
    
    /* Store Customer to Database */
    const newCustomer = new Customer({
      firstname: firstname,
      lastname: lastname,
      middlename: middlename,
      title: title,
      language: language,
      created: Date.now(),
      creator: req.user.id
    })
    newCustomer.save()
    .then(result => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({
        errors: [{
          status: "CUSTOMER_ERROR",
          msg: "Error Saving Customer"
        }]
      })
    })
  }
)


/*

Verb              GET
URI               /api/customer/{id}
Action            show
Authentication    Required
Description       Show Customer

*/
router.get('/api/:var(customer|customers)/:id', (req, res) => {
  /* Check for Authenticated User */
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })
  
  /* Get User by ID */
  Customer.findById(req.params.id)
  .then(result => {
    if (result) {
      /* Return Found User */
      res.json(result)
    } else {
      /* No User Found */
      return res.status(404).json({
        errors: [{
          status: "CUSTOMER_ERROR",
          msg: "Custerom ID Not Found"
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

Verb              POST
URI               /api/customer/{id}/ident
Action            store
Authentication    Required
Description       Store a new customer ident

*/
router.post('/api/:var(customer|customers)/:id/ident', 
  [
    check("document", "Document can not be empty").not().isEmpty(),
    check("id", "ID can not be empty").not().isEmpty(),
  ],
  (req, res) => {
    /* Check for Authenticated User */
    if (!req.user) return res.status(403).json({
      errors: [{
        status: "AUTH_ERROR",
        msg: "Access Denied"
      }]
    })
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    
    /* Constuct New Document */
    const {
      document,
      id
    } = req.body;
    
    const newIdent = {
      document: document,
      id: id
    }
    
    Customer.findByIdAndUpdate(req.params.id, {$push: {"ident": newIdent}}, {safe: true, upsert: true, new : true})
    .then(result => {
      res.json(result)
    })
    .catch(() => {
      return res.status(500).json({
        errors: [{
          status: "SERVER_ERROR",
          msg: "Error Getting Customer"
        }]
      })
    })
  }
)


/*

Verb              POST
URI               /api/customer/{id}/checkin
Action            store
Authentication    Required
Description       Store a customer checkin

*/
router.post('/api/:var(customer|customers)/:id/checkin', 
  [
    check("location", "Location can not be empty").not().isEmpty(),
  ],
  (req, res) => {
    /* Check for Authenticated User */
    if (!req.user) return res.status(403).json({
      errors: [{
        status: "AUTH_ERROR",
        msg: "Access Denied"
      }]
    })
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    
    /* Constuct New Document */
    const {
      location
    } = req.body;
    
    const newCheckin = {
      location: location,
      date: Date.now()
    }
    
    Customer.findByIdAndUpdate(req.params.id, {$push: {"checkin": newCheckin}}, {safe: true, upsert: true, new : true})
    .then(result => {
      res.json(result)
    })
    .catch(() => {
      return res.status(500).json({
        errors: [{
          status: "SERVER_ERROR",
          msg: "Error Getting Customer"
        }]
      })
    })
  }
)


/*

Verb              POST
URI               /api/customer/
Action            search
Authentication    Required
Description       Search for customer

*/
router.post('/api/:var(customer|customers)', 
  [
  ],
  async (req, res) => {
    /* Check for Authenticated User */
    if (!req.user) return res.status(403).json({
      errors: [{
        status: "AUTH_ERROR",
        msg: "Access Denied"
      }]
    })
    
    /* Validate Input */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    
    const {
        firstname = null,
        lastname = null,
        ident = {"type": null, "value": null}
    } = req.body;
    
    Customer.find({
      $or:[
        {
          $and: [
            {"firstname": firstname},
            {"lastname": lastname}
          ]
        },
        {
          $and: [
            {"ident.document": ident.type},
            {"ident.id": ident.value}
          ]
        },
      ]
    })
    .then(result => {
      if (result) {
        res.json(result)
      } else {      
        return res.status(404).json({
          errors: [{
            status: "POST_ERROR",
            msg: "No Results Found"
          }]
        })
      }      
    })
    .catch(() => {
      return res.status(500).json({
        errors: [{
          status: "SERVER_ERROR",
          msg: "Error Getting Post From Database"
        }]
      })
    })
  }
)

module.exports = router
