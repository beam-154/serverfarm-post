const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const { secretKey } = require('../auth');
const User = require('../models/user');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.log('Login error: ', error);
    res.status(500).send(error);
  }
});

router.post('/logout', (req, res) => {
  res.status(200).send('Logged out successfully');
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: username,
      email,
      password: hashedPassword,
    });
    res.status(201).send(user);
  } catch (err) {
    console.log('Registration error: ', err);
    res.status(500).send(err);
  }
});

module.exports = router;
