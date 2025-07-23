import React, { useState, useEffect } from 'react';
import { Quiz, QuizResult } from '../types';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface QuizPlayProps {
  quiz: Quiz;
  playerName: string;
  onQuizCompleted: (results: QuizResult) => void;
}

const QuizPlay: React.FC<QuizPlayProps> = ({ quiz, playerName, onQuizCompleted }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(quiz.timePerQuestion);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showFeedback) {
      handleTimeUp();
    }
  }, [timeLeft, showFeedback]);

  const handleTimeUp = () => {
    if (selectedAnswer !== null) {
      submitAnswer();
    } else {
      // Auto-submit with no answer
      setAnswers([...answers, -1]);
      setShowFeedback(true);
      setIsCorrect(false);
      
      setTimeout(() => {
        nextQuestion();
      }, 2000);
    }
  };

  const submitAnswer = () => {
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setAnswers([...answers, selectedAnswer!]);
    setShowFeedback(true);
    setIsCorrect(correct);

    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setTimeLeft(quiz.timePerQuestion);
      setShowFeedback(false);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    const finalAnswers = selectedAnswer !== null ? [...answers, selectedAnswer] : [...answers, -1];
    const score = finalAnswers.reduce((score, answer, index) => {
      return answer === quiz.questions[index].correctAnswer ? score + 1 : score;
    }, 0);

    const results: QuizResult = {
      id: Date.now().toString(),
      quizId: quiz.id,
      quizTitle: quiz.title,
      playerName,
      score,
      totalQuestions: quiz.questions.length,
      completedAt: new Date()
    };

    onQuizCompleted(results);
  };

  const getTimeColor = () => {
    const percentage = timeLeft / quiz.timePerQuestion;
    if (percentage > 0.5) return 'text-green-400';
    if (percentage > 0.2) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getProgressWidth = () => {
    return `${(timeLeft / quiz.timePerQuestion) * 100}%`;
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{quiz.title}</h1>
          <p className="text-gray-300">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2 mb-8">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Timer */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center space-x-2 ${getTimeColor()}`}>
            <Clock className="w-6 h-6" />
            <span className="text-3xl font-bold">{timeLeft}</span>
          </div>
          <div className="w-32 mx-auto mt-2 bg-white/20 rounded-full h-1">
            <div 
              className={`h-1 rounded-full transition-all duration-1000 ${
                timeLeft / quiz.timePerQuestion > 0.5 ? 'bg-green-400' : 
                timeLeft / quiz.timePerQuestion > 0.2 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: getProgressWidth() }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="grid md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && setSelectedAnswer(index)}
                disabled={showFeedback}
                className={`p-6 rounded-xl text-left transition-all transform hover:scale-105 border-2 ${
                  showFeedback
                    ? index === currentQuestion.correctAnswer
                      ? 'bg-green-500/30 border-green-400 text-green-100'
                      : selectedAnswer === index && index !== currentQuestion.correctAnswer
                      ? 'bg-red-500/30 border-red-400 text-red-100'
                      : 'bg-white/10 border-white/20 text-gray-300'
                    : selectedAnswer === index
                    ? 'bg-purple-500/30 border-purple-400 text-white'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    showFeedback && index === currentQuestion.correctAnswer
                      ? 'bg-green-500 text-white'
                      : showFeedback && selectedAnswer === index && index !== currentQuestion.correctAnswer
                      ? 'bg-red-500 text-white'
                      : selectedAnswer === index
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/20 text-gray-300'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">{option}</span>
                  {showFeedback && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  )}
                  {showFeedback && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <XCircle className="w-6 h-6 text-red-400" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Submit Button */}
          {selectedAnswer !== null && !showFeedback && (
            <div className="mt-8 text-center">
              <button
                onClick={submitAnswer}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Submit Answer
              </button>
            </div>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className="mt-8 text-center">
              <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg ${
                isCorrect ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {isCorrect ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <XCircle className="w-6 h-6" />
                )}
                <span className="font-semibold">
                  {isCorrect ? 'Correct!' : 'Incorrect!'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPlay;