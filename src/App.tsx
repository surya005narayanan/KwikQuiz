import React, { useState, useEffect } from 'react';
import { User, Quiz, QuizResult } from './types';
import AuthForm from './components/AuthForm';
import HomePage from './components/HomePage';
import CreateQuiz from './components/CreateQuiz';
import JoinQuiz from './components/JoinQuiz';
import QuizPlay from './components/QuizPlay';
import Leaderboard from './components/Leaderboard';
import ResultsScreen from './components/ResultsScreen';

type Screen = 'auth' | 'home' | 'create' | 'join' | 'play' | 'results' | 'leaderboard';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [playerName, setPlayerName] = useState<string>('');
  const [quizResults, setQuizResults] = useState<QuizResult | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('kwikquiz_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setCurrentScreen('home');
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('kwikquiz_user', JSON.stringify(user));
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('kwikquiz_user');
    setCurrentScreen('auth');
  };

  const handleQuizCreated = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setCurrentScreen('results');
  };

  const handleJoinQuiz = (quiz: Quiz, name: string) => {
    setCurrentQuiz(quiz);
    setPlayerName(name);
    setCurrentScreen('play');
  };

  const handleQuizCompleted = (results: QuizResult) => {
    setQuizResults(results);
    
    // Save results to leaderboard
    const leaderboard = JSON.parse(localStorage.getItem('kwikquiz_leaderboard') || '[]');
    leaderboard.push(results);
    leaderboard.sort((a: QuizResult, b: QuizResult) => b.score - a.score);
    localStorage.setItem('kwikquiz_leaderboard', JSON.stringify(leaderboard));
    
    setCurrentScreen('results');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'auth':
        return <AuthForm onLogin={handleLogin} />;
      case 'home':
        return (
          <HomePage 
            user={currentUser!} 
            onCreateQuiz={() => setCurrentScreen('create')}
            onJoinQuiz={() => setCurrentScreen('join')}
            onViewLeaderboard={() => setCurrentScreen('leaderboard')}
            onLogout={handleLogout}
          />
        );
      case 'create':
        return (
          <CreateQuiz 
            user={currentUser!}
            onQuizCreated={handleQuizCreated}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'join':
        return (
          <JoinQuiz 
            onJoinQuiz={handleJoinQuiz}
            onBack={() => setCurrentScreen('home')}
          />
        );
      case 'play':
        return (
          <QuizPlay 
            quiz={currentQuiz!}
            playerName={playerName}
            onQuizCompleted={handleQuizCompleted}
          />
        );
      case 'results':
        return (
          <ResultsScreen
            quiz={currentQuiz}
            results={quizResults}
            onCreateAnother={() => setCurrentScreen('create')}
            onJoinAnother={() => setCurrentScreen('join')}
            onViewLeaderboard={() => setCurrentScreen('leaderboard')}
            onHome={() => setCurrentScreen('home')}
          />
        );
      case 'leaderboard':
        return (
          <Leaderboard 
            onBack={() => setCurrentScreen('home')}
          />
        );
      default:
        return <HomePage 
          user={currentUser!} 
          onCreateQuiz={() => setCurrentScreen('create')}
          onJoinQuiz={() => setCurrentScreen('join')}
          onViewLeaderboard={() => setCurrentScreen('leaderboard')}
          onLogout={handleLogout}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {renderScreen()}
    </div>
  );
}

export default App;