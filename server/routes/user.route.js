const express = require('express');
const router = express.Router();
const { signin, signup, profile } = require('../controllers/user.controller.js');

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/profile/:id',profile)

module.exports = router;