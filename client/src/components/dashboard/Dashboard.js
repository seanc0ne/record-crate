import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const Dashboard = ({ isAuthenticated }) => {
  const history = useHistory();
  return (
    <Fragment>
      <Navbar />
      <div className="dark-overlay">
        <Container className="h-80 m-5 p-5 justify-content-center align-items-center">
          <Row className="mx-5 px-5 mt-5 my-2">
            <h4>Testing User Functions</h4>
            <Button
              className="btn-light"
              onClick={() => {
                history.push('/edit-user');
              }}
            >
              TEST: EDIT CURRENT USER
            </Button>
          </Row>
          <Row className="mx-5 px-5 my-2 py-2">
            <h4>Testing Track Functions</h4>
            <Button
              className="btn-light"
              onClick={() => {
                history.push('/tracks');
              }}
            >
              TEST: VIEW ALL TRACKS
            </Button>
          </Row>
          <Row className="mx-5 px-5 my-2 py-2">
            <Button
              className="btn-light"
              onClick={() => {
                history.push('/add-track');
              }}
            >
              TEST: ADD A TRACK
            </Button>
          </Row>
          <Row className="mx-5 px-5 my-2 py-2">
            <h4>Testing Artist Functions</h4>
            <Button
              className="btn-light"
              onClick={() => {
                history.push('/artists');
              }}
            >
              TEST: VIEW ALL ARTISTS
            </Button>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Dashboard);
