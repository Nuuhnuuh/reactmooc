const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.5iyidcf.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const schema = new mongoose.Schema({
  name: String,
  number: String ,
})

const Person = mongoose.model('Person', schema)


const name = process.argv[3]
const number = process.argv[4]

if (name && number)
{
    const note = new Person({
        name: name,
        number: number
    })

    note.save().then(result => {
        console.log(`added ${name}, ${number} to phonebook`)
        mongoose.connection.close()
    })
}
else
{
    Person.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
}






