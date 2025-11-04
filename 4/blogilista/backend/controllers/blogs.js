const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  .populate('user')
  console.log(blogs)
  response.status(200).json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  .populate('user');
  if (blog)
  {
      response.status(200).json(blog)
  }
  else
  {
      response.status(404).end();
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

    console.log(request.token)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes | 0,
    user: user._id
  })

  const savedBlog = await blog.save();
  // Laitetaan joku user
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save();

  response.status(201).json(savedBlog);
})

blogsRouter.put('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(204).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog)
  {
    return response.status(404)
  }

  if (blog.user.toString() === decodedToken.id)
  {
      const deletedBlog = await blog.deleteOne()
  }
  else
  {
      return response.status(401).json({ error: 'not permitted'})
  }

  response.status(204).json(blog)
})




module.exports = blogsRouter
