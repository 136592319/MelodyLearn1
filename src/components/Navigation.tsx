'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

interface NavigationProps {
  showBackButton?: boolean;
  title?: string;
}

export default function Navigation({ showBackButton = true, title }: NavigationProps) {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
                >
                  <FaArrowLeft />
                  <span>Back to Home</span>
                </motion.button>
              </Link>
            )}
            <Link href="/" className="text-2xl font-bold text-primary">
              MelodyLearn 🎵
            </Link>
          </div>
          {title && (
            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          )}
          <div className="space-x-4">
            <Link href="/learn" className="text-gray-600 hover:text-primary transition-colors">Learn</Link>
            <Link href="/games" className="text-gray-600 hover:text-primary transition-colors">Games</Link>
            <Link href="/challenges" className="text-gray-600 hover:text-primary transition-colors">Challenges</Link>
            <Link href="/videos" className="text-gray-600 hover:text-primary transition-colors">Videos</Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 