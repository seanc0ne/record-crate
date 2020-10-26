import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const TrackList = ({ track }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    _id,
    songTitle,
    showTrack, // boolean
    keys, // array
    bpms, // array
    lengths, // array
    composers, // array
    producers, // array
    billboardChartPeaks, // array
    chartPeakDates, // array
    dropboxUrls, // array
    sourceId,
    //  {
    //   source,
    //   label,
    //   artists, // array of artist objects structured as { _id, artistName, countryOfOrigin, userId } where userId is the user who added the artist in the library and structured as { _id, name, avatar }
    //   years, // array
    // },
    userId, // user who added this track to the library
    createdAt, // date when track was added to library
    notesCount, // nb of notes associated to this track
    notes, // array of note objects structured as { _id, showNote, userId, noteText, createdAt }
  } = track;

  
  return (
    // old way <ul className="library-list"></ul>
    <tr>
      <td>{songTitle}</td>
      <td>
      {sourceId.artists.map((artist) => (
          <span className="artist-name" key={artist._id}>
            {' '}
            {artist.artistName}{' '}
          </span>
        ))}
      </td>
      <td>{keys}</td>
      <td>{bpms}</td>
      <td>{lengths}</td>
      <td>
      <span onClick={handleShow}>&#8230;</span>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {songTitle} by{' '}
              {sourceId.artists.map((artist) => (
                <span className="artist-name" key={artist._id}>
                  {' '}
                  {artist.artistName} ({artist.countryOfOrigin})
                </span>
              ))}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {sourceId.source}, label: {sourceId.label}, years:{' '}
              {sourceId.years}
            </div>
            <div>
              keys: {keys}, bpms: {bpms}, lengths: {lengths}
            </div>
            <div>
              composers: {track.composers}, producers: {track.producers}
            </div>
            <div>
              billboardChartPeaks: {track.billboardChartPeaks}, chartPeakDates:{' '}
              {track.chartPeakDates}
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
                  <div>
                    Note by {note.userId} on {note.createdAt}:
                  </div>
                  <div>{note.noteText}</div>
                </li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </td>
    </tr>
    
    
    
    
  );
};

TrackList.propTypes = {
  track: PropTypes.object.isRequired,
};

export default TrackList;