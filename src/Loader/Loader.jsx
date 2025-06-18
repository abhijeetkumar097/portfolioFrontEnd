import React from 'react'
import './Loader.css'
import { div } from 'framer-motion/client'

function Loader() {
  return (
    <div className='loader-container'>
      <button className='loader'>Loading...</button>
    </div>
    
  )
}

export default Loader