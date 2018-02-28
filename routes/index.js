const express = require('express');
const multer = require('multer');
const router = express.Router();

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
    console.log('body=', req.body);
    console.log('files=', req.files);


    res.send(req.body);
})


module.exports = router;