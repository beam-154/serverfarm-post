const express = require('express');
const Post = require('../models/post');
const { authenticateToken } = require('../auth');

const { sendMessage } = require('../kafka');
const router = express.Router();

router.post('/', authenticateToken, (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  const newPost = new Post({
    title,
    content,
    userId,
  });

  newPost
    .save()
    .then((post) => {
      res.status(201).send(post);
      sendMessage('posts', `New post created: ${post.title}`);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/', authenticateToken, (req, res) => {
  const userId = req.user.id;
  Post.find({ userId })
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.delete('/:postId', authenticateToken, (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;
  Post.findByIdAndDelete(postId)
    .then((post) => {
      if (!post) {
        res.status(404).send('Post not found');
      } else if (post.userId !== userId) {
        res.status(403).send('Unauthorized');
      } else {
        res.status(200).send('Post deleted successfully');
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.put('/:postId', authenticateToken, (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;
  const { title, content } = req.body;
  Post.findByIdAndUpdate(postId, { title, content }, { new: true })
    .then((post) => {
      if (!post) {
        res.status(404).send('Post not found');
      } else if (post.userId !== userId) {
        res.status(403).send('Unauthorized');
      } else {
        res.status(200).send(post);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
