import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import fs from 'node:fs';
import Tour from '../../models/tourModels.js';
import Review from '../../models/reviewModel.js';
import User from '../../models/userModel.js';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const filePath = fileURLToPath(import.meta.url);
const __dirname = dirname(filePath);

configDotenv({ path: './config.env', debug: true, encodeing: 'UTF-8' });

const DB = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB)

// Read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));



//import data into DB
const importData = async () => {
    try{
        await Tour.create(tours);
        await User.create(users, { validateBeforeSave: false});
        await Review.create(reviews);
        process.exit();
    }catch(err){
        console.error(err);
    }
}

// Delete all data from tours collection
const deleteData = async() => {
    try{
        await Tour.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        process.exit();
    }catch(err){
        console.error(err);
    }
}

if(process.argv[2] === '--import'){
    importData();
}else if(process.argv[2] === '--delete'){
    deleteData();
}

