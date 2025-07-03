import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import LevelSelection from './components/LevelSelection';
import GameLevel from './components/GameLevel';
import Certificate from './components/Certificate';
import LearningMenu from './components/LearningMenu';
import AssessmentMenu from './components/AssessmentMenu';
import { User, GameState } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    score: 0,
    totalQuestions: 0,
    completedLevels: [],
    isGameComplete: false
  });
  const [showCertificate, setShowCertificate] = useState(false);
  const [showLevelSelection, setShowLevelSelection] = useState(false);
  const [showLearningMenu, setShowLearningMenu] = useState(false);
  const [showAssessmentMenu, setShowAssessmentMenu] = useState(false);

  const handleUserSetup = (userData: User) => {
    setUser(userData);
    setShowLevelSelection(true);
  };

  const handleLevelSelect = (level: number) => {
    setGameState(prev => ({
      ...prev,
      currentLevel: level
    }));
    setShowLevelSelection(false);
  };

  const handleLevelComplete = (levelScore: number, totalQuestions: number) => {
    const newCompletedLevels = [...gameState.completedLevels, gameState.currentLevel];
    const newGameState = {
      ...gameState,
      score: gameState.score + levelScore,
      totalQuestions: gameState.totalQuestions + totalQuestions,
      completedLevels: newCompletedLevels,
      currentLevel: gameState.currentLevel + 1,
      isGameComplete: newCompletedLevels.length === 4 // 4 levels total
    };
    
    setGameState(newGameState);
    
    if (newGameState.isGameComplete) {
      setShowCertificate(true);
    } else {
      setShowLevelSelection(true);
    }
  };

  const handleBackToLevelSelection = () => {
    setShowLevelSelection(true);
  };

  const handleShowLearningMenu = () => {
    setShowLearningMenu(true);
    setShowLevelSelection(false);
    setShowAssessmentMenu(false);
  };

  const handleBackFromLearningMenu = () => {
    setShowLearningMenu(false);
    setShowLevelSelection(true);
  };

  const handleShowAssessmentMenu = () => {
    setShowAssessmentMenu(true);
    setShowLevelSelection(false);
    setShowLearningMenu(false);
  };

  const handleBackFromAssessmentMenu = () => {
    setShowAssessmentMenu(false);
    setShowLevelSelection(true);
  };

  const handleRestart = () => {
    setUser(null);
    setGameState({
      currentLevel: 1,
      score: 0,
      totalQuestions: 0,
      completedLevels: [],
      isGameComplete: false
    });
    setShowCertificate(false);
    setShowLevelSelection(false);
    setShowLearningMenu(false);
    setShowAssessmentMenu(false);
  };

  if (showAssessmentMenu && user) {
    return (
      <AssessmentMenu 
        user={user}
        onBack={handleBackFromAssessmentMenu}
        onShowLearningMenu={handleShowLearningMenu}
      />
    );
  }

  if (showLearningMenu) {
    return <LearningMenu onBack={handleBackFromLearningMenu} />;
  }

  if (showCertificate && user) {
    return (
      <Certificate 
        user={user} 
        gameState={gameState} 
        onRestart={handleRestart}
      />
    );
  }

  if (showLevelSelection && user) {
    return (
      <LevelSelection
        user={user}
        gameState={gameState}
        onLevelSelect={handleLevelSelect}
        onShowLearningMenu={handleShowLearningMenu}
        onShowAssessmentMenu={handleShowAssessmentMenu}
        onRestart={handleRestart}
      />
    );
  }

  if (!user) {
    return <Dashboard onUserSetup={handleUserSetup} />;
  }

  return (
    <GameLevel 
      user={user}
      gameState={gameState}
      onLevelComplete={handleLevelComplete}
      onBackToLevelSelection={handleBackToLevelSelection}
      onRestart={handleRestart}
    />
  );
}

export default App;