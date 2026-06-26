import express from 'express';
import { connectDatabase } from './database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

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
    const users = await User.find().sort({ username: 1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

app.get('/api/teams/', async (_req, res, next) => {
  try {
    const teams = await Team.find().populate('members').sort({ name: 1 });
    res.json(teams);
  } catch (error) {
    next(error);
  }
});

app.get('/api/activities/', async (_req, res, next) => {
  try {
    const activities = await Activity.find().populate('userId').sort({ completedAt: -1 });
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

app.get('/api/leaderboard/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ rank: 1, points: -1 });
    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

app.get('/api/workouts/', async (_req, res, next) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, title: 1 });
    res.json(workouts);
  } catch (error) {
    next(error);
  }
});

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('API request failed', error);
  res.status(500).json({ error: 'Internal server error' });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit backend listening at ${baseUrl}`);
    });
  })
  .catch((error: unknown) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  });
