const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
};

module.exports = cors(corsOptions);
