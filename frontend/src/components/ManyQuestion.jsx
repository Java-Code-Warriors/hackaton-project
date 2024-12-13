import React, { useState } from "react";
const ManyQuestion = () => {
    const [gender, setGender] = useState('');
    const [budget, setBudget] = useState('');
    const [purpose, setPurpose] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [serverResponse, setServerResponse] = useState(null);
    const [error, setError] = useState(null);
  
    const genderOptions = [
      { value: 'М', label: 'Мужской' },
      { value: 'Ж', label: 'Женский' },
    ];
  
    const budgetOptions = [
      { value: 'До 2000', label: 'До 2000' },
      { value: 'До 7000', label: 'До 7000' },
      { value: 'До 15000', label: 'До 15000' },
      { value: 'Более 15000', label: 'Более 15000' },
    ];
  
    const purposeOptions = [
      { value: 'Гаджеты', label: 'Гаджеты' },
      { value: 'Для дома', label: 'Для дома' },
      { value: 'Для учебы/офиса', label: 'Для учебы/офиса' },
      { value: 'Игры и аксессуары', label: 'Игры и аксессуары' },
    ];
  
    const handleGenderChange = (e) => setGender(e.target.value);
    const handleBudgetChange = (e) => setBudget(e.target.value);
    const handlePurposeChange = (e) => setPurpose(e.target.value);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      setServerResponse(null);
  
      try {
        const response = await fetch('http://127.0.0.1:8000/api/gpt/quest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ gender, budget, purpose }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        setServerResponse(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Какой у вас пол?</label>
            {genderOptions.map((option) => (
              <div key={option.value}>
                <input
                  type="radio"
                  id={option.value}
                  name="gender"
                  value={option.value}
                  checked={gender === option.value}
                  onChange={handleGenderChange}
                />
                <label htmlFor={option.value}>{option.label}</label>
              </div>
            ))}
          </div>
  
          <div>
            <label>Какой у вас бюджет?</label>
            {budgetOptions.map((option) => (
              <div key={option.value}>
                <input
                  type="radio"
                  id={option.value}
                  name="budget"
                  value={option.value}
                  checked={budget === option.value}
                  onChange={handleBudgetChange}
                />
                <label htmlFor={option.value}>{option.label}</label>
              </div>
            ))}
          </div>
  
          <div>
            <label>Для чего подарок?</label>
            {purposeOptions.map((option) => (
              <div key={option.value}>
                <input
                  type="radio"
                  id={option.value}
                  name="purpose"
                  value={option.value}
                  checked={purpose === option.value}
                  onChange={handlePurposeChange}
                />
                <label htmlFor={option.value}>{option.label}</label>
              </div>
            ))}
          </div>
  
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Отправка...' : 'Отправить'}
          </button>
        </form>
  
        {isLoading && <p>Отправка данных на сервер...</p>}
        {error && <p style={{ color: 'red' }}>Ошибка: {error.message}</p>}
        {serverResponse && (
          <div>
            <h2>Ответ от сервера:</h2>
            <pre>{JSON.stringify(serverResponse, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  };
export default ManyQuestion;