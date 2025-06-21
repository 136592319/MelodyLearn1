'use client';

import { useState } from 'react';

interface PianoBeatBuilderProps {
  volume: number;
}

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

function playNote(note: string, volume: number) {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = NOTE_FREQUENCIES[note];
  gain.gain.value = volume * 0.5;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.4);
  osc.onended = () => ctx.close();
}

export default function PianoBeatBuilder({ volume }: PianoBeatBuilderProps) {
  const [melody, setMelody] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleKeyClick = (note: string) => {
    if (isPlaying || melody.length >= MAX_MELODY_LENGTH) return;
    playNote(note, volume);
    setMelody([...melody, note]);
  };

  const handlePlay = async () => {
    if (melody.length === 0) return;
    setIsPlaying(true);
    await new Promise((res) => setTimeout(res, 50));
    for (let i = 0; i < melody.length; i++) {
      playNote(melody[i], volume);
      await new Promise((res) => setTimeout(res, 450));
    }
    setIsPlaying(false);
  };

  const handleClear = () => {
    if (isPlaying) return;
    setMelody([]);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-purple-50 p-4 rounded-lg">
      <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-6 text-center">Piano Beat Builder</h1>
      <div className="mb-4 text-lg font-semibold text-gray-700 text-center h-8">
        {melody.length > 0 ? (
          <span>{melody.join(' - ')}</span>
        ) : (
          <span>Click keys to build a melody!</span>
        )}
      </div>
      <div className="flex space-x-2 mb-8">
        {PIANO_KEYS.map((key) => (
          <button
            key={key.note}
            className="w-12 h-28 md:w-16 md:h-36 bg-white border-2 border-purple-300 rounded-lg shadow-md text-xl font-bold text-purple-700 flex items-end justify-center pb-2 transition-transform duration-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-60"
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
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-bold rounded-full shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ▶ Play
        </button>
        <button
          onClick={handleClear}
          disabled={isPlaying || melody.length === 0}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white text-lg font-bold rounded-full shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ✖ Clear
        </button>
      </div>
      <div className="text-gray-500 text-sm mt-2 text-center">
        Create a melody with up to {MAX_MELODY_LENGTH} notes.
      </div>
    </div>
  );
} 