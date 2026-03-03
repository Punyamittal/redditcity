'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, ExternalLink, Zap, Clock, Shield } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage({ params }: { params: { username: string } }) {
    // Mock data for profile
    const user = {
        username: params.username,
        karma: {
            total: 125430,
            link: 45200,
            comment: 80230,
        },
        cityScore: 125430,
        level: 5,
        accountAge: '4.5 years',
        district: 'Tech District',
        topSubreddits: ['reactjs', 'typescript', 'nextjs', 'programming'],
    };

    return (
        <main className="min-h-screen bg-slate-950 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to City
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Avatar & Basic Info */}
                    <div className="md:col-span-1 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass p-8 rounded-3xl text-center border-cyan-500/20 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4">
                                <Shield className="w-5 h-5 text-cyan-400 opacity-50" />
                            </div>
                            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 p-1 mb-6">
                                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl font-black">
                                    {user.username[0]}
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold mb-1">u/{user.username}</h1>
                            <p className="text-sm text-cyan-400 font-medium uppercase tracking-widest">{user.district}</p>

                            <div className="mt-8 pt-8 border-t border-white/10 flex justify-around">
                                <div className="text-center">
                                    <p className="text-xs text-slate-500 uppercase font-bold">Level</p>
                                    <p className="text-xl font-black text-white">{user.level}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-slate-500 uppercase font-bold">Rank</p>
                                    <p className="text-xl font-black text-cyan-400">#12</p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="glass p-6 rounded-2xl border-white/5">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Top Subreddits</h3>
                            <div className="flex flex-wrap gap-2">
                                {user.topSubreddits.map(sub => (
                                    <span key={sub} className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium border border-white/5 hover:border-cyan-400/30 transition-colors cursor-default">
                                        r/{sub}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Detailed Stats */}
                    <div className="md:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass p-8 rounded-3xl border-white/10 shadow-xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-yellow-400" /> CityScore Breakdown
                                </h2>
                                <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                                    <Share2 className="w-4 h-4 text-slate-400" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="glass bg-white/5 p-5 rounded-2xl border-white/5">
                                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Comment Karma (x2.0)</p>
                                    <p className="text-2xl font-black text-white">{user.karma.comment.toLocaleString()}</p>
                                    <p className="text-[10px] text-cyan-400/70 mt-1">Contribution: {(user.karma.comment * 2).toLocaleString()} pts</p>
                                </div>
                                <div className="glass bg-white/5 p-5 rounded-2xl border-white/5">
                                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Link Karma (x1.5)</p>
                                    <p className="text-2xl font-black text-white">{user.karma.link.toLocaleString()}</p>
                                    <p className="text-[10px] text-cyan-400/70 mt-1">Contribution: {(user.karma.link * 1.5).toLocaleString()} pts</p>
                                </div>
                                <div className="glass bg-white/5 p-5 rounded-2xl border-white/5">
                                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Account Age (x500)</p>
                                    <p className="text-2xl font-black text-white">{user.accountAge}</p>
                                    <p className="text-[10px] text-cyan-400/70 mt-1">Contribution: ~2,250 pts</p>
                                </div>
                                <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-5 rounded-2xl border border-cyan-500/20 shadow-lg">
                                    <p className="text-xs text-cyan-400 font-black uppercase mb-1">Total CityScore</p>
                                    <p className="text-3xl font-black text-white neon-text">{user.cityScore.toLocaleString()}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Building Preview Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass p-8 rounded-3xl border-white/10 overflow-hidden relative"
                        >
                            <div className="relative z-10">
                                <h2 className="text-xl font-bold mb-6">Building Preview</h2>
                                <div className="flex items-center gap-8">
                                    <div className="w-32 h-48 bg-gradient-to-t from-slate-900 to-slate-800 rounded-xl border border-white/10 flex items-center justify-center p-4 relative">
                                        <div className="w-16 h-32 bg-cyan-500/20 border border-cyan-400/30 rounded-t-sm shadow-[0_0_20px_rgba(0,242,254,0.1)]">
                                            {/* Windows effect */}
                                            <div className="grid grid-cols-2 gap-2 p-2 h-full">
                                                {Array.from({ length: 8 }).map((_, i) => (
                                                    <div key={i} className={`h-2 rounded-sm ${Math.random() > 0.3 ? 'bg-yellow-400/50 shadow-[0_0_5px_rgba(250,204,21,0.5)]' : 'bg-slate-700'}`} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white mb-2 underline decoration-cyan-500 decoration-4 underline-offset-4">Level 5 Skyscraper</h3>
                                        <p className="text-sm text-slate-400 mb-6 max-w-sm">Reserved for the elite of RedditCity. This building features neon lights, a rooftop terrace, and priority placement on the Grid.</p>
                                        <div className="flex gap-4">
                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                <Clock className="w-4 h-4" /> Next Recalculation: 2 days
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Background accent */}
                            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-cyan-600/5 blur-3xl rounded-full" />
                        </motion.div>

                        {/* Recent Top Posts Mockup */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Top Content</h3>
                            {[1, 2].map(i => (
                                <div key={i} className="glass p-5 rounded-2xl border-white/5 hover:bg-white/5 transition-all cursor-pointer flex justify-between items-center group">
                                    <div>
                                        <p className="text-sm font-medium group-hover:text-cyan-400 transition-colors">How I built a gamified city with Reddit API...</p>
                                        <p className="text-[10px] text-slate-400 mt-1">Submitted to r/webdev • 12.4k upvotes</p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-cyan-400" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
