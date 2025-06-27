// const express = require('express');
// const { signup, login } = require('./authController');

// const router = express.Router();

// router.post('/signup', signup);
// router.post('/login', login);

// module.exports = router;

const express = require('express');
const { signup, login } = require('./authController');
const verifyToken = require('./auth'); // Import your verifyToken middleware

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// NEW: Add the token validation endpoint
// This endpoint will use the verifyToken middleware.
// If verifyToken successfully validates the token, it calls next(),
// and then the (req, res) => {} function is executed, sending valid: true.
router.post('/validate', verifyToken, (req, res) => {
  // If we reach this point, the verifyToken middleware has successfully
  // validated the token and called next().
  // So, we can confidently send back a success response.
  res.json({ valid: true, message: 'Token is valid' });
});

module.exports = router;
