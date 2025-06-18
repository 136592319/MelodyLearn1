'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Card {
  id: number;
  instrument: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  volume: number;
}

const instruments: { instrument: string; emoji: string }[] = [
  { instrument: 'Piano', emoji: '🎹' },
  { instrument: 'Guitar', emoji: '🎸' },
  { instrument: 'Violin', emoji: '🎻' },
  { instrument: 'Drums', emoji: '🥁' },
  { instrument: 'Flute', emoji: '🎵' },
  { instrument: 'Trumpet', emoji: '🎺' },
];

const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

const playSound = (type: 'flip' | 'match' | 'wrong', volume: number) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  let frequency = 440;
  let duration = 0.1;
  
  switch (type) {
    case 'flip':
      frequency = 523.25; // C5
      break;
    case 'match':
      frequency = 659.25; // E5
      duration = 0.2;
      break;
    case 'wrong':
      frequency = 392.00; // G4
      break;
  }
  
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  
  gainNode.gain.setValueAtTime(0.3 * volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
};

export default function MemoryGame({ volume }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const cardPairs = [...instruments, ...instruments]
      .map((item, index) => ({
        id: index,
        instrument: item.instrument,
        emoji: item.emoji,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(cardPairs);
    setFlippedCards([]);
    setMoves(0);
    setScore(0);
    setGameOver(false);
  };

  const handleCardClick = (clickedId: number) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(clickedId) ||
      cards[clickedId].isMatched
    ) {
      return;
    }

    playSound('flip', volume);
    const newFlippedCards = [...flippedCards, clickedId];
    setFlippedCards(newFlippedCards);

    const newCards = cards.map((card) =>
      card.id === clickedId ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards[firstId];
      const secondCard = cards[secondId];

      if (firstCard.instrument === secondCard.instrument) {
        playSound('match', volume);
        setScore((prev) => prev + 10);
        const updatedCards = newCards.map((card) =>
          card.id === firstId || card.id === secondId
            ? { ...card, isMatched: true }
            : card
        );
        setCards(updatedCards);
        setFlippedCards([]);

        if (updatedCards.every((card) => card.isMatched)) {
          setGameOver(true);
        }
      } else {
        playSound('wrong', volume);
        setTimeout(() => {
          const resetCards = newCards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card
          );
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Music Memory Game</h2>
        <p className="text-gray-600 mb-4">
          Match the musical instruments by finding their pairs!
        </p>
        <div className="flex justify-center space-x-4 text-lg">
          <div className="bg-purple-100 px-4 py-2 rounded-lg">
            Moves: <span className="font-bold">{moves}</span>
          </div>
          <div className="bg-green-100 px-4 py-2 rounded-lg">
            Score: <span className="font-bold">{score}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={`aspect-square cursor-pointer rounded-lg flex items-center justify-center text-4xl
              ${card.isFlipped ? 'bg-white' : 'bg-purple-500'}
              ${card.isMatched ? 'opacity-50' : ''}
              transition-all duration-300 transform hover:scale-105`}
            onClick={() => handleCardClick(card.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {card.isFlipped && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{card.emoji}</div>
                <div className="text-sm font-medium">{card.instrument}</div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {gameOver && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h3 className="text-xl font-bold mb-2">Congratulations! 🎉</h3>
          <p className="text-gray-600 mb-4">
            You completed the game in {moves} moves with a score of {score}!
          </p>
          <button
            onClick={initializeGame}
            className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Play Again
          </button>
        </motion.div>
      )}

      {!gameOver && (
        <button
          onClick={initializeGame}
          className="text-purple-600 hover:text-purple-800"
        >
          Restart Game
        </button>
      )}
    </div>
  );
} 