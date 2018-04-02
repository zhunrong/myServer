const mysql = require('mysql');

class Base {
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

    /**
     * 查询数据
     * @param {Object} condition 
     */
    get(condition) {

        return new Promise((resolve, reject) => {

            const conditionText = this.stringify(condition, 'and');

            const conn = this.mysqlConn();

            let sql = null;
            if (conditionText) {
                sql = `select * from ${this.tableName} where ${conditionText}`;
            } else {
                sql = `select * from ${this.tableName}`;
            }

            conn.query(sql, (err, result) => {
                conn.end();

                if (err) {
                    reject(err);
                    return;
                }

                resolve(result);

            });
        })
    }

    /**
     * 新增一条数据
     * @param {Object} data 
     */
    post(data) {
        return new Promise((resolve, reject) => {

            const conn = this.mysqlConn();

            const keyArr = [];
            const valueArr = [];
            for (let key in data) {
                keyArr.push(key);
                valueArr.push(`'${data[key]}'`)
            }
            const keyText = keyArr.join(',');
            const valueText = valueArr.join(',');

            const sql = `insert into ${this.tableName} (${keyText}) values (${valueText})`;
            conn.query(sql, (err, result) => {
                conn.end();

                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            })

        })
    }

    /**
     * 根据条件修改数据
     * @param {Object} condition 
     * @param {Object} data 
     */
    put(condition, data) {
        return new Promise((resolve, reject) => {

            const dataText = this.stringify(data);
            const conditionText = this.stringify(condition);
            const sql = `update ${this.tableName} set ${dataText} where ${conditionText}`;

            const conn = this.mysqlConn();
            conn.query(sql, (err, result) => {
                conn.end();

                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            })

        })
    }

    /**
     * 删除数据
     * @param {Object} condition 
     */
    delete(condition) {
        return new Promise((resolve, reject) => {

            const conditionText = this.stringify(condition, 'and');

            if (!conditionText) {
                reject();
                return;
            }

            const conn = this.mysqlConn();

            const sql = `delete from ${this.tableName} where ${conditionText}`;

            conn.query(sql, (err, result) => {
                conn.end();

                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            })
        })

    }

    /**
     * 将数据对象转成符合sql格式的字符串
     * @param {Object} data 
     * @param {String} character 分割符
     */
    stringify(data, character = ',') {
        const dataArr = [];
        for (let key in data) {
            dataArr.push(`${key}='${data[key]}'`)
        }
        return dataArr.join(` ${character} `);
    }

}

module.exports = Base