
const mongoose = require('mongoose');

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('MongoDB connection failed: ', error.message)
    })


const schema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      required: [true, 'Name required']
    },
    number: {
        type: String,
        required: [true, 'Phone number required'],
        validate: {
            validator: (v) => { return /\d{3}-\d{7}/.test(v) },
                                   message: props => `${props.value} is not a valid phone number`
        }
    }
})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', schema);
