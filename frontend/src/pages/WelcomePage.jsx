import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear("User");
    navigate("/");
  };
  const data = localStorage.getItem("User");
  const user = JSON.parse(data);
  console.log(user);
  return (
    <div className="welcome-page">
      <div className="welcome-page-header">
        <h3>{user?.firstName.toUpperCase()}</h3>
        <button className="log-out" onClick={logOut}>
          Log out
        </button>
      </div>

      <h1>About The Project</h1>
      <p>
        This is an application showcasing Lenity Stephen skill on building
        <b>sign up and login authentication</b> using both
        <b> front end and backend languages.</b>
      </p>
      <p> Below are the languages and libraries use for this project:</p>
      <div className="skill-list">
        <h3>Backend</h3>
        <ol>
          <li>Node</li>
          <li>Express</li>
          <li>GraphQl</li>
          <li>Crypto Js</li>
          <li>MongoDb</li>
          <li>Cors</li>
        </ol>
        <h3>Frontend</h3>
        <ol>
          <li>JavaScript</li>
          <li>React JS</li>
          <li>React-router-dom</li>
          <li>Apollo Client</li>
          <li>React-Toastify</li>
          <li>GraphQl</li>
        </ol>
      </div>
    </div>
  );
};

export default WelcomePage;
