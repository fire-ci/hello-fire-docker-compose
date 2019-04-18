const db = require('../db');

module.exports = (app) => {

  app.route('/api/users').post((req, res, next) => {
    console.log(`POST /api/users`);

    const { firstname, lastname } = req.body;

    db('users').returning('id').insert({ firstname, lastname }).then(result => {
      const id = result[0];
      res.status(201).send({ id, firstname, lastname });
    }).catch(err => {
        console.log(`Error: Unable to create team: ${err.message}. ${err.stack}`);
        return next(err);
    });
  });

  app.route('/api/users').get((req, res, next) => {
    console.log(`GET /api/users`);

    db('users')
    .select('id', 'firstname', 'lastname')
    .then(users => res.status(200).send(users))
    .catch(err => {
        console.log(`Unable to fetch users: ${err.message}. ${err.stack}`);
        return next(err);
    });
  });

  app.route('/api/users/:user_id').get((req, res, next) => {
    const { user_id } = req.body;
    
    console.log(`GET /api/users/${user_id}`);

    db('users')
    .select('id', 'firstname', 'lastname')
    .where({ id: user_id })
    .first()
    .then(user => {
        if(!user) { 
          console.log(`User not found for id ${user_id}`);
          return res.status(404).send();
        }

        res.status(200).send(user);
    }).catch(err => {
        console.log(`Unable to fetch user with id ${user_id}: ${err.message}. ${err.stack}`);
        return next(err);
    });
  });
};
