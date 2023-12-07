import React from "react";
import { Link, useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear("User");
    navigate("/");
  };
  const data = localStorage.getItem("User");
  const user = JSON.parse(data);
  return (
    <>
      <div className="container-fluid welcome-container">
        <div className="container- nav-bar">
          <div className="nav-logo">
            <Link>LOGO</Link>
          </div>
          <div className="nav-links">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="https://github.com/LightUpdev">Github</Link>
              </li>
              <li>
                <Link to="#stack">Stack</Link>
              </li>
            </ul>
          </div>
          <div className="user-action">
            <div className="user-name">{user?.firstName}</div>
            <div className="log-out">
              <div className="btn btn-primary" onClick={() => logOut()}>
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
