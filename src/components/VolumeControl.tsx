'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VolumeControlProps {
  onVolumeChange: (volume: number) => void;
}

export default function VolumeControl({ onVolumeChange }: VolumeControlProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    onVolumeChange(isMuted ? 0 : volume);
  }, [isMuted, volume, onVolumeChange]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  return (
    <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
      <button
        onClick={toggleMute}
        className="text-2xl focus:outline-none"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? '🔇' : volume > 0.5 ? '🔊' : '🔉'}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={isMuted ? 0 : volume}
        onChange={handleVolumeChange}
        className="w-24 accent-purple-500"
      />
    </div>
  );
} 