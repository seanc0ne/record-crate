// *********** REACT & REDUX **********
import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// *********** COMPONENTS **********
import StartSleeve from './StartSleeve';
import Register from '../auth/Register';
import Login from '../auth/Login';

// *********** BOOTSTRAP **********
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const Landing = ({ isAuthenticated }) => {
  const [currentSleeve, setCurrentSleeve] = useState('start');
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  function displaySleeve(sleeveName) {
    console.log('sleeveName', sleeveName);
    switch (sleeveName) {
      case 'signup':
        return (
          <Register
            showCancelButton
            onCancelClick={() => {
              setCurrentSleeve('start');
            }}
          />
        );
      case 'login':
        return <Login />;
      case 'start':
      default:
        return (
          <StartSleeve
            currentSleeve={currentSleeve}
            setCurrentSleeve={setCurrentSleeve}
          ></StartSleeve>
        );
    }
  }

  return (
    <section className="landing">
      {/* <Row className="mx-auto vw-75 vh-100"></Row> */}
      <Row>
        <Col xs={5} md="auto">
          <Card className="landingCard">{displaySleeve(currentSleeve)}</Card>
        </Col>
        <Col className="md">
          <Fragment></Fragment>
        </Col>
      </Row>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
