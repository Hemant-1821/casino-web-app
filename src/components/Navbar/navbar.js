import React from 'react';

const navbar = () => {
    return(
    <nav className="navbar background-dark justify-content-between">
        <div className="container">
        <a className="navbar-brand text-white" href="/">CASINO</a>
        <div className="d-flex flex-row">
            <a className="nav-link text-white" href="/">Trading</a>
            <a className="nav-link text-white" href="/game">Play Game</a>
        </div>
        </div>
    </nav>
    )
}

export default navbar;