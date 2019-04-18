const db = require('.');
const schema = db.schema;

console.log(`Creating tables ...`);

schema
  .hasTable('users').then(function(exists) {
    if (!exists) {
      console.log(`Creating table 'users'`);
      return schema.createTable('users', function (table) {
        table.increments();
        table.string('firstname').notNullable();
        table.string('lastname').notNullable();
        table.timestamps(true, true);
     })
    }
  }).then(() => {
    console.log(`Tables created succesfully`);
    process.exit(0);
  }).catch(err => {
    console.log(`Unable to init tables : ${err}`);
    process.exit(1);
  });