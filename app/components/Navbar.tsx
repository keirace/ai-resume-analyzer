import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <Link to="/" className='text-2xl font-bold text-gradient'>Resume Analyzer</Link>
        <Link to="/upload" className='primary-button w-fit'>Upload</Link>
    </nav>
  )
}

export default Navbar