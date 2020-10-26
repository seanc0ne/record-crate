import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import ArtistList from './ArtistList';
import { getArtists } from '../../../actions/artist';

const Artists = ({ getArtists, artist: { artists, loading } }) => {
  useEffect(() => {
    getArtists();
  }, [getArtists]);
  return (
    <Fragment>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Fragment>
          <h1 className="large text-primary">Artists</h1>
          <ul>
            {artists.length > 0 ? (
              artists.map((artist) => (
                <li className="artist-name" key={artist._id}>
                  {artist.artistName}
                </li>
              ))
            ) : (
              <h4>No artists found...</h4>
            )}
          </ul>
        </Fragment>
      )}
    </Fragment>
  );
};

Artists.propTypes = {
  getArtists: PropTypes.func.isRequired,
  artist: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  artist: state.artist,
});

export default connect(mapStateToProps, { getArtists })(Artists);
