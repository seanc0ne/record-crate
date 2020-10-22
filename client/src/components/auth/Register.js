import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

// *********** BOOTSTRAP **********
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import recordSleeve from '../../assets/img/recordSleeve@x2.png';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // verify that passwords match
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger'); // we pass in the msg, and the alert type. We choose 'danger' for the alert type b/c of our css. We could optionally pass in a third arg which is the timeout delay which is set by default at 5000.
    } else {
      register({ name, email, password });
    }
  };

  return (
    <Fragment>
      <Card.Img src={recordSleeve} />
      <Card.ImgOverlay>
        <div className="signup-sleeve pl-3 pr-5">
          <Form className="w-100" onSubmit={(e) => onSubmit(e)}>
            <Form.Row className="w-100">
              <Form.Group className="w-100" controlId="formGridName">
                <Form.Label htmlFor="name">User Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={name}
                  onChange={(e) => onChange(e)}
                  name="name"
                />
              </Form.Group>
              <Form.Group className="w-100" controlId="formGridEmail">
                <Form.Label htmlFor="email">Email address</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={email}
                  onChange={(e) => onChange(e)}
                  name="email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="w-100" controlId="formGridMessage">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  type="password"
                  defaultValue={password}
                  onChange={(e) => onChange(e)}
                  name="password"
                />
                <Form.Text className="text-muted">
                  Please use at least 6 characters etc...
                </Form.Text>
              </Form.Group>
              <Form.Group className="w-100" controlId="formGridMessage2">
                <Form.Label htmlFor="password2">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  defaultValue={password2}
                  onChange={(e) => onChange(e)}
                  name="password2"
                />
              </Form.Group>
              <Button className="signUpConfirmBtn" type="submit">
                OK
              </Button>
            </Form.Row>
          </Form>
        </div>
      </Card.ImgOverlay>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register); // connect takes in two things: (1) any state that we want to map (which we don't have here, hence 'null'), and (2) an object with any actions we want to use (we want to use 'setAlert' and 'register' here)
