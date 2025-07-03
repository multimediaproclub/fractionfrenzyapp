import React, { useState } from 'react';
import { ArrowLeft, ClipboardList, TrendingUp, Award, RotateCcw, CheckCircle, XCircle, Target, BookOpen } from 'lucide-react';
import { User } from '../types';
import { generateAssessmentQuestions } from '../utils/assessmentGenerator';

interface AssessmentMenuProps {
  user: User;
  onBack: () => void;
  onShowLearningMenu: () => void;
}

interface AssessmentResult {
  type: 'pre-test' | 'post-test';
  score: number;
  totalQuestions: number;
  categoryScores: {
    addition: { correct: number; total: number };
    subtraction: { correct: number; total: number };
    multiplication: { correct: number; total: number };
    division: { correct: number; total: number };
  };
  completedAt: Date;
  timeSpent: number;
}

interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: 'addition' | 'subtraction' | 'multiplication' | 'division';
  subcategory: string;
  hint: string;
  solution: string[];
}

const AssessmentMenu: React.FC<AssessmentMenuProps> = ({ user, onBack, onShowLearningMenu }) => {
  const [currentView, setCurrentView] = useState<'menu' | 'pre-test' | 'post-test' | 'results'>('menu');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [assessmentQuestions, setAssessmentQuestions] = useState<AssessmentQuestion[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [preTestResult, setPreTestResult] = useState<AssessmentResult | null>(null);
  const [postTestResult, setPostTestResult] = useState<AssessmentResult | null>(null);
  const [showHint, setShowHint] = useState(false);

  const startAssessment = (type: 'pre-test' | 'post-test') => {
    const questions = generateAssessmentQuestions();
    setAssessmentQuestions(questions);
    setSelectedAnswers(new Array(questions.length).fill(null));
    setCurrentQuestionIndex(0);
    setStartTime(new Date());
    setShowHint(false);
    setCurrentView(type);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowHint(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowHint(false);
    }
  };

  const handleQuestionJump = (index: number) => {
    setCurrentQuestionIndex(index);
    setShowHint(false);
  };

  const calculateResults = (): AssessmentResult => {
    const categoryScores = {
      addition: { correct: 0, total: 0 },
      subtraction: { correct: 0, total: 0 },
      multiplication: { correct: 0, total: 0 },
      division: { correct: 0, total: 0 }
    };

    let totalCorrect = 0;

    assessmentQuestions.forEach((question, index) => {
      const isCorrect = selectedAnswers[index] === question.correctAnswer;
      categoryScores[question.category].total++;
      if (isCorrect) {
        categoryScores[question.category].correct++;
        totalCorrect++;
      }
    });

    const timeSpent = startTime ? Math.round((new Date().getTime() - startTime.getTime()) / 1000) : 0;

    return {
      type: currentView as 'pre-test' | 'post-test',
      score: totalCorrect,
      totalQuestions: assessmentQuestions.length,
      categoryScores,
      completedAt: new Date(),
      timeSpent
    };
  };

  const finishAssessment = () => {
    const result = calculateResults();
    
    if (currentView === 'pre-test') {
      setPreTestResult(result);
    } else {
      setPostTestResult(result);
    }
    
    setCurrentView('results');
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getPerformanceLevel = (percentage: number): { level: string; color: string; description: string } => {
    if (percentage >= 90) return { level: 'Excellent', color: 'text-green-400', description: 'Outstanding mastery!' };
    if (percentage >= 80) return { level: 'Very Good', color: 'text-blue-400', description: 'Strong understanding!' };
    if (percentage >= 70) return { level: 'Good', color: 'text-yellow-400', description: 'Good progress!' };
    if (percentage >= 60) return { level: 'Fair', color: 'text-orange-400', description: 'Needs improvement' };
    return { level: 'Needs Work', color: 'text-red-400', description: 'Requires more study' };
  };

  const getRecommendations = (categoryScores: AssessmentResult['categoryScores']): string[] => {
    const recommendations: string[] = [];
    
    Object.entries(categoryScores).forEach(([category, scores]) => {
      const percentage = (scores.correct / scores.total) * 100;
      if (percentage < 70) {
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
        recommendations.push(`Focus on ${categoryName} - Review the learning materials and practice more problems`);
      }
    });

    if (recommendations.length === 0) {
      recommendations.push('Great job! You have a solid understanding of all fraction operations.');
    }

    return recommendations;
  };

  // Results View
  if (currentView === 'results') {
    const result = currentView === 'pre-test' ? preTestResult : postTestResult;
    if (!result) return null;

    const percentage = Math.round((result.score / result.totalQuestions) * 100);
    const performance = getPerformanceLevel(percentage);
    const recommendations = getRecommendations(result.categoryScores);

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentView('menu')}
                className="flex items-center space-x-2 text-purple-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Assessments</span>
              </button>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {result.type === 'pre-test' ? 'Pre-Test' : 'Post-Test'} Results
            </h1>
            <p className="text-purple-200">Assessment completed for {user.name}</p>
          </div>

          {/* Overall Score */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-6 border border-white/20 text-center">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <div className="w-full h-full rounded-full border-8 border-white/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">{percentage}%</div>
                  <div className="text-purple-300 text-sm">Score</div>
                </div>
              </div>
            </div>
            
            <h2 className={`text-2xl font-bold mb-2 ${performance.color}`}>
              {performance.level}
            </h2>
            <p className="text-purple-200 mb-4">{performance.description}</p>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">{result.score}</div>
                <div className="text-purple-300 text-sm">Correct</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{result.totalQuestions}</div>
                <div className="text-purple-300 text-sm">Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{formatTime(result.timeSpent)}</div>
                <div className="text-purple-300 text-sm">Time</div>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">Performance by Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(result.categoryScores).map(([category, scores]) => {
                const categoryPercentage = Math.round((scores.correct / scores.total) * 100);
                const categoryPerformance = getPerformanceLevel(categoryPercentage);
                
                return (
                  <div key={category} className="bg-white/5 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white capitalize">{category}</h4>
                      <span className={`text-sm font-medium ${categoryPerformance.color}`}>
                        {categoryPercentage}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-purple-300">
                      <span>{scores.correct}/{scores.total} correct</span>
                      <span className={categoryPerformance.color}>{categoryPerformance.level}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${categoryPercentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Target className="w-6 h-6 text-yellow-400" />
              <span>Recommendations</span>
            </h3>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  </div>
                  <p className="text-purple-200">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            {result.type === 'pre-test' && (
              <button
                onClick={onShowLearningMenu}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                <BookOpen className="w-5 h-5" />
                <span>Study Materials</span>
              </button>
            )}
            
            <button
              onClick={() => setCurrentView('menu')}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              <ClipboardList className="w-5 h-5" />
              <span>Back to Assessments</span>
            </button>
            
            <button
              onClick={() => startAssessment(result.type)}
              className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Retake Assessment</span>
            </button>
          </div>

          {/* Comparison (if both tests completed) */}
          {preTestResult && postTestResult && (
            <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
                <span>Progress Comparison</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-purple-200 mb-2">Pre-Test</h4>
                  <div className="text-3xl font-bold text-white mb-1">
                    {Math.round((preTestResult.score / preTestResult.totalQuestions) * 100)}%
                  </div>
                  <div className="text-purple-300 text-sm">
                    {preTestResult.score}/{preTestResult.totalQuestions} correct
                  </div>
                </div>
                
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-purple-200 mb-2">Post-Test</h4>
                  <div className="text-3xl font-bold text-white mb-1">
                    {Math.round((postTestResult.score / postTestResult.totalQuestions) * 100)}%
                  </div>
                  <div className="text-purple-300 text-sm">
                    {postTestResult.score}/{postTestResult.totalQuestions} correct
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {Math.round((postTestResult.score / postTestResult.totalQuestions) * 100) - 
                   Math.round((preTestResult.score / preTestResult.totalQuestions) * 100) >= 0 ? '+' : ''}
                  {Math.round((postTestResult.score / postTestResult.totalQuestions) * 100) - 
                   Math.round((preTestResult.score / preTestResult.totalQuestions) * 100)}%
                </div>
                <div className="text-purple-300 text-sm">Improvement</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Assessment Taking View
  if (currentView === 'pre-test' || currentView === 'post-test') {
    const currentQuestion = assessmentQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100;
    const answeredCount = selectedAnswers.filter(answer => answer !== null).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-white">
                {currentView === 'pre-test' ? 'Pre-Test Assessment' : 'Post-Test Assessment'}
              </h1>
              <div className="text-white">
                Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
              </div>
            </div>
            
            <div className="w-full bg-white/20 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="flex justify-between text-purple-300 text-sm">
              <span>{answeredCount} of {assessmentQuestions.length} answered</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
          </div>

          {/* Question Navigation */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-white/20">
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {assessmentQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionJump(index)}
                  className={`w-10 h-10 rounded-lg font-bold text-sm transition-all duration-200 ${
                    index === currentQuestionIndex
                      ? 'bg-purple-500 text-white ring-2 ring-purple-300'
                      : selectedAnswers[index] !== null
                      ? 'bg-green-500 text-white'
                      : 'bg-white/20 text-purple-300 hover:bg-white/30'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-6 border border-white/20">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-purple-300 font-medium capitalize">
                  {currentQuestion.category} - {currentQuestion.subcategory}
                </span>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    showHint 
                      ? 'bg-yellow-500/30 text-yellow-200' 
                      : 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300'
                  }`}
                >
                  <Target className="w-4 h-4" />
                  <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
                </button>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">
                {currentQuestion.question}
              </h2>
              
              {showHint && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-4">
                  <p className="text-yellow-200">{currentQuestion.hint}</p>
                </div>
              )}
            </div>

            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center space-x-2 bg-gray-600/50 hover:bg-gray-600/70 disabled:bg-gray-800/50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-3">
              {answeredCount === assessmentQuestions.length && (
                <button
                  onClick={finishAssessment}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Finish Assessment</span>
                </button>
              )}
            </div>

            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === assessmentQuestions.length - 1}
              className="flex items-center space-x-2 bg-purple-600/50 hover:bg-purple-600/70 disabled:bg-gray-800/50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              <span>Next</span>
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Assessment Menu
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-purple-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Game</span>
            </button>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Assessment Center</h1>
          <p className="text-purple-200 text-lg">Evaluate your fraction skills with comprehensive pre and post assessments</p>
        </div>

        {/* Assessment Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Pre-Test */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <ClipboardList className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Pre-Test Assessment</h2>
            <p className="text-purple-300 mb-6">
              Take this assessment before studying to identify your current knowledge level and areas that need improvement.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>20 comprehensive questions</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Covers all fraction operations</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Detailed performance analysis</span>
              </div>
            </div>

            {preTestResult ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-300 font-semibold">Completed</span>
                </div>
                <p className="text-green-200 text-sm">
                  Score: {Math.round((preTestResult.score / preTestResult.totalQuestions) * 100)}% 
                  ({preTestResult.score}/{preTestResult.totalQuestions})
                </p>
              </div>
            ) : null}

            <button
              onClick={() => startAssessment('pre-test')}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200"
            >
              {preTestResult ? 'Retake Pre-Test' : 'Start Pre-Test'}
            </button>
          </div>

          {/* Post-Test */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Post-Test Assessment</h2>
            <p className="text-purple-300 mb-6">
              Take this assessment after studying to measure your improvement and validate your learning progress.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>20 comprehensive questions</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Progress comparison with pre-test</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-200">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Achievement recognition</span>
              </div>
            </div>

            {postTestResult ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-300 font-semibold">Completed</span>
                </div>
                <p className="text-green-200 text-sm">
                  Score: {Math.round((postTestResult.score / postTestResult.totalQuestions) * 100)}% 
                  ({postTestResult.score}/{postTestResult.totalQuestions})
                </p>
              </div>
            ) : null}

            <button
              onClick={() => startAssessment('post-test')}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200"
            >
              {postTestResult ? 'Retake Post-Test' : 'Start Post-Test'}
            </button>
          </div>
        </div>

        {/* Assessment Coverage */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Assessment Coverage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-purple-200">Addition & Subtraction</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-purple-300">Similar Fractions (same denominators)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-purple-300">Dissimilar Fractions (different denominators)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-purple-300">Mixed Numbers</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-purple-200">Multiplication & Division</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-purple-300">Proper and Improper Fractions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-purple-300">Whole Numbers and Mixed Numbers</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
            <p className="text-blue-200 text-center">
              <strong>Assessment Strategy:</strong> Each assessment contains 5 questions from each operation type, 
              ensuring comprehensive coverage of all fraction concepts and difficulty levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentMenu;