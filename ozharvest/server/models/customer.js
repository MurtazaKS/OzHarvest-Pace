const mongoose = require('mongoose')
const { Schema } = mongoose;

const url = process.env.MONGO_URL

const doConnect = async () => {
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })  
      .catch((error) => {    
          console.log('error connecting to MongoDB:', error.message)
      })
  }
// call the connection function
doConnect()

const customerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  middlename: {
    type: String,
    required: false
  },
  language: {
    type: String,
    required: false
  },
  ident: {
    type: [
      {
        document: {
          type: String,
          required: true
        },
        id: {
          type: String,
          required: true
        },
        created: {
          type: Date,
          default: Date.now(),
          required: true
        }
      }
    ]
  },
  checkin: {
    type: [
      {
        location: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          default: Date.now(),
          required: true
        }
      }
    ],
    select: false
  },
  created: {
    type: Date,
    default: Date.now(),
    required: true
  }
})

customerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Customer = mongoose.model("Customer", customerSchema)

module.exports = Customer
