'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Note {
  key: string;
  note: string;
  isBlack: boolean;
}

interface VirtualPianoProps {
  volume: number;
}

const notes: Note[] = [
  { key: 'a', note: 'C', isBlack: false },
  { key: 'w', note: 'C#', isBlack: true },
  { key: 's', note: 'D', isBlack: false },
  { key: 'e', note: 'D#', isBlack: true },
  { key: 'd', note: 'E', isBlack: false },
  { key: 'f', note: 'F', isBlack: false },
  { key: 't', note: 'F#', isBlack: true },
  { key: 'g', note: 'G', isBlack: false },
  { key: 'y', note: 'G#', isBlack: true },
  { key: 'h', note: 'A', isBlack: false },
  { key: 'u', note: 'A#', isBlack: true },
  { key: 'j', note: 'B', isBlack: false },
];

const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

const playNote = (frequency: number, volume: number) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  
  gainNode.gain.setValueAtTime(0.3 * volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 1);
};

const getFrequency = (note: string): number => {
  const noteMap: { [key: string]: number } = {
    'C': 261.63,
    'C#': 277.18,
    'D': 293.66,
    'D#': 311.13,
    'E': 329.63,
    'F': 349.23,
    'F#': 369.99,
    'G': 392.00,
    'G#': 415.30,
    'A': 440.00,
    'A#': 466.16,
    'B': 493.88,
  };
  return noteMap[note] || 0;
};

export default function VirtualPiano({ volume }: VirtualPianoProps) {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeKeys.has(e.key)) return;
      
      const note = notes.find(n => n.key === e.key);
      if (note) {
        const newActiveKeys = new Set(activeKeys);
        newActiveKeys.add(e.key);
        setActiveKeys(newActiveKeys);
        playNote(getFrequency(note.note), volume);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const newActiveKeys = new Set(activeKeys);
      newActiveKeys.delete(e.key);
      setActiveKeys(newActiveKeys);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeKeys, volume]);

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
      {showInstructions && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-purple-100 rounded-lg"
        >
          <h3 className="text-lg font-semibold mb-2">How to Play</h3>
          <p className="text-gray-700">
            Use your keyboard to play the piano! White keys: A, S, D, F, G, H, J
            Black keys: W, E, T, Y, U
          </p>
          <button
            onClick={() => setShowInstructions(false)}
            className="mt-2 text-purple-600 hover:text-purple-800"
          >
            Got it!
          </button>
        </motion.div>
      )}

      <div className="relative w-full max-w-3xl">
        <div className="flex justify-center">
          {notes.map((note, index) => (
            <motion.div
              key={note.note}
              className={`relative ${
                note.isBlack
                  ? 'w-12 h-32 bg-black z-10 -mx-3'
                  : 'w-16 h-48 bg-white border border-gray-300'
              } rounded-b-lg ${
                activeKeys.has(note.key)
                  ? note.isBlack
                    ? 'bg-gray-800'
                    : 'bg-gray-100'
                  : ''
              }`}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playNote(getFrequency(note.note), volume);
                const newActiveKeys = new Set(activeKeys);
                newActiveKeys.add(note.key);
                setActiveKeys(newActiveKeys);
                setTimeout(() => {
                  const updatedKeys = new Set(activeKeys);
                  updatedKeys.delete(note.key);
                  setActiveKeys(updatedKeys);
                }, 100);
              }}
            >
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                {note.key.toUpperCase()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-xl font-bold mb-2">Virtual Piano</h2>
        <p className="text-gray-600">
          Click the keys or use your keyboard to play!
        </p>
      </div>
    </div>
  );
} 