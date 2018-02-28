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

//controller
const student = require('../controller/student');

//获取学生数据
router.get('/students', student.get);

//新增学生数据
router.put('/students', student.put);

//修改学生数据
router.post('/students', student.post);

//删除学生信息
router.delete('/students', student.delete);


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


module.exports = router;