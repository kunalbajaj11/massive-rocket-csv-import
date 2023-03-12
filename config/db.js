const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to DB');
    } catch (error) {
        console.log('Error ', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;