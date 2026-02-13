import React, { useState, useRef, useEffect } from 'react';
import Groq from "groq-sdk";
import one from "../../assets/logos/one.png";
import './Chatbot.css';

//  Load API key safely from environment
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

const systemMessage = {
  role: 'system',
  content: 'Your task is to give explanation of code provided by the user.'
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { message: "Hello, I'm your bot! Ask me about the codebase!", sender: 'ChatGPT' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('');

  const messagesEndRef = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { message: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    await processMessageToGroq([...messages, userMessage]);
  };

  async function processMessageToGroq(chatMessages) {
    const apiMessages = chatMessages.map((msg) => ({
      role: msg.sender === 'ChatGPT' ? 'assistant' : 'user',
      content: msg.message,
    }));

    try {
      const response = await groq.chat.completions.create({
        model: "llama3-8b-8192",
        messages: [systemMessage, ...apiMessages],
      });

      const botMessage = response.choices[0]?.message?.content || "No response from Groq!";
      setMessages((prev) => [...prev, { message: botMessage, sender: 'ChatGPT' }]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prev) => [
        ...prev,
        { message: 'Something went wrong. Please try again.', sender: 'ChatGPT' }
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {!isOpen && (
        <button className="toggle-button" onClick={handleToggle}>
          <img src={one} alt="Open Chatbot Icon" />
        </button>
      )}
      {isOpen && (
        <div className="chatbot-container">
          <button className="close-button" onClick={handleToggle}>
            &times;
          </button>
          <aside className="chatbot-sidebar">
            <h2>ChatBot Assistant</h2>
          </aside>
          <div className="chatbot-main">
            <div className="chatbot-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.sender}`}>
                  <p>{msg.message}</p>
                </div>
              ))}
              {isTyping && <div className="typing">Typing....</div>}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
