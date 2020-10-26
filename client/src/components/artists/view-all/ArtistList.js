import React from 'react';
import PropTypes from 'prop-types';

const ArtistList = ({ artist }) => {
  const { _id, userId, artistName, countryOfOrigin, createdAt } = artist;
  return (
    <ul>
      <li className="artist-name" key={artist._id}>
        {artist.artistName}
      </li>
    </ul>
  );
};

ArtistList.propTypes = {
  artist: PropTypes.object.isRequired,
};

export default ArtistList;
