'use client';

import React from 'react';

const BackButton: React.FC = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className="fixed top-6 left-6 z-50 bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600 transition-colors"
    >
      ← Back to Previous
    </button>
  );
};

export default BackButton; 