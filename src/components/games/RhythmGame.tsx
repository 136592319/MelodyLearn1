'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import React from 'react';

interface RhythmGameProps {
  volume: number;
}

export default function RhythmGame({ volume }: RhythmGameProps) {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState(1);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);

  const [audioContext] = useState(() => new (window.AudioContext || (window as any).webkitAudioContext)());

  const playBeat = (index: number) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    const frequencies = [261.63, 293.66, 329.63, 392.00]; // C4, D4, E4, G4
    oscillator.type = 'sine';
    oscillator.frequency.value = frequencies[index];
    
    gainNode.gain.setValueAtTime(0.3 * volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const getSequenceLength = (level: number) => {
    if (level === 1) return 2;
    if (level === 2) return 3;
    if (level === 3) return 4;
    if (level === 4) return 5;
    return 5;
  };

  const generateSequenceArr = (levelOverride?: number) => {
    const len = getSequenceLength(levelOverride ?? level);
    return Array.from({ length: len }, () => Math.floor(Math.random() * 4));
  };

  const startNewLevel = (levelOverride?: number) => {
    const newLevel = levelOverride ?? level;
    const newSeq = generateSequenceArr(newLevel);
    setSequence(newSeq);
    setUserSequence([]);
    setFeedback('');
    setTimeout(() => showSequence(newSeq), 100);
  };

  const startGame = () => {
    setIsPlaying(true);
    setLevel(1);
    setScore(0);
    startNewLevel(1);
  };

  const showSequence = async (seq: number[]) => {
    setIsShowingSequence(true);
    for (let i = 0; i < seq.length; i++) {
      playBeat(seq[i]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    setIsShowingSequence(false);
  };

  const handleBeatClick = (index: number) => {
    if (isShowingSequence || !isPlaying || level > 4) return;
    playBeat(index);
    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);

    if (sequence.length === 0 || newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
      setShowFailModal(true);
      setTimeout(() => {
        resetGame();
      }, 300);
      return;
    } else if (newUserSequence.length === sequence.length) {
      if (level === 4) {
        setFeedback('Passed!');
        setIsPlaying(false);
        return;
      }
      setFeedback('Great job!');
      setScore(prev => prev + 10);
      setTimeout(() => {
        setLevel(prev => prev + 1);
        startNewLevel(level + 1);
      }, 1000);
    }
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setSequence([]);
    setUserSequence([]);
    setFeedback('');
    setIsPlaying(false);
    setIsShowingSequence(false);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg relative">
      {showFailModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-xs w-full border-2 border-purple-200">
            <div className="text-3xl mb-4 text-red-500">❌</div>
            <div className="text-xl font-bold mb-2 text-purple-800">Game Over</div>
            <div className="text-gray-600 mb-6 text-center">Oops! You made a mistake.<br/>Try again from the beginning.</div>
            <button
              onClick={() => setShowFailModal(false)}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Rhythm Master</h2>
        <p className="text-gray-600 mb-4">
          Watch and listen to the sequence, then repeat it!
        </p>
        <div className="flex justify-center space-x-4 text-lg">
          <div className="bg-purple-100 px-4 py-2 rounded-lg">
            Level: <span className="font-bold">{level}</span>
          </div>
          <div className="bg-green-100 px-4 py-2 rounded-lg">
            Score: <span className="font-bold">{score}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {[0, 1, 2, 3].map((index) => (
          <motion.button
            key={index}
            className={`w-24 h-24 rounded-lg text-4xl font-bold
              ${(!isPlaying || isShowingSequence || level > 4) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${index === 0 ? 'bg-red-500 hover:bg-red-600' :
                index === 1 ? 'bg-blue-500 hover:bg-blue-600' :
                index === 2 ? 'bg-green-500 hover:bg-green-600' :
                'bg-yellow-500 hover:bg-yellow-600'}
              transition-colors`}
            onClick={() => handleBeatClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!isPlaying || isShowingSequence || level > 4}
          >
            {index + 1}
          </motion.button>
        ))}
      </div>

      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold mb-4"
        >
          {feedback}
        </motion.div>
      )}

      <div className="flex space-x-4">
        {!isPlaying ? (
          <button
            onClick={startGame}
            className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Start Game
          </button>
        ) : (
          <button
            onClick={resetGame}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            disabled={level > 4}
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
} 