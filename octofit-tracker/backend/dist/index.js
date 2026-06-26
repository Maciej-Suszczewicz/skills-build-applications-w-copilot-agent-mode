"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.json({
        name: 'OctoFit Tracker API',
        baseUrl,
        endpoints: [
            '/api/users/',
            '/api/teams/',
            '/api/activities/',
            '/api/leaderboard/',
            '/api/workouts/',
        ],
    });
});
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', baseUrl });
});
app.get('/api/users/', async (_req, res, next) => {
    try {
        const users = await models_1.User.find().sort({ username: 1 });
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/teams/', async (_req, res, next) => {
    try {
        const teams = await models_1.Team.find().populate('members').sort({ name: 1 });
        res.json(teams);
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/activities/', async (_req, res, next) => {
    try {
        const activities = await models_1.Activity.find().populate('userId').sort({ completedAt: -1 });
        res.json(activities);
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/leaderboard/', async (_req, res, next) => {
    try {
        const leaderboard = await models_1.LeaderboardEntry.find().sort({ rank: 1, points: -1 });
        res.json(leaderboard);
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/workouts/', async (_req, res, next) => {
    try {
        const workouts = await models_1.Workout.find().sort({ difficulty: 1, title: 1 });
        res.json(workouts);
    }
    catch (error) {
        next(error);
    }
});
app.use((error, _req, res, _next) => {
    console.error('API request failed', error);
    res.status(500).json({ error: 'Internal server error' });
});
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    app.listen(port, () => {
        console.log(`OctoFit backend listening at ${baseUrl}`);
    });
})
    .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
});
