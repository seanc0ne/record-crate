import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TrackList = (track) => {
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
  } = track.track;

  return (
    <div className="track bg-light">
      <span>ARTWORK?</span>
      <div>
        <h4>{songTitle}</h4>
        <h5>
          Artist(s):{' '}
          {sourceId.artists.map((artist) => (
            <span key={artist._id}>
              {artist.artistName} ({artist.countryOfOrigin})
            </span>
          ))}
        </h5>
        <h6>
          {sourceId.source}, label: {sourceId.label}, years: {sourceId.years}
        </h6>
        <div>
          showTrack: {showTrack ? 'yes' : 'no'}, keys: {keys}, bpms: {bpms},
          lengths: {lengths}
        </div>
        <div>
          composers: {composers}, producers: {producers}
        </div>
        <div>
          billboardChartPeaks: {billboardChartPeaks}, chartPeakDates:{' '}
          {chartPeakDates}
        </div>
        <ul>
          dropboxUrls:
          {dropboxUrls.map((url, index) => (
            <li key={`url_${index}`}>
              <a href={url} target="_blank">
                {url}
              </a>
            </li>
          ))}
        </ul>
        <div>
          This song was added to the library by {userId.name} on {createdAt}.
          There is/are {notesCount} note(s) as follows:
        </div>
        <ul>
          {notes.map((note) => (
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
      <Link to={`/${_id}`} className="btn btn-primary">
        View Track
      </Link>
    </div>
  );
};

TrackList.propTypes = {
  track: PropTypes.object.isRequired,
};

export default TrackList;
