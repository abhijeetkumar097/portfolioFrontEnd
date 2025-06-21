import React from 'react'
import { NavLink } from 'react-router-dom'
import Logout from '../Auth/Logout'
import './AdminNavbar.css'
import { useState } from 'react';

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className={`admin-navbar ${ open ? "open" : ""}`}>
           
            <div className="admin-nav-drop">
                       <div className='admin-nav-title'>PortFolio</div>
                      <div className={`admin-nav-symbol ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
            <div className='admin-nav'>
              <nav>
                <NavLink to="/admin/certificate" className={({isActive}) => isActive ? "active-link" : ""}>certificate</NavLink>
                <NavLink to="/admin/project" className={({isActive}) => isActive ? "active-link" : ""}>Project</NavLink>
                <NavLink to="/admin/page" className={({isActive}) => isActive ? "active-link" : ""}>FrontPage</NavLink>
                <NavLink to="/admin/education" className={({isActive}) => isActive ? "active-link" : ""}>Education</NavLink>
                <NavLink to="/admin/skill" className={({isActive}) => isActive ? "active-link" : ""}>skill</NavLink>
                <NavLink to="/admin/update" className={({isActive}) => isActive ? "active-link" : ""}>Profile</NavLink>
                <Logout />
            </nav>
            </div>
        </div>
      </div>
  )
}

export default Navbar