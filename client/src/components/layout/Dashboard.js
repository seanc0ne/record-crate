import React, { Fragment } from 'react';
import Navbar from './Navbar';
import DiscogsTracks from '../tracks/DiscogsTracks'
import Tracks from '../tracks/view-all/Tracks';
import { Container } from 'react-bootstrap';

const Dashboard = ({ isAuthenticated }) => {
  return (
    <Fragment>
      <Navbar />
      <div className="row" style={{ marginTop: '150px' }}>
        <div className="col-xs-12 col-md-3">
          <div className="whiteBox">
            <h2>Library</h2>
            <h2>Search Discogs</h2>
            <div>
              <DiscogsTracks />
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-md-9">
          <div className="whiteBox">
            <table>
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Keys</th>
                <th>BPM</th>
                <th>Length</th>
                <th></th>                
              </tr>
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

export default Dashboard;

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
