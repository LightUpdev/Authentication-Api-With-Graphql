import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { navItem } from "../../src/constants";
import { HiMenuAlt4, HiX } from "react-icons/hi";

const WelcomePage = ({ props }) => {
  const navigate = useNavigate();

  // log-out function
  const logOut = () => {
    localStorage.clear("User");
    navigate("/");
    props.setMenuToggle(false);
  };

  // fetch data from local storage
  const data = localStorage.getItem("User");
  const user = JSON.parse(data);
  return (
    <>
      <div className="container-fluid welcome-container" >
        <div className="container welcome" >
          <div className="nav-logo">
            <Link>LOGO</Link>
          </div>
          {!props.menuToggle && (
            <div className="nav-links-lg">
              <ul>
                {navItem.map((link) => {
                  const { id, url, linkName } = link;
                  return (
                    <li key={id}>
                      <Link to={url}>{linkName}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <div className="user-action">
            <div className="user-name">{user?.firstName}</div>
            <div className="log-out">
              <div className="btn btn-primary" onClick={() => logOut()}>
                Logout
              </div>
            </div>
          </div>
          {/* menuToggle for smaller screen */}
          <div className="mobile-side-screen">
            {!props.menuToggle && (
              <div className="hamburger">
                <HiMenuAlt4
                  onClick={() => {
                    props.setMenuToggle(true);
                  }}
                />
              </div>
            )}

            {props.menuToggle && (
              <motion.div
                whileInView={{ x: [200, 150] }}
                transition={{ duration: 0.85, ease: "easeOut" }}
              >
                <div className="side-bar-wrapper">
                  <h5 className="mobile-user-name">{user?.firstName}</h5>

                  <div className="side-bar-close-icon">
                    <HiX
                      onClick={() => {
                        props.setMenuToggle(false);
                      }}
                    />
                  </div>
                  <div className="nav-links">
                    <ul>
                      {navItem.map((link) => {
                        const { id, url, linkName } = link;
                        return (
                          <li key={id}>
                            <Link to={url}>{linkName}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="mobile-user-action">
                    <div className="mobile-log-out">
                      <div className="btn btn-primary" onClick={() => logOut()}>
                        Logout
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
