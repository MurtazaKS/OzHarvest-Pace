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
  birthday: {
    type: Date,
    required: false
  },
  language: {
    type: String,
    required: false
  },
  addresses: {
    type: [
      {
        type: {
          type: String,
          required: true
        },
        address: {
          type: String,
          required: false
        },
        suburb: {
          type: String,
          required: false
        },
        state: {
          type: String,
          required: false
        },
        postcode: {
          type: String,
          required: false
        },
        creator: {
          type: Schema.Types.ObjectId, ref: "User",
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
  ident: {
    type: [
      {
        document: {
          type: String,
          required: true
        },
        value: {
          type: String,
          required: true
        },
        creator: {
          type: Schema.Types.ObjectId, ref: "User",
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
        checker: {
          type: Schema.Types.ObjectId, ref: "User",
          required: true
        },
        date: {
          type: Date,
          default: Date.now(),
          required: true
        }
      }
    ]
  },
  comments: {
    type: [
      {
        comment: {
          type: String,
          required: true
        },
        creator: {
          type: Schema.Types.ObjectId, ref: "User",
          required: true
        }
      }, { timestamps: true }
    ]
  },
  creator: {
    type: Schema.Types.ObjectId, ref: "User",
    required: true
  },
}, { timestamps: true })

customerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Customer = mongoose.model("Customer", customerSchema)

module.exports = Customer
