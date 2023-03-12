const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema({
    username: {
        type: String,
        ref: 'user',
        required: true
    },
    inserted_records: {
        type: Number,
        default: 0
    },
    duplicates_found: {
        type: Number,
        default: 0
    },
    synced: {
        type: String,
        default: 'in_progress'  // could be completed / in_progress / failed
    }
}, {
    timestamps: true
});

module.exports = Upload = mongoose.model('upload', UploadSchema);