'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface PitchGameProps {
  volume: number;
}

export default function PitchGame({ volume }: PitchGameProps) {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState(1);
  const [showFailModal, setShowFailModal] = useState(false);

  const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const [audioContext] = useState(() => new (window.AudioContext || (window as any).webkitAudioContext)());

  const playNote = (note: string) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    const frequencies: { [key: string]: number } = {
      'C': 261.63,
      'D': 293.66,
      'E': 329.63,
      'F': 349.23,
      'G': 392.00,
      'A': 440.00,
      'B': 493.88,
    };
    
    oscillator.type = 'sine';
    oscillator.frequency.value = frequencies[note];
    
    gainNode.gain.setValueAtTime(0.3 * volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1);
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setLevel(1);
    setCurrentNote('');
    setFeedback('');
    setTimeout(() => playRandomNote(1), 100);
  };

  const playRandomNote = (levelOverride?: number) => {
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    setCurrentNote(randomNote);
    playNote(randomNote);
  };

  const checkAnswer = (selectedNote: string) => {
    if (!isPlaying || level > 6) return;
    playNote(selectedNote);
    if (selectedNote === currentNote) {
      if (level === 6) {
        setFeedback('Passed!');
        setIsPlaying(false);
        return;
      }
      setScore(prev => prev + 10);
      setFeedback('Correct! 🎉');
      setTimeout(() => {
        setLevel(prev => prev + 1);
        playRandomNote(level + 1);
        setFeedback('');
      }, 1000);
    } else {
      setShowFailModal(true);
      setTimeout(() => {
        resetGame();
      }, 300);
    }
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setCurrentNote('');
    setFeedback('');
    setIsPlaying(false);
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
        <h2 className="text-2xl font-bold mb-2">Pitch Perfect</h2>
        <p className="text-gray-600 mb-4">
          Listen to the note and select the correct one!
        </p>
        <div className="flex justify-center space-x-4 text-lg">
          <div className="bg-purple-100 px-4 py-2 rounded-lg">
            Score: <span className="font-bold">{score}</span>
          </div>
          <div className="bg-yellow-100 px-4 py-2 rounded-lg">
            Level: <span className="font-bold">{level}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4 mb-6">
        <motion.button
          className="bg-purple-500 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-purple-600 transition-colors"
          onClick={() => isPlaying && playNote(currentNote)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!isPlaying || level > 6}
        >
          Play Note
        </motion.button>

        <div className="grid grid-cols-4 gap-4">
          {notes.map((note) => (
            <motion.button
              key={note}
              className={`w-16 h-16 rounded-lg text-2xl font-bold
                ${(isPlaying && level <= 6) ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-gray-300 text-gray-500'}`}
              onClick={() => checkAnswer(note)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!isPlaying || level > 6}
            >
              {note}
            </motion.button>
          ))}
        </div>
      </div>

      {!isPlaying && (
        <motion.button
          className="bg-purple-500 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-purple-600 transition-colors"
          onClick={startGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Game
        </motion.button>
      )}

      {feedback && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-lg font-medium"
        >
          {feedback}
        </motion.p>
      )}
    </div>
  );
} 