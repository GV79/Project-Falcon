exports.up = (knex) => {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username');
      table.string('password');
      table.string('salt');
    })
    .createTable('forms', (table) => {
      table.increments('id').primary();
      table.string('uuid');
      table.string('title');
      table.string('description');
      table.boolean('status');
      table.integer('ownerId').unsigned().references('id').inTable('users').onDelete('SET NULL').index();
      table.json('fields'); // array containing JSON fields (question + type)
    })
    .createTable('responses', (table) => {
      table.increments('id').primary();
      table.integer('formId').unsigned().references('id').inTable('forms').onDelete('SET NULL').index();
      table.json('answers'); // array containing answers (question id + corresponding user answer)
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('responses').dropTableIfExists('forms').dropTableIfExists('users');
};
