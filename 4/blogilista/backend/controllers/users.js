const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    id: 1
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const minLength = 3
  const maxLength = 20
  const { username, name, password } = request.body

  if (!password || (password.length > minLength && password.length < maxLength)) {
    return response.status(400).json({
      error: `Password has to be between ${minLength} and ${maxLength} characters long`
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter

