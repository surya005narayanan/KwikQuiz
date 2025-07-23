import React from 'react';
import { User } from '../types';
import { Plus, Users, Trophy, LogOut, Brain } from 'lucide-react';

interface HomePageProps {
  user: User;
  onCreateQuiz: () => void;
  onJoinQuiz: () => void;
  onViewLeaderboard: () => void;
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
  user,
  onCreateQuiz,
  onJoinQuiz,
  onViewLeaderboard,
  onLogout
}) => {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">KwikQuiz</h1>
              <p className="text-gray-300">Welcome back, {user.username}!</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </header>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div
            onClick={onCreateQuiz}
            className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 cursor-pointer hover:bg-white/20 transition-all border border-white/20 hover:border-white/30 transform hover:scale-105"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-6">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Create Quiz</h3>
            <p className="text-gray-300 mb-4">
              Design your own quiz with custom questions, multiple choice answers, and time limits.
            </p>
            <div className="flex items-center text-green-400 group-hover:text-green-300 transition-colors">
              <span className="font-semibold">Get started</span>
              <div className="w-2 h-2 bg-current rounded-full ml-2 group-hover:animate-pulse"></div>
            </div>
          </div>

          <div
            onClick={onJoinQuiz}
            className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 cursor-pointer hover:bg-white/20 transition-all border border-white/20 hover:border-white/30 transform hover:scale-105"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Join Quiz</h3>
            <p className="text-gray-300 mb-4">
              Enter a quiz code to join an existing quiz and compete with other players.
            </p>
            <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
              <span className="font-semibold">Join now</span>
              <div className="w-2 h-2 bg-current rounded-full ml-2 group-hover:animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Leaderboard Button */}
        <div className="text-center">
          <button
            onClick={onViewLeaderboard}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            <Trophy className="w-6 h-6" />
            <span>View Leaderboard</span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">
              {JSON.parse(localStorage.getItem('kwikquiz_quizzes') || '[]').length}
            </div>
            <div className="text-gray-300">Total Quizzes</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">
              {JSON.parse(localStorage.getItem('kwikquiz_leaderboard') || '[]').length}
            </div>
            <div className="text-gray-300">Games Played</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">
              {JSON.parse(localStorage.getItem('kwikquiz_users') || '[]').length}
            </div>
            <div className="text-gray-300">Active Players</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;