"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    displayName: { type: String, required: true },
    team: { type: String },
}, { collection: 'users', timestamps: true });
const teamSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    mascot: { type: String },
    members: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
}, { collection: 'teams', timestamps: true });
const activitySchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    completedAt: { type: Date, default: Date.now },
}, { collection: 'activities', timestamps: true });
const leaderboardSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
}, { collection: 'leaderboard', timestamps: true });
const workoutSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true },
    activities: [{ type: String }],
}, { collection: 'workouts', timestamps: true });
exports.User = mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
exports.LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardSchema);
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
