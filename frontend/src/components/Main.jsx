import React, { useState } from 'react';
import OneQuestion from './OneQuestion';
import ManyQuestion from './ManyQuestion'

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
    <div>
      <button onClick={handleSingleInputClick}>Показать один input</button>
      <button onClick={handleMultipleQuestionsClick}>Показать вопросы</button>

      {showSingleInput && <OneQuestion />}
      {showMultipleQuestions && <ManyQuestion />}
    </div>
  );
}

export default Main;