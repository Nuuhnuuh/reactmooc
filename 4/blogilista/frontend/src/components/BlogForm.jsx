const BlogForm = ({createBlog}) => {

    const [newBlog, setNewBlog] = useState({})

    const createBlog = () => {
        blogService.create()
    }

    return (
        <form onSubmit={createBlog}>
            <div>
                <input onChange={event => setNewBlog({...newBlog, title: event.target.value})} name="title" />
            </div>
            <div>
                <input name="author" />
            </div>
            <div>
                <input name="url" />
            </div>
            <input type="submit" />
        </form>
    )
}

export default BlogForm
