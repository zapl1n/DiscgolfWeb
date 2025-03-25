const express = require('express');
const router = express.Router();
const {approvePosts, rejectPosts} = require('../controllers/PostController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/approve', authMiddleware, approvePosts);
router.post('/reject', authMiddleware, rejectPosts);