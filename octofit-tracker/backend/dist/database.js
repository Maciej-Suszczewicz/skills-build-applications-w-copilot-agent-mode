"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoUri = exports.databaseName = exports.mongoose = void 0;
exports.connectDatabase = connectDatabase;
exports.disconnectDatabase = disconnectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
exports.databaseName = 'octofit_db';
exports.mongoUri = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${exports.databaseName}`;
async function connectDatabase() {
    return mongoose_1.default.connect(exports.mongoUri);
}
async function disconnectDatabase() {
    return mongoose_1.default.disconnect();
}
