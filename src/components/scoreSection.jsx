import React, { useContext } from 'react'
import { QuizContext } from '../context/context.js';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti'
import Button from './Button.jsx'

import './scoreSection.css'

function ScoreSection({ handleRetakeQuiz }) {
    const { score, totalQuestions } = useContext(QuizContext);

    let congratsMessage = '';
    let summaryContent = null;

    if (score === totalQuestions) {
        congratsMessage = "Perfect Score!";
        summaryContent = <div>
            <img src="https://i.pinimg.com/1200x/54/4b/9c/544b9c0ce70bb54544e892db8f233ecd.jpg" width="100%" height="150" alt="" />
        </div>;
    } else if (score >= totalQuestions * 0.7) {
        congratsMessage = "That was pretty good !";
        summaryContent = <div>
            <img src="https://i.pinimg.com/736x/b2/48/fe/b248fe9eb8bb719eba77821ad6accb40.jpg" width="100%" height="150" alt="" />
        </div>;
    } else if (score >= totalQuestions * 0.4) {
        congratsMessage = "How can someone be this bad ?";
        summaryContent = <div>
            <img src="https://i.pinimg.com/1200x/25/9b/c2/259bc21381ce7c2b19da82fb27ac839d.jpg" width="100%" height="150" alt="" />
        </div>;
    } else {
        congratsMessage = "Tum Btech ki Taiyaari chhod do !";
        summaryContent =
            <div>
                <iframe width="100%" height="150" 
                src="https://www.youtube.com/embed/4AdFHAuL51Y?si=0FoXUl0OwKulFUeo" 
                title="YouTube video player" 
                frameborder="0"
                referrerpolicy="strict-origin-when-cross-origin" 
                >
                </iframe>
            </div>;
    }

    return (

        <motion.div className='score-card'
            key="score-card-key"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}>

            {score === totalQuestions && <Confetti />}

            <div className='score-card-body'>
                <ScoreCircle score={score} total={totalQuestions} />

                <div className="score-congratulations">
                    {congratsMessage}
                </div>
                <div className="score-summary-text">
                    {summaryContent}
                </div>

                <div className='quizRetake'>
                    <Button onClick={handleRetakeQuiz} className="retake-button">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24" fill='white'>
                            <path d="M 2 2 L 4.9414062 4.9414062 C 3.1620561 6.7129386 2 9.209162 2 12 C 2 17.533333 6.4666667 22 12 22 C 17.533333 22 22 17.533333 22 12 C 22 6.4666667 17.533333 2 12 2 L 12 4 C 16.466667 4 20 7.5333333 20 12 C 20 16.466667 16.466667 20 12 20 C 7.5333333 20 4 16.466667 4 12 C 4 9.7594337 4.9364614 7.7627686 6.3535156 6.3535156 L 9 9 L 9 2 L 2 2 z"></path>
                        </svg>
                        Retake Quiz
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

function ScoreCircle({ score, total }) {
    const scorePercentage = Math.round((score / total) * 100);

    const progressStyle = {
        background: `conic-gradient(
      #6a0dad ${scorePercentage}%, 
      #e0e0e0 ${scorePercentage}%
    )`
    };

    return (
        <div className="circular-progress" style={progressStyle}>
            <div className="score-text-content">
                <span>Your Score</span>
                <h1>{score}/{total}</h1>
            </div>
        </div>
    );
}

export default ScoreSection
