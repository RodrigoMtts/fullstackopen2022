const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const url = process.env.MONGODB_URI
const password = process.env.MONGODB_PASSWORD

console.log('connecting to', url)

mongoose.connect(url, { user: 'rodrigo95', pass: password })
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    validate: {
      validator(v) {
        return /\d{2}-\d{6,}/.test(v) || /\d{3}-\d{5,}/.test(v)
      },
      message: () => 's not a valid phone number!',
    },
    minLength: 9,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
