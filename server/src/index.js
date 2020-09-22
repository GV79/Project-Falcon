const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const app = express();
const port = 3030;
const allowedOrigins = ['http://localhost:3000'];

require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
  allowedOrigins.push('https://infallible-blackwell-0b463a.netlify.app/');
}

// if (process.env.NODE_ENNV)

/* General Middleware */
app.use(helmet()); // HTTP security configs
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-'],
  })
); // for cross domain clientside-server communication
app.use(express.json());
app.use(compression());

/* Importing routers */
const userRouter = require('../routes/user-route');
const formRouter = require('../routes/forms-route');
const responseRouter = require('../routes/responses-route');

app.use('/api/users', userRouter);
app.use('/api/forms', formRouter);
app.use('/api/responses', responseRouter);

/* Database Setup w/ knex */
const { Model } = require('objection');
const Knex = require('knex');

const knex = Knex({
  client: 'postgresql',
  useNullAsDefault: true,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

Model.knex(knex);

app.get('/', async (req, res) => {
  res.status(202).send('[GV79] Project Falcon Express.js API - Endpoints will be served from /api');
});

/* Starting server */
app.listen(process.env.PORT || port, () => {
  console.log(`Starting server on localhost:${port}`);
});
