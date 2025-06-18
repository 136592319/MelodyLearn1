'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { useRouter } from 'next/navigation';

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: string;
  reward: string;
  completed: boolean;
  link: string;
}

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'rhythm',
      title: 'Rhythm Master Challenge',
      description: 'Complete the rhythm game three times with perfect timing!',
      icon: '🥁',
      requirement: 'Complete 3 rhythm games',
      reward: 'Rhythm Master Badge',
      completed: false,
      link: '/games?game=rhythm',
    },
    {
      id: 'notes',
      title: 'Note Explorer Challenge',
      description: 'Identify musical notes correctly five times!',
      icon: '🎵',
      requirement: 'Identify 5 notes correctly',
      reward: 'Note Explorer Badge',
      completed: false,
      link: '/games?game=pitch',
    },
    {
      id: 'piano',
      title: 'Piano Pro Challenge',
      description: 'Play the C-E-G chord on the virtual piano!',
      icon: '🎹',
      requirement: 'Play C-E-G chord',
      reward: 'Piano Pro Badge',
      completed: false,
      link: '/games?game=piano',
    },
    {
      id: 'memory',
      title: 'Music Detective Challenge',
      description: 'Match musical instruments correctly four times!',
      icon: '🎼',
      requirement: 'Match 4 instruments',
      reward: 'Music Detective Badge',
      completed: false,
      link: '/games?game=memory',
    },
  ]);

  const router = useRouter();

  // 新增：记录已领取徽章和今日状态
  const [badges, setBadges] = useState<{[key:string]:number}>({});
  const [claimedToday, setClaimedToday] = useState<{[key:string]:boolean}>({});

  // 每日刷新领取状态
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const stored = localStorage.getItem('claimedToday');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.date === today) {
        setClaimedToday(parsed.data);
      } else {
        setClaimedToday({});
        localStorage.setItem('claimedToday', JSON.stringify({date: today, data: {}}));
      }
    } else {
      localStorage.setItem('claimedToday', JSON.stringify({date: today, data: {}}));
    }
    // 读取徽章
    const badgeStore = localStorage.getItem('badges');
    if (badgeStore) setBadges(JSON.parse(badgeStore));
  }, []);

  const handleChallengeClick = (challenge: Challenge) => {
    if (!challenge.completed) {
      router.push(challenge.link);
    }
  };

  const completeChallenge = (id: string) => {
    setChallenges(prev =>
      prev.map(challenge =>
        challenge.id === id
          ? { ...challenge, completed: true }
          : challenge
      )
    );
  };

  // 领取徽章
  const claimReward = (challenge: Challenge) => {
    setBadges(prev => {
      const newBadges = { ...prev, [challenge.id]: (prev[challenge.id] || 0) + 1 };
      localStorage.setItem('badges', JSON.stringify(newBadges));
      return newBadges;
    });
    setClaimedToday(prev => {
      const newClaimed = { ...prev, [challenge.id]: true };
      const today = new Date().toISOString().slice(0, 10);
      localStorage.setItem('claimedToday', JSON.stringify({date: today, data: newClaimed}));
      return newClaimed;
    });
  };

  // 判断是否可以领取徽章：必须完成挑战且未领取
  const canClaim = (challenge: Challenge) => challenge.completed && !claimedToday[challenge.id] && (badges[challenge.id] || 0) < 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <BackButton />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Challenges</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow
                  ${challenge.completed ? 'opacity-75' : ''}`}
                onClick={() => handleChallengeClick(challenge)}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{challenge.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-bold">{challenge.title}</h2>
                      {challenge.completed && (
                        <span className="text-green-500">✓</span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{challenge.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="font-medium mr-2">Requirement:</span>
                        <span>{challenge.requirement}</span>
                      </div>
                      <div className="flex items-center text-sm text-purple-600">
                        <span className="font-medium mr-2">Reward:</span>
                        <span>{challenge.reward}</span>
                      </div>
                    </div>
                    {!challenge.completed && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          completeChallenge(challenge.id);
                        }}
                        className="mt-4 w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                      >
                        Start Challenge
                      </button>
                    )}
                    {/* 领取徽章按钮 */}
                    {canClaim(challenge) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          claimReward(challenge);
                        }}
                        className="mt-4 w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-bold"
                      >
                        Claim Reward
                      </button>
                    )}
                    {challenge.completed && claimedToday[challenge.id] && (
                      <div className="mt-4 w-full bg-green-100 text-green-700 px-4 py-2 rounded-lg text-center font-bold border border-green-300">
                        Reward Claimed Today
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Your Progress</h2>
            <div className="flex justify-between items-center mb-2">
              <span>Completed Challenges</span>
              <span>
                {challenges.filter(c => c.completed).length}/{challenges.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <div
                className="bg-purple-500 h-4 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    (challenges.filter(c => c.completed).length / challenges.length) * 100
                  }%`,
                }}
              />
            </div>
            {/* 新增徽章展示区 */}
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">Your Badges</h3>
              <div className="flex flex-wrap gap-4">
                {challenges.map(challenge => (
                  <div key={challenge.id} className="flex flex-col items-center bg-purple-50 rounded-xl px-4 py-2 shadow border border-purple-200 min-w-[90px]">
                    <span className="text-3xl mb-1">{challenge.icon}</span>
                    <span className="text-sm font-semibold text-purple-700 mb-1">{challenge.reward}</span>
                    <span className="text-lg font-bold text-purple-900">{badges[challenge.id] && badges[challenge.id] > 0 ? 1 : 0}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 