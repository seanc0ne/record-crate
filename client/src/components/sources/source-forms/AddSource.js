import React, { Fragment, useState, useEffect } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSource } from '../../../actions/source';
import { getArtists } from '../../../actions/artist';

// *********** BOOTSTRAP & CUSTOM STYLES **********
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const AddSource = ({ getArtists, addSource, artist: { artists, loading } }) => {
  const [sourceData, setSourceData] = useState({
    artists: null,
    sourceName: '',
    label: '',
    years: '',
  });

  const [artistSelection, setArtistSelection] = useState(null);

  useEffect(() => {
    getArtists();
  }, [getArtists]);

  let artistList = [];
  if (artists.length > 0) {
    artists.forEach((artist) =>
      artistList.push({ value: artist._id, label: artist.artistName })
    );
  }
  const handleChangeSource = (e) => {
    setSourceData({ ...sourceData, [e.target.name]: e.target.value });
  };
  const handleArtistSelection = (value) => {
    setArtistSelection(value);
  };

  const onSubmitSource = (e) => {
    const selectedArtists = artistSelection.map((selection) => selection.value);
    addSource(selectedArtists, sourceData);
  };

  return (
    <Fragment>
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <Form
          className="w-100 bg-light p-5"
          onSubmit={(e) => onSubmitSource(e)}
        >
          <Form.Row className="w-100 my-2">
            <Col className="w-100">
              <Form.Label>Source:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name of the source (e.g. title of the album)"
                name="sourceName"
                value={sourceData.sourceName}
                onChange={(e) => handleChangeSource(e)}
              ></Form.Control>
            </Col>
          </Form.Row>
          <Form.Row className="w-100 my-2">
            <Col>
              <Form.Control
                type="text"
                placeholder="Enter the label"
                name="label"
                value={sourceData.label}
                onChange={(e) => handleChangeSource(e)}
              ></Form.Control>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Enter one or more years, comma-separated (ex: 1979, 1995)"
                name="years"
                value={sourceData.years}
                onChange={(e) => handleChangeSource(e)}
              ></Form.Control>
            </Col>
          </Form.Row>
          <Form.Row className="w-100">
            <Col className="w-100">
              <Form.Group className="w-100">
                <Form.Label>Artist(s):</Form.Label>
                <Select
                  isMulti
                  name="artists"
                  options={artistList}
                  className="basic-multi-select select-item"
                  classNamePrefix="select"
                  onChange={handleArtistSelection}
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Button type="submit">SUBMIT</Button>
        </Form>
      )}
    </Fragment>
  );
};

AddSource.propTypes = {
  getArtists: PropTypes.func.isRequired,
  addSource: PropTypes.func.isRequired,
  artist: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  artist: state.artist,
});

export default connect(mapStateToProps, { addSource, getArtists })(AddSource);
