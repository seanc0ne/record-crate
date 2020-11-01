import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TrackList from './TrackList';
import { getTracks } from '../../../actions/track';

const Tracks = ({ getTracks, auth, track: { tracks, loading } }) => {
  useEffect(() => {
    getTracks();
  }, [getTracks]);

  return (
    <Fragment>
      {auth.loading || loading ? (
        <h1>Loading...</h1>
      ) : (
        <tbody>
          {tracks.map((track) => (
            <TrackList key={track._id} track={track} />
          ))}
        </tbody>
      )}
    </Fragment>
  );
};

Tracks.propTypes = {
  getTracks: PropTypes.func.isRequired,
  track: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  track: state.track,
  auth: state.auth,
});

export default connect(mapStateToProps, { getTracks })(Tracks);
