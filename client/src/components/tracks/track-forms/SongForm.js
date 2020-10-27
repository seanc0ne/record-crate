import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTracks, addTrack } from '../../actions/track';
import { getSources, addSource } from '../../actions/source';
import { getArtists, addArtist } from '../../actions/artist';

const SongForm = ({
  getTracks,
  getSources,
  getArtists,
  addTrack,
  addSource,
  addArtist,
  track,
  source,
  artist,
}) => {
  const [formData, setformData] = useState({
    songTitle: '',
    artists: [],
    sourceName: '',
    label: '',
    years: [],
    showTrack: true,
    keys: [],
    bpms: [],
    lengths: [],
    composers: [],
    producers: [],
    billboardChartPeaks: [],
    chartPeakDates: [],
    dropboxUrls: [],
  });

  useEffect(() => {
    getArtists();
    getSources();
    getTracks();
  }, [getArtists, getSources, getTracks]);

  const {
    songTitle,
    artists,
    sourceName,
    label,
    years,
    showTrack,
    keys,
    bpms,
    lengths,
    composers,
    producers,
    billboardChartPeaks,
    chartPeakDates,
    dropboxUrls,
  } = formData;

  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const sourceData = {
      artists: formData.artists,
      sourceName: formData.sourceName,
      label: formData.label,
      years: formData.years,
    };
    console.log('sourceData', sourceData);
    addSource(sourceData);
  };

  return (
    <Fragment>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Song title"
            name="songTitle"
            value={songTitle}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Artists"
            name="artists"
            value={artists}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Source"
            name="sourceName"
            value={sourceName}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Label"
            name="label"
            value={label}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Years"
            name="years"
            value={years}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="showTrack"
            name="showTrack"
            value={showTrack}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="keys"
            name="keys"
            value={keys}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="bpms"
            name="bpms"
            value={bpms}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="lengths"
            name="lengths"
            value={lengths}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="composers"
            name="composers"
            value={composers}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="producers"
            name="producers"
            value={producers}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="billboardChartPeaks"
            name="billboardChartPeaks"
            value={billboardChartPeaks}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="chartPeakDates"
            name="chartPeakDates"
            value={chartPeakDates}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="dropboxUrls"
            name="dropboxUrls"
            value={dropboxUrls}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
      </form>
    </Fragment>
  );
};

SongForm.propTypes = {
  getTracks: PropTypes.func.isRequired,
  getSources: PropTypes.func.isRequired,
  getArtists: PropTypes.func.isRequired,
  addTrack: PropTypes.func.isRequired,
  addSource: PropTypes.func.isRequired,
  addArtist: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  trackState: state.track,
  sourceState: state.source,
  artistState: state.artist,
});

export default connect(mapStateToProps, {
  getTracks,
  getSources,
  getArtists,
  addTrack,
  addSource,
  addArtist,
})(SongForm);
