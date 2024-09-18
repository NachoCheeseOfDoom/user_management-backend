const userModel = require('../models/userModel');

exports.listUsers = (req, res) => {
    userModel.getAllUsers((err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: "Error fetching users" });
        }
        res.json(results);
    });
};

exports.blockUser = (req, res) => {
    const userId = req.params.id;
    userModel.blockUserById(userId, (err, results) => {
        if (err) {
            console.error('Error blocking user:', err);
            return res.status(500).json({ error: 'Error blocking user' });
        }
        res.status(200).json({ message: `User with ID ${userId} has been blocked` });
    });
};

exports.unblockUser = (req, res) => {
    const userId = req.params.id;
    userModel.unblockUserById(userId, (err, results) => {
        if (err) {
            console.error('Error unblocking user:', err);
            return res.status(500).json({ error: 'Error unblocking user' });
        }
        res.status(200).json({ message: `User with ID ${userId} has been unblocked` });
    });
};

exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    userModel.deleteUserById(userId, (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Error deleting user' });
        }
        res.status(200).json({ message: `User with ID ${userId} has been deleted` });
    });
};
