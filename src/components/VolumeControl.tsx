'use client';

import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (newVolume: number) => void;
}

export default function VolumeControl({ volume, onVolumeChange }: VolumeControlProps) {
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(Number(e.target.value));
  };

  const toggleMute = () => {
    onVolumeChange(volume > 0 ? 0 : 0.5); // Mute or restore to 50%
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-full">
      <button onClick={toggleMute} className="text-purple-600 hover:text-purple-800">
        {volume === 0 ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={volume}
        onChange={handleVolumeChange}
        className="w-24 h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
      />
    </div>
  );
} 