const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

routes(app);

process.on('uncaughtException', function (err) {
  console.log(err.stack);
});

try {
  console.log("Starting web server...");

  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Fire CI Engine API server started on: ${port}`); // eslint-disable-line no-console
  });
} catch(error) {
  console.error(error.stack);
}

module.exports = app;
