'use client';

import React, { useState, useEffect } from 'react';
import CityMap from '@/components/CityMap';
import Leaderboard from '@/components/Leaderboard';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Map as MapIcon, Navigation, User as UserIcon } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('city');
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Mock data for initial demonstration
  const [buildings, setBuildings] = useState([
    { id: '1', username: 'DeepMindDev', level: 5, position: { x: 5, y: 5 } },
    { id: '2', username: 'SnooCoder', level: 3, position: { x: 8, y: 12 } },
    { id: '3', username: 'KarmaKing', level: 4, position: { x: 15, y: 2 } },
    { id: '4', username: 'RedditUser99', level: 2, position: { x: 12, y: 18 } },
    { id: '5', username: 'AntigravityBot', level: 1, position: { x: 2, y: 10 } },
  ]);

  const [leaderboardData, setLeaderboardData] = useState([
    { username: 'DeepMindDev', cityScore: 125430, buildingLevel: 5 },
    { username: 'SnooCoder', cityScore: 84200, buildingLevel: 4 },
    { username: 'KarmaKing', cityScore: 71500, buildingLevel: 4 },
    { username: 'RedditUser99', cityScore: 42300, buildingLevel: 3 },
    { username: 'AntigravityBot', cityScore: 15200, buildingLevel: 2 },
  ]);

  return (
    <main className="min-h-screen relative flex flex-col bg-slate-950 text-white selection:bg-cyan-500/30">
      {/* Background Neon Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[150px] rounded-full animate-pulse delay-700" />
      </div>

      {/* Navigation (Navbar) */}
      <nav className="glass sticky top-4 mx-4 mt-4 z-50 px-6 py-3 rounded-2xl flex items-center justify-between border-cyan-500/10 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg neon-glow">
            <Building2 className="w-5 h-5 text-black" />
          </div>
          <h1 className="text-xl font-black tracking-tighter neon-text uppercase italic">
            Reddit<span className="text-cyan-400">City</span>
          </h1>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('city')}
            className={`flex items-center gap-2 transition-colors ${activeTab === 'city' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
          >
            <MapIcon className="w-4 h-4" /> <span>City Map</span>
          </button>
          <button
            onClick={() => setActiveTab('leader')}
            className={`flex items-center gap-2 transition-colors ${activeTab === 'leader' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
          >
            <Navigation className="w-4 h-4" /> <span>Leaderboard</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          {!currentUser ? (
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2 rounded-xl text-sm transition-all transform hover:scale-105 shadow-lg active:scale-95 flex items-center gap-2">
              <UserIcon className="w-4 h-4" /> Sign In with Reddit
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-300">u/ {currentUser.username}</span>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-600 p-[2px]">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-bold text-xs ring-1 ring-white/10">
                  {currentUser.username[0]}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 p-6 relative">
        <AnimatePresence mode="wait">
          {activeTab === 'city' ? (
            <motion.div
              key="map-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full h-full max-w-7xl mx-auto rounded-3xl overflow-hidden glass border border-white/5 shadow-2xl relative min-h-[70vh]"
            >
              <div className="absolute top-6 left-6 z-10 p-4 rounded-2xl glass border border-white/10 pointer-events-none">
                <p className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-1 opacity-70">Region Overview</p>
                <h3 className="text-lg font-bold">Tech District</h3>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>24 Residents Online</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-cyan-500" />
                    <span>5 Skyscrapers Built</span>
                  </div>
                </div>
              </div>

              <CityMap buildings={buildings} />

              {/* District Switcher (Bottom Left Overlay) */}
              <div className="absolute bottom-6 left-6 z-10 flex gap-2">
                {['Tech', 'Memes', 'Fitness', 'India'].map(name => (
                  <button key={name} className="px-3 py-1.5 rounded-lg glass text-[10px] uppercase font-bold text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-all border border-white/5">
                    {name}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="leader-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full max-w-2xl mx-auto pt-10"
            >
              <Leaderboard data={leaderboardData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <footer className="p-10 border-t border-white/5 glass mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-xl font-bold italic neon-text mb-2">RedditCity.io</h2>
            <p className="text-sm text-slate-400">The first gamified virtual city powered by Reddit Karma.</p>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500">Stats</span>
              <span className="text-sm font-bold">342 Buildings Created</span>
              <span className="text-sm font-bold text-cyan-400">12.5M Combined Karma</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500">Legal</span>
              <span className="text-sm hover:text-cyan-400 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="text-sm hover:text-cyan-400 cursor-pointer transition-colors">Reddit API Compliance</span>
            </div>
          </div>
        </div>
        <div className="text-center mt-12 text-[10px] text-slate-600 uppercase tracking-widest">
          &copy; 2026 RedditCity. All Rights Reserved.
        </div>
      </footer>
    </main>
  );
}
