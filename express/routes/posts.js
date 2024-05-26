const express = require('express');
const Post = require('../models/post');
const { authenticateToken } = require('../auth');
const router = express.Router();

router.post('/', authenticateToken, (req, res) => {});

router.get('/', authenticateToken, (req, res) => {});

router.delete('/:postId', authenticateToken, (req, res) => {});

router.put('/:postId', authenticateToken, (req, res) => {});

module.exports = router;
