import React, { Fragment } from 'react';
// import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';

const Dashboard = ({ isAuthenticated }) => {
  return (
    <Fragment>
      <Navbar />
      <div className="row" style={{ marginTop: '150px' }}>
        <div className="col-xs-12 col-md-3">
          <div className="whiteBox">
            <h2>Library</h2>
          </div>
        </div>
        <div className="col-xs-12 col-md-9">
          <div className="whiteBox">
            <ul className="library-list">
              <li>Title</li>
              <li>Artist</li>
              <li>Year</li>
              <li>Label</li>
              <li>Key</li>
              <li>BPM</li>
              <li>Length</li>
              <li>Composer</li>
              <li>Producer</li>
              <li>Chart</li>
              <li>Peak</li>
              <li>Link</li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Dashboard);

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