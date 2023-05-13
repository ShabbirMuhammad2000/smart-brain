import React from "react";
import { Helmet } from "react-helmet";
import "./instructions.css";
import Navigation from "../Navigation/Navigation";



class Instructions extends React.Component {

  onRouteChange = (route) => {
    this.props.onRouteChange(route);
  };

    render() {
      return (
        <div className="instructions-container">
          <Helmet>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Helmet>
          <div className="instructions-nav">
          <Navigation 
            isSignedIn={true}
            onRouteChange={this.onRouteChange}
            route="instructions"
            navClass="nav-links"
          />
          </div>
          <h1 className="title">Face Detection Website Instructions</h1>
          <p>
            To use the face detection website, follow these steps:
          </p>
          <ol>
            <li>
              Go to any website that has an image with faces, and right-click on the image.
            </li>
            <li>
              Select "Copy Image Address" from the context menu.
            </li>
            <li>
              Navigate to the face detection website and look for the input tab where you can paste the image URL.
            </li>
            <li>
              Paste the copied image URL into the input tab.
            </li>
            <li>
              Click on the "Detect" button to analyze the image for facial features.
            </li>
            <li>
              The website will draw a border around the detected face area in the image.
            </li>
            <li>
              Once you are finished, you can either try detecting facial features on another image by repeating the process above, or you can close the tab or sign out of the website to exit.
            </li>
          </ol>
          <h2>Video Tutorial:</h2>
          <iframe width="560" height="315" src="https://youtu.be/eJPWhEogSsI" title="Face Detection Tutorial" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
       </div>
    );
  }
}

export default Instructions;
