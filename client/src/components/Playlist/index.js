import React from 'react';
import { Link } from 'react-router-dom';

const Playlists = props => {
    console.log(props.limiter)
    const dataPlaylists = [
        {
            id: 103,
            category_id: 3,
            name: 'Run, Sandrine, Run!',
            desc: 'Lorem ipsum',
        },
        {
            id: 104,
            category_id: 1,
            name: 'Fire Island Electro Disco',
            desc: 'Lorem ipsum',
        },
        {
            id: 105,
            category_id: 4,
            name: 'Disco 1980-1983',
            desc: 'Lorem ipsum',
        },
        {
            id: 106,
            category_id: 2,
            name: 'Morning Music',
            desc: 'Lorem ipsum',
        },
        {
            id: 107,
            category_id: 2,
            name: 'Giorgio Moroder',
            desc: 'Lorem ipsum',
        },
    ]
    let matchedPlaylists = dataPlaylists
        .filter(playlist => playlist.category_id === props.category_id)
        .slice(0, props.limiter)

    return (
        <div className="cardsWrapInner">
            {matchedPlaylists.map((playlist, id) => (
                <Link to={`/playlist/` + playlist.id} key={id}>
                    <div className="card" key={id}>
                        <div className="cardImage">
                            <img src={playlist.img} alt="Pic 1" />
                        </div>
                    <div className="cardContent">
                        <h3>{playlist.name}</h3>
                        <span>{playlist.desc}</span>
                    </div>
                </div>
            </Link>
        ))}
    </div>
  )
};

export default Playlists;