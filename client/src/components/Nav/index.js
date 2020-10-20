import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className="navBar">
      <div className="logo">
          <title>Record Crate</title>
      </div>
      <ul>
        <Link to="/">
          <li className="active">
            <HomeIcon />
            Home
          </li>
        </Link>
        <Link to="/search">
          <li>
            <SearchIcon />
            Search
          </li>
        </Link>
        <Link to="/your-library">
          <li>
            <LibraryIcon />
            Your Library
          </li>
        </Link>
      </ul>
      <div className="cookies">
        <span>Cookies</span>
        <span>Privacy Policy</span>
      </div>
    </div>
  )
};

export default Nav;