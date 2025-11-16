import { useState } from 'react'
import { questions } from './questionbank.jsx'
import { QuizContext } from './context/context.js'
import { motion, AnimatePresence } from 'framer-motion';

import ScoreSection from './components/scoreSection.jsx'
import QuestionSection from './components/questionSection.jsx'
import AnswerSection from './components/answerSection.jsx'
import Button from './components/Button.jsx'
import QuestionTracker from './components/questionTracker.jsx'

import './App.css'

function App() {
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [isOptionClicked, setIsOptionClicked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [lastQuestionReached, setLastQuestionReached] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [answerResults, setAnswerResults] = useState(new Array(questions.length).fill(null));

  const handleoptionclick = (isCorrect, index) => {
    setIsOptionClicked(true);
    setSelectedAnswerIndex(index);
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      setScore(score + 1)
    }

  }

  const handlenextclick = () => {
    if (!isOptionClicked) {
      alert("Please select an option before proceeding to the next question.");
      return;
    }

    const newAnswerResults = [...answerResults];
    newAnswerResults[currentQuestion] = isAnswerCorrect;
    setAnswerResults(newAnswerResults);

    const nextQuestion = currentQuestion + 1

    if (nextQuestion == questions.length - 1) {
      setLastQuestionReached(true);
    }

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)

      setIsOptionClicked(false);
      setSelectedAnswerIndex(null);
      setIsAnswerCorrect(false);
    } else {
      setShowScore(true)
    }
  }

  const handleRetakeQuiz = () => {
    // Reset all the states to their initial values
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setIsOptionClicked(false);
    setSelectedAnswerIndex(null);
    setLastQuestionReached(false);
    setIsAnswerCorrect(false);
    setAnswerResults(new Array(questions.length).fill(null));
  };


  return (
    <QuizContext.Provider value={{
      score,
      currentQuestion,
      isOptionClicked,
      selectedAnswerIndex,
      lastQuestionReached,
      isAnswerCorrect,
      totalQuestions: questions.length,
      answerResults
    }}>
      <AnimatePresence mode='wait'>
        <motion.div className='question-card'
          key={currentQuestion}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}>

          {showScore ?
            (
              <ScoreSection handleRetakeQuiz={handleRetakeQuiz}/>
                ) : (

                <main className="hero">
                  <QuestionTracker />

                  <div className="textArea">
                    {/* Show Questions */}
                    <QuestionSection />

                    {/* Show Answer Options */}
                    <AnswerSection handleoptionclick={handleoptionclick} />

                    {/* Next Button */}
                    <Button onClick={handlenextclick}>
                      {lastQuestionReached ? "Submit" : "Next"}
                    </Button>

                  </div>
                </main>
            )}
              </motion.div>
      </AnimatePresence>
    </QuizContext.Provider>
  )
}

export default App
