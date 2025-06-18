import React from 'react'
import { NavLink } from 'react-router-dom'
import Logout from '../Auth/Logout'
import './AdminNavbar.css'

function Navbar() {
  return (
    <div className='admin-navbar'>
            <div className='admin-nav-title'>PortFolio</div>
            <div className='admin-nav'>
              <nav>
                <NavLink to="/admin/certificate" className={({isActive}) => isActive ? "active-link" : ""}>certificate</NavLink>
                <NavLink to="/admin/project" className={({isActive}) => isActive ? "active-link" : ""}>Project</NavLink>
                <NavLink to="/admin/page" className={({isActive}) => isActive ? "active-link" : ""}>FrontPage</NavLink>
                <NavLink to="/admin/education" className={({isActive}) => isActive ? "active-link" : ""}>Education</NavLink>
                <NavLink to="/admin/skill" className={({isActive}) => isActive ? "active-link" : ""}>skill</NavLink>
                <Logout />
            </nav>
            </div>
        </div>
  )
}

export default Navbar