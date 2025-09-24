import axios from 'axios'

axios.get('http://localhost:3001/persons').then(response => {
  const notes = response.data
  console.log(notes)
})

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)
