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
