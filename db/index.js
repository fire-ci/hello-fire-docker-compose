const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'db',
    user : 'john',
    password : 'mysecretpassword',
  },
});

module.exports = knex;