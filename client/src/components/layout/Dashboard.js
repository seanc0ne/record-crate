import React, { Fragment } from 'react';
import Navbar from './Navbar';
import DiscogsTracks from '../tracks/DiscogsTracks'
import Tracks from '../tracks/view-all/Tracks';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = ({ isAuthenticated }) => {
  return (
    <Fragment>
      <div className="row">
      <Navbar />
      </div>
      

{/* ********** LEFT BOX / MENU ********** */}
      <div className="row" style={{ marginTop: '30px' }}>
        <div className="col-xs-12 col-md-2 whiteBox">
          <div>
            <div className='dashLeftColHead'>Library</div>
            <div className='dashLeftColItem'>Add a Song</div>
            
            <div></div>
            
            <div>
              <DiscogsTracks />
            </div>

            <div className='dashLeftColHead'>Playlist</div>
            <div className='dashLeftColItem'>[playlist 1]</div>
            <div className='dashLeftColItem'>[playlist 2]</div>
            <div className='dashLeftColItem'>[playlist 3]</div>
          
          </div>
        </div>

{/* ********** CENTER (EMPTY) BOX / MENU ********** */}
        <div className="col-xs-12 col-md-1">
        </div>


{/* ********** RIGHT BOX / MENU ********** */}
        <div className="col-xs-12 col-md-9 whiteBox">
          <div>
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
