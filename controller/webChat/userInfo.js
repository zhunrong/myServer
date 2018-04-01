const mysql = require('mysql');

class UserInfo {

    constructor(options) {
        this.host = options.host;
        this.user = options.user;
        this.password = options.password;
        this.database = options.database;
        this.tableName = options.tableName;
    }

}

module.exports = new UserInfo({
    host: 'localhost',
    user: 'zr_dev',
    password: 'YZ4371716',
    database: 'web_chat',
    tableName: 'user'
})