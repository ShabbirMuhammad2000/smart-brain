import React from "react";
import Navigation from "../Navigation/Navigation";
import "./leaderboard.css";

class Leaderboard extends React.Component {
  state = {
    leaderboardData: [],
  };

  componentDidMount() {
    // fetch leaderboard data and update state
    fetch("https://smart-brain-backend-8884.onrender.com/leaderboard")
      .then((response) => response.json())
      .then((data) => this.setState({ leaderboardData: data }))
      .catch((error) => console.error("unable to get leaderboard", error));
  }

  onRouteChange = (route) => {
    this.props.onRouteChange(route);
  };

  render() {
    const { leaderboardData } = this.state;
    return (
      <div>
        <Navigation
          isSignedIn={true}
          onRouteChange={this.onRouteChange}
          route="leaderboard"
          navClass="leaderboard-nav"
        />
        <h1>Leaderboard</h1>
        <table>
          <thead>
            <tr>
              <th className="rank">Rank</th>
              <th className="name">Name</th>
              <th className="entries">Entries</th>
              <th className="Date">Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((item, index) => (
              <tr key={item.name}>
                <td className="rank">{index + 1}</td>
                <td className="name">{item.name}</td>
                <td className="entries">{item.entries}</td>
                <td className="date">{item.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Leaderboard;
