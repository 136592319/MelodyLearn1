'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaTrophy, FaMusic, FaDrum, FaKeyboard } from 'react-icons/fa';
import BackButton from '@/components/BackButton';

const challenges = [
  {
    title: 'Rhythm Rookie',
    description: 'Score 100 points in the Rhythm Master game.',
    icon: <FaDrum className="w-10 h-10 text-yellow-500" />,
    progress: 75,
    goal: 100,
    href: '/games',
  },
  {
    title: 'Pitch Pro',
    description: 'Correctly identify 5 notes in a row in Pitch Perfect.',
    icon: <FaMusic className="w-10 h-10 text-blue-500" />,
    progress: 2,
    goal: 5,
    href: '/games',
  },
  {
    title: 'Melody Maker',
    description: 'Create and play a full 8-note melody in Piano Beat Builder.',
    icon: <FaKeyboard className="w-10 h-10 text-pink-500" />,
    progress: 1,
    goal: 1,
    href: '/games',
  },
  {
    title: 'Perfect Attendance',
    description: 'Complete one activity every day for 3 days.',
    icon: <FaTrophy className="w-10 h-10 text-green-500" />,
    progress: 1,
    goal: 3,
    href: '#',
  },
];

export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <BackButton />
          <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">
            🏆 Your Challenges
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">{challenge.icon}</div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{challenge.title}</h2>
                    <p className="text-gray-500">{challenge.description}</p>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div
                      className="bg-green-500 h-4 rounded-full"
                      style={{ width: `${(challenge.progress / challenge.goal) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-sm font-semibold text-gray-600">
                    {challenge.progress} / {challenge.goal}
                  </div>

                  <Link href={challenge.href}>
                    <div className="mt-4 text-center bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer">
                      Go to Challenge
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 