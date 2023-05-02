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
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
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
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
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
        this.setState({ box });
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

 onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const {isSignedIn, imageUrl, route, user, box} = this.state
    return (
      <div className="App">
        <div
          className="particles-container"
          style={{
            background:
              'linear-gradient(to right, rgb(213, 81, 240), rgb(2, 242, 194))',
          }}
        >
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
                    quantity: 4,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: '#ffffff',
                },
                links: {
                  color: '#ffffff',
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                collisions: {
                  enable: true,
                },
                move: {
                  directions: 'none',
                  enable: true,
                  outModes: {
                    default: 'bounce',
                  },
                  random: false,
                  speed: 3,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 800,
                  },
                  value: 80,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: 'circle',
                },
                size: {
                  value: { min: 1, max: 5 },
                },
              },
              detectRetina: true,
            }}
          />
        </div>
        <div className="content">
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          { route === 'home' 
            ? <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <ImageLinkForm
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition box={box} imageUrl={imageUrl} />
             </div> 
             : (
              route === 'signin' 
              ?<Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
              :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             )
             
            }
          </div>
       </div>
      );
    }
} 

export default App;

// name={this.state.user.name} entries={this.state.user.entries}