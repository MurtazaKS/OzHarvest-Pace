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
      title,
      firstname,
      lastname,
      middlename,
      birthday,
      language
    } = req.body;
    
    /* Store Customer to Database */
    const newCustomer = new Customer({
      title: title,
      firstname: firstname,
      lastname: lastname,
      middlename: middlename,
      birthday: birthday,
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
URI               /api/customer
Action            show
Authentication    Required
Description       Show Customer

*/
router.get('/api/:var(customer|customers)', (req, res) => {
  /* Check for Authenticated User */
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })
  
  /* Get User by ID */
  Customer.find({})
  .populate('creator')
  .populate('ident.creator')
  .populate('checkin.checker')
  .populate('comments.creator')
  .populate('addresses.creator')
  .then(result => {
    if (result) {
      /* Return Found User */
      res.json(result)
    } else {
      /* No User Found */
      return res.status(404).json({
        errors: [{
          status: "CUSTOMER_ERROR",
          msg: "Customer ID Not Found"
        }]
      })
    }
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Getting Customer"
      }]
    })
  })
})



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
  .populate('creator')
  .populate('ident.creator')
  .populate('checkin.checker')
  .populate('comments.creator')
  .populate('addresses.creator')
  .then(result => {
    if (result) {
      /* Return Found User */
      res.json(result)
    } else {
      /* No User Found */
      return res.status(404).json({
        errors: [{
          status: "CUSTOMER_ERROR",
          msg: "Customer ID Not Found"
        }]
      })
    }
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Getting Customer"
      }]
    })
  })
})

/*

Verb              PUT
URI               /api/customer/{id}
Action            update
Authentication    Required
Description       Update Customer

*/
router.put('/api/:var(customer|customers)/:id', (req, res) => {
  /* Check for Authenticated User */
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })
  
  const update = {};
  for (const key of Object.keys(req.body)){
    if (req.body[key] !== '') {
      if (key == 'birthday') {
        update[key] = new Date(req.body[key])
      } else {
        update[key] = req.body[key];
      }
    }
  }
  
  Customer.findByIdAndUpdate(req.params.id, {$set: update}, {safe: true, upsert: true, new : true})
  .then(result => {
    return res.status(204).end()
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Updating Customer"
      }]
    })
  })
})

/*

Verb              DELETE
URI               /api/customer/{id}
Action            delete
Authentication    Required
Description       Delete Customer

*/
router.delete('/api/:var(customer|customers)/:id', (req, res) => {
  /* Check for Authenticated User */
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })
  
  Customer.findByIdAndDelete(req.params.id)
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










/*

Verb              GET
URI               /api/customer/{customerid}/ident
Action            show
Authentication    Required
Description       Show Customer Identity Documents

*/
router.get('/api/:var(customer|customers)/:customerid/:var(ident|idents)', (req, res) => {
  /* Check for Authenticated User */
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })
  
  /* Get Customer Addresses */
  Customer.findOne({_id: req.params.customerid}, ['ident'])
  .populate('ident.creator')
  .then(result => {
    if (result) {
      /* Return Found User */
      res.json(result.ident)
    } else {
      /* No User Found */
      return res.status(404).json({
        errors: [{
          status: "CUSTOMER_ERROR",
          msg: "Customer ID Not Found"
        }]
      })
    }
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Getting Customer"
      }]
    })
  })
})

/*

Verb              GET
URI               /api/customer/{customerid}/ident/{identid}
Action            show
Authentication    Required
Description       Show Customer Identity Document

*/
router.get('/api/:var(customer|customers)/:customerid/:var(ident|idents)/:identid', (req, res) => {
  /* Check for Authenticated User */
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })

  /* Get Customer Identity Document */
  Customer.findOne({_id: req.params.customerid})
  .select({ident: {$elemMatch: {_id:req.params.identid}}})
  .populate('ident.creator')
  .then(result => {
    if (result) {
      /* Return Found User */
      res.json(result.ident[0])
    } else {
      /* No User Found */
      return res.status(404).json({
        errors: [{
          status: "CUSTOMER_ERROR",
          msg: "Customer ID Not Found"
        }]
      })
    }
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Getting Customer"
      }]
    })
  })
})


/*

Verb              POST
URI               /api/customer/{identid}/ident
Action            store
Authentication    Required
Description       Store a new customer ident

*/
router.post('/api/:var(customer|customers)/:identid/:var(ident|idents)', 
  [
    check("document", "Document can not be empty").not().isEmpty(),
    check("value", "Value can not be empty").not().isEmpty(),
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
      value
    } = req.body;
    
    const newIdent = {
      document: document,
      value: value,
      creator: req.user.id
    }
    
    Customer.findByIdAndUpdate(req.params.identid, {$push: {"ident": newIdent}}, {safe: true, upsert: true, new : true})
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

Verb              PUT
URI               /api/customer/{customerid}/ident/{identid}
Action            Update
Authentication    Required
Description       Update a customer Identity Document by ID

*/
router.put('/api/:var(customer|customers)/:customerid/:var(ident|idents)/:identid', (req, res) => {
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })
  
  Customer.findOne({_id: req.params.customerid})
  .select({ident: {$elemMatch: {_id:req.params.identid}}})
  .then(async result => {
    const update = result.ident[0];
    for (const key of Object.keys(req.body)){
      if (req.body[key] !== '') {
        update[key] = req.body[key];
      }
    }
    
    /* Update Customer Address */
    Customer.findOneAndUpdate({_id: req.params.customerid, ident: {$elemMatch: {_id: req.params.identid} } },
      {$set: {'ident.$': update}}, 
      {safe: true, upsert: true, new : true}
    )
    .then(result => {
      res.json(result)
    })
    .catch(() => {
      return res.status(500).json({
        errors: [{
          status: "SERVER_ERROR",
          msg: "Error Updating Customer Identity Document"
        }]
      })
    })
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Getting Customer Identity Document"
      }]
    })
  })
})


/*

Verb              DELETE
URI               /api/customer/{customerid}/ident/{identid}
Action            destroy
Authentication    Required
Description       Remove Customer Identity Document

*/
router.delete('/api/:var(customer|customers)/:customerid/:var(ident|idents)/:identid',  async (req, res) => {
  /* Check for Authenticated User */
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })
  
  /* Get Address Entry */
  await Customer.findOne({_id:req.params.customerid})
  .select({ident: {$elemMatch: {_id:req.params.identid}}})
  .then(async result => {
    
    Customer.findByIdAndUpdate(req.params.customerid, { $pull: { "ident": { _id: req.params.identid } } }, {safe: true, upsert: true, new : true})
    .then(result => {
      return res.status(204).end()
    })
    .catch(() => {
      return res.status(500).json({
        errors: [{
          status: "SERVER_ERROR",
          msg: "Error Deleting Identity Document"
        }]
      })
    })
    
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Getting Identity Document"
      }]
    })
  })
})

/*

Verb              POST
URI               /api/customer/{customerid}/comment
Action            store
Authentication    Required
Description       Store a new customer comment

*/
router.post('/api/:var(customer|customers)/:customerid/:var(comment|comments)', 
  [
    check("comment", "Comment can not be empty").not().isEmpty()
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
    
    /* Constuct New Comment */
    const {
      comment
    } = req.body;
    
    const newComment = {
      comment: comment,
      creator: req.user.id
    }
    
    Customer.findByIdAndUpdate(req.params.customerid, {$push: {"comments": newComment}}, {safe: true, upsert: true, new : true})
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

Verb              GET
URI               /api/customer/{customerid}/comments
Action            show
Authentication    Required
Description       Show Customer Comments

*/
router.get('/api/:var(customer|customers)/:customerid/:var(comment|comments)', (req, res) => {
  /* Check for Authenticated User */
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })
  
  /* Get Customer Addresses */
  Customer.findOne({_id: req.params.customerid}, ['comments'])
  .populate('comments.creator')
  .then(result => {
    if (result) {
      /* Return Found User */
      res.json(result.comments)
    } else {
      /* No User Found */
      return res.status(404).json({
        errors: [{
          status: "CUSTOMER_ERROR",
          msg: "Customer ID Not Found"
        }]
      })
    }
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Getting Customer"
      }]
    })
  })
})

/*

Verb              GET
URI               /api/customer/{customerid}/comment/{commentid}
Action            show
Authentication    Required
Description       Show Customer Comment by ID

*/
router.get('/api/:var(customer|customers)/:customerid/:var(comment|comments)/:commentid', (req, res) => {
  /* Check for Authenticated User */
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })

  /* Get Customer Identity Document */
  Customer.findOne({_id: req.params.customerid})
  .select({comments: {$elemMatch: {_id:req.params.commentid}}})
  .populate('comments.creator')
  .then(result => {
    if (result) {
      /* Return Found User */
      res.json(result.comments[0])
    } else {
      /* No User Found */
      return res.status(404).json({
        errors: [{
          status: "CUSTOMER_ERROR",
          msg: "Customer ID Not Found"
        }]
      })
    }
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Getting Customer"
      }]
    })
  })
})


/*

Verb              PUT
URI               /api/customer/{customerid}/comment/{commentid}
Action            Update
Authentication    Required
Description       Update a customer comment by ID

*/
router.put('/api/:var(customer|customers)/:customerid/:var(comment|comments)/:commentid', (req, res) => {
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })
  
  /* Get Customer Address */
  Customer.findOne({_id: req.params.customerid})
  .select({comments: {$elemMatch: {_id:req.params.commentid}}})
  .then(async result => {
    const update = result.comments[0];
    for (const key of Object.keys(req.body)){
      if (req.body[key] !== '') {
        update[key] = req.body[key];
      }
    }
    /* Update Customer Address */
    Customer.findOneAndUpdate({_id: req.params.customerid, comments: {$elemMatch: {_id: req.params.commentid} } },
      {$set: {'comments.$': update}}, 
      {safe: true, upsert: true, new : true}
    )
    .then(result => {
      res.json(result)
    })
    .catch(() => {
      return res.status(500).json({
        errors: [{
          status: "SERVER_ERROR",
          msg: "Error Updating Customer Comment"
        }]
      })
    })
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Getting Customer Comment"
      }]
    })
  })
})


/*

Verb              DELETE
URI               /api/customer/{customerid}/comment/{commentid}
Action            destroy
Authentication    Required
Description       Remove Customer Comment

*/
router.delete('/api/:var(customer|customers)/:customerid/:var(comment|comments)/:commentid',  async (req, res) => {
  /* Check for Authenticated User */
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })
  
  /* Get Comment Entry */
  await Customer.findOne({_id:req.params.customerid})
  .select({comments: {$elemMatch: {_id:req.params.commentid}}})
  .then(async result => {
    
    Customer.findByIdAndUpdate(req.params.customerid, { $pull: { "comments": { _id: req.params.commentid } } }, {safe: true, upsert: true, new : true})
    .then(result => {
      return res.status(204).end()
    })
    .catch(() => {
      return res.status(500).json({
        errors: [{
          status: "SERVER_ERROR",
          msg: "Error Deleting Comment"
        }]
      })
    })
    
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Getting Comment"
      }]
    })
  })      
    
})

/*

Verb              GET
URI               /api/customer/{customerid}/address
Action            show
Authentication    Required
Description       Show Customer Addresses

*/
router.get('/api/:var(customer|customers)/:customerid/:var(address|addresses)', (req, res) => {
  /* Check for Authenticated User */
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })
  
  /* Get Customer Addresses */
  Customer.findOne({_id: req.params.customerid}, ['addresses'])
  .populate('addresses.creator')
  .then(result => {
    if (result) {
      /* Return Found User */
      res.json(result.addresses)
    } else {
      /* No User Found */
      return res.status(404).json({
        errors: [{
          status: "CUSTOMER_ERROR",
          msg: "Customer ID Not Found"
        }]
      })
    }
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Getting Customer"
      }]
    })
  })
})

/*

Verb              GET
URI               /api/customer/{customerid}/address/{addressid}
Action            show
Authentication    Required
Description       Show Customer Address

*/
router.get('/api/:var(customer|customers)/:customerid/:var(address|addresses)/:addressid', (req, res) => {
  /* Check for Authenticated User */
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })

  /* Get Customer Addresses */
  Customer.findOne({_id: req.params.customerid})
  .select({addresses: {$elemMatch: {_id:req.params.addressid}}})
  .populate('addresses.creator')
  .then(result => {
    if (result) {
      /* Return Found User */
      res.json(result.addresses[0])
    } else {
      /* No User Found */
      return res.status(404).json({
        errors: [{
          status: "CUSTOMER_ERROR",
          msg: "Customer ID Not Found"
        }]
      })
    }
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Getting Customer"
      }]
    })
  })
})


/*

Verb              POST
URI               /api/customer/{customerid}/address
Action            store
Authentication    Required
Description       Store a new customer address

*/
router.post('/api/:var(customer|customers)/:customerid/:var(address|addresses)', 
  [
    check("type", "Address type can not be empty").not().isEmpty()
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
    
    /* Constuct New Address */
    const {
      type,
      address,
      suburb,
      state,
      postcode,
    } = req.body;
    
    const newAddress = {
      type: type,
      address: address,
      suburb: suburb,
      state: state,
      postcode: postcode,
      creator: req.user.id
    }
    
    Customer.findByIdAndUpdate(req.params.customerid, {$push: {"addresses": newAddress}}, {safe: true, upsert: true, new : true})
    .then(result => {
      res.json(result)
    })
    .catch(() => {
      return res.status(500).json({
        errors: [{
          status: "SERVER_ERROR",
          msg: "Error Setting Customer Address"
        }]
      })
    })
  }
)

/*

Verb              PUT
URI               /api/customer/{customerid}/address/{addressid}
Action            store
Authentication    Required
Description       Store a new customer address

*/
router.put('/api/:var(customer|customers)/:customerid/:var(address|addresses)/:addressid', (req, res) => {
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })
  
  /* Get Customer Address */
  Customer.findOne({_id: req.params.customerid})
  .select({addresses: {$elemMatch: {_id:req.params.addressid}}})
  .then(async result => {
    const address = result.addresses[0];
    for (const key of Object.keys(req.body)){
      if (req.body[key] !== '') {
        address[key] = req.body[key];
      }
    }
    /* Update Customer Address */
    Customer.findOneAndUpdate({_id: req.params.customerid, addresses: {$elemMatch: {_id: req.params.addressid} } },
      {$set: {'addresses.$': address}}, 
      {safe: true, upsert: true, new : true}
    )
    .then(result => {
      res.json(result)
    })
    .catch(() => {
      return res.status(500).json({
        errors: [{
          status: "SERVER_ERROR",
          msg: "Error Setting Customer Address"
        }]
      })
    })
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Getting Customer Address"
      }]
    })
  })
})

/*

Verb              DELETE
URI               /api/customer/{customerid}/address/{addressid}
Action            destroy
Authentication    Required
Description       Remove Customer Address

*/
router.delete('/api/:var(customer|customers)/:customerid/:var(address|addresses)/:addressid',  async (req, res) => {
  /* Check for Authenticated User */
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })
  
  /* Get Address Entry */
  await Customer.findOne({_id:req.params.customerid})
  .select({addresses: {$elemMatch: {_id:req.params.addressid}}})
  .then(async result => {
    
    Customer.findByIdAndUpdate(req.params.customerid, { $pull: { "addresses": { _id: req.params.addressid } } }, {safe: true, upsert: true, new : true})
    .then(result => {
      return res.status(204).end()
    })
    .catch(() => {
      return res.status(500).json({
        errors: [{
          status: "SERVER_ERROR",
          msg: "Error Deleting Comment"
        }]
      })
    })
    
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Getting Comment"
      }]
    })
  })      
    
})

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

Verb              GET
URI               /api/customer/{customerid}/checkin
Action            show
Authentication    Required
Description       Show Customer Check-in Events

*/
router.get('/api/:var(customer|customers)/:customerid/:var(checkin|checkins)', (req, res) => {
  /* Check for Authenticated User */
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })
  
  /* Get Customer Addresses */
  Customer.findOne({_id: req.params.customerid}, ['checkin'])  
  .then(result => {
    if (result) {
      /* Return Found User */
      res.json(result.checkin)
    } else {
      /* No User Found */
      return res.status(404).json({
        errors: [{
          status: "CUSTOMER_ERROR",
          msg: "Customer ID Not Found"
        }]
      })
    }
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Getting Customer"
      }]
    })
  })
})



/*

Verb              GET
URI               /api/customer/{customerid}/checkin/{checkinid}
Action            show
Authentication    Required
Description       Show Customer Identity Document

*/
router.get('/api/:var(customer|customers)/:customerid/:var(checkin|checkins)/:checkinid', (req, res) => {
  /* Check for Authenticated User */
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })

  /* Get Customer Check-in Event */
  Customer.findOne({_id: req.params.customerid})
  .select({checkin: {$elemMatch: {_id:req.params.checkinid}}})
  .populate('checkin.checker')
  .then(result => {
    if (result) {
      /* Return Found User */
      res.json(result.checkin[0])
    } else {
      /* No User Found */
      return res.status(404).json({
        errors: [{
          status: "CUSTOMER_ERROR",
          msg: "Customer ID Not Found"
        }]
      })
    }
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Getting Customer"
      }]
    })
  })
})


/*

Verb              DELETE
URI               /api/customer/{customerid}/checkin/{checkinid}
Action            destroy
Authentication    Required
Description       Remove Customer Check-in Event

*/
router.delete('/api/:var(customer|customers)/:customerid/:var(checkin|checkins)/:checkinid',  async (req, res) => {
  /* Check for Authenticated User */
  if (!req.user) return res.status(403).json({
    errors: [{
      status: "AUTH_ERROR",
      msg: "Access Denied"
    }]
  })
  
  /* Get Address Entry */
  await Customer.findOne({_id:req.params.customerid})
  .select({checkin: {$elemMatch: {_id:req.params.checkinid}}})
  .then(async result => {
    Customer.findByIdAndUpdate(req.params.customerid, { $pull: { "checkin": { _id: req.params.checkinid } } }, {safe: true, upsert: true, new : true})
    .then(result => {
      return res.status(204).end()
    })
    .catch(() => {
      return res.status(500).json({
        errors: [{
          status: "SERVER_ERROR",
          msg: "Error Deleting Check-in Event"
        }]
      })
    })
    
  })
  .catch(() => {
    return res.status(500).json({
      errors: [{
        status: "SERVER_ERROR",
        msg: "Error Getting Check-in Event"
      }]
    })
  })
})


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
        ident = {"document": null, "value": null}
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
            {"ident.document": ident.document},
            {"ident.value": ident.value}
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
