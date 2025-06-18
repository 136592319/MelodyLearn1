'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { motion } from 'framer-motion';

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: {
    introduction: string;
    image: string;
    notes: {
      name: string;
      description: string;
      audioUrl: string;
    }[];
    tips: string[];
  };
}

export default function LearnPage() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const lessons: Lesson[] = [
    {
      id: 'notes',
      title: 'Music Note Basics',
      description: 'Learn the basics of music notes and the staff.',
      content: {
        introduction: 'Welcome to the world of music notes! In this lesson, you will learn about the staff, different types of notes, and how to read them. Music is like a special language, and notes are the letters of this language.',
        image: 'https://www.musictheoryacademy.com/wp-content/uploads/2014/11/treble-clef-staff.png',
        notes: [
          {
            name: 'C (Do)',
            description: 'C is the first white key on the left side of the piano keyboard and one of the most basic notes in music. On the staff, it is located below the first ledger line.',
            audioUrl: '/sounds/C4.mp3',
          },
          {
            name: 'D (Re)',
            description: 'D is the second white key, to the right of C. On the staff, it is located on the first line.',
            audioUrl: '/sounds/D4.mp3',
          },
          {
            name: 'E (Mi)',
            description: 'E is the third white key, to the right of D. On the staff, it is located in the first space.',
            audioUrl: '/sounds/E4.mp3',
          },
          {
            name: 'F (Fa)',
            description: 'F is the fourth white key, to the right of E. On the staff, it is located on the second line.',
            audioUrl: '/sounds/F4.mp3',
          },
          {
            name: 'G (Sol)',
            description: 'G is the fifth white key, to the right of F. On the staff, it is located in the second space.',
            audioUrl: '/sounds/G4.mp3',
          },
        ],
        tips: [
          'The staff has 5 lines and 4 spaces.',
          'Notes can be placed on lines or in spaces.',
          'The treble clef is used for higher notes.',
          'Practice reading notes every day.',
          'Remember the position of each note, just like the alphabet.'
        ],
      },
    },
    {
      id: 'piano',
      title: 'Piano Basics',
      description: 'Learn the basics of playing the piano.',
      content: {
        introduction: "The piano is a wonderful instrument to start your musical journey. Let's learn about the keyboard and basic playing techniques. The piano has 88 keys, including 52 white keys and 36 black keys.",
        image: 'https://www.musictheoryacademy.com/wp-content/uploads/2014/11/piano-keyboard.png',
        notes: [
          {
            name: 'White Keys',
            description: 'White keys represent the natural notes (C, D, E, F, G, A, B). Each white key stands for a specific pitch.',
            audioUrl: '/sounds/white-keys.mp3',
          },
          {
            name: 'Black Keys',
            description: 'Black keys represent sharps and flats (# and b) and are located between the white keys. Their pitch is between two adjacent white keys.',
            audioUrl: '/sounds/black-keys.mp3',
          },
          {
            name: 'Basic Fingering',
            description: 'Proper fingering is essential for piano playing. The thumb is finger 1, the index finger is 2, and so on. Keep your fingers naturally curved and your wrist relaxed.',
            audioUrl: '/sounds/basic-fingering.mp3',
          },
          {
            name: 'Posture',
            description: 'Good posture is very important for playing the piano. Sit on the front half of the bench, keep your back straight, and your feet flat on the floor.',
            audioUrl: '/sounds/posture.mp3',
          },
        ],
        tips: [
          'Maintain good posture and keep your back straight.',
          'Keep your fingers naturally curved and relaxed.',
          'Start with simple one-hand exercises.',
          'Practice every day and progress step by step.',
          'Keep your wrists relaxed and flexible.',
          'Maintain a steady rhythm while practicing.'
        ],
      },
    },
    {
      id: 'singing',
      title: 'Singing Basics',
      description: 'Learn the fundamentals of singing.',
      content: {
        introduction: "Singing is a natural way to express yourself through music. Let's learn some basic singing techniques to help you develop a beautiful voice.",
        image: 'https://www.musictheoryacademy.com/wp-content/uploads/2014/11/singing.png',
        notes: [
          {
            name: 'Breathing Technique',
            description: 'Proper breathing is the foundation of singing. Use abdominal breathing: expand your belly when you inhale and contract it when you exhale.',
            audioUrl: '/sounds/breathing.mp3',
          },
          {
            name: 'Posture',
            description: 'Good posture is essential for singing. Stand straight, relax your shoulders, and keep your head in a natural position.',
            audioUrl: '/sounds/singing-posture.mp3',
          },
          {
            name: 'Vocal Warm-up',
            description: 'Warm up your voice with simple scale exercises. Start from a low note, gradually go higher, then come back down.',
            audioUrl: '/sounds/vocal-warmup.mp3',
          },
          {
            name: 'Pitch',
            description: 'Pitch is one of the most important elements in singing. Use a piano or tuner to help you stay in tune while practicing.',
            audioUrl: '/sounds/pitch.mp3',
          },
        ],
        tips: [
          'Maintain good standing or sitting posture.',
          'Use abdominal breathing.',
          'Warm up your voice before singing.',
          'Pay attention to pitch and rhythm.',
          'Keep your throat relaxed.',
          'Listen to and imitate excellent singers.'
        ],
      },
    },
  ];

  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessons(prev =>
      prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const playAudio = (url: string) => {
    console.log('Play audio url:', url);
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <Navigation />
      <BackButton />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">Start Learning</h1>
            <p className="text-xl text-gray-600">
              Choose a lesson to begin your musical journey!
            </p>
          </motion.div>

          {selectedLesson ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <button
                onClick={() => setSelectedLesson(null)}
                className="text-purple-600 hover:text-purple-800 mb-6 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Lessons
              </button>
              <h2 className="text-3xl font-bold mb-6 text-purple-800">{selectedLesson.title}</h2>
              <p className="text-gray-600 text-lg mb-8">{selectedLesson.content.introduction}</p>

              <div className="mb-8">
                <img
                  src={selectedLesson.content.image}
                  alt={selectedLesson.title}
                  className="w-full rounded-xl shadow-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {selectedLesson.content.notes.map((note, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-purple-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-xl font-bold mb-3 text-purple-700">{note.name}</h3>
                    <p className="text-gray-600 mb-4">{note.description}</p>
                    <button
                      onClick={() => playAudio(note.audioUrl)}
                      className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Play Sound
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="bg-purple-50 rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-bold mb-4 text-purple-700">Learning Tips</h3>
                <ul className="space-y-3">
                  {selectedLesson.content.tips.map((tip, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <span className="text-purple-500 mr-3 text-xl">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => toggleLessonCompletion(selectedLesson.id)}
                className={`w-full px-8 py-4 rounded-xl transition-all transform hover:scale-105 ${
                  completedLessons.includes(selectedLesson.id)
                    ? 'bg-green-500 text-white'
                    : 'bg-purple-500 text-white hover:bg-purple-600'
                }`}
              >
                {completedLessons.includes(selectedLesson.id)
                  ? '✓ Lesson Completed!'
                  : 'Mark as Completed'}
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {lessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all"
                  onClick={() => setSelectedLesson(lesson)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-purple-800">{lesson.title}</h3>
                    {completedLessons.includes(lesson.id) && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{lesson.description}</p>
                  <div className="flex items-center text-purple-600">
                    <span>Start Learning</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 