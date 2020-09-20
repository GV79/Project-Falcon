const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');

const app = express();
const port = 3030 || process.env.PORT;
const allowedOrigins = ['http://localhost:3000'];
dotenv.config();

/* Importing routers */
// const authRouter = require('./routes/auth-route');
// const workoutRouter = require('./routes/workout-route');
// const wgerRouter = require('./routes/wger-route');

/* Middleware */
app.use(helmet()); // best security HTTP configs
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-'],
  })
); // for cross domain clientside-server communication
app.use(express.json());
app.use(compression());

/* Establishing MongoDB connection and then starting up server */
app.get('/', async (req, res) => {
  res.status(202).send('[GV79] Project Falcon Express.js API');
});

/* Starting server */
app.listen(port, () => {
  console.log(`Starting server on localhost:${port}`);
});
