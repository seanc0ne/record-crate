import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TrackList from './TrackList';
import { getTracks } from '../../../actions/track';

const Tracks = ({ getTracks, track: { tracks, loading } }) => {
  useEffect(() => {
    getTracks();
  }, [getTracks]);

  return (
    <Fragment>
      {loading ? (
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
};

const mapStateToProps = (state) => ({
  track: state.track,
});

export default connect(mapStateToProps, { getTracks })(Tracks);
