import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

// *********** BOOTSTRAP **********
import Image from 'react-bootstrap/Image';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

// *********** ASSETS & IMAGES **********
import logo from '../../assets/img/logo@2x.png';

const Navbar = ({ auth: { user, loading }, logout }) => {
  // const authLinks = (
  //   <ul>
  //     <li>
  //       <Link to="/edit-user">
  //         <i className="fas fa-user "></i>{' '}
  //         <span className="hide-sm navFont">USER</span>
  //       </Link>
  //     </li>
  //     <li>
  //       <Link onClick={logout} to="#!">
  //         <i className="fas fa-sign-out-alt"></i>{' '}
  //         <span className="hide-sm navFont">LOGOUT</span>
  //       </Link>
  //     </li>
  //   </ul>
  // );

  // const guestLinks = (
  //   <ul>
  //     <li>
  //       <Link to="/register">Register</Link>
  //     </li>
  //     <li>
  //       <Link to="/login">Login</Link>
  //     </li>
  //   </ul>
  // );

  return (
    <nav className="navbar">
      <div>
        <Link to="/">
          <Image className="logo" src={logo} fluid />
        </Link>
      </div>
      <div>
        {!loading && (
          <Fragment>
            <ul>
              <li className="li-nav">
                <Dropdown className="hide-sm navFont dropdown-user">
                  <Dropdown.Toggle id="dropdown-basic">
                    {user !== null ? (
                      <Fragment>
                        <Image
                          className="avatar mr-3"
                          src={user.avatar}
                          fluid
                        />
                        {user.name}
                      </Fragment>
                    ) : (
                      <Fragment>
                        <i className="fas fa-user "></i>
                        {'  '}
                        <span>USER</span>
                      </Fragment>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                      Edit Account
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-1">
                      Delete Account
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-1" onClick={logout}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              {/* <li className="nav-item">
                <Link onClick={logout} to="#!">
                  <i className="fas fa-sign-out-alt"></i>{' '}
                  <span className="hide-sm navFont">LOGOUT</span>
                </Link>
              </li> */}
            </ul>
          </Fragment>
        )}
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

{
  /* <div>
        {!loading && <Fragment>{authLinks}</Fragment>}
        
      </div> */
}
