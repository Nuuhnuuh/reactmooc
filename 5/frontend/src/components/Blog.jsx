
import Toggleable from '../components/Toggleable'

const Blog = ({ blog, handleLike, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (

    <Toggleable labelVisible='view' labelHidden='hide'>
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
        {blog.user.username}
        {blog.likes} likes
      <button onClick={handleLike}>like</button>
      <button onClick={handleRemove}>delete</button>
    </div>
    </Toggleable>
  )}

export default Blog
