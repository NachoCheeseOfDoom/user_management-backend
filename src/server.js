require('dotenv').config();
const corsMiddleware = require("./middleware/cors")
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const connection = require('./config/db');

connection.query('ALTER TABLE users MODIFY email VARCHAR(255)', (err) => {
    if (err) {
        console.error('Error modifying email column: ', err);
    } else {
        console.log('Email column modified to VARCHAR(255)');

        // Now add the unique constraint
        connection.query('ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email)', (err) => {
            if (err) {
                console.error('Error adding unique constraint: ', err);
            } else {
                console.log('Unique constraint added to the email field');
            }
        });
    }
});



const app = express();
app.use(corsMiddleware);
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

