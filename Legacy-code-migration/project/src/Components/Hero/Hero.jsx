import React from 'react'
import './Hero.css'
import dark_arrow from '../../assets/dark-arrow.png'

import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <div className='hero contianer'>
        <div className="hero-text">
            <h1>We Transform Legacy Code for a Future-Ready World</h1>
            <p>Our AI-driven solutions modernize outdated systems, enabling businesses to stay agile, efficient, and secure in an ever-evolving tech landscape.</p>
            <Link to='about' smooth={true} offset={-150} duration={500}>    <button className='btn'> Explore more <img src={dark_arrow} alt="" /></button></Link>
        </div>
      
    </div>
  )
}

export default Hero


