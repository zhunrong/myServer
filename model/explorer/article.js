const Base = require('../base');
const config = require('../../config');

class Article extends Base {
    constructor(options) {
        super(options);
    }
    init() {
        const connection = this.mysqlConn();
        connection.query(
            `
            CREATE TABLE IF NOT EXISTS article (
                id int(11) NOT NULL AUTO_INCREMENT,
                uid int(11) NOT NULL,
                title varchar(255) DEFAULT '',
                markdown text,
                html text,
                create_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                update_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
              ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
            `
            , error => {
                if (error) {
                    return console.log('error', error);
                }
            });
    }
}

module.exports = new Article({
    host: config.dbHost,
    user: config.dbUsername,
    password: config.dbPassword,
    database: 'zr_dev',
    tableName: 'article'
})