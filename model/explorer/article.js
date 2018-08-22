const Base = require('../base');
const config = require('../../config');

class Article extends Base {
    constructor(options) {
        super(options);
    }
}

module.exports = new Article({
    host: config.dbHost,
    user: config.dbUsername,
    password: config.dbPassword,
    database: 'zr_dev',
    tableName: 'article'
})