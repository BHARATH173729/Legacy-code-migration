import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Title from './Components/Title/Title';
import About from './Components/About/About';
import Campus from './Components/Campus/Campus';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import Getstarted from './Components/Getstarted/Getstarted';
import Chatbot from './Components/Chatbot/Chatbot';
import CodeConverter from './Components/CodeConverter.js/CodeConverter';


export const App = () => {
  return (
    <Router>
      <Navbar />
      <Chatbot />
      <Routes>
        {/* Home Page Route */}
        <Route
          path="/"
          element={
            <div>
              <Hero />
              <div className="container">
                <About />
                <Title subTitle="Languages" title="Code Supported" />
                <Campus />
                <Title subTitle="Get Started" title="Begin Your Transformation" />
                <Getstarted />
                <Title subTitle="Contact Us" title="Get in Touch" />
                <Contact />
                <Footer />
              </div>
            </div>
          }
        />

        {/* CodeConverter Page Route */}
        <Route path="/code-converter" element={<CodeConverter/>} />
      </Routes>
    </Router>
  );
};

export default App;





