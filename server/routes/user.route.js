const express = require('express');
const router = express.Router();
const axios = require('axios');
const { signin } = require('../controllers/user.controller.js');

router.post('/signin', signin);

module.exports = router;
