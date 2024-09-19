require('dotenv').config();
const corsMiddleware = require("./middleware/cors")
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();
app.use(corsMiddleware);
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

