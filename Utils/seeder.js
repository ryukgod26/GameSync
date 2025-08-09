// This code is written by ai
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { users, games } from '../data/sampleData.js'; // Import the data

// Import Mongoose models
import User from '../models/User.js';
import Game from '../models/Game.js';

// Load environment variables (like your MONGO_URI)
dotenv.config();

// Function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Connect to DB before running any functions
await connectDB();

// Function to import data
const importData = async () => {
  try {
    // 1. Clear existing data
    await User.deleteMany();
    await Game.deleteMany();

    // 2. Insert new data
    await Game.insertMany(games);
    // For users, we use User.create instead of insertMany.
    // This ensures our 'pre-save' middleware for password hashing runs for each user.
    await User.create(users);

    console.log('✅ Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Function to destroy data
const destroyData = async () => {
  try {
    // Clear all data
    await User.deleteMany();
    await Game.deleteMany();

    console.log('✅ Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Logic to run the script from the command line
// e.g., 'node utils/seeder.js -d' to destroy data
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

