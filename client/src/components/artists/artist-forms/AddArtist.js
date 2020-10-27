import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addArtist } from '../../../actions/artist';

const AddArtist = ({ addArtist }) => {
  const [artistData, setArtistData] = useState({
    artistName: '',
    countryOfOrigin: '',
  });

  const { artistName, countryOfOrigin } = artistData;
  console.log('initial state of artistData', artistData);

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('submit state of artistData', artistData);
  //   addArtist(artistData);
  // };

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        console.log('submit state of artistData', artistData);
        addArtist(artistData);
      }}
    >
      <div className="form-group">
        <input
          type="text"
          placeholder="Artist Name"
          name="artistName"
          value={artistName}
          onChange={(e) => setArtistData(artistName)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Country of Origin"
          name="countryOfOrigin"
          value={countryOfOrigin}
          onChange={(e) => setArtistData(countryOfOrigin)}
        />
      </div>
      <input type="submit" className="btn btn-primary my-1" />
    </form>
  );
};

AddArtist.propTypes = {
  addArtist: PropTypes.func.isRequired,
};

export default connect(null, { addArtist })(AddArtist);
