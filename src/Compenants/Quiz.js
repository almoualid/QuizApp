import React, { useState } from 'react';

const QuizApp = () => {
  const questions = [
    {
      question: 'Quelle est la Capital du France ?',
      options: [
        { label: 'Berlin', value: 'Berlin' },
        { label: 'Paris', value: 'Paris' },
        { label: 'Londres', value: 'Londres' },
        { label: 'Madrid', value: 'Madrid' },
      ],
      correctAnswers: ['Paris'],
    },
    {
      question: 'Quelles sont les planètes les plus proches du soleil ?',
      options: [
        { label: 'Vénus', value: 'Vénus' },
        { label: 'Terre', value: 'Terre' },
        { label: 'Mercure', value: 'Mercure' },
        { label: 'Mars', value: 'Mars' },
      ],
      correctAnswers: ['Mercure'],
    },
    {
      question: 'Quel est le club le plus titrés du Monde',
      options: [
        { label: 'Real Madrid', value: 'Real Madrid' },
        { label: 'Fc Barcelone', value: 'Fc Barcelone' },
        { label: 'Ahly Fc', value: 'Ahly Fc' },
        { label: 'AC Milan', value: 'AC Milan' },
      ],
      correctAnswers: ['Real Madrid'],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill([]));

  const handleCheckboxChange = (optionValue) => {
    const currentAnswers = userAnswers[currentQuestion];
    const updatedAnswers = [...userAnswers];
    if (currentAnswers.includes(optionValue)) {
      updatedAnswers[currentQuestion] = currentAnswers.filter((value) => value !== optionValue);
    } else {
      updatedAnswers[currentQuestion] = [...currentAnswers, optionValue];
    }
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      const correctAnswers = question.correctAnswers.sort();
      const userSelection = userAnswers[index].sort();

      if (JSON.stringify(correctAnswers) === JSON.stringify(userSelection)) {
        score++;
      }
    });
    return score;
  };

  const isQuizFinished = currentQuestion === questions.length;

  return (
    <div>
      {isQuizFinished ? (
        <div>
          <h2>Quiz terminé !</h2>
          <p>Votre score est de {calculateScore()} sur {questions.length}.</p>
        </div>
      ) : (
        <div>
          <h2>Question {currentQuestion + 1}</h2>
          <p>{questions[currentQuestion].question}</p>
          <ul>
            {questions[currentQuestion].options.map((option) => (
              <li key={option.value}>
                <input
                  type="radio"
                  id={option.value}
                  checked={userAnswers[currentQuestion].includes(option.value)}
                  onChange={() => handleCheckboxChange(option.value)}
                />
                <label htmlFor={option.value}>{option.label}</label>
              </li>
            ))}
          </ul>
          <button onClick={handleNextQuestion}>Question suivante</button>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
