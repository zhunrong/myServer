const express = require('express');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: 'file/uploads',
        filename: (req, file, cb) => {
            console.log(file)
            cb(null, file.originalname);
        }
    })
})




router.post('/upload', upload.array('emoji', 10), (req, res) => {

    res.send(req.files);
})

router.get('/files', (req, res) => {

    const dir = path.join(__dirname, '../file/uploads')
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(files);

        const result = {};
        files.forEach(file => {
            result[file] = `/file/uploads/${file}`;
        })

        res.send(result);

    })

})

module.exports = router