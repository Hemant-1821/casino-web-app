import React from 'react';

const navbar = () => {
    return(
    <nav className="navbar navbar-light bg-light justify-content-between">
        <div className="container">
        <a className="navbar-brand" href="/">Casino</a>
        <div className="d-flex flex-row">
            <a className="nav-link active" href="/">Trading</a>
            <a className="nav-link" href="/game">Play Game</a>
        </div>
        </div>
    </nav>
    )
}

export default navbar;