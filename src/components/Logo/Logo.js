import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './icons8-brain-100.png'
import './Logo.css'

const Logo = () => {
  return(
    <div className="ma4 mt0">
      <Tilt className="Tilt br2 shadow-2" style={{ height: '150px', width: '150px'}}>
        <div className="Tilit-inner pa1" style={{ height: '150px', width: '150px'}}>
          <h1><img alt='logo' src={brain}/></h1>
        </div>
    </Tilt>
    </div>
  )
}

export default Logo