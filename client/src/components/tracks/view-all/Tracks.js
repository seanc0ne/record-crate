import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import TrackList from './TrackList';
import TrackItem from './TrackItem';
import { getTracks } from '../../../actions/track';

const Tracks = ({ getTracks, track: { tracks, loading } }) => {
  useEffect(() => {
    getTracks();
  }, [getTracks]);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <Fragment>
      {/* TrackForm */}
      <div>
        {/* PREVIOUSLY: {tracks.map((track) => <TrackList key={track._id} track={track} />)} */}
        {tracks.map((track) => (
          <TrackItem key={track._id} track={track} />
        ))}
      </div>
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
