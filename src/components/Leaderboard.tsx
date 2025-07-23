import React from 'react';
import { QuizResult } from '../types';
import { Trophy, Medal, Award, ArrowLeft } from 'lucide-react';

interface LeaderboardProps {
  onBack: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onBack }) => {
  const results: QuizResult[] = JSON.parse(localStorage.getItem('kwikquiz_leaderboard') || '[]');
  
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 2:
        return <Award className="w-6 h-6 text-orange-400" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">{index + 1}</div>;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30';
      case 1:
        return 'bg-gradient-to-r from-gray-500/20 to-gray-400/20 border-gray-400/30';
      case 2:
        return 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-400/30';
      default:
        return 'bg-white/10 border-white/20';
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <span>Leaderboard</span>
            </h1>
          </div>
          <div className="w-20"></div>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-16">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Games Played Yet</h3>
            <p className="text-gray-300">Complete some quizzes to see the leaderboard!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result, index) => (
              <div
                key={result.id}
                className={`backdrop-blur-lg rounded-2xl p-6 border transition-all hover:scale-105 ${getRankColor(index)}`}
              >
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    {getRankIcon(index)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">{result.playerName}</h3>
                        <p className="text-gray-300">{result.quizTitle}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          {result.score}/{result.totalQuestions}
                        </div>
                        <div className="text-sm text-gray-300">
                          {Math.round((result.score / result.totalQuestions) * 100)}% correct
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="w-full bg-white/20 rounded-full h-2 mr-4">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(result.score / result.totalQuestions) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-400 whitespace-nowrap">
                        {new Date(result.completedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {results.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">{results.length}</div>
              <div className="text-gray-300">Total Games</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">
                {Math.round(results.reduce((acc, r) => acc + (r.score / r.totalQuestions), 0) / results.length * 100)}%
              </div>
              <div className="text-gray-300">Average Score</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">
                {Math.max(...results.map(r => r.score))}
              </div>
              <div className="text-gray-300">Highest Score</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;