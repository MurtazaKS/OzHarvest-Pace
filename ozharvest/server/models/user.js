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

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique:true,
    index: true
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true,
    select: false 
  },
  name: {
    type: String,
    required: false
  },
  role:  {
    type: String,
    lowercase: true,
    default: 'user',
    enum: ['user', 'admin']
  }
}, { timestamps: true })

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = mongoose.model("User", userSchema)

module.exports = User
