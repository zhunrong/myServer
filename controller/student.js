const mysql = require('mysql');

class Student {
    constructor(options) {
        this.host = options.host;
        this.user = options.user;
        this.password = options.password;
        this.database = options.database;
        this.tableName = options.tableName;
    }

    mysqlCon() {
        return mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            multipleStatements: true
        })
    }

    put(req, res) {
        const stu = req.body;

        const connection = this.mysqlCon();

        connection.query(`INSERT INTO ${this.tableName} (name,gender,age) VALUES ('${stu.name}','${stu.gender}','${stu.age}')`, function (err, result) {
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
        let sql = `UPDATE ${this.tableName} SET ${condition.join(',')} WHERE id='${dataBody.id}'`;

        const connection = this.mysqlCon();

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
        const query = req.query;

        //查询条件
        let sql = `SELECT * FROM ${this.tableName}`;
        let condition = [];
        let count = 4;
        let page = 1;
        for (let key in query) {
            switch (key) {
                case 'name':
                case 'gender':
                case 'age':
                    condition.push(`${key}='${query[key]}'`);
                    break;
                case '_page':
                    page = query['_page'];
                    break;
                case '_count':
                    count = query['_count'];
                    break;
                default:
                    console.log('忽略的query')
            }
        }
        if (condition.length > 0) {
            sql += ' WHERE ';
            sql += condition.join(' AND ');
        }
        sql += ` LiMIT ${count} OFFSET ${count*(page-1)};`;
        sql += `SELECT COUNT(id) AS nums FROM ${this.tableName};`;

        const connection = this.mysqlCon();

        connection.query(sql, (err, result, fields) => {
            connection.end();
            if (err) {
                console.error(err);
                res.send(err);
                return;
            }

            // console.log('fields', fields);
            console.log(result);

            res.send({
                meta: {
                    page: page,
                    count: count,
                    totalCount: result[1][0]["nums"]
                },
                data: result[0]
            });

        })

    }

    delete(req, res) {
        const dataBody = req.body;
        if (!dataBody.id) {
            res.send('id不能为空');
            return;
        }

        const connection = this.mysqlCon();

        let sql = `DELETE FROM ${this.tableName} WHERE id='${dataBody.id}'`;
        connection.query(sql, function (err, result) {
            console.log(err, result);
            connection.end();
            if (err) {
                console.error(err);
                return;
            }

            res.send(result);
        })

    }


}


module.exports = new Student({
    host: 'localhost',
    user: 'zr_dev',
    password: 'YZ4371716',
    database: 'zr_dev',
    tableName: 'students'
})