import React, { Fragment, useState, useEffect } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTrack } from '../../../actions/track';
import { getSources } from '../../../actions/source';

// *********** BOOTSTRAP & CUSTOM STYLES **********
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const AddTrack = ({ getSources, addTrack, source: { sources, loading } }) => {
  const [trackData, setTrackData] = useState({
    songTitle: '',
    keys: '',
    bpms: '',
    lengths: '',
    composers: '',
    producers: '',
    billboardChartPeaks: '',
    chartPeakDates: '',
    dropboxUrls: '',
    showTrack: true,
  });

  const [sourceSelection, setSourceSelection] = useState(null);

  useEffect(() => {
    getSources();
  }, [getSources]);

  let sourceList = [];
  if (sources.length > 0) {
    sources.forEach((source) =>
      sourceList.push({ value: source._id, label: source.sourceName })
    );
  }

  const handleChangeTrack = (e) => {
    setTrackData({ ...trackData, [e.target.name]: e.target.value });
    console.log('trackData', trackData);
  };

  const handleSourceSelection = (value) => {
    setSourceSelection(value);
    console.log('value', value);
    console.log('sourceSelection', sourceSelection);
  };

  const onSubmitTrack = (e) => {
    const selectedSource = sourceSelection.value;
    addTrack(selectedSource, trackData);
  };

  return (
    <Fragment>
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <Form className="w-100 bg-light p-5" onSubmit={(e) => onSubmitTrack(e)}>
          <Form.Row className="w-100 my-2">
            <Col className="w-100">
              <Form.Label>Song:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Song Title"
                name="songTitle"
                value={trackData.songTitle}
                onChange={(e) => handleChangeTrack(e)}
              ></Form.Control>
            </Col>
          </Form.Row>
          <Form.Row className="w-100 my-2">
            <Col className="w-100">
              <Form.Group className="w-100">
                <Form.Label>Source:</Form.Label>
                <Select
                  name="sources"
                  options={sourceList}
                  className="basic-single select-item"
                  classNamePrefix="select"
                  onChange={handleSourceSelection}
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row className="w-100 my-2">
            <Col>
              <Form.Control
                type="text"
                placeholder="List of keys, comma-separated (ex: 5A, 8A)"
                name="keys"
                value={trackData.keys}
                onChange={(e) => handleChangeTrack(e)}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="List of bpm, comma-separated (ex: 105, 141)"
                name="bpms"
                value={trackData.bpms}
                onChange={(e) => handleChangeTrack(e)}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="List of lengths, comma-separated (ex: 4:55, 6:27)"
                name="lengths"
                value={trackData.lengths}
                onChange={(e) => handleChangeTrack(e)}
              ></Form.Control>
            </Col>
          </Form.Row>
          <Form.Row className="w-100 my-2">
            <Col>
              <Form.Control
                type="text"
                placeholder="List of composers, comma-separated"
                name="composers"
                value={trackData.composers}
                onChange={(e) => handleChangeTrack(e)}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="List of producers, comma-separated"
                name="producers"
                value={trackData.producers}
                onChange={(e) => handleChangeTrack(e)}
              ></Form.Control>
            </Col>
          </Form.Row>
          <Form.Row className="w-100 my-2">
            <Col>
              <Form.Control
                type="text"
                placeholder="Billboard chart peaks, comma-separated (ex: 11, 24)"
                name="billboardChartPeaks"
                value={trackData.billboardChartPeaks}
                onChange={(e) => handleChangeTrack(e)}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Chart peak dates, comma-separated (ex: 09/01/1981, 09/01/1983)"
                name="chartPeakDates"
                value={trackData.chartPeakDates}
                onChange={(e) => handleChangeTrack(e)}
              ></Form.Control>
            </Col>
          </Form.Row>
          <Form.Row className="w-100 my-2">
            <Col>
              <Form.Control
                type="text"
                placeholder="Dropbox URLs, comma-separated"
                name="dropboxUrls"
                value={trackData.dropboxUrls}
                onChange={(e) => handleChangeTrack(e)}
              ></Form.Control>
            </Col>
          </Form.Row>
          <Button type="submit">SUBMIT</Button>
        </Form>
      )}
    </Fragment>
  );
};

AddTrack.propTypes = {
  getSources: PropTypes.func.isRequired,
  addTrack: PropTypes.func.isRequired,
  source: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  source: state.source,
});

export default connect(mapStateToProps, { addTrack, getSources })(AddTrack);

// import React, { Fragment, useState } from 'react';
// import { Link, withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { getArtists } from '../../../actions/artist';

// // *********** BOOTSTRAP **********
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Form from 'react-bootstrap/Form';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';

// const AddTrack = ({ addArtist, getArtists }) => {
//   const [formTrackData, setformTrackData] = useState({
//     songTitle: '',
//     showTrack: true,
//     keys: [],
//     bpms: [],
//     lengths: [],
//     composers: [],
//     producers: [],
//     billboardChartPeaks: [],
//     chartPeakDates: [],
//     dropboxUrls: [],
//   });

//   const {
//     songTitle,
//     showTrack,
//     keys,
//     bpms,
//     lengths,
//     composers,
//     producers,
//     billboardChartPeaks,
//     chartPeakDates,
//     dropboxUrls,
//   } = formTrackData;

//   const onChange = (e) => {
//     // setformArtistData({ ...formArtistData, [e.target.name]: e.target.value });
//     // setformSourceData({ ...formSourceData, [e.target.name]: e.target.value });
//     setformTrackData({ ...formTrackData, [e.target.name]: e.target.value });
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     // addArtist(formArtistData);
//     // addSource(formSourceData);
//     // addTrack(formTrackData, history);
//   };

//   return (
//     <Fragment>
//       <Form className="w-100 bg-light m-5 p-5" onSubmit={(e) => onSubmit(e)}>
//         <Form.Group className="w-100">
//           <Form.Row className="w-100">
//             <Form.Label column>Song Title</Form.Label>
//             <Col>
//               <Form.Control
//                 type="text"
//                 defaultValue={songTitle}
//                 onChange={(e) => onChange(e)}
//                 name="songTitle"
//                 placeholder="Enter that tune's name..."
//               />
//             </Col>
//             <Form.Label column>Public? </Form.Label>
//             <Col>
//               <Form.Control
//                 type="text"
//                 defaultValue={showTrack ? 'yes' : 'no'}
//                 onChange={(e) => onChange(e)}
//                 name="showTrack"
//               />
//             </Col>
//           </Form.Row>
//           <br />
//           <Form.Row className="w-100">
//             <Form.Label>List of keys:</Form.Label>
//             <Col>
//               <Form.Control
//                 type="text"
//                 defaultValue={keys}
//                 onChange={(e) => onChange(e)}
//                 name="keys"
//                 placeholder="ex: 5A, 8A"
//               />
//             </Col>
//             <Form.Label>List of bpms:</Form.Label>
//             <Col>
//               <Form.Control
//                 type="text"
//                 defaultValue={bpms}
//                 onChange={(e) => onChange(e)}
//                 name="bpms"
//                 placeholder="ex: 105, 141"
//               />
//             </Col>
//             <Form.Label>Lengths:</Form.Label>
//             <Col>
//               <Form.Control
//                 type="text"
//                 defaultValue={lengths}
//                 onChange={(e) => onChange(e)}
//                 name="lengths"
//                 placeholder="ex: 4:55, 6:27"
//               />
//             </Col>
//           </Form.Row>
//           <br />
//           <Form.Row className="w-100">
//             <Form.Label>Composers:</Form.Label>
//             <Col>
//               <Form.Control
//                 type="text"
//                 defaultValue={composers}
//                 onChange={(e) => onChange(e)}
//                 name="composers"
//                 placeholder="ex: Bananarama, Swain, Jolley"
//               />
//             </Col>
//             <Form.Label>Producers:</Form.Label>
//             <Col>
//               <Form.Control
//                 type="text"
//                 defaultValue={producers}
//                 onChange={(e) => onChange(e)}
//                 name="producers"
//                 placeholder="ex: Daniel Miller, Depeche Mode"
//               />
//             </Col>
//           </Form.Row>
//           <br />
//           <Form.Row className="w-100">
//             <Form.Label>Billboard Chart Peaks:</Form.Label>
//             <Col>
//               <Form.Control
//                 type="text"
//                 defaultValue={billboardChartPeaks}
//                 onChange={(e) => onChange(e)}
//                 name="billboardChartPeaks"
//                 placeholder="ex: 11, 24"
//               />
//             </Col>
//             <Form.Label>Chart Peak Dates:</Form.Label>
//             <Col>
//               <Form.Control
//                 type="text"
//                 defaultValue={chartPeakDates}
//                 onChange={(e) => onChange(e)}
//                 name="chartPeakDates"
//                 placeholder="ex: 09/01/1981, 09/01/1983"
//               />
//             </Col>
//           </Form.Row>
//           <br />
//           <Form.Row className="w-100">
//             <Form.Label>Dropbox URLs:</Form.Label>
//             <Col>
//               <Form.Control
//                 type="text"
//                 defaultValue={dropboxUrls}
//                 onChange={(e) => onChange(e)}
//                 name="dropboxUrls"
//                 placeholder="ex: https://www.discogs.com/Irene-Cara-Breakdance/release/644197"
//               />
//             </Col>
//           </Form.Row>
//         </Form.Group>
//         <Button type="submit" className="btn btn-primary my-1">
//           ADD TRACK
//         </Button>
//         <Link className="btn btn-light my-1" to="/dashboard">
//           Go Back
//         </Link>
//       </Form>
//     </Fragment>
//   );
// };

// // AddTrack.propTypes = {
// //   addTrack: PropTypes.func.isRequired,
// // };

// export default connect(null, { addTrack })(withRouter(AddTrack)); // withRouter to pass the history object
