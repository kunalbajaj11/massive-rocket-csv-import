const mongoose = require("mongoose");

const UploadRecordsSchema = new mongoose.Schema({
    upload: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'upload'
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    phone_number: {
        type: String,
    },
    // refId: {
    //     type: mongoose.Schema.Types.ObjectId
    // }
});

module.exports = UploadRecords = mongoose.model('upload_records', UploadRecordsSchema);