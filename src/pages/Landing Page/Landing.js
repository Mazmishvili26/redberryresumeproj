import React from "react";
import "./Landing.css";

// import assets
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing-section">
      <div className="landing-header">
        <img src={logo} />
      </div>
      <div className="landing-btn-container">
        <Link to="/create">
          <button className="add-resume-btn">რეზიუმეს დამატება</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
