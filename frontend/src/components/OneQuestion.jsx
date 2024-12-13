import React, { useState } from 'react';
const OneQuestion = () => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setApiResponse(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/gpt/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>GPT API Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="inputText">Введите текст:</label>
        <input
          type="text"
          id="inputText"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        {inputText.trim() !== '' && (
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Отправка..." : "Отправить"}
          </button>
        )}
      </form>

      {isLoading && <p>Обработка запроса...</p>}
      {error && <p style={{ color: 'red' }}>Ошибка: {error.message}</p>}
      {apiResponse && (
        <div>
          <h2>Ответ от API:</h2>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
export default OneQuestion