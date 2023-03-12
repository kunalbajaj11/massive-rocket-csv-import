const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const csv = require('csvtojson');
const fs = require("fs");
const _ = require("lodash");
const UploadRecords = require("../../models/UploadRecords");

// const { Transform } = require('stream');

// const trasnsformStream = new Transform({
//     transform(chunk, en, cb) {
//         const obj = JSON.parse(chunk);
//     }
// })

router.post('/', auth, async (req, res) => {
    // console.log(req);
    const upload_id = req.query.refId;
    // read req.query.refId and send update request to upload route to update status
    if (req.files === null) {
        return res.status(400).json({ 'msg': 'No file uploaded' });
    }

    const results = [];
    const file = req.files.file;
    const path = `${process.env.ROOT}/uploads/${file.name}`;
    // const outPath = `${process.env.ROOT}/uploads/outstream.json`;
    file.mv(path, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        fs.createReadStream(path).pipe(csv())       //.pipe(outPath);   {downstreamFormat: 'array'}
            .on('data', (data) => {
                // console.log(data);
                results.push(JSON.parse(data.toString()));
            })
            .on('end', async () => {
                const resp = await batchCreate(results);
                // send request to upload route
                const inserted_records = resp.upsertedCount;
                const duplicates_found = resp.matchedCount;

                fetch(`${process.env.BASE_ROUTE}/api/uploads`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        "upload_id": upload_id,
                        "synced" : "completed",
                        "inserted_records": inserted_records,
                        "duplicates_found": duplicates_found
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        // 'x-auth-token': process.env.
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        // console.log(data)
                        res.json(resp).status(200)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            });
    })
})

const batchCreate = async (dataList) => {
    const result = [];
    const bulkOperations = [];
    if (dataList.length > 500) {
        while (dataList.length > 0) {
            const data = dataList.splice(0, 5);
            _.forEach(data, record => {
                bulkOperations.push({
                    updateOne: {
                        filter: {
                            email: record.email
                        },
                        update: {
                            $set: record
                        },
                        upsert: true
                    },
                });
            });
            // result.push(await UploadRecords.bulkWrite(bulkOperations));
        }
    } else {
        _.forEach(dataList, record => {
            bulkOperations.push({
                updateOne: {
                    filter: {
                        email: record.email
                    },
                    update: {
                        $set: record
                    },
                    upsert: true
                },
            });
        });
        // result.push(await UploadRecords.bulkWrite(bulkOperations));
    }
    return await UploadRecords.bulkWrite(bulkOperations);
    // result.push(res);
    // console.log(result);
    // return result;
}

module.exports = router;