import React, { useContext } from 'react'
import { QuizContext } from '../context/context.js';
import './questionTracker.css'

function QuestionTracker() {

    const { currentQuestion, totalQuestions, answerResults } = useContext(QuizContext);

    // creates an array from 0 to totalQuestions -1
    const questionNumbers = Array.from({ length: totalQuestions }, (_, index) => index)

    const getAnswerStatus = (qIndex) => {
        const status = answerResults[qIndex];

        if (status === true) {
            return {
                className: 'correct',
                content: <span className='checkmark'>✓</span>
            };
        }

        if (status === false) {
            return {
                className: 'incorrect',
                content: <span className='crossmark'>✗</span>
            };
        }

        if (qIndex == currentQuestion) {
            return {
                className: 'active',
                content: <span>{qIndex + 1}</span>
            };
        }

        return {
            className: '',
            content: <span>{qIndex + 1}</span>
        };
    }

    return (
        <div className="quiz-questions-tracker">
            {questionNumbers.map((qIndex) => {
                const { className, content } = getAnswerStatus(qIndex);
                return (
                    <div
                        key={qIndex}
                        className={`tracker-number ${className}`}
                    >
                        {content}
                    </div>
                )
            })}
        </div>
    )
}

export default QuestionTracker
