import React from "react";

const Navigation = ({ isSignedIn, onRouteChange, route }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        {route === "leaderboard" ? (
          <p className="f3 link dim black underline pa3 pointer">
            Leaderboard
          </p>
        ) : (
          <p
            className="f3 link dim black underline pa3 pointer"
            onClick={() => onRouteChange("leaderboard")}
          >
            Leaderboard
          </p>
        )}
        {route === "home" ? (
          <p className="f3 link dim black underline pa3 pointer">
            Home
          </p>
        ) : (
          <p
            className="f3 link dim black underline pa3 pointer"
            onClick={() => onRouteChange("home")}
          >
            Home
          </p>
        )}
        <p
          className="f3 link dim black underline pa3 pointer"
          onClick={() => onRouteChange("signout")}
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          className="f3 link dim black underline pa3 pointer"
          onClick={() => onRouteChange("signin")}
        >
          Sign In
        </p>
        <p
          className="f3 link dim black underline pa3 pointer"
          onClick={() => onRouteChange("register")}
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
