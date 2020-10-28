import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addArtist } from '../../../actions/artist';

const AddArtist = ({ addArtist }) => {
  const [artistData, setArtistData] = useState({
    artistName: '',
    countryOfOrigin: '',
  });

  const handleChangeArtist = (e) => {
    setArtistData({ ...artistData, [e.target.name]: e.target.value });
  };

  const onSubmitArtist = (e) => {
    // e.preventDefault();
    addArtist(artistData);
  };

  return (
    <form className="form" onSubmit={(e) => onSubmitArtist(e)}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Artist Name"
          name="artistName"
          value={artistData.artistName}
          onChange={(e) => handleChangeArtist(e)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Country of Origin"
          name="countryOfOrigin"
          value={artistData.countryOfOrigin}
          onChange={(e) => handleChangeArtist(e)}
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
