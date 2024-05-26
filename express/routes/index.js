const express = require('express');
const { authenticateToken } = require('../auth');
const router = express.Router();

router.get('/secure', authenticateToken, (req, res) => {
  res.send('Secure route accessed successfully!');
});

module.exports = router;