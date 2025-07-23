import React from 'react';
import { Quiz, QuizResult } from '../types';
import { Trophy, Share2, RotateCcw, Plus, Home, Copy, Check } from 'lucide-react';

interface ResultsScreenProps {
  quiz: Quiz | null;
  results: QuizResult | null;
  onCreateAnother: () => void;
  onJoinAnother: () => void;
  onViewLeaderboard: () => void;
  onHome: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  quiz,
  results,
  onCreateAnother,
  onJoinAnother,
  onViewLeaderboard,
  onHome
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyCode = async () => {
    if (quiz?.code) {
      await navigator.clipboard.writeText(quiz.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getScoreColor = () => {
    if (!results) return 'text-white';
    const percentage = (results.score / results.totalQuestions) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = () => {
    if (!results) return 'Quiz Created!';
    const percentage = (results.score / results.totalQuestions) * 100;
    if (percentage >= 90) return 'Outstanding! 🎉';
    if (percentage >= 80) return 'Excellent work! 👏';
    if (percentage >= 70) return 'Good job! 👍';
    if (percentage >= 60) return 'Not bad! 💪';
    return 'Keep practicing! 📚';
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Results Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            
            {results ? (
              <>
                <h2 className="text-3xl font-bold text-white mb-2">{getScoreMessage()}</h2>
                <p className="text-gray-300 mb-6">You completed "{results.quizTitle}"</p>
                
                <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
                  {results.score}/{results.totalQuestions}
                </div>
                
                <div className="text-xl text-gray-300 mb-6">
                  {Math.round((results.score / results.totalQuestions) * 100)}% Correct
                </div>
                
                <div className="w-full bg-white/20 rounded-full h-3 mb-8">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${(results.score / results.totalQuestions) * 100}%` }}
                  ></div>
                </div>
              </>
            ) : quiz ? (
              <>
                <h2 className="text-3xl font-bold text-white mb-2">Quiz Created Successfully!</h2>
                <p className="text-gray-300 mb-6">"{quiz.title}" is ready to play</p>
                
                <div className="bg-white/10 rounded-xl p-6 mb-8">
                  <p className="text-gray-300 mb-2">Quiz Code:</p>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="text-4xl font-mono font-bold text-white tracking-widest bg-white/10 px-6 py-3 rounded-lg">
                      {quiz.code}
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 p-3 rounded-lg transition-colors"
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Share this code with players</p>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-white mb-2">Great!</h2>
                <p className="text-gray-300 mb-6">What would you like to do next?</p>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={onCreateAnother}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                <span>Create Another Quiz</span>
              </button>
              
              <button
                onClick={onJoinAnother}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Join Another Quiz</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={onViewLeaderboard}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                <Trophy className="w-5 h-5" />
                <span>View Leaderboard</span>
              </button>
              
              <button
                onClick={onHome}
                className="flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-lg font-semibold transition-all"
              >
                <Home className="w-5 h-5" />
                <span>Go Home</span>
              </button>
            </div>
          </div>
        </div>

        {/* Share Options */}
        {quiz && (
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Share the quiz code <span className="font-mono font-bold">{quiz.code}</span> with friends to let them join!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsScreen;