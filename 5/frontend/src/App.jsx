import { useState, useEffect, useRef, useReducer } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'

import blogService from './services/blogs'
import loginService from './services/login'

function withErrorHandling(fn, setError)
{
  return async (...args) => {
    try {
      await fn(...args)
    } catch (err) {
      console.log(err)
      switch (err?.response.data?.error)
      {
        case 'token missing': {
          setError('Not signed in')
        }
        default: setError(err?.response.data?.error || 'Unexpected error')
      }
    }
  }
}

const App = () => {
  const LOGIN_COOKIE = 'loggedBlogAppUser'
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState(null)

  const [loginVisible, setLoginVisible] = useState(true)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => a.likes < b.likes) )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LOGIN_COOKIE)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = withErrorHandling(async (event) => {
    event.preventDefault()

    const user = await loginService.login({ username, password })
    console.log(JSON.stringify(user));
    window.localStorage.setItem(LOGIN_COOKIE, JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
    setMessage(`Logged in as ${user.username}`)
    console.log('logging in with', username, password)
  }, setMessage)

  const handleLogoff = withErrorHandling(async (event) => {
    window.localStorage.clear()
    setUser(null)
    setMessage(`Logged off`)
  }, setMessage)

  const handleCreateBlog = withErrorHandling(async (newBlog) => {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog))
  }, setMessage)

  const handleRemove = withErrorHandling(async (id) => {
      const removedBlog = await blogService.remove(id)
      setBlogs(blogs.filter(blog => (blog.id !== id)))
  }, setMessage)

  const handleLike = withErrorHandling(async (id) => {
    const targetBlog = blogs.find(b => b.id === id)
    const updatedBlog = { ...targetBlog, likes: targetBlog.likes + 1 }

    const returnedBlog = await blogService.update(id, updatedBlog);
    setBlogs(blogs.map(blog => (blog.id !== id ? targetBlog : returnedBlog)))
  }, setMessage)

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    return (
      <div>
      <div style={hideWhenVisible}>
      <button onClick={() => setLoginVisible(true)}>log in</button>
      </div>
      <div style={showWhenVisible}>
      <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
      />
      <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {!user && loginForm()}
      {
        user && (
        <div>
        <p>{user.name} logged in</p>
        <button onClick={ handleLogoff }>logoff</button>
        </div>
        )
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog.id)}
         handleRemove={() => handleRemove(blog.id)} showUserActions={ blog.user.username === (user === null ? '' : user.username) }
         />
      )}
      <Toggleable labelVisible="new blog" labelHidden='cancel' ref={blogFormRef}>
        <BlogForm handleCreateBlog={handleCreateBlog}/>
      </Toggleable>

    </div>
  )
}

export default App
