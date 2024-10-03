import { MongoClient } from "mongodb";
import Movie from './routes/Movie'; // Adjust the path as necessary
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import the cors package

async function start() {
  try {
    const app = express();

    // Enable CORS for all routes
    app.use(cors());

    const mongo = await MongoClient.connect('mongodb://localhost:27017/movies'); 
    app.db = mongo.db();

    // Body parser middleware
    app.use(bodyParser.json({ limit: '5mb' }));

    // Routes
    app.use('/api/movies', Movie); // Use the movies router

    // Start server
    app.listen(2000, () => {
      console.log('Server running on port 2000');
    });

  } catch (error) {
    console.error(error);
  }
}

start();