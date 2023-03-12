const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./config/db.js");
const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();
app.use(express.json({ extended: false }));
app.use(fileUpload());

// Connect DB
connectDB()
app.use(cors());

// Define routes
app.use('/api/users', require("./routes/api/users"));
app.use('/api/auth', require("./routes/api/auth"));
app.use('/api/uploads', require("./routes/api/uploads"));
app.use('/api/uploadrecords', require("./routes/api/uploadrecords"));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Port ${PORT}`));