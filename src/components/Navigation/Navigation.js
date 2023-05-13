import React from "react";
import { Helmet } from "react-helmet";
import "./Navigation.css";

const Navigation = ({ isSignedIn, onRouteChange, route, navClass, navLinkClass }) => {
  if (isSignedIn) {
    return (
      <div className="nav-container">
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>
        <nav className={navClass}>
          <div className="nav-links">
            <p
              className={`f3 link dim black underline pa3 pointer ${navLinkClass}`}
              onClick={() => onRouteChange("instructions")}
            >
              Instructions
            </p>
            {route === "leaderboard" ? (
              <p className={`f3 link dim black underline pa3 pointer ${navLinkClass}`}>
                Leaderboard
              </p>
            ) : (
              <p
                className={`f3 link dim black underline pa3 pointer ${navLinkClass}`}
                onClick={() => onRouteChange("leaderboard")}
              >
                Leaderboard
              </p>
            )}
            {route === "home" ? (
              <p className={`f3 link dim black underline pa3 pointer ${navLinkClass}`}>
                Home
              </p>
            ) : (
              <p
                className={`f3 link dim black underline pa3 pointer ${navLinkClass}`}
                onClick={() => onRouteChange("home")}
              >
                Home
              </p>
            )}
            <p
              className={`f3 link dim black underline pa3 pointer ${navLinkClass}`}
              onClick={() => onRouteChange("signout")}
            >
              Sign Out
            </p>
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="nav-container">
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>
        <nav>
          <div className="nav-auth">
            <p
              className={`f3 link dim black underline pa3 pointer ${navLinkClass}`}
              onClick={() => onRouteChange("signin")}
            >
              Sign In
            </p>
            <p
              className={`f3 link dim black underline pa3 pointer ${navLinkClass}`}
              onClick={() => onRouteChange("register")}
            >
              Register
            </p>
          </div>
        </nav>
      </div>
    );
  }
};

export default Navigation;
