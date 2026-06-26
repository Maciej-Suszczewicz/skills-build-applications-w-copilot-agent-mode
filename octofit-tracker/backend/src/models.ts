import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    displayName: { type: String, required: true },
    team: { type: String },
  },
  { collection: 'users', timestamps: true }
);

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mascot: { type: String },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { collection: 'teams', timestamps: true }
);

const activitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    completedAt: { type: Date, default: Date.now },
  },
  { collection: 'activities', timestamps: true }
);

const leaderboardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  { collection: 'leaderboard', timestamps: true }
);

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true },
    activities: [{ type: String }],
  },
  { collection: 'workouts', timestamps: true }
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);