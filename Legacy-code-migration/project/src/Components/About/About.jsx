import React from 'react'
import './About.css'
import about_img from '../../assets/scemhero.png'
import play_icon from '../../assets/play-icon.png'

const About = () => {
  return (
    <div className='about'>
        <div className="about-left">
            <img src={about_img} alt="" className='about-img' />
            <img src={play_icon} alt="" className='play-icon' />
        </div>
        <div className="about-right">
            <h3>ABOUT </h3>
        <h2>Transforming Yesterday’s Code for Tomorrow’s Success</h2>
        <p>Welcome to our Legacy Code Migration solution! In today’s fast-paced digital world, keeping software systems up-to-date is essential for maximizing efficiency, scalability, and maintainability. We specialize in transforming legacy codebases—such as those built with Delphi, Cobol, and VB—into modern, adaptable programming languages like C#, Java, and Python.</p> 
            <p>Our approach is driven by cutting-edge generative AI technology, which enables us to automate the conversion of outdated code into new, optimized frameworks. Our tools not only streamline the migration process but also maintain accuracy, reduce costs, and significantly minimize manual effort. With years of experience, our team of dedicated engineers, QA experts, and AI specialists work collaboratively to ensure each migration project is customized to meet your specific needs.</p>
                
                 
             
            


        </div>
      
    </div>
  )
}

export default About
