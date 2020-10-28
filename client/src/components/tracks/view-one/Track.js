import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTrackById } from '../../../actions/track';
import Navbar from '../../layout/Navbar';

const Track = ({ match, getTrackById, track: { track, loading }, auth }) => {
  useEffect(() => {
    getTrackById(match.params.id); // match the id in the url
  }, [getTrackById, match.params.id]);

  return (
    <Fragment>
      <Navbar />
      {track === null || loading ? (
        <p>LOADING...</p>
      ) : (
        <Fragment>
          <div className="track mt-5 p-5">
            <div>
              <h4>{track.songTitle}</h4>
              <h5>
                Artist(s):{' '}
                {track.sourceId.artists.map((artist) => (
                  <span key={artist._id}>
                    {artist.artistName} ({artist.countryOfOrigin})
                  </span>
                ))}
              </h5>
              {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id === track.userId._id && (
                  <Link to="/edit-track" className="my-5 btn btn-dark">
                    Edit Track
                  </Link>
                )}
              <h6>
                {track.sourceId.source}, label: {track.sourceId.label}, years:{' '}
                {track.sourceId.years}
              </h6>
              <div>
                showTrack: {track.showTrack ? 'yes' : 'no'}, keys: {track.keys},
                bpms: {track.bpms}, lengths: {track.lengths}
              </div>
              <div>composers: {track.composers}</div>
              <div>producers: {track.producers}</div>
              <div>
                billboardChartPeaks: {track.billboardChartPeaks},
                chartPeakDates: {track.chartPeakDates}
              </div>
              <ul>
                dropboxUrls:
                {track.dropboxUrls.map((url, index) => (
                  <li key={`url_${index}`}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
              <div>
                This song was added to the library by {track.userId.name} on{' '}
                {track.createdAt}. There is/are {track.notesCount} note(s) as
                follows:
              </div>
              <ul>
                {track.notes.map((note) => (
                  <li key={note._id}>
                    <div>Note: (showNote: {note.showNote ? 'yes' : 'no'})</div>
                    <div>{note.noteText}</div>
                    <div>
                      Created by {note.userId} on {note.createdAt}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Link to="/tracks" className="m-2 btn">
                Add a Note
              </Link>
            </div>
            <div className="mt-3 clickable">
              <Link to="/dashboard">
                <i className="fas fa-sign-out-alt"></i>
                <span className="navFont"> Back to Library</span>
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Track.propTypes = {
  getTrackById: PropTypes.func.isRequired,
  track: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  track: state.track,
  auth: state.auth,
});

export default connect(mapStateToProps, { getTrackById })(Track);
