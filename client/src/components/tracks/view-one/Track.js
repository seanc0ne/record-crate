import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTrackById } from '../../../actions/track';
import Navbar from '../../layout/Navbar';
import AddNoteToTrack from '../track-forms/AddNoteToTrack';
import NoteList from './NoteList';

// *********** BOOTSTRAP & CUSTOM STYLES **********
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
          <div className="track container mt-5 p-5">
            <Row className="mx-5 d-block">
              <Row className="justify-content-between my-3">
                <Col>
                  <h4>{track.songTitle}</h4>
                </Col>
                <Col>
                  {auth.isAuthenticated &&
                    auth.loading === false &&
                    auth.user._id === track.userId._id && (
                      <Link to="/edit-track" className="mx-auto btn">
                        Edit Track
                      </Link>
                    )}
                </Col>
              </Row>
              <Row className="my-3">
                <Col>
                  <h5>
                    Artist(s):{' '}
                    {track.sourceId.artists.map((artist) => (
                      <span key={artist._id}>
                        {artist.artistName} ({artist.countryOfOrigin})
                      </span>
                    ))}
                  </h5>
                </Col>
              </Row>
              <Row className="my-3">
                <Col>SOURCE: {track.sourceId.sourceName}</Col>
                <Col>LABEL: {track.sourceId.label}</Col>
                <Col>YEAR: {track.sourceId.years}</Col>
              </Row>
              <Row className="my-3">
                {/* <Col>showTrack: {track.showTrack ? 'yes' : 'no'}</Col> */}
                <Col>KEYS: {track.keys}</Col>
                <Col>BPM: {track.bpms}</Col>
                <Col>LENGTH: {track.lengths}</Col>
              </Row>
              <Row className="my-3">
                <Col>COMPOSERS: {track.composers}</Col>
                <Col>PRODUCERS: {track.producers}</Col>
              </Row>
              <Row className="my-3">
                <Col>BILLBOARD CHART PEAKS: {track.billboardChartPeaks}</Col>
                <Col>CHART PEAK DATES: {track.chartPeakDates}</Col>
              </Row>
              <Row className="my-3">
                <Col>
                  <div className="mb-2">CHECKOUT:</div>
                  <ul>
                    {track.dropboxUrls.map((url, index) => (
                      <li key={`url_${index}`}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
              <Row className="my-2">
                <Col>
                  <div className="my-2">
                    This song was added to the library by {track.userId.name} on{' '}
                    {track.createdAt}.
                  </div>
                  <div className="my-2">
                    There is/are {track.notesCount} note(s) as follows:
                  </div>
                </Col>
              </Row>
              <Row className="notes">
                {track.notes.map((note) => (
                  <NoteList key={note._id} note={note} trackId={track._id} />
                ))}
              </Row>
              <AddNoteToTrack trackId={track._id} />
              <div className="mt-3 clickable">
                <Link to="/dashboard">
                  <i className="fas fa-sign-out-alt"></i>
                  <span className="navFont"> Back to Library</span>
                </Link>
              </div>
            </Row>
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
