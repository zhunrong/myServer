const mysql = require('mysql');
const Base = require('../base');

class User extends Base {
    constructor(options) {
        super(options);
    }

    /**
     * 获取最新的一位用户
     */
    getLastUser() {
        const sql = `select id from ${this.tableName} order by id desc limit 1;`
        return this.sqlQuery(sql);
    }

}

module.exports = new User({
    host: 'localhost',
    user: 'zr_dev',
    password: 'YZ4371716',
    database: 'web_chat',
    tableName: 'user'
})