const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('serverfarm_post_db', 'root', 'password', {
  host: 'localhost',
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
  .connect('mongodb://localhost:27017/serverfarm_post_db', {
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
