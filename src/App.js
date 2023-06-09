import React, { Component } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Leaderboard from './components/Leaderboard/leaderboard';
import Instructions from './components/Instructions/instructions';
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isLeaderboardVisible: false,
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries, // convert to string
      joined: data.joined
    }})
  }

  componentDidMount() {
    // Register event listener here
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  componentWillUnmount() {
    // Unregister event listener here
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  handleVisibilityChange = () => {
    this.setState({ isAnimating: !document.hidden });
  };

  calculateFaceLocation = (data) => {
    const regions = data.outputs[0].data.regions;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const boxes = regions.map(region => {
      const clarifaiFace = region.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });
    return boxes;
  }

  displayFaceBoxes = (boxes) => {
    this.setState({boxes: boxes})
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }
  
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "mubi9000",
        "app_id": "test"
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": this.state.input
            }
          }
        }
      ]
    });
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + '89c9cf1a4cfc4e41801c3a9505c26491'
      },
      body: raw
    };
  
    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data) {
          fetch('https://smart-brain-backend-8884.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
        }
        const box = this.calculateFaceLocation(data);
        this.displayFaceBoxes(box);
      })
      .catch(error => console.log('error:', error));
  }
  
  

  particlesInit = async (engine) => {
    console.log(engine);
    await loadFull(engine);
  };

  particlesLoaded = async (container) => {
    await console.log(container);
  };

  toggleLeaderboard = () => {
    this.setState(prevState => ({
      isLeaderboardVisible: !prevState.isLeaderboardVisible,
      route: 'leaderboard', // <-- add this line
    }));
  };
  
  

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true, route: route});
    } else if (route === 'instructions') { // add instructions route
      this.setState({route: route});
    } else {
      this.setState({route: route});
    }
  }
  
  render() {
    const { isSignedIn, imageUrl, route, boxes, isLeaderboardVisible } = this.state;
    let navigation;
    if (route !== 'leaderboard') {
      navigation = (
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          toggleLeaderboard={this.toggleLeaderboard}
          currentRoute={route}
        />
      );
    }
    return (
      <div className="App">
        <div className="particles-container" style={{background: 'linear-gradient(to right, rgb(213, 81, 240), rgb(2, 242, 194))'}}>
          <Particles
            className="particles"
            id="tsparticles"
            init={this.particlesInit}
            loaded={this.particlesLoaded}
            options={{
              fpsLimit: 60,
              animation: {
                enable: this.state.isAnimating,
              },
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: 'push',
                  },
                  onHover: {
                    enable: true,
                    mode: 'repulse',
                  },
                },
                modes: {
                  push: {
                    particles_nb: 4,
                  },
                },
              },
              particles: {
                number: {
                  value: 80,
                  density: {
                    enable: true,
                    value_area: 800,
                  },
                },
                color: {
                  value: '#ffffff',
                },
                shape: {
                  type: 'circle',
                  stroke: {
                    width: 0,
                    color: '#000000',
                  },
                  polygon: {
                    nb_sides: 5,
                  },
                  image: {
                    src: 'img/github.svg',
                    width: 100,
                    height: 100,
                  },
                },
                opacity: {
                  value: 0.5,
                  random: false,
                  anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false,
                  },
                },
                size: {
                  value: 3,
                  random: true,
                  anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false,
                  },
                },
                line_linked: {
                  enable: true,
                  distance: 150,
                  color: '#ffffff',
                  opacity: 0.4,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 4, // set a fixed speed value
                  direction: 'none',
                  random: false,
                  straight: false,
                  out_mode: 'out',
                  bounce: false,
                  attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200,
                  },
                },
              },
              detectRetina: true,
            }}
          />
        </div>
        <div className="content">
          {navigation}
          {route === 'home'
            ? <div>
                <Logo />
                <Rank
                  name={this.state.user.name}
                  entries={this.state.user.entries}
                />
                <ImageLinkForm
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition
                  imageUrl={imageUrl}
                  boxes={boxes}
                />
              </div>
            : (
              route === 'signin'
              ? <Signin loadUser={
                  this.loadUser} onRouteChange={this.onRouteChange} />
            : (
              route === 'register'
              ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : (route === 'instructions') // add instructions route
                ? <Instructions onRouteChange={this.onRouteChange} />
                : <Leaderboard isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
             )
           )
         }
        </div>
      </div>
    );
  }
} 

export default App;

// name={this.state.user.name} entries={this.state.user.entries}