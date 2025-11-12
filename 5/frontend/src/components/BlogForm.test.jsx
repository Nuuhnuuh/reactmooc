import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

/*test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  const { container } = render(<BlogForm handleCreateBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox');
  const sendButton = container.querySelectorAll('input')[6]

  await user.type(inputs[0], 'testing a form...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].content).toBe('testing a form...')
}) */

test('BlogForm form callback receives correct information', async () => {
  const user = userEvent.setup()
  const addBlog = vi.fn()

  const { container } = render(<BlogForm handleCreateBlog={addBlog} />)

  const inputs = container.querySelectorAll('input')
  await user.type(inputs[0], 'Something')
  await user.type(inputs[1], 'Someone')
  await user.type(inputs[2], 'Some url')
  const submitButton = container.querySelector('input[type="submit"]')

  await user.click(submitButton)
  expect(addBlog.mock.calls[0][0]).toBe(
    {
      title: 'Something',
      url: 'Some url',
      author: 'Someone',
    })
})
