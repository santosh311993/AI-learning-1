import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Set circular favicon from profile photo using canvas
function setCircularFavicon() {
  const img = new Image()
  img.onload = () => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(img, 0, 0, size, size)
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/png'
    link.href = canvas.toDataURL('image/png')
    document.head.appendChild(link)
  }
  img.src = '/my_profile_pic.jpeg'
}

setCircularFavicon()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
