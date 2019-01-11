import React from 'react';
import { NavLink } from 'react-router-dom';

const Logo = () => (
  <a className="navbar-brand" href="/">
    <i className="fas fa-dice-d20" />
    {' Tomoroll'}
  </a>
);

const HamburgerBtn = () => (
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarCollapse"
    aria-controls="navbarCollapse"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon" />
  </button>
);

const NavSections = () => (
  <div className="collapse navbar-collapse" id="navbarCollapse">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/" exact activeClassName="active">
          <i className="fas fa-home" />
          {' Home'}
          <span className="sr-only">(current)</span>
        </NavLink>
      </li>
      {/*<li className="nav-item">*/}
        {/*<NavLink className="nav-link" to="/coin-flip" activeClassName="active">*/}
          {/*<i className="fas fa-coins" />*/}
          {/*{' Flip a coin'}*/}
        {/*</NavLink>*/}
      {/*</li>*/}
      <li className="nav-item">
        <a
          className="nav-link"
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github-alt" />
          {' About'}
        </a>
      </li>
    </ul>
  </div>
);

const Headers = () => (
  <header>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <Logo />
      <HamburgerBtn />
      <NavSections />
    </nav>
  </header>
);

export default Headers;
