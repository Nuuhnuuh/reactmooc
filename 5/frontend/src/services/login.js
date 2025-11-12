import axios from 'axios'
const baseUrl = '/api/login'

const cookieName = 'loggedBlogAppUser'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const logoff = async token => {
  window.localStorage.setItem(cookieName, '')
}

export default { login, logoff }
