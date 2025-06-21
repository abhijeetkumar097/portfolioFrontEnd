import React, { useState } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`navbar ${open ? "open" : ""}`}>
      <div className="nav-drop">
          <div><NavLink to="/login" className='nav-title'>PortFolio</NavLink></div>
          <div className={`nav-symbol ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
            <span></span>
            <span></span>
            <span></span>
          </div>

      </div>
        <nav className='nav'>
            <NavLink to="/" className={({isActive}) => isActive ? "active-link" : ""}>Home</NavLink>
            <NavLink to="/project" className={({isActive}) => isActive ? "active-link" : ""}>Project</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? "active-link" : ""}>About</NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive ? "active-link" : ""}>Contact</NavLink>
        </nav>
    </div>
  )
}

export default Navbar
