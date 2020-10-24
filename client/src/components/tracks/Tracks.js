import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TrackList from './TrackList';
import { getTracks } from '../../actions/track';

const Tracks = ({ getTracks, track: { tracks, loading } }) => {
  useEffect(() => {
    getTracks();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Fragment>
          <h1 className="large text-primary">Tracks</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and select tracks
          </p>
          <div className="tracks">
            {tracks.length > 0 ? (
              tracks.map((track) => <TrackList key={track._id} track={track} />)
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
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
