const express = require('express');
const router = express.Router();
const { signin, signup, profile, userById } = require('../controllers/user.controller.js');

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/profile/:id',profile)
router.get('/user_by_id/:id',userById)

module.exports = router;