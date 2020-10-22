// *********** REACT & REDUX **********
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// *********** BOOTSTRAP & ASSETS **********
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import recordSleeveLogo from '../../assets/img/recordSleeveWtLogo@x2.png';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
      <Container className="pt-5" fluid>
        <Row className="mx-auto vw-75 vh-100">
          <Col className="my-auto">
            <Card className="landingCard text-white">
              <Card.Img src={recordSleeveLogo} />
              <Card.ImgOverlay>
                <Card.Text className="landingText">
                  Create your own playlist from our database full of all the
                  details you’ve been missing including BPM, key, and much
                  more...
                </Card.Text>
                <div className="landingBtnDiv mt-3">
                  <Link to="/register" className="btn btn-primary landingBtn">
                    Sign Up
                  </Link>
                </div>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
      </Container>
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
