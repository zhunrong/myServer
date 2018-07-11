const express = require('express');
const router = express.Router();

//controller
const student = require('../../controller/student/student');

//获取学生数据
router.get('/students', student.get);

//新增学生数据
router.put('/students', student.put);

//修改学生数据
router.post('/students', student.post);

//删除学生信息
router.delete('/students', student.delete);


module.exports = app => {
    app.use(router);
}