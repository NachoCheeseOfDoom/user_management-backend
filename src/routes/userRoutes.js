const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, userController.listUsers);
router.post('/block/:id', authenticateToken, userController.blockUser);
router.post('/unblock/:id', authenticateToken, userController.unblockUser);
router.delete('/:id', authenticateToken, userController.deleteUser);
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'Test route works!' });
});


module.exports = router;
