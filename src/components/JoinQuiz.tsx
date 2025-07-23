import React, { useState } from 'react';
import { Quiz } from '../types';
import { ArrowLeft, Users, Clock } from 'lucide-react';

interface JoinQuizProps {
  onJoinQuiz: (quiz: Quiz, playerName: string) => void;
  onBack: () => void;
}

const JoinQuiz: React.FC<JoinQuizProps> = ({ onJoinQuiz, onBack }) => {
  const [quizCode, setQuizCode] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [foundQuiz, setFoundQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);

  const searchQuiz = async () => {
    if (!quizCode.trim()) {
      alert('Please enter a quiz code');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate search

    const quizzes: Quiz[] = JSON.parse(localStorage.getItem('kwikquiz_quizzes') || '[]');
    const quiz = quizzes.find(q => q.code.toUpperCase() === quizCode.toUpperCase());

    if (quiz) {
      setFoundQuiz(quiz);
    } else {
      alert('Quiz not found! Please check the code and try again.');
      setFoundQuiz(null);
    }

    setLoading(false);
  };

  const handleJoinQuiz = () => {
    if (!playerName.trim()) {
      alert('Please enter your name');
      return;
    }

    if (foundQuiz) {
      onJoinQuiz(foundQuiz, playerName.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!foundQuiz) {
        searchQuiz();
      } else if (playerName.trim()) {
        handleJoinQuiz();
      }
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          <h1 className="text-3xl font-bold text-white">Join Quiz</h1>
          <div className="w-20"></div>
        </div>

        <div className="space-y-8">
          {/* Quiz Code Input */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Enter Quiz Code</h3>
            
            <div className="flex space-x-4">
              <input
                type="text"
                value={quizCode}
                onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                placeholder="ENTER CODE"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white text-center text-2xl font-mono tracking-widest placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                maxLength={6}
              />
              <button
                onClick={searchQuiz}
                disabled={loading || !quizCode.trim()}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  'Find Quiz'
                )}
              </button>
            </div>
          </div>

          {/* Quiz Found */}
          {foundQuiz && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 animate-in slide-in-from-bottom duration-500">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{foundQuiz.title}</h3>
                <p className="text-gray-300">Created by {foundQuiz.creatorName}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center justify-center space-x-2 bg-white/10 rounded-lg p-4">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-white">{foundQuiz.questions.length} Questions</span>
                </div>
                <div className="flex items-center justify-center space-x-2 bg-white/10 rounded-lg p-4">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span className="text-white">{foundQuiz.timePerQuestion}s per question</span>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your name..."
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white text-center text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />

                <button
                  onClick={handleJoinQuiz}
                  disabled={!playerName.trim()}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Join Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinQuiz;