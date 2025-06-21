'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {!isHomePage && (
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-gray-600 hover:text-purple-700 transition-colors"
                >
                  <FaArrowLeft />
                  <span>Back to Home</span>
                </motion.div>
              </Link>
            )}
            <Link href="/" className="text-2xl font-bold text-purple-700">
              MelodyLearn 🎵
            </Link>
          </div>
          <div className="space-x-4">
            <Link href="/learn" className="text-gray-600 hover:text-purple-700 transition-colors font-semibold">Learn</Link>
            <Link href="/games" className="text-gray-600 hover:text-purple-700 transition-colors font-semibold">Games</Link>
            <Link href="/challenges" className="text-gray-600 hover:text-purple-700 transition-colors font-semibold">Challenges</Link>
            <Link href="/videos" className="text-gray-600 hover:text-purple-700 transition-colors font-semibold">Videos</Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 