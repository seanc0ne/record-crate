import React, { Fragment, useEffect, useState } from 'react';
import {Redirect} from 'react-router-dom'
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

  const searchDiscogs = async (query) => {
    // API.search(query)
    //   .then(res => this.setState({ results: res.data.data }))
    //   .catch(err => console.log(err));
    query = query.replace(' ', '+');

    const response = await fetch(
      `${BASEURL}${query}${APIKEY}`
      // baiser+summer+breeze&key=nxBVZyfnWIoqRtAaAjAz&secret=bFnEJXzeQAwQSpjFeucOoOXVmjQVfFXn
    );
    
    const data = await response.json();
    return data;

    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (data) {
    //     return data;
    //   });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let searchTerm = event.target.children[0].value;

    const result = await searchDiscogs(searchTerm);
    // // call setState and pass in the results from fetching
    let results = result.results
    setSearch(search.push(results[0]))
    console.log("You searched: ", searchTerm)
    console.log("Value of 'search' in state")
    console.log(search)
  };

  return (
      <div>
        <form onSubmit={handleFormSubmit}>
        <input type="text" />
        <div className='dashLeftSearchDiscog'>Search Discogs</div>
        <button className="btn btn-primary mt-3">Search</button>
        </form>
        

        {/* <ul>
            {results.map(item => (
                <li>{item}</li>
            ))}
        </ul>
        {/* <button className='btn btn primary mt-3' onClick={()=> window.location.pathname.replace('/dashboard', '/add-track')}>Add Record</button> */}
    </div>
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
