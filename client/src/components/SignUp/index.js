import React, { useState } from 'react';
import { validateEmail } from '../../utils/helpers';

import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Media from 'react-bootstrap/Media';

import recordSleeveLogo from '../../assets/img/recordSleeve@x2.png'

function SignUp() {
    const [formState, setFormState] = useState({
      name: '',
      email: '',
      message: '',
    });
    const { name, email, message } = formState;
    const [errorMessage, setErrorMessage] = useState('');
    function handleChange(e) {
      if (e.target.name === 'email') {
        const isValid = validateEmail(e.target.value);
        // isValid conditional statement
        if (!isValid) {
          setErrorMessage('Your email is invalid.');
        } else {
          setErrorMessage('');
        }
      } else {
        if (!e.target.value.length) {
          setErrorMessage(`${e.target.name} is required.`);
        } else {
          setErrorMessage('');
        }
      }
      if (!errorMessage) {
        setFormState({ ...formState, [e.target.name]: e.target.value });
      }
    }
    function handleSubmit(e) {
      e.preventDefault();
      console.log(formState);
    }
    return (
        <Container className="w-100 signUpContainer">
          <Row className="flex-row contact-page" style={{justifyContent:"center", margin:'30px'}}>
            <Col sm={8} className="contact-form">
              <Row className="w-100">
                <Form className="w-100" onSubmit={handleSubmit}>
                  <Form.Row className="w-100">
                    <Form.Group className="w-100" controlId="formGridName">
                      <Form.Label htmlFor="name">User Name</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={name}
                        onBlur={handleChange}
                        name="name"
                      />
                    </Form.Group>
                    <Form.Group className="w-100" controlId="formGridEmail">
                      <Form.Label htmlFor="name">Email address</Form.Label>
                      <Form.Control
                        type="email"
                        defaultValue={email}
                        onBlur={handleChange}
                        name="email"
                      />
                       <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
                    </Form.Group>
                    <Form.Group className="w-100" controlId="formGridMessage">
                      <Form.Label htmlFor="name">Password</Form.Label>
                      <Form.Control
                        type="password"
                        defaultValue={message}
                        onBlur={handleChange}
                      />
                       <Form.Text className="text-muted">
      Please use at least 6 characters etc... 
    </Form.Text>
                    </Form.Group>
                    <Button className="w-100" type="submit">
                      Send message
                    </Button>
                  </Form.Row>
                </Form>
              </Row>
            </Col>
          </Row>
        </Container>
        // {errorMessage && (
        //   <div>
        //     <p className="error-text">{errorMessage}</p>
        //   </div>
        // )}
      );
    }

export default SignUp;


