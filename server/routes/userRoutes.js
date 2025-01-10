const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getProfile);

// Example for Admin-only access
router.get('/admin', protect, authorize('admin'), (req, res) => {
    res.json({ message: 'Admin content' });
});

module.exports = router;
