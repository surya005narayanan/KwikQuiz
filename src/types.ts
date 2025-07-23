export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  creatorId: string;
  creatorName: string;
  questions: Question[];
  timePerQuestion: number;
  code: string;
  createdAt: Date;
}

export interface QuizResult {
  id: string;
  quizId: string;
  quizTitle: string;
  playerName: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
}