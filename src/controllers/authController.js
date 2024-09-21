const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

exports.register = (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: 'Error hashing password' });
        }

        const query = 'INSERT INTO users (name, email, password, status, registration_time) VALUES (?, ?, ?, ?, NOW())';
        connection.query(query, [name, email, hashedPassword, 'active'], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error inserting user' });
            }
            res.status(201).json({ message: 'User registered' });
        });
    });
};


exports.login = (req, res) => {
    const { email, password } = req.body;

    connection.query('SELECT 1', (err, results) => {
        if (err) {
            console.log('Database connection error', err);
        } else {
            console.log('Database connection successful');
        }
    });


    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (err, results) => {
        console.log('restuls 1', results);

        if (err) {
            return res.status(500).json({ error: 'Error fetching user' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];
        if (user.status === 'blocked') {
            return res.status(403).json({ error: 'User is blocked' });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: 'Error comparing passwords' });
            }

            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            console.log('JWT: ', process.env.JWT_SECRET);


            const queryUpdateDate = 'UPDATE users SET last_login_time=NOW() WHERE id = ?';
            connection.query(queryUpdateDate, [user.id], (err, results) => {
                console.log('restuls 2', results);
                if (err) {
                    console.log(err);
                }
            });

            // res.status(200).json({ token });
            res.status(200).json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    lastLogin: user.last_login_time,
                }
            });
        });
    });
};
