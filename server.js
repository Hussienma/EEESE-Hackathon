const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use("/", require("./routes/auth"));
app.use("/users/", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
