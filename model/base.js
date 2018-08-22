const mysql = require('mysql');

class Base {
    /**
     * create model
     * @param {String} host 
     * @param {String} user
     * @param {String} password 
     * @param {String} database
     * @param {String} tableName
     */
    constructor({
        host,
        user,
        password,
        database,
        tableName
    }) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
        this.tableName = tableName;
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
     * @param {Object} condition 查询的字段与值
     */
    get(condition) {

        return new Promise((resolve, reject) => {

            const conditionText = this.stringify(condition, 'and');
            const perPage = condition._perPage || 10;
            const page = condition._page || 1;

            const limitValue = perPage;
            const offsetValue = (page - 1) * limitValue;

            let sql = null;
            if (conditionText) {
                sql = `select * from ${this.tableName} where ${conditionText} limit ${limitValue} offset ${offsetValue}`;
            } else {
                sql = `select * from ${this.tableName} limit ${limitValue} offset ${offsetValue}`;
            }

            this.sqlQuery(sql).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
            })

        })
    }

    /**
     * 新增一条数据
     * @param {Object} data 
     */
    post(data) {
        return new Promise((resolve, reject) => {

            const keyArr = [];
            const valueArr = [];
            for (let key in data) {
                keyArr.push(key);
                valueArr.push(`'${data[key]}'`)
            }
            const keyText = keyArr.join(',');
            const valueText = valueArr.join(',');

            const sql = `insert into ${this.tableName} (${keyText}) values (${valueText})`;

            this.sqlQuery(sql).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
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

            this.sqlQuery(sql).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
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


            const sql = `delete from ${this.tableName} where ${conditionText}`;

            this.sqlQuery(sql).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
            })
        })

    }

    count(column) {

        return new Promise((resolve, reject) => {
            const sql = `select count(${column}) from ${this.tableName};`
            this.sqlQuery(sql).then(result => {

                resolve({
                    [column]: result[0][`count(${column})`]
                })

            }).catch(err => {
                reject(err);
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
            if (key === '_page' || key === '_perPage') {
                continue;
            }
            dataArr.push(`${key}='${data[key]}'`)
        }
        return dataArr.join(` ${character} `);
    }

    sqlQuery(sql) {
        return new Promise((resolve, reject) => {
            const connection = this.mysqlConn();
            connection.query(sql, (err, result) => {
                connection.end();
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

}

module.exports = Base