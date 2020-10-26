import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

// *********** BOOTSTRAP **********
import Image from 'react-bootstrap/Image';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

// *********** ASSETS & IMAGES **********
import logo from '../../assets/img/logo@2x.png';

const Navbar = ({ auth: { user, isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/edit-user">
          <i className="fas fa-user "></i>{' '}
          {/* @TODO: <span className="hide-sm">{user.name}</span> CURRENTLY WITH A GLITCH B/C NEED TO USE useEffect hook for when user data is finished loading*/}
          <span className="hide-sm navFont">USER</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="#!">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm navFont">LOGOUT</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <div>
        <Link to="/">
          <Image className="logo" src={logo} fluid />
        </Link>
      </div>
      <div>
        {!loading && <Fragment>
          
          <DropdownButton
      alignRight
      title="User Menu"
      id="dropdown-menu-align-right"
        >
              <Dropdown.Item eventKey="option-1">Edit User</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="some link">Log Out</Dropdown.Item>
      </DropdownButton>

          </Fragment>}
        
      </div>
     
    </nav>
  );
};

// TODO: change line 51 back to what's below
// <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

// bring in the auth state
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);





{/* <div>
        {!loading && <Fragment>{authLinks}</Fragment>}
        
      </div> */}