const mysql = require('mysql');

class Student {
    constructor() {

    }

    put(req, res) {
        const stu = req.body;

        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'zr_dev',
            password: 'YZ4371716',
            database: 'zr_dev'
        });

        connection.query(`INSERT INTO students (name,gender,age) VALUES ('${stu.name}','${stu.gender}','${stu.age}')`, function (err, result) {
            console.log(err, result);

            res.send(result);
        })

        connection.end();
    }


    post(req, res) {
        const dataBody = req.body;
        if (!dataBody.id) {
            res.send('id不能为空');
            return;
        }

        let condition = [];
        for (let key in dataBody) {
            if (key === 'id') {
                continue;
            }
            condition.push(`${key}='${dataBody[key]}'`);
        }
        let sql = `UPDATE students SET ${condition.join(',')} WHERE id='${dataBody.id}'`;

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'zr_dev',
            password: 'YZ4371716',
            database: 'zr_dev'
        });

        connection.query(sql, function (err, result) {
            console.log(err, result);
            if (err) {
                console.error(err);
                return;
            }

            res.send(result);
        });

        connection.end();
    }

    get(req, res) {
        console.log(req.query);
        const query = req.query;

        //查询条件
        let sql = 'SELECT * FROM students';
        let condition = [];
        for (let key in query) {
            condition.push(`${key}='${query[key]}'`);
        }
        if (condition.length > 0) {
            sql += ' WHERE ';
            sql += condition.join(' AND ');
        }

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'zr_dev',
            password: 'YZ4371716',
            database: 'zr_dev'
        });

        connection.query(sql, function (err, result) {

            if (err) {
                console.error(err);
                return;
            }

            res.send(result);
        })

        connection.end();
    }

    delete(req, res) {
        const dataBody = req.body;
        if (!dataBody.id) {
            res.send('id不能为空');
            return;
        }

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'zr_dev',
            password: 'YZ4371716',
            database: 'zr_dev'
        });

        let sql = `DELETE FROM students WHERE id='${dataBody.id}'`;


        connection.query(sql, function (err, result) {
            console.log(err, result);
            if (err) {
                console.error(err);
                return;
            }

            res.send(result);
        })

        connection.end();
    }


}


module.exports = new Student()