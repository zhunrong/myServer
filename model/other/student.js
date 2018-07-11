const config = require('../../config');
const Base = require('../base');

class Student extends Base {
    constructor(options) {
        super(options);
    }
}

module.exports = new Student({
    host: config.dbHost,
    user: config.dbUsername,
    password: config.dbPassword,
    database: 'zr_dev',
    tableName: 'students'
})