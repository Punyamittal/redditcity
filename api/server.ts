import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import dbConnect from '../lib/mongodb';
import User from '../models/User';
import { calculateCityScore, getBuildingLevel } from '../utils/cityScore';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const REDDIT_REDIRECT_URI = process.env.REDDIT_REDIRECT_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Connect to MongoDB
dbConnect();

// Reddit Auth Routes
app.get('/auth/reddit', (req, res) => {
    const scope = 'identity profile history';
    const state = Math.random().toString(36).substring(7);
    const redditAuthUrl = `https://www.reddit.com/api/v1/authorize?client_id=${REDDIT_CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${REDDIT_REDIRECT_URI}&duration=permanent&scope=${scope}`;
    res.redirect(redditAuthUrl);
});

app.get('/auth/reddit/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const auth = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString('base64');

        // 1. Get Access Token
        const tokenResponse = await axios.post(
            'https://www.reddit.com/api/v1/access_token',
            `grant_type=authorization_code&code=${code}&redirect_uri=${REDDIT_REDIRECT_URI}`,
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const { access_token } = tokenResponse.data;

        // 2. Fetch User Profile
        const userResponse = await axios.get('https://oauth.reddit.com/api/v1/me', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const redditUser = userResponse.data;
        const { name, id, comment_karma, link_karma, created_utc } = redditUser;

        // 3. Calculate Score and Level
        const accountCreated = new Date(created_utc * 1000);
        const cityScore = calculateCityScore(comment_karma, link_karma, accountCreated);
        const buildingLevel = getBuildingLevel(cityScore);

        // 4. Update/Create User in DB
        let user = await User.findOne({ redditId: id });

        if (!user) {
            user = new User({
                redditId: id,
                username: name,
                accessToken: access_token,
                totalKarma: comment_karma + link_karma,
                linkKarma: link_karma,
                commentKarma: comment_karma,
                accountCreated,
                cityScore,
                buildingLevel,
                buildingPosition: {
                    x: Math.floor(Math.random() * 20),
                    y: Math.floor(Math.random() * 20)
                }
            });
        } else {
            user.totalKarma = comment_karma + link_karma;
            user.linkKarma = link_karma;
            user.commentKarma = comment_karma;
            user.cityScore = cityScore;
            user.buildingLevel = buildingLevel;
            user.accessToken = access_token;
        }

        await user.save();

        // 5. Create JWT
        const token = jwt.sign({ userId: user._id, username: name }, JWT_SECRET, { expiresIn: '7d' });

        // 6. Redirect to Frontend with Token
        res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/?token=${token}`);

    } catch (error: any) {
        console.error('Auth error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Authentication failed' });
    }
});

// API Routes
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({}, 'username cityScore buildingLevel buildingPosition district').limit(100);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.get('/api/leaderboard', async (req, res) => {
    try {
        const leaderboard = await User.find({}, 'username cityScore buildingLevel')
            .sort({ cityScore: -1 })
            .limit(10);
        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
