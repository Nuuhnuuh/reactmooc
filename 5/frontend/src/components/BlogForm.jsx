
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
                title
                <input onChange={event => setBlog({...blog, title: event.target.value})}  />
            </div>
            <div>
            author
                <input onChange={event => setBlog({...blog, author: event.target.value})}  />
            </div>
            <div>
            url
                <input onChange={event => setBlog({...blog, url: event.target.value})}  />
            </div>
            <input type="submit" />
        </form>
    )
}

export default BlogForm
