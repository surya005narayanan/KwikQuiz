# KwikQuiz
# KwikQuiz - Complete Quizzing Website

A modern, interactive quiz platform built with React, TypeScript, and SQLite for user authentication.

## Features

- **User Authentication**: Secure signup/login with SQLite database storage
- **Quiz Creation**: Create custom quizzes with multiple-choice questions
- **Quiz Joining**: Join quizzes using unique codes with custom player names
- **Real-time Gameplay**: Timed questions with visual countdown and feedback
- **Leaderboard**: Track high scores and compare with other players
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Step-by-Step Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

### 1. Clone or Download the Project
If you have the project files, navigate to the project directory in your terminal.

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages including:
- React and TypeScript for the frontend
- Vite for development server and building
- Tailwind CSS for styling
- SQLite3 and better-sqlite3 for database operations
- Lucide React for icons

### 3. Start the Development Server
```bash
npm run dev
```

The application will start and be available at `http://localhost:5173`

### 4. Using the Application

#### First Time Setup:
1. **Sign Up**: Create a new account with username, email, and password
2. **Login**: Use your credentials to access the main dashboard

#### Creating a Quiz:
1. Click "Create Quiz" from the home page
2. Enter a quiz title
3. Set time per question (5, 10, 15, 30, or 60 seconds)
4. Add questions with 4 multiple-choice options each
5. Select the correct answer for each question
6. Click "Create Quiz" to generate a unique quiz code

#### Joining a Quiz:
1. Click "Join Quiz" from the home page
2. Enter the quiz code provided by the quiz creator
3. Enter your player name
4. Start playing the quiz

#### Playing a Quiz:
1. Read each question carefully
2. Select your answer before time runs out
3. View immediate feedback after each question
4. See your final score and ranking

#### Viewing Leaderboard:
1. Click "View Leaderboard" to see all quiz results
2. Scores are ranked from highest to lowest
3. View statistics including average scores and total games

### 5. Building for Production
```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### 6. Preview Production Build
```bash
npm run preview
```

## Database Information

- **Database File**: `kwikquiz.db` (created automatically in the project root)
- **User Data**: Stored securely in SQLite database
- **Quiz Data**: Stored in browser localStorage for demo purposes
- **Leaderboard**: Stored in browser localStorage

## Project Structure

```
src/
├── components/          # React components
│   ├── AuthForm.tsx    # Login/Signup form
│   ├── HomePage.tsx    # Main dashboard
│   ├── CreateQuiz.tsx  # Quiz creation interface
│   ├── JoinQuiz.tsx    # Quiz joining interface
│   ├── QuizPlay.tsx    # Quiz gameplay interface
│   ├── Leaderboard.tsx # Leaderboard display
│   └── ResultsScreen.tsx # Results and next actions
├── database/           # Database management
│   └── db.ts          # SQLite database operations
├── types.ts           # TypeScript type definitions
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Database**: SQLite with better-sqlite3
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom gradients and animations

## Troubleshooting

### Common Issues:

1. **Database Connection Error**:
   - Ensure you have proper file permissions in the project directory
   - The SQLite database file will be created automatically

2. **Port Already in Use**:
   - If port 5173 is busy, Vite will automatically use the next available port
   - Check the terminal output for the correct URL

3. **Module Not Found Errors**:
   - Run `npm install` to ensure all dependencies are installed
   - Clear node_modules and run `npm install` again if issues persist

4. **Build Errors**:
   - Check that all TypeScript types are properly defined
   - Ensure all imports are correct

### Performance Tips:
- The SQLite database provides fast user authentication
- Quiz data is stored locally for quick access
- The application is optimized for both desktop and mobile use

## Future Enhancements

Potential features that could be added:
- Real-time multiplayer quizzes
- Quiz categories and difficulty levels
- User profiles with statistics
- Export/import quiz functionality
- Advanced analytics and reporting
