const { sequelize } = require('../db');

const User = sequelize.define('User', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.sync({ force: false })
  .then(() => {
    console.log('User table created successfully!');
  })
  .catch((err) => {
    console.error('Unable to create table : ', err);
  });
