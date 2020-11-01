import React, { Fragment, useEffect, useState } from 'react';
// import { Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import TrackList from './view-all/TrackList';
// import { getTracks } from '../../actions/track';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
const BASEURL = 'https://api.discogs.com/database/search?q=';
const APIKEY =
  '&key=nxBVZyfnWIoqRtAaAjAz&secret=bFnEJXzeQAwQSpjFeucOoOXVmjQVfFXn';

function DiscogsTracks(props) {
  const [searchResult, setSearchResult] = useState({
    title: null,
    imageSource: null
  });

  const searchDiscogs = async (query) => {
    query = query.replace(' ', '+');

    const response = await fetch(
      `${BASEURL}${query}${APIKEY}`
    );

    const data = await response.json();
    return data;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let searchTerm = event.target.children[0].value;

    const result = await searchDiscogs(searchTerm);
    // // call setState and pass in the results from fetching
    let results = result.results;
    let searchResult = {
      title: results[0].title,
      imageSource: results[0].thumb
    };
    setSearchResult(searchResult);
    console.log(results);
  };

  return (
    <div className="my-3">
      <form className="d-inline" onSubmit={handleFormSubmit}>
        <input className="p-1" type="text" placeholder="Search Discogs ..." />
        <button className="btn">
          <i class="fas fa-search"></i>
        </button>
      </form>
      {/* div with the search result (thumb) */}
      {searchResult.title && 
      <div>
        <h3>{searchResult.title}</h3>
        <img src={searchResult.imageSource} />
      </div>
      }
    </div>
  );
}

export default DiscogsTracks;

