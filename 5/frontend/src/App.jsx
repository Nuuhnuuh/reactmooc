import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const cookieName = 'loggedBlogAppUser'
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => a.likes < b.likes) )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(cookieName)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      console.log(JSON.stringify(user));
      window.localStorage.setItem(cookieName, JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log(err)
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
    console.log('logging in with', username, password)
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
    const blog = await blogService.create(newBlog);
    setBlogs(blogs.concat(blog))
    } catch (err) {
      console.log(err)
      setErrorMessage(err.response.data.error)
      setBlogs([])
    }
  }

  const handleRemove = async (id) => {
    try {
      const removedBlog = await blogService.remove(id)
      setBlogs(blogs.filter(blog => (blog.id === id)))
    } catch (err)
    {
      console.log(err)
      setErrorMessage(err.response.data.error)
    }
  }

  const handleLike = async (id) => {
    const targetBlog = blogs.find(b => b.id === id)
    const updatedBlog = { ...targetBlog, likes: targetBlog.likes + 1 }

    try {
      const returnedBlog = await blogService.update(id, updatedBlog);
      setBlogs(blogs.map(blog => (blog.id !== id ? targetBlog : returnedBlog)))
    } catch (err) {
      setErrorMessage(err.response.data.error)
    }

  }

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
      <Notification message={errorMessage} />
      {!user && loginForm()}
      {
        user && (
        <div>
        <p>{user.name} logged in</p>
        <button onClick={ window.localStorage.clear() }>logoff</button>
        </div>
        )
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog.id)}
         handleRemove={() => handleRemove(blog.id)}
         />
      )}
      <Toggleable labelVisible="new blog" labelHidden='cancel' ref={blogFormRef}>
        <BlogForm handleCreateBlog={handleCreateBlog}/>
      </Toggleable>

    </div>
  )
}

export default App
