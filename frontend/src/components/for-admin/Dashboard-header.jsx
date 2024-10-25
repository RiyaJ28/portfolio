import React from "react";

function DashboardHeader(props) {
  return (
    <nav className="navbar sticky-top bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler nav-hide"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand color-black" href="/dashboard">
          Admin Panel
        </a>
        <div className="d-flex">
          <a>
            <img src="" alt="text"></img>
            <p>{props.name}</p>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default DashboardHeader;
