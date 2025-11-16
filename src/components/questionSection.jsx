import React, { useContext } from 'react'
import { QuizContext } from '../context/context.js'
import { questions } from '../questionbank.jsx'
import './QuestionAnswer.css'

function QuestionSection() {
  const currentQuestion = useContext(QuizContext).currentQuestion;
  return (
      <div className='question-section'>
        <div className='question-count'>
          <h1>{currentQuestion + 1}.</h1>
        </div>

        <div className='question-text'>
          {questions[currentQuestion].questionText}
        </div>
      </div>
  ) 
}

export default QuestionSection

