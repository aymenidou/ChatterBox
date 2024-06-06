const express = require('express');
const { updateUser } = require('../controllers/auth');
const router = express.Router();
const auth = require('../middleware/auth'); // Ensure this middleware checks for valid tokens


router.post('/update', auth, updateUser);

module.exports = router;