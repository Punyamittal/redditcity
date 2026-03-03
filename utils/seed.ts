import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dbConnect from '../lib/mongodb';
import User from '../models/User';

dotenv.config();

const users = [
    {
        redditId: 'user1',
        username: 'KarmaKing',
        totalKarma: 150000,
        linkKarma: 50000,
        commentKarma: 100000,
        cityScore: 125000,
        buildingLevel: 5,
        district: 'Tech District',
        buildingPosition: { x: 5, y: 5 },
    },
    {
        redditId: 'user2',
        username: 'SnooCoder',
        totalKarma: 45000,
        linkKarma: 15000,
        commentKarma: 30000,
        cityScore: 48000,
        buildingLevel: 4,
        district: 'Meme Street',
        buildingPosition: { x: 12, y: 8 },
    },
    {
        redditId: 'user3',
        username: 'RedditLover',
        totalKarma: 12000,
        linkKarma: 4000,
        commentKarma: 8000,
        cityScore: 13500,
        buildingLevel: 3,
        district: 'Fitness Zone',
        buildingPosition: { x: 8, y: 15 },
    },
];

async function seed() {
    await dbConnect();
    await User.deleteMany({});
    await User.insertMany(users);
    console.log('Database seeded successfully');
    process.exit();
}

seed();
