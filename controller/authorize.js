const mysql = require('mysql');

class Authorize {

    constructor(options) {
        this.host = options.host;
        this.user = options.user;
        this.password = options.password;
        this.database = options.database;
        this.tableName = options.tableName;
    }

    mysqlConn() {
        return mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            multipleStatements: true
        })
    }

    login(req, res) {

        const username = req.body.username;
        const password = req.body.password;

        if (!username) {
            res.send('用户名不能为空');
            return;
        } else if (!password) {
            res.send('密码不能为空');
            return;
        }

        const conn = this.mysqlConn();
        conn.query(`select * from ${this.tableName} where username='${username}'`, (err, result) => {

            if (err) {
                console.error(err);
                res.send(err);
                return;
            }
            if (result.length === 0) {
                res.send('用户不存在');
                return;
            }

            const user = result[0];

            if (user.password != password) {
                res.send('密码错误');
                return;
            }

            req.session.uid = user.id;
            res.send('登陆成功');

        })

        conn.end();


    }

    register(req, res) {


        const username = req.body.username;
        const password = req.body.password;

        if (!username) {
            res.send('用户名不能为空');
            return;
        } else if (!password) {
            res.send('密码不能为空');
            return;
        }

        const conn = this.mysqlConn();
        conn.query(`select * from ${this.tableName} where username='${username}'`, (err, result) => {

            if (err) {
                console.error(err);
                res.send(err);
                return;
            }
            if (result.length === 0) {

                conn.query(`insert into ${this.tableName} (username,password) values ('${username}','${password}')`, (err, result) => {
                    conn.end();
                    if (err) {
                        console.error(err);
                        res.send(err);
                        return;
                    }

                    res.send('注册成功');

                })

                return;
            }
            conn.end();

            res.send('用户已存在');

        })



    }

}

module.exports = new Authorize({
    host: 'localhost',
    user: 'zr_dev',
    password: 'YZ4371716',
    database: 'zr_dev',
    tableName: 'user'
})