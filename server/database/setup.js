const { Model } = require('objection');
const Knex = require('knex');

// Initialize knex.
const knex = Knex({
    client: 'pg',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE,
    }
});

// Give the knex instance to objection.
Model.knex(knex);

export const knex;