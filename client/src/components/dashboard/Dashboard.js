import React, { Fragment } from 'react';
// import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';

const Dashboard = ({ isAuthenticated }) => {
  return (
    <Fragment>
      <Navbar />
      <section className="landing">
        <div className="dark-overlay"></div>
      </section>
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
