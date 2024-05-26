const express = require('express');
const Post = require('../models/post');
const { authenticateToken } = require('../auth');
const router = express.Router();

router.post('/', authenticateToken, (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  const newPost = new Post({
    title,
    content,
    userId,
  });

  newPost.save((err, post) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(post);
    }
  });
});

router.get('/', authenticateToken, (req, res) => {
  const userId = req.user.id;
  Post.find({ userId }, (err, posts) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(posts);
    }
  });
});

router.delete('/:postId', authenticateToken, (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;
  Post.findByIdAndDelete(postId, (err, post) => {
    if (err) {
      res.status(500).send(err);
    } else if (!post) {
      res.status(404).send('Post not found');
    } else if (post.userId !== userId) {
      res.status(403).send('Unauthorized');
    } else {
      res.status(200).send('Post deleted successfully');
    }
  });
});

router.put('/:postId', authenticateToken, (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;
  const { title, content } = req.body;
  Post.findByIdAndUpdate(
    postId,
    { title, content },
    { new: true },
    (err, post) => {
      if (err) {
        res.status(500).send(err);
      } else if (!post) {
        res.status(404).send('Post not found');
      } else if (post.userId !== userId) {
        res.status(403).send('Unauthorized');
      } else {
        res.status(200).send(post);
      }
    }
  );
});

module.exports = router;
