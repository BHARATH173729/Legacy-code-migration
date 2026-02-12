import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/new logo.png'
import { Link } from 'react-scroll';


export const Navbar = () => {
  const [sticky,setSticky] = useState(false);

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    })
  },[])





  return (
    <nav className={`contianer ${sticky? 'dark-nav' : ''}`}>
        
        <Link to="hero">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
        <ul>
            <li><Link to='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
            
            <li><Link to='about' smooth={true} offset={-150} duration={500}>About </Link></li>
            <li><Link to='contact' smooth={true} offset={-150} duration={500}>Contact </Link></li>
            
            
            <li><Link to='getstarted' smooth={true} offset={-260} duration={500} className='btn'>Get started</Link></li>
        </ul>
    </nav>
  )
}
