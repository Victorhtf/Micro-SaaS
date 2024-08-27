import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.SERVER_PORT || 3008;

app.use(express.json());
app.use(routes);

const startServer = async () => {
  console.log('\n[SERVER] Server starting.');

  if (!process.env.MONGODB_URI) {
    console.log('MONGODB_URI its not defined in .env');
    throw new Error();
  }

  try {
    app.listen(port, () => {
      console.log(`[SERVER] Server running on port ${port}.\n`);
    });
  } catch (error) {
    console.error('[MONGO_DB] Error connecting to MongoDB.', error);
    process.exit(1);
  }
};

startServer();
