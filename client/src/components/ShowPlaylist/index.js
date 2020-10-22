import React from 'react'
import { useParams } from 'react-router-dom'

const ShowPlaylist = () => {
  let { id } = useParams()

  return (
    <div className="playlistPage">
      <div className="mainInner">
        <div className="playlistPageInfo">
          <div className="playlistPageImage">
            {/* <img
              src="https://images.unsplash.com/photo-1587201572498-2bc131fbf113?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=924&q=80"
              alt="pic"
            /> */}
          </div>
          <div className="playlistPageContent">
            <p className="smallText uppercase bold">Playlist</p>
            <h1>seedData</h1>

            <p className="tagline">
              Records used as seed data for this project.
            </p>
            <div className="playlistPageDesc">
              <p className="recordCrate">Record Crate</p>
              <span>1,699,428 likes</span>
              <span>1hr 55 min</span>
            </div>
          </div>
        </div>

          <ul className="songList">
            <li>
              <div className="songDetails">
                <h3>Cruel Summer</h3>
                <span>Bananarama</span>
              </div>
              <div className="songTime">
                <span>4:55</span>
              </div>
            </li>
            <li>
              <div className="songDetails">
                <h3>Girls on Film (Night Version)</h3>
                <span>Duran Duran</span>
              </div>
              <div className="songTime">
                <span>5:31</span>
              </div>
            </li>
            <li>
              <div className="songDetails">
                <h3>My Baby's Baby</h3>
                <span>Liquid Gold</span>
              </div>
              <div className="songTime">
                <span>6:40</span>
              </div>
            </li>
            <li>
              <div className="songDetails">
                <h3>Breakdance (Extended Remix)</h3>
                <span>Irene Cara</span>
              </div>
              <div className="songTime">
                <span>5:24</span>
              </div>
            </li>
            <li>
              <div className="songDetails">
                <h3>Leave in Silence (Longer)</h3>
                <span>Depeche Mode</span>
              </div>
              <div className="songTime">
                <span>6:29</span>
              </div>
            </li>
            <li>
              <div className="songDetails">
                <h3>What I Want (Dance Mix)</h3>
                <span>Dead Or Alive</span>
              </div>
              <div className="songTime">
                <span>4:07</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
  )
}

export default ShowPlaylist;