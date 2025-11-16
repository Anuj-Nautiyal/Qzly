import { useContext } from 'react'
import { QuizContext } from '../context/context.js'
import { questions } from '../questionbank.jsx'
import './QuestionAnswer.css'

function AnswerSection({handleoptionclick}) {
    const {currentQuestion, isOptionClicked, selectedAnswerIndex, isAnswerCorrect} = useContext(QuizContext)

    const getButtonClass = (answer, index) => {
        if (!isOptionClicked) {
            return '';
        }

        if(isAnswerCorrect && index === selectedAnswerIndex) {
            return 'correct-answer';
        }

        if (!isAnswerCorrect) {
            if (index === selectedAnswerIndex) {
                return 'incorrect-answer';
            }
            if (answer.isCorrect) {
                return 'correct-answer';    
            }
        }
        
        return '';
    }
    return (
        <div className={`answer-section ${isOptionClicked ? 'disabled' : ''}`}>
            {questions[currentQuestion].answerOptions.map((answer, index) => (
                <button 
                key={answer.option} 
                onClick={() => handleoptionclick(answer.isCorrect, index)} 
                className={getButtonClass(answer, index)}
                disabled={isOptionClicked}
                >
                    {answer.option}
                </button>
            ))}
        </div>
    )
}

export default AnswerSection
