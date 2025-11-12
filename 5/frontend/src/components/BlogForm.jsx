
import { useState } from 'react'

const BlogForm = ({handleCreateBlog
}) => {

    const [blog, setBlog] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        handleCreateBlog(blog)
    }

    return (
        <form onSubmit={addBlog}>
            <div>
            <label>
                title
                <input placeholder='title' onChange={event => setBlog({...blog, title: event.target.value})}  />
            </label>
            </div>
            <div>
            <label>
            author
                <input placeholder='author' onChange={event => setBlog({...blog, author: event.target.value})}  />
                </label>
            </div>
            <div>
            <label>
            url
                <input placeholder='url' onChange={event => setBlog({...blog, url: event.target.value})}  />
            </label>
            </div>
            <input id='blog-submit-btn' type="submit" />
        </form>
    )
}

export default BlogForm
