import React, { useState } from 'react';
import './CodeConverter.css';
import { convertCode, debugCode, optimizeCode, explainCode } from '../../services/api.js';
import { generateExplanationPDF } from '../../Components/generateExplanationPDF/generateExplanationPDF.jsx'; // Import the new PDF generation function
import { useLocation } from 'react-router-dom';
import { franc } from 'franc-min'; 



const CodeConverter = () => {

  const [sourceCode, setSourceCode] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('Natural Language');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // State for handling errors
  const [outputFormat, setOutputFormat] = useState('PDF'); // State to select output format
  const location = useLocation();

  const languages = [
     'Java', 'Cobol'
  ];

  // const handleConvert = async () => {
  //   setLoading(true);
  //   setError('');
  //   try {
  //     const convertedCode = await convertCode({ sourceCode, targetLanguage });
  //     setResult(convertedCode);
  //   } catch (error) {
  //     setError('Failed to convert the code.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  const handleConvert = async () => {
    setLoading(true);
    setError('');
  
    try {
      // Check if the source code is blank
      if (!sourceCode.trim()) {
        throw new Error('Please provide the code.');
      }

      // Detect the language of the source code using franc-min
      const detectedLanguage = franc(sourceCode);
      
      // Check if the detected language is COBOL
      if (detectedLanguage !== 'eng') { // Adjust 'eng' to the appropriate code for COBOL if needed
        throw new Error('The pasted code is not COBOL. Please paste COBOL code only.');
      }
      
      // Proceed with the code conversion if the language is COBOL
      const convertedCode = await convertCode({ sourceCode, targetLanguage });
      setResult(convertedCode);
  
    } catch (error) {
      // Handle error
      setError(error.message || 'Failed to convert the code.');
    } finally {
      setLoading(false);
    }
};

  const handleDebug = async () => {
    setLoading(true);
    setError('');
    try {
      const debuggedCode = await debugCode(sourceCode);
      setResult(debuggedCode);
    } catch (error) {
      setError('Failed to debug the code.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptimize = async () => {
    setLoading(true);
    setError('');
    try {
      const optimizedCode = await optimizeCode(sourceCode);
      setResult(optimizedCode);
    } catch (error) {
      setError('Failed to optimize the code.');
    } finally {
      setLoading(false);
    }
  };

  const handleExplain = async () => {
    setLoading(true);
    setError('');
    try {
      // First, convert the code
      const convertedCode = await convertCode({ sourceCode, targetLanguage });
  
      // Now, explain the converted code
      const explanation = await explainCode(convertedCode);
  
      setResult(explanation);
  
      // Handle the chosen output format
      if (outputFormat === 'PDF') {
        // Generate and download PDF
        generateExplanationPDF(explanation);
      } else {
        // Handle Notepad format
        const blob = new Blob([explanation], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'code_explanation.txt';
        link.click();
      }
    } catch (error) {
      setError('Failed to explain the code.');
    } finally {
      setLoading(false);
    }
  };
  const isCodeConverterPage = location.pathname === '/converter';
  

  // Generate line numbers based on the number of lines in sourceCode
  const lineNumbers = Array.from({ length: sourceCode.split('\n').length }, (_, i) => i + 1);

  return (
    
    <div className="code-converter">
      <h1></h1>
      <div className="converter-container">
        <div className="language-select">
          <label>Target Program Language</label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="">-- Select --</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div className="language-select">
          <label>Your Program Language</label>
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
          >
            <option value="Natural Language">Natural Language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* <div className="code-editor">
          <div className="line-numbers">
            {lineNumbers.map((number) => (
              <span key={number}>{number}</span>
            ))}
          </div>
          <textarea
            placeholder="Enter your code here..."
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
          />
        </div> */}
        <div className="code-editor">
  <div
    className="line-numbers"
    id="line-numbers"
    style={{ overflowY: 'hidden' }} // Prevent scrollbar in line numbers
  >
    {lineNumbers.map((number) => (
      <span key={number}>{number}</span>
    ))}
  </div>
  <textarea
    placeholder="Enter your code here..."
    value={sourceCode}
    onChange={(e) => setSourceCode(e.target.value)}
    onScroll={(e) => {
      document.getElementById('line-numbers').scrollTop = e.target.scrollTop;
    }} // Synchronize scrolling
  />
</div>


        <div className="buttons">
          <button onClick={handleConvert}>Convert</button>
          <button onClick={handleDebug}>Debug</button>
          {/* <button onClick={handleOptimize}>Optimize</button> */}
          <button onClick={handleExplain}>Documentation</button>
        </div>

        <div className="result">
          {loading ? <p>Loading...</p> : <pre>{error || result}</pre>}
        </div>

        {/* Output format selection */}
        <div className="output-format">
          <label>Choose Output Format:</label>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
          >
            <option value="PDF">PDF</option>
            <option value="Notepad">Notepad</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CodeConverter;  
