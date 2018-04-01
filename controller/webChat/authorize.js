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


    register(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        if (!username) {
            res.status(400).send('用户名不能为空');
            return;
        }
        if (!password) {
            res.status(400).send('密码不能为空');
            return;
        }

        const conn = this.mysqlConn();
        conn.query(`select * from ${this.tableName} where username='${username}'`, (err, result) => {

            if (err) {
                console.error(err);
                return;
            }
            if (result.length === 0) {

                conn.query(`insert into ${this.tableName} (username,password) values ('${username}','${password}')`, (err, result) => {
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

    login(req, res) {
        res.send('login');
    }

}


module.exports = new Authorize({
    host: 'localhost',
    user: 'zr_dev',
    password: 'YZ4371716',
    database: 'web_chat',
    tableName: 'user'
})