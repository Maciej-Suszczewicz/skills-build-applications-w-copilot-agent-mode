import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const userIds = {
    maya: new mongoose.Types.ObjectId(),
    jordan: new mongoose.Types.ObjectId(),
    priya: new mongoose.Types.ObjectId(),
    diego: new mongoose.Types.ObjectId(),
  };

  const users = await User.insertMany([
    {
      _id: userIds.maya,
      username: 'maya-pace',
      email: 'maya.pace@example.com',
      displayName: 'Maya Pace',
      team: 'Cardio Crew',
    },
    {
      _id: userIds.jordan,
      username: 'jordan-lift',
      email: 'jordan.lift@example.com',
      displayName: 'Jordan Lift',
      team: 'Iron Collective',
    },
    {
      _id: userIds.priya,
      username: 'priya-flow',
      email: 'priya.flow@example.com',
      displayName: 'Priya Flow',
      team: 'Cardio Crew',
    },
    {
      _id: userIds.diego,
      username: 'diego-core',
      email: 'diego.core@example.com',
      displayName: 'Diego Core',
      team: 'Mobility Makers',
    },
  ]);

  await Team.insertMany([
    {
      name: 'Cardio Crew',
      mascot: 'Lightning Sneaker',
      members: [userIds.maya, userIds.priya],
    },
    {
      name: 'Iron Collective',
      mascot: 'Kettlebell Comet',
      members: [userIds.jordan],
    },
    {
      name: 'Mobility Makers',
      mascot: 'Stretch Star',
      members: [userIds.diego],
    },
  ]);

  await Activity.insertMany([
    {
      userId: userIds.maya,
      type: 'Trail run',
      durationMinutes: 42,
      caloriesBurned: 410,
      completedAt: new Date('2026-06-24T13:30:00Z'),
    },
    {
      userId: userIds.jordan,
      type: 'Strength training',
      durationMinutes: 55,
      caloriesBurned: 520,
      completedAt: new Date('2026-06-25T17:45:00Z'),
    },
    {
      userId: userIds.priya,
      type: 'Indoor cycling',
      durationMinutes: 38,
      caloriesBurned: 360,
      completedAt: new Date('2026-06-25T11:15:00Z'),
    },
    {
      userId: userIds.diego,
      type: 'Core and mobility',
      durationMinutes: 30,
      caloriesBurned: 225,
      completedAt: new Date('2026-06-26T08:00:00Z'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    { userId: userIds.jordan, username: 'jordan-lift', points: 1840, rank: 1 },
    { userId: userIds.maya, username: 'maya-pace', points: 1715, rank: 2 },
    { userId: userIds.priya, username: 'priya-flow', points: 1630, rank: 3 },
    { userId: userIds.diego, username: 'diego-core', points: 1495, rank: 4 },
  ]);

  await Workout.insertMany([
    {
      title: 'Morning Momentum Run',
      description: 'A steady aerobic run with short cadence pickups for building weekly consistency.',
      difficulty: 'beginner',
      durationMinutes: 35,
      activities: ['Warm-up walk', 'Easy run', 'Cadence pickups', 'Cool down'],
    },
    {
      title: 'Full-Body Strength Builder',
      description: 'Compound lifts and accessory sets for balanced strength development.',
      difficulty: 'intermediate',
      durationMinutes: 50,
      activities: ['Squats', 'Push press', 'Rows', 'Farmer carry'],
    },
    {
      title: 'Advanced Endurance Circuit',
      description: 'A higher-intensity mixed circuit for athletes ready for sustained effort.',
      difficulty: 'advanced',
      durationMinutes: 45,
      activities: ['Bike intervals', 'Burpees', 'Kettlebell swings', 'Plank holds'],
    },
  ]);

  console.log(`Seeded ${users.length} users plus teams, activities, leaderboard entries, and workouts.`);
}

seedDatabase()
  .catch((error: unknown) => {
    console.error('Failed to seed octofit_db', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });