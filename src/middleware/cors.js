const cors = require("cors");

const corsOptions = {
    origin: "https://fascinating-capybara-117da0.netlify.app",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
};


module.exports = cors(corsOptions);
