'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowUp, Search } from 'lucide-react';

interface LeaderboardEntry {
    username: string;
    cityScore: number;
    buildingLevel: number;
}

const Leaderboard: React.FC<{ data: LeaderboardEntry[] }> = ({ data }) => {
    return (
        <div className="glass p-6 rounded-2xl w-full max-w-md mx-auto shadow-2xl border-cyan-500/20">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-serif neon-text flex items-center gap-2">
                    <Trophy className="text-yellow-400" /> City Leaders
                </h2>
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-slate-900/50 border border-slate-700/50 rounded-lg pl-8 pr-3 py-1 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                </div>
            </div>

            <div className="space-y-3">
                {data.map((user, index) => (
                    <motion.div
                        key={user.username}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center justify-between p-3 rounded-xl border border-white/5 transition-all hover:border-cyan-400/30 hover:bg-white/5 ${index < 3 ? 'bg-cyan-500/5' : ''}`}
                    >
                        <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${index === 0 ? 'bg-yellow-400 text-black' : index === 1 ? 'bg-slate-300 text-black' : index === 2 ? 'bg-amber-600 text-white' : 'text-slate-500 font-normal outline outline-1 outline-slate-600'}`}>
                                {index + 1}
                            </span>
                            <div>
                                <p className="font-semibold text-sm">{user.username}</p>
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Level {user.buildingLevel}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-cyan-400 font-mono font-bold">{user.cityScore.toLocaleString()}</p>
                            <div className="flex items-center justify-end gap-1 text-[10px] text-green-400">
                                <ArrowUp className="w-2 h-2" /> 12%
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="w-full mt-6 py-2 text-sm text-cyan-400 font-bold hover:text-white transition-colors">
                View Full Leaderboard
            </button>
        </div>
    );
};

export default Leaderboard;
