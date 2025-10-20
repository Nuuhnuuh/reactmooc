import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

axios.get(baseUrl).then(response => {
  const persons = response.data
  console.log(persons)
})

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App persons={[]}/>
)
