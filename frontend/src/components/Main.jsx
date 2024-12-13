import React, { useState } from 'react';
import OneQuestion from './OneQuestion';
import ManyQuestion from './ManyQuestion'
import '../css/main.css'

function Main() {
  const [showSingleInput, setShowSingleInput] = useState(false);
  const [showMultipleQuestions, setShowMultipleQuestions] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const handleSingleInputClick = () => {
    setShowSingleInput(true);
    setShowMultipleQuestions(false);
  };

  const handleMultipleQuestionsClick = () => {
    setShowMultipleQuestions(true);
    setShowSingleInput(false);
  };

  return (
    <main>
      <div className="buttons">
      <button onClick={handleSingleInputClick}>Показать один input</button>
      <button onClick={handleMultipleQuestionsClick}>Показать вопросы</button>
      </div>
      {showSingleInput && <OneQuestion />}
      {showMultipleQuestions && <ManyQuestion />}
    </main>
  );
}

export default Main;