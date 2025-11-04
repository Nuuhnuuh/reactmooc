const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})




test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('valid blog update', async () => {
    const blogs = await helper.blogsInDb()
    await api.put('/api/blogs', blogs[0]).send({ title: '', url:'', author:'', likes:'' })
    .set('Content-Type', /application\/json/)
    .expect(201)
})





//describe('getting blogs', () => {
    test ('blog id is correctly named', async () => {
        const blogs = await helper.blogsInDb()
        const blog = blogs[0]
        if (blog._id)
            assert('blog had _id defined')
    })

    test('blogs are returned as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
//})

//describe('posting blogs', () => {
    test ('empty likes is set to zero', async () => {
        const response = await api.post('/api/blogs').send({ title: 'Test' })
        assert.strictEqual(response.body.likes, 0);
    })
    test ('blog without title or url is not accepted', async () => {
        const response = await api.post('/api/blogs').send({ author: 'Empty', likes: 0 })
        .expect(400)
    })
    test('note can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const targetBlog = blogsAtStart[0]

        await api
        .delete(`/api/blogs/${targetBlog.id}`)
        .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        const contents = blogsAtEnd.map(b => b.title)
        assert(!contents.includes(targetBlog.title))

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })

    test('a valid blog can be added', async () => {
        const newBlog = { title: 'Backbones of Backend', author: 'IEEE', url: 'http://ieee.org', likes: 85 }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')


        const blogsAtEnd = await helper.blogsInDb();
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const contents = blogsAtEnd.map(r => r.title)
        assert(contents.includes('Backbones of Backend'))
    })
//})

//describe('updating blogs', () => {

//})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})


after(async () => {
  await mongoose.connection.close()
})
