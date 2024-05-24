const mysql = require('mysql');
const mongoose = require('mongoose');

const mysqlConnect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'serverfarm_db',
});

mysqlConnect.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL successfully!');
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

module.exports = { mysqlConnect, mongoose };
