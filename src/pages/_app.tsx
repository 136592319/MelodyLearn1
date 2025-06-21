import Navigation from '@/components/Navigation';
import { useState } from 'react';
import VolumeControl from '@/components/VolumeControl';
import BackButton from '@/components/BackButton';
import RhythmGame from '@/components/games/RhythmGame';
import PitchGame from '@/components/games/PitchGame';
import VirtualPiano from '@/components/games/VirtualPiano';
import PianoBeatBuilder from '@/components/games/MemoryGame';

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);

  const games = [
    {
      id: 'rhythm',
      title: 'Rhythm Master',
      description: 'Follow the rhythm pattern and test your timing!',
      icon: '🥁',
      component: <RhythmGame volume={volume} />,
    },
    {
      id: 'pitch',
      title: 'Pitch Perfect',
      description: 'Test your pitch recognition skills!',
      icon: '🎵',
      component: <PitchGame volume={volume} />,
    },
    {
      id: 'piano',
      title: 'Virtual Piano',
      description: 'Play and learn on our virtual piano!',
      icon: '🎹',
      component: <VirtualPiano volume={volume} />,
    },
    {
      id: 'beatbuilder',
      title: 'Piano Beat Builder',
      description: 'Build your own melody loop with a piano!',
      icon: '🎼',
      component: <PianoBeatBuilder volume={volume} />
    },
  ];  

  const activeGameComponent = games.find((game) => game.id === activeGame)?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8 flex flex-col justify-center items-center min-h-[80vh]">
        <div className="max-w-4xl w-full mx-auto">
          <BackButton />
          <h1 className="text-3xl font-bold text-center mb-8">Music Games</h1>

          {!activeGame ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setActiveGame(game.id)}
                >
                  <div className="text-4xl mb-4">{game.icon}</div>
                  <h2 className="text-xl font-bold mb-2">{game.title}</h2>
                  <p className="text-gray-600">{game.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setActiveGame(null)}
                  className="text-purple-600 hover:text-purple-800 font-semibold"
                >
                  ← Back to Games
                </button>
                <VolumeControl volume={volume} onVolumeChange={setVolume} />
              </div>
              {activeGameComponent}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 
