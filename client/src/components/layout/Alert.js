import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

// map our redux state (in this case the array of alerts) to the props for this component
const mapStateToProps = (state) => ({
  alerts: state.alert, // getting the alert reducer
});

export default connect(mapStateToProps)(Alert); // connect takes in two things: (1) any state that you want to map (which is 'mapStateToProps' here), and (2) an object with any actions we want to use (we don't have any action we want to use here)
