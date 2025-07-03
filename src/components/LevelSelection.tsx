import React from 'react';
import { User, GameState } from '../types';
import { Plus, Minus, X, Divide, Trophy, Star, Lock, CheckCircle, RotateCcw } from 'lucide-react';

interface LevelSelectionProps {
  user: User;
  gameState: GameState;
  onLevelSelect: (level: number) => void;
  onRestart: () => void;
}

const LevelSelection: React.FC<LevelSelectionProps> = ({
  user,
  gameState,
  onLevelSelect,
  onRestart
}) => {
  const levels = [
    {
      id: 1,
      name: 'Fraction Addition',
      description: 'Similar fractions, dissimilar fractions, and mixed numbers',
      icon: Plus,
      color: 'from-blue-500 to-purple-600',
      difficulty: 'Beginner',
      topics: ['Similar Fractions', 'Dissimilar Fractions', 'Mixed Numbers']
    },
    {
      id: 2,
      name: 'Fraction Subtraction',
      description: 'Similar fractions, dissimilar fractions, and mixed numbers',
      icon: Minus,
      color: 'from-green-500 to-blue-500',
      difficulty: 'Intermediate',
      topics: ['Similar Fractions', 'Dissimilar Fractions', 'Mixed Numbers']
    },
    {
      id: 3,
      name: 'Fraction Multiplication',
      description: 'Proper & improper fractions, whole numbers & mixed numbers',
      icon: X,
      color: 'from-orange-500 to-red-500',
      difficulty: 'Advanced',
      topics: ['Proper & Improper Fractions', 'Whole & Mixed Numbers']
    },
    {
      id: 4,
      name: 'Fraction Division',
      description: 'Proper & improper fractions, whole numbers & mixed numbers',
      icon: Divide,
      color: 'from-purple-500 to-pink-500',
      difficulty: 'Expert',
      topics: ['Proper & Improper Fractions', 'Whole & Mixed Numbers']
    }
  ];

  const isLevelUnlocked = (levelId: number) => {
    if (levelId === 1) return true;
    return gameState.completedLevels.includes(levelId - 1);
  };

  const isLevelCompleted = (levelId: number) => {
    return gameState.completedLevels.includes(levelId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome back, {user.name}!</h1>
                <p className="text-purple-200">{user.grade} - Section {user.section}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="flex items-center space-x-2 text-white">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-2xl font-bold">{gameState.score}</span>
                </div>
                <div className="text-purple-300 text-sm">Total Score</div>
              </div>
              
              <button
                onClick={onRestart}
                className="flex items-center space-x-2 bg-gray-600/50 hover:bg-gray-600/70 text-white px-4 py-2 rounded-xl transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Level Selection */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Choose Your Challenge</h2>
          <p className="text-purple-200 text-lg">Master different types of fraction operations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {levels.map((level) => {
            const IconComponent = level.icon;
            const unlocked = isLevelUnlocked(level.id);
            const completed = isLevelCompleted(level.id);
            
            return (
              <div
                key={level.id}
                className={`relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 transition-all duration-300 ${
                  unlocked 
                    ? 'hover:bg-white/20 hover:scale-105 cursor-pointer' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={() => unlocked && onLevelSelect(level.id)}
              >
                {/* Level Status Badge */}
                <div className="absolute top-4 right-4">
                  {completed ? (
                    <div className="bg-green-500 rounded-full p-2">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  ) : !unlocked ? (
                    <div className="bg-gray-500 rounded-full p-2">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                  ) : null}
                </div>

                {/* Level Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${level.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Level Info */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-bold text-white">Level {level.id}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      level.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                      level.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                      level.difficulty === 'Advanced' ? 'bg-orange-500/20 text-orange-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {level.difficulty}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-purple-200 mb-2">{level.name}</h4>
                  <p className="text-purple-300 text-sm mb-3">{level.description}</p>
                  
                  {/* Topics covered */}
                  <div className="space-y-1">
                    <p className="text-purple-200 text-xs font-medium">Topics covered:</p>
                    {level.topics.map((topic, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span className="text-purple-300 text-xs">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Level Stats */}
                <div className="flex justify-between items-center text-sm">
                  <div className="text-purple-300">
                    10 Questions
                  </div>
                  <div className="text-purple-300">
                    {unlocked ? (completed ? 'Completed ✓' : 'Ready to play') : 'Locked'}
                  </div>
                </div>

                {/* Hover Effect */}
                {unlocked && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Overview */}
        <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 text-center">Your Progress</h3>
          <div className="flex justify-center space-x-4">
            {levels.map((level) => (
              <div
                key={level.id}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                  isLevelCompleted(level.id)
                    ? 'bg-green-500 text-white'
                    : gameState.currentLevel === level.id
                    ? 'bg-purple-500 text-white ring-2 ring-purple-300'
                    : isLevelUnlocked(level.id)
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-500 text-gray-300'
                }`}
              >
                {level.id}
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-purple-200">
              {gameState.completedLevels.length} of 4 levels completed
            </p>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 text-center">What You'll Learn</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-purple-200">Addition & Subtraction</h4>
              <ul className="space-y-2 text-purple-300 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Working with fractions that have the same denominator</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Finding common denominators for different fractions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Converting between mixed numbers and improper fractions</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-purple-200">Multiplication & Division</h4>
              <ul className="space-y-2 text-purple-300 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Multiplying proper and improper fractions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Working with whole numbers and mixed numbers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Understanding reciprocals and division by fractions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSelection;