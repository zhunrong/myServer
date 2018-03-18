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


        console.log(req.body);

        const nickname = req.body.nickname;
        const password = req.body.password;

        if (!nickname) {
            res.send('用户名不能为空');
            return;
        } else if (!password) {
            res.send('密码不能为空');
            return;
        }

        const conn = this.mysqlConn();
        conn.query(`select * from ${this.tableName} where nickname='${nickname}'`, (err, result) => {

            if (err) {
                console.error(err);
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

        console.log(req.body);

        const nickname = req.body.nickname;
        const password = req.body.password;

        if (!nickname) {
            res.send('用户名不能为空');
            return;
        } else if (!password) {
            res.send('密码不能为空');
            return;
        }

        const conn = this.mysqlConn();
        conn.query(`select * from ${this.tableName} where nickname='${nickname}'`, (err, result) => {

            if (err) {
                console.error(err);
                return;
            }
            if (result.length === 0) {

                conn.query(`insert into ${this.tableName} (nickname,password) values ('${nickname}','${password}')`, (err, result) => {
                    conn.end();
                    if (err) {
                        console.error(err);
                        return;
                    }

                    console.log(result);
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