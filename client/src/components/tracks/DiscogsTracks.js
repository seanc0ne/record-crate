import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TrackList from './view-all/TrackList';
import { getTracks } from '../../actions/track';
import axios from 'axios';
const BASEURL = 'https://api.discogs.com/database/search?q=';
const APIKEY =
  '&key=nxBVZyfnWIoqRtAaAjAz&secret=bFnEJXzeQAwQSpjFeucOoOXVmjQVfFXn';

function DiscogsTracks(props) {
  const [search, setSearch] = useState([]);

  const searchDiscogs = (query) => {
    // API.search(query)
    //   .then(res => this.setState({ results: res.data.data }))
    //   .catch(err => console.log(err));
    query = query.replace(' ', '+');

    fetch(
      `${BASEURL}${query}${APIKEY}`
      // baiser+summer+breeze&key=nxBVZyfnWIoqRtAaAjAz&secret=bFnEJXzeQAwQSpjFeucOoOXVmjQVfFXn
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const result = searchDiscogs(event.target.value);
    // call setState and pass in the results from fetching
    // setSearch(result.results)
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" />
      <button className="btn btn-primary mt-3">Search</button>
    </form>

    // search.map( searchResult => { <li>'stuff'</li>});
  );
}

export default DiscogsTracks;

// export default {
//   search: function(query) {
//     return axios.get(BASEURL + query + APIKEY);
//   }
// };

// const handleFormSubmit = event => {
//     event.preventDefault();
//     axios.get(BASEURL + this.state.search + APIKEY)
//       .then(res => this.setState({ results: res.data.data }))
//       .catch(err => console.log(err));
// };

//   <SearchForm
//     search={this.state.search}
//     handleFormSubmit={this.handleFormSubmit}
//     handleInputChange={this.handleInputChange}
//   />

// const DiscogsTracks = ({ getTracks, track: { tracks, loading } }) => {

//   return (
//     <Fragment>

//     </Fragment>
//   );
// };
