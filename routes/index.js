const express = require('express');

//mysql driver
const mysql = require('mysql');

const router = express.Router();


router.get('/students', (req, res) => {


    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'zr_dev',
        password: 'YZ4371716',
        database: 'zr_dev'
    });

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        connection.query('SELECT * FROM students', function (err, result) {
            console.log(err, result);

            res.send(result);
        })

    });

})


router.put('/students', (req, res) => {

    const stu=req.body;

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'zr_dev',
        password: 'YZ4371716',
        database: 'zr_dev'
    });

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        connection.query(`INSERT INTO students (name,gender,age) VALUES ('${stu.name}','${stu.gender}','${stu.age}')`, function (err, result) {
            console.log(err, result);

            res.send(result);
        })

    });

})


module.exports = router;