const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./models/person');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

const router = require('./routes')(app, Person);

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('mongo connection Success!');
});

mongoose.connect('mongodb://localhost/joytogether');

const server = app.listen(port, () => {
  console.log('Express server connect on ' + port);
});
