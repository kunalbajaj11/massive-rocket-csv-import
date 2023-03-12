const express = require("express");
const auth = require("../../middleware/auth");
const Upload = require("../../models/Upload");
const router = express.Router();

router.post('/', auth, async (req, res) => {
    console.log(req.body);
    const { inserted_records, duplicates_found } = req.body;
    const userName = req.user.name;      // user added in auth middleware to req

    try {
        let upload = new Upload({
            username: userName,
            inserted_records,
            duplicates_found
        });

        const response = await upload.save();
        return res.status(201).json(response);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const data = await Upload.find({}).sort({'updatedAt': '-1'});
        // console.log(data);
        return res.status(200).send(data);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
})

router.put('/', async (req, res) => {
    try {
        const id = req.body.upload_id;
        const { synced, duplicates_found, inserted_records } = req.body;
        let record = await Upload.findOne({ _id: id });

        if (record) {
            record = await Upload.findOneAndUpdate({ _id: id }, { $set: { synced, duplicates_found, inserted_records } }, { new: true });
            return res.json(record);
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
})

module.exports = router;