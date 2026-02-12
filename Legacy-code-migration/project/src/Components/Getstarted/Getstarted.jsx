import React from 'react';
import './Getstarted.css';
import { useNavigate } from 'react-router-dom';

const Getstarted = () => {
  const navigate = useNavigate();
  
  return (
    <div className='getstarted'>
      <div className="get-right">
        <p>
          Welcome to your new Chatbot Assistant! Our platform is designed to help you transform your coding questions and challenges into clear, understandable documentation and explanations. Whether you’re a beginner seeking guidance or an experienced developer looking for quick insights, our chatbot is here to assist you every step of the way.
        </p>

        <h2>Here’s How to Get Started:</h2>

        <p>
          <strong>Open the Chatbot:</strong> Click the chat icon to open the chatbot interface. You can ask questions or paste code snippets for assistance.
        </p>

        <p>
          <strong>Ask Your Questions:</strong> Type in your queries related to coding, documentation, or any programming concepts. The chatbot is trained to understand a variety of topics and provide helpful responses.
        </p>

        <p>
          <strong>Paste Your Code:</strong> If you have specific code that needs documentation or explanation, paste it directly into the chat. Our chatbot will analyze it and generate clear, formatted documentation with correct indentation.
        </p>

        <p>
          <strong>Receive Tailored Responses:</strong> Expect concise and informative replies. The chatbot adapts to your inquiries, offering explanations that fit your skill level and the context of your questions.
        </p>

        <p>
          <strong>Explore Further:</strong> Feel free to ask follow-up questions for deeper insights. Our chatbot is designed to maintain context and engage in meaningful dialogue.
        </p>

        <p>
          <strong>Feedback and Support:</strong> Your feedback is valuable! If you encounter any issues or have suggestions for improvement, don’t hesitate to reach out to our support team.
        </p>
      </div>
      <div className='hello'>
      <button className="btnn" onClick={() => navigate('/code-converter')}>
          Start Now
        </button>
      </div>
    </div>
  );
}

export default Getstarted;
