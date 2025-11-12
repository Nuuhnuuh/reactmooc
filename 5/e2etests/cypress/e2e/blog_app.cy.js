
const service = 'http://localhost:5173'
const username = 'admin1'
const password = 'password'

describe('template spec', function() {


  beforeEach(function () {
    cy.visit(service)
  })
  it('passes', function() {

    cy.contains('blogs')
  })

  it('can login and create blog', function() {
    cy.contains('label', 'username').type(username)
    cy.contains('label', 'password').type(password)
    cy.get('#login-btn').click()
  })

  it('can create blog', function() {
    cy.contains('new blog').click()
    cy.contains('label', 'author').type('Testi')
    cy.contains('label', 'title').type('Testiopus')
    cy.contains('label', 'url').type('http://testi.fi')
    cy.get('#blog-submit-btn').click()
  })
})

// 5.17
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('username')
  })


})

const user = {
  //name: 'Test Admin',
  username: 'Admin',
  password: 'te'
}

describe('Login',function() {
  beforeEach(function () {
    cy.request('POST', `${service}/api/testing/reset`)
    cy.request('POST', `${service}/api/users`, user)

    cy.visit(service)
  })
  it('succeeds with correct credentials', function() {
    cy.contains('label', 'username').type(user.username)
    cy.contains('label', 'password').type(user.password)
    cy.get('#login-btn').click()
    cy.contains('Logged in')
  })

  it('fails with wrong credentials', function() {
    cy.contains('label', 'username').type('does-not-exist')
    cy.contains('label', 'password').type('wrong-password')
    cy.get('#login-btn').click()
    cy.contains('invalid username or password')

    cy.get('html').should('not.contain', `Logged in as ${user.username}`)
  })
})

const blog = {
  title: 'Example',
  author: 'Eden Exemple',
  url: 'http://exempl.com'
}

describe('when logged in', function () {
    beforeEach(function () {
      cy.request('POST', `${service}/api/testing/reset`)
      cy.request('POST', `${service}/api/users`, user)

      cy.login(user)
    })
    it ('a blog can be created', function () {
      cy.createBlog(blog)
    })
    it ('a blog can be liked', function () {
      cy.createBlog(blog)
      cy.contains('view').click()
      cy.contains('button', 'like').click()
      cy.contains('1 likes')
    })

    it ('a blog can be deleted', function () {
      cy.createBlog(blog)
      cy.contains('view').click()
      cy.contains('button', 'delete').click()
      cy.get('html').should('not.contain', blog.title)
    })
})
