
import Toggleable from '../components/Toggleable'

const Blog = ({ blog, handleLike, handleRemove, showUserActions }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButton = () => { return(
    <button onClick={handleRemove}>delete</button> ) }

  return (
    <>
    <div>
    {blog.title} {blog.author}
    </div>
    <Toggleable labelVisible='view' labelHidden='hide'>
    <div style={blogStyle}>
      <p>{blog.user.username}</p>
      <p>{blog.likes} likes </p>
      <p>{blog.url}</p>
      <button onClick={handleLike}>like</button>
      { showUserActions ? removeButton() : '' }
    </div>
    </Toggleable>
    </>
  )}

export default Blog
