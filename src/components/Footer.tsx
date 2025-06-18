'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">About MelodyLearn</h3>
            <p className="text-gray-600">
              A fun and interactive music learning platform for children aged 7-9.
              Making music education enjoyable and accessible.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/learn" className="text-gray-600 hover:text-primary transition-colors">
                  Start Learning
                </a>
              </li>
              <li>
                <a href="/games" className="text-gray-600 hover:text-primary transition-colors">
                  Music Games
                </a>
              </li>
              <li>
                <a href="/challenges" className="text-gray-600 hover:text-primary transition-colors">
                  Challenges
                </a>
              </li>
              <li>
                <a href="/videos" className="text-gray-600 hover:text-primary transition-colors">
                  Video Lessons
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Contact</h3>
            <p className="text-gray-600">
              Course: QIM516 Digital and Interactive Media<br />
              Email: support@melodylearn.com<br />
              Phone: (123) 456-7890
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">
            © 2024 MelodyLearn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 