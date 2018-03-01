const express = require('express');
const router = express.Router();


//controller
const student = require('../controller/student');

//获取学生数据
router.get('/students', student.get.bind(student));

//新增学生数据
router.put('/students', student.put.bind(student));

//修改学生数据
router.post('/students', student.post.bind(student));

//删除学生信息
router.delete('/students', student.delete.bind(student));


module.exports = router;