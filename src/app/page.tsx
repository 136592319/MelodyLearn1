'use client';

import { motion } from 'framer-motion';
import { FaMusic, FaGamepad, FaTrophy, FaVideo } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  const menuItems = [
    {
      title: 'Start Learning',
      icon: <FaMusic className="w-12 h-12" />,
      color: 'bg-blue-500',
      href: '/learn',
      description: 'Begin your musical journey!'
    },
    {
      title: 'Music Games',
      icon: <FaGamepad className="w-12 h-12" />,
      color: 'bg-green-500',
      href: '/games',
      description: 'Play fun music games!'
    },
    {
      title: 'Challenges',
      icon: <FaTrophy className="w-12 h-12" />,
      color: 'bg-yellow-500',
      href: '/challenges',
      description: 'Complete challenges and earn badges!'
    },
    {
      title: 'Watch Videos',
      icon: <FaVideo className="w-12 h-12" />,
      color: 'bg-red-500',
      href: '/videos',
      description: 'Learn from video lessons!'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-6xl mb-4"
            >
              🎵
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-purple-800 mb-4">
            Welcome to MelodyLearn!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hi there! I'm Melody, your music friend. Let's learn music together in a fun way!
          </p>
        </motion.div>
        
        {/* Main Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={item.href}>
                <div className={`${item.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full`}>
                  <div className="flex flex-col items-center text-white">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.div>
                    <h2 className="text-2xl font-bold mt-4">{item.title}</h2>
                    <p className="text-white/80 mt-2 text-center">{item.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Achievement Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto shadow-lg">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Today's Goal</h2>
            <p className="text-gray-600">
              Complete one lesson and earn your first badge! 🌟
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 