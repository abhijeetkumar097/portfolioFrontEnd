import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
        <NavLink to="/login" className='nav-title'>PortFolio</NavLink>
        <nav className='nav'>
            <NavLink to="/" className={({isActive}) => isActive ? "active-link" : ""}>Home</NavLink>
            <NavLink to="/project" className={({isActive}) => isActive ? "active-link" : ""}>Project</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? "active-link" : ""}>About</NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive ? "active-link" : ""}>Contact</NavLink>
            {/* <NavLink to="/project" className={({isActive}) => isActive ? "active-link" : ""}></NavLink> */}
            {/* <NavLink to="/project" className={({isActive}) => isActive ? "active-link" : ""}></NavLink> */}
        </nav>
    </div>
    
  )
}

export default Navbar