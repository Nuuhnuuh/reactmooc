import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author, not url and likes', () => {

    const blog = {
        author: 'Someone',
     title: 'Something',
     url: 'Some url',
     user: { username: 'Somebody' },
     likes: 0
    }

    render(<Blog blog={blog} />)

    const title = screen.getByText('Something', { exact: false })
    expect(title).toBeDefined()

    const author = screen.getByText('Someone', { exact: false })
    expect(author).toBeDefined()

    const url = screen.getByText('Some url', { exact: false })
    expect(url).not.toBeVisible()

    const likes = screen.getByText('likes', { exact: false })
    expect(url).not.toBeVisible()

    screen.debug()
})

test('renders url and likes when viewed', async () => {

    const blog = {
        author: 'Someone',
        title: 'Something',
        url: 'Some url',
        user: { username: 'Somebody' },
        likes: 0
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const url = screen.getByText('Some url', { exact: false })
    expect(url).toBeDefined()

    const likes = screen.getByText('likes', { exact: false })
    expect(likes).toBeDefined()
})

test('event handler called two times when pressed two times', async () => {

    const handleLike = vi.fn()
    const blog = {
        author: 'Someone',
        title: 'Something',
        url: 'Some url',
        user: { username: 'Somebody' },
        likes: 0
    }

    render(<Blog blog={blog} handleLike={handleLike} />)

    const user = userEvent.setup()

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
})

/*

test('renders content 2', () => {
    const blog = {
        author: 'Someone',
        title: 'Something',
        url: 'Some url',
        user: { username: 'Somebody' },
        likes: 0
    }

    render(<Blog blog={blog} />)



    const element = screen.queryByText('something')
    screen.debug(element)
    expect(element).toBeNull()
})

test('clicking the button calls event handler once', async () => {
    const blog = {
        author: 'Someone',
        title: 'Something',
        url: 'Some url',
        user: { username: 'Somebody' },
        likes: 0
    }

    const mockHandler = vi.fn()

    render(
        <Blog blog={blog} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
})

test('renders query selector', () => {
    const blog = {
        author: 'Someone',
        title: 'Something',
        url: 'Some url',
        user: { username: 'Somebody' },
        likes: 0
    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Something')
})

*/
