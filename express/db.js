const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');

const sequelize = new Sequelize('serverfarm_db', 'root', 'password', {
  host: 'mysql',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

mongoose
  .connect('mongodb://mongodb:27017/serverfarm_post_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

module.exports = { sequelize, mongoose };
