import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

// *********** BOOTSTRAP **********
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import recordSleeve from '../../assets/img/recordSleeve@x2.png';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Fragment>
      <Card.Img src={recordSleeve} />
      <Card.ImgOverlay>
        <div className="signup-sleeve pl-3 pr-5">
          <Form className="w-100" onSubmit={(e) => onSubmit(e)}>
            <Form.Row className="w-100">
              <Form.Group className="w-100" controlId="formGridEmail">
                <Form.Label htmlFor="email">Email address</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={email}
                  onChange={(e) => onChange(e)}
                  name="email"
                />
              </Form.Group>
              <Form.Group className="w-100" controlId="formGridMessage">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  type="password"
                  defaultValue={password}
                  onChange={(e) => onChange(e)}
                  name="password"
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
