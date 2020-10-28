import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import DiscogsTracks from '../tracks/DiscogsTracks';
import Tracks from '../tracks/view-all/Tracks';
import AddTrack from '../tracks/track-forms/AddTrack';
import { setAlert } from '../../actions/alert';

// *********** BOOTSTRAP & CUSTOM STYLES **********
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <div className="row">
        <Navbar />
      </div>

      {/* ********** LEFT BOX / MENU ********** */}
      <div className="row" style={{ marginTop: '30px' }}>
        <div className="col-xs-12 col-md-2 whiteBox">
          <div>
            <div className="dashLeftColHead">Library</div>

            <div className="dashLeftColItem clickable" onClick={handleShow}>
              <i class="fas fa-plus clickable"></i> Add a Song
            </div>
            <Modal className="modal-track" show={show} onHide={handleClose}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <AddTrack />
              </Modal.Body>
              <Modal.Footer>
                <DiscogsTracks />
              </Modal.Footer>
            </Modal>

            <div></div>

            <div className="dashLeftColHead">Playlist</div>
            <div className="dashLeftColItem">[playlist 1]</div>
            <div className="dashLeftColItem">[playlist 2]</div>
            <div className="dashLeftColItem">[playlist 3]</div>
          </div>
        </div>

        {/* ********** CENTER (EMPTY) BOX / MENU ********** */}
        <div className="col-xs-12 col-md-1"></div>

        {/* ********** RIGHT BOX / MENU ********** */}
        <div className="col-xs-12 col-md-9 whiteBox">
          <div>
            <table>
              <thead>
                <th>Title</th>
                <th>Artist</th>
                <th>Keys</th>
                <th>BPM</th>
                <th>Length</th>
                <th></th>
              </thead>
              <Tracks />
            </table>
            {/* <ul className="library-list">
              <li>Title</li>
              <li>Artist</li> */}
            {/* <li>Year</li>
              <li>Label</li> */}
            {/* <li>Key</li>
              <li>BPM</li>
              <li>Length</li> */}
            {/* <li>Composer</li>
              <li>Producer</li>
              <li>Chart</li>
              <li>Peak</li>
              <li>Link</li> */}
            {/* </ul> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(Dashboard);

/*

function MyComponent() {
const [albums, setAlbums] = useState([]);

useEffect(() => {
  // retrieve data from backend
  // set it in albums

  fetch('/albums')
    .then(data => data.json())
    .then(data => setAlbums(data))
}, [])

return albums.map(({ title, artist, year }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{artist}</p>
      <p>{year}</p>
    </div>
  )
})

}

*/
