import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteTrack } from '../../../actions/track';

const TrackItem = ({
  deleteTrack,
  auth,
  track: { _id, songTitle, keys, bpms, lengths, userId },
}) => {
  return (
    <Fragment>
      <tr>
        <td>{songTitle}</td>
        <td>{keys}</td>
        <td>{bpms}</td>
        <td>{lengths}</td>
        <td>
          {!auth.loading && userId._id === auth.user._id && (
            <button
              onClick={(e) => deleteTrack(_id)}
              type="button"
              class="btn btn-danger"
            >
              <i class="fas fa-times"></i>
            </button>
          )}
        </td>
      </tr>
    </Fragment>
  );
};

TrackItem.propTypes = {
  track: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteTrack: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteTrack })(TrackItem);
