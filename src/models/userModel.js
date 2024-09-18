const connection = require('../config/db');

exports.getAllUsers = (callback) => {
    const query = "SELECT * FROM users";
    connection.query(query, (err, results) => {
        callback(err, results);
    });
};

exports.blockUserById = (userId, callback) => {
    const query = "UPDATE users SET status='blocked' WHERE id = ?";
    connection.query(query, [userId], (err, results) => {
        callback(err, results);
    });
};

exports.unblockUserById = (userId, callback) => {
    const query = "UPDATE users SET status='active' WHERE id = ?";
    connection.query(query, [userId], (err, results) => {
        callback(err, results);
    });
};

exports.deleteUserById = (userId, callback) => {
    const query = "DELETE FROM users WHERE id = ?";
    connection.query(query, [userId], (err, results) => {
        callback(err, results);
    });
};
