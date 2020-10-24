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
          <div>
            {artists.length > 0 ? (
              artists.map((artist) => (
                // <ArtistList key={artist._id} artist={artist} />
                <p>TEST</p>
              ))
            ) : (
              <h4>No artists found...</h4>
            )}
          </div>
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
