import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editUser, deleteAccount } from '../../actions/auth';

const EditUser = ({ user, editUser, deleteAccount }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const { name, email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('formData', formData);
    editUser(formData);
  };

  return (
    <Fragment>
      <section className="landing">
        <div className="container">
          <div className="bg-auth">
            <h1 className="large text-primary">Edit your user account</h1>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
                <small className="form-text">
                  This site uses Gravatar so if you want a profile image, use a
                  Gravatar email
                </small>
              </div>
              <input
                type="submit"
                className="btn btn-primary m-1"
                value="EditUser"
              />
              <Link className="btn btn-light m-1" to="/dashboard">
                Go Back
              </Link>
            </form>
            <div className="m-1">
              <button
                className="btn btn-danger"
                onClick={() => deleteAccount()}
              >
                <i className="fas fa-user-minus"></i> Delete my account
              </button>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

EditUser.propTypes = {
  editUser: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { editUser, deleteAccount })(EditUser);
