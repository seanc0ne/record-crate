import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editTrack } from '../../../actions/track';
import Navbar from '../../layout/Navbar';

// *********** BOOTSTRAP & CUSTOM STYLES **********
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const EditTrack = ({ editTrack, track: { track } }) => {
  // Handle state for modals
  const [showSource, setShowSource] = useState(false);
  const handleCloseSource = () => setShowSource(false);
  const handleShowSource = () => setShowSource(true);
  const [showArtists, setShowArtists] = useState(false);
  const handleCloseArtists = () => setShowArtists(false);
  const handleShowArtists = () => setShowArtists(true);
  const [showArtistInfo, setShowArtistInfo] = useState(false);
  const handleCloseArtistInfo = () => setShowArtistInfo(false);
  const handleShowArtistInfo = () => setShowArtistInfo(true);

  // Handle state for track data
  const [trackData, setTrackData] = useState({
    songTitle: track.songTitle,
    keys:
      track.keys.length === 0
        ? ''
        : track.keys.length === 1
        ? track.keys.toString()
        : track.keys.join(', '),
    bpms:
      track.bpms.length === 0
        ? ''
        : track.bpms.length === 1
        ? track.bpms.toString()
        : track.bpms.join(', '),
    lengths:
      track.lengths.length === 0
        ? ''
        : track.lengths.length === 1
        ? track.lengths.toString()
        : track.lengths.join(', '),
    composers:
      track.composers.length === 0
        ? ''
        : track.composers.length === 1
        ? track.composers.toString()
        : track.composers.join(', '),
    producers:
      track.producers.length === 0
        ? ''
        : track.producers.length === 1
        ? track.producers.toString()
        : track.producers.join(', '),
    billboardChartPeaks:
      track.billboardChartPeaks.length === 0
        ? ''
        : track.billboardChartPeaks.length === 1
        ? track.billboardChartPeaks.toString()
        : track.billboardChartPeaks.join(', '),
    chartPeakDates:
      track.chartPeakDates.length === 0
        ? ''
        : track.chartPeakDates.length === 1
        ? track.chartPeakDates.toString()
        : track.chartPeakDates.join(', '),
    dropboxUrls:
      track.dropboxUrls.length === 0
        ? ''
        : track.dropboxUrls.length === 1
        ? track.dropboxUrls.toString()
        : track.dropboxUrls.join(', '),
    showTrack: track.showTrack,
    sourceId: track.sourceId,
  });
  console.log('type of trackData keys', typeof trackData.keys);

  const handleChangeTrack = (e) => {
    console.log('trackData before set', trackData);
    setTrackData({ ...trackData, [e.target.name]: e.target.value });
    console.log('trackData after set', trackData);
  };

  const onSubmitTrack = (e) => {
    e.preventDefault();
    console.log('track._id', track._id);
    console.log('trackData', trackData);
    editTrack(track._id, trackData);
  };

  return (
    <Fragment>
      <Navbar />
      <div className="track container mt-5 p-5">
        <Form className="w-100" onSubmit={(e) => onSubmitTrack(e)}>
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
              <Form.Group className="w-100 my-2">
                <Form.Label>Source / Album:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Source Name / Album Name"
                  name="sourceName"
                  value={trackData.sourceId.sourceName}
                  readOnly
                ></Form.Control>
              </Form.Group>
              <Form.Group className="w-100">
                <Form.Row className="w-100 my-2">
                  <Col>
                    <Form.Label>Label:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Label"
                      name="label"
                      value={trackData.sourceId.label}
                      readOnly
                    ></Form.Control>
                  </Col>
                  <Col>
                    <Form.Label>Year:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Years"
                      name="years"
                      value={trackData.sourceId.years}
                      readOnly
                    ></Form.Control>
                  </Col>
                </Form.Row>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="w-100">
                <Form.Label className="my-2">Artists:</Form.Label>
                {trackData.sourceId.artists !== [] &&
                  trackData.sourceId.artists.map((artist) => (
                    <Form.Row className="w-100">
                      <Col md={6}>
                        <Form.Control
                          type="text"
                          placeholder="Artist's Name"
                          name="artistName"
                          value={artist.artistName}
                          readOnly
                        ></Form.Control>
                      </Col>
                      <Col md={3}>
                        <Form.Control
                          type="text"
                          placeholder="Artist's Country of Origin"
                          name="countryOfOrigin"
                          value={artist.countryOfOrigin}
                          readOnly
                        ></Form.Control>
                      </Col>
                      <Col md={3}>
                        <div
                          className="clickable"
                          onClick={handleShowArtistInfo}
                        >
                          Edit Artist Info
                        </div>
                        <Modal
                          className="modal-source"
                          show={showArtistInfo}
                          onHide={handleCloseArtistInfo}
                        >
                          <Modal.Header closeButton></Modal.Header>
                          <Modal.Body>
                            <div>EDIT ARTIST INFO COMPONENT APPEARS HERE</div>
                          </Modal.Body>
                        </Modal>
                      </Col>
                    </Form.Row>
                  ))}
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row className="w-100">
            <Col md={6} className="w-100">
              <Button type="button" onClick={handleShowSource}>
                Edit Source
              </Button>
              <Modal
                className="modal-source"
                show={showSource}
                onHide={handleCloseSource}
              >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  <div>EDIT SOURCE COMPONENT APPEARS HERE</div>
                </Modal.Body>
              </Modal>
            </Col>
            <Col md={6} className="w-100">
              <Button type="button" onClick={handleShowArtists}>
                Edit Artists
              </Button>
              <Modal
                className="modal-source"
                show={showArtists}
                onHide={handleCloseArtists}
              >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  <div>EDIT ARTISTS COMPONENT APPEARS HERE</div>
                </Modal.Body>
              </Modal>
            </Col>
          </Form.Row>
          <Form.Row className="w-100 mt-2 pt-3">
            <Form.Label className="my-2">Song details:</Form.Label>
          </Form.Row>
          <Form.Row className="w-100 my-2">
            <Col>
              <Form.Control
                type="text"
                placeholder="Keys"
                name="keys"
                value={trackData.keys}
                onChange={(e) => handleChangeTrack(e)}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="BPM"
                name="bpms"
                value={trackData.bpms}
                onChange={(e) => handleChangeTrack(e)}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Lengths"
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
                placeholder="Composers"
                name="composers"
                value={trackData.composers}
                onChange={(e) => handleChangeTrack(e)}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Producers"
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
                placeholder="Billboard chart peaks"
                name="billboardChartPeaks"
                value={trackData.billboardChartPeaks}
                onChange={(e) => handleChangeTrack(e)}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Chart peak dates"
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
                placeholder="Dropbox URLs"
                name="dropboxUrls"
                value={trackData.dropboxUrls}
                onChange={(e) => handleChangeTrack(e)}
              ></Form.Control>
            </Col>
          </Form.Row>
          <Button className="w-100 mt-5" type="submit">
            SAVE TRACK EDITS
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

EditTrack.propTypes = {
  editTrack: PropTypes.func.isRequired,
  track: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  track: state.track,
});

export default connect(mapStateToProps, { editTrack })(EditTrack);
