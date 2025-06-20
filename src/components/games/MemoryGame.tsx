'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const PIANO_KEYS = [
  { note: 'C', label: 'C' },
  { note: 'D', label: 'D' },
  { note: 'E', label: 'E' },
  { note: 'F', label: 'F' },
  { note: 'G', label: 'G' },
  { note: 'A', label: 'A' },
  { note: 'B', label: 'B' },
];

const NOTE_FREQUENCIES: Record<string, number> = {
  C: 261.63,
  D: 293.66,
  E: 329.63,
  F: 349.23,
  G: 392.00,
  A: 440.00,
  B: 493.88,
};

const MAX_MELODY_LENGTH = 8;

function playNote(note: string) {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = NOTE_FREQUENCIES[note];
  gain.gain.value = 0.25;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.5);
  osc.onended = () => ctx.close();
}

export default function PianoBeatBuilder() {
  const [melody, setMelody] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleKeyClick = (note: string) => {
    if (isPlaying || melody.length >= MAX_MELODY_LENGTH) return;
    playNote(note);
    setMelody([...melody, note]);
  };

  const handlePlay = async () => {
    if (melody.length === 0) return;
    setIsPlaying(true);
    for (let i = 0; i < melody.length; i++) {
      playNote(melody[i]);
      await new Promise((res) => setTimeout(res, 500));
    }
    setIsPlaying(false);
  };

  const handleClear = () => {
    if (isPlaying) return;
    setMelody([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50 p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-6 text-center">Piano Beat Builder</h1>
      <div className="mb-4 text-lg font-semibold text-gray-700 text-center">
        {melody.length > 0 ? (
          <span>Melody: {melody.join(' - ')}</span>
        ) : (
          <span>Click the keys to build your melody! (Max 8 notes)</span>
        )}
      </div>
      <div className="flex space-x-2 mb-8">
        {PIANO_KEYS.map((key) => (
          <button
            key={key.note}
            className="w-16 h-32 md:w-20 md:h-40 bg-white border-2 border-purple-300 rounded-lg shadow-lg text-2xl font-bold text-purple-700 flex items-end justify-center mb-2 transition-transform duration-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400"
            style={{ boxShadow: '0 4px 16px #e9d5ff' }}
            onClick={() => handleKeyClick(key.note)}
            disabled={isPlaying || melody.length >= MAX_MELODY_LENGTH}
          >
            {key.label}
          </button>
        ))}
      </div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handlePlay}
          disabled={isPlaying || melody.length === 0}
          className="px-8 py-3 bg-green-400 hover:bg-green-500 text-white text-lg font-bold rounded-full shadow-md transition disabled:opacity-50"
        >
          ▶ Play Melody
        </button>
        <button
          onClick={handleClear}
          disabled={isPlaying || melody.length === 0}
          className="px-8 py-3 bg-red-400 hover:bg-red-500 text-white text-lg font-bold rounded-full shadow-md transition disabled:opacity-50"
        >
          ✖ Clear
        </button>
      </div>
      <div className="text-gray-500 text-sm mt-2 text-center">Click up to 8 notes, then press Play Melody to listen!</div>
    </div>
  );
} 