const express = require("express");
require("./config/db");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("The server is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

