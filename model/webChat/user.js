const mysql = require('mysql');
const Base = require('../base');

class User extends Base {
    constructor(options) {
        super(options);
    }
}

module.exports = new User({
    host: 'localhost',
    user: 'zr_dev',
    password: 'YZ4371716',
    database: 'web_chat',
    tableName: 'user'
})