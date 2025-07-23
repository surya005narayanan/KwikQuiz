import React, { useState } from 'react';
import { User, Quiz, Question } from '../types';
import { Plus, Trash2, ArrowLeft, Save, Clock } from 'lucide-react';

interface CreateQuizProps {
  user: User;
  onQuizCreated: (quiz: Quiz) => void;
  onBack: () => void;
}

const CreateQuiz: React.FC<CreateQuizProps> = ({ user, onQuizCreated, onBack }) => {
  const [title, setTitle] = useState('');
  const [timePerQuestion, setTimePerQuestion] = useState(10);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }
  ]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const updateQuestion = (id: string, field: string, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) }
        : q
    ));
  };

  const generateQuizCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a quiz title');
      return;
    }

    const invalidQuestions = questions.filter(q => 
      !q.question.trim() || q.options.some(opt => !opt.trim())
    );

    if (invalidQuestions.length > 0) {
      alert('Please complete all questions and options');
      return;
    }

    const quiz: Quiz = {
      id: Date.now().toString(),
      title: title.trim(),
      creatorId: user.id,
      creatorName: user.username,
      questions,
      timePerQuestion,
      code: generateQuizCode(),
      createdAt: new Date()
    };

    // Save to localStorage
    const quizzes = JSON.parse(localStorage.getItem('kwikquiz_quizzes') || '[]');
    quizzes.push(quiz);
    localStorage.setItem('kwikquiz_quizzes', JSON.stringify(quizzes));

    onQuizCreated(quiz);
  };

  const timeOptions = [5, 10, 15, 30, 60];

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
          <h1 className="text-3xl font-bold text-white">Create Quiz</h1>
          <div className="w-20"></div>
        </div>

        <div className="space-y-8">
          {/* Quiz Settings */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">Quiz Settings</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Quiz Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter quiz title..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Time per Question</label>
                <select
                  value={timePerQuestion}
                  onChange={(e) => setTimePerQuestion(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  {timeOptions.map(time => (
                    <option key={time} value={time} className="bg-gray-800">
                      {time} seconds
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {questions.map((question, questionIndex) => (
              <div key={question.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">Question {questionIndex + 1}</h4>
                  {questions.length > 1 && (
                    <button
                      onClick={() => removeQuestion(question.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                    placeholder="Enter your question..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name={`correct-${question.id}`}
                          checked={question.correctAnswer === optionIndex}
                          onChange={() => updateQuestion(question.id, 'correctAnswer', optionIndex)}
                          className="w-4 h-4 text-purple-500"
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                          placeholder={`Option ${optionIndex + 1}`}
                          className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={addQuestion}
              className="flex items-center space-x-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 px-6 py-3 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Question</span>
            </button>

            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              <Save className="w-5 h-5" />
              <span>Create Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;