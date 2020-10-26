import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// *********** BOOTSTRAP & CUSTOM STYLES **********
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import FormControl from 'react-bootstrap/FormControl';

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

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );
  
  
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
      <td className='noCaret'>
      <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          &#8230;
    </Dropdown.Toggle>

<DropdownMenu as={CustomMenu}>

<Dropdown.Item href="#/action-1">
    
  <span onClick={handleShow}>Track Info</span>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="trackDetailH1">
              {songTitle} 
              </span>
              {' '}by{' '}
              {sourceId.artists.map((artist) => (
                <span className="trackDetailArtistName" key={artist._id}>
                  {' '}
                  {artist.artistName} ({artist.countryOfOrigin})
                </span>
              ))}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="trackDetailH2">
              {sourceId.source}
              </div>
              label: {sourceId.label}, year:{' '}
              {sourceId.years}
            </div>
            <div>
              key: {keys}, BPM: {bpms}, length: {lengths}
            </div>
            <div>
              composers: {track.composers}, producers: {track.producers}
            </div>
            <div>
              billboardChartPeak: {track.billboardChartPeaks}, chartPeakDates:{' '}
              {track.chartPeakDates}
            </div>

            <br></br>
            
            <div>
              There is/are {track.notesCount} note(s) as
              follows:
            </div>
            <ul>
              {track.notes.map((note) => (
                <li key={note._id}>
                  <br></br>
                  <div>{note.noteText}</div>
                  <div className='trackDetailFooter'>
                    by {note.userId} on {note.createdAt}
                  </div>
                </li>
              ))}
            </ul>

            <br></br>

            <ul>
              Dropbox URL:
              {track.dropboxUrls.map((url, index) => (
                <li key={`url_${index}`}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </a>
                </li>
              ))}
            </ul> 

          </Modal.Body>
          <Modal.Footer className="trackDetailFooter">
            <div style={{textAlign:'left'}}>
            This song was added to the library by {track.userId.name} on{' '}
              {track.createdAt} 
            </div>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>


  </Dropdown.Item>
  <Dropdown.Item href="#/action-2">Edit Track</Dropdown.Item>
  <Dropdown.Item href="#/action-3">Delete Track</Dropdown.Item>
  <Dropdown.Divider />
  <Dropdown.Item href="#/action-4">Add to Playlist</Dropdown.Item>

</DropdownMenu>

  
</Dropdown>
      </td>
    </tr>
    
    
    
    
  );
};

TrackList.propTypes = {
  track: PropTypes.object.isRequired,
};

export default TrackList;