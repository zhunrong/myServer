const Base = require('../base');
const config = require('../../config');

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

    init() {
        const connection = this.mysqlConn();
        connection.query(
            `
            CREATE TABLE IF NOT EXISTS user (
                id int(10) unsigned NOT NULL AUTO_INCREMENT,
                username varchar(255) NOT NULL,
                password varchar(255) NOT NULL,
                nickname varchar(255) DEFAULT NULL,
                avatar varchar(255) DEFAULT NULL,
                create_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                update_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
              ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
            `
            , error => {
                if (error) {
                    return console.log('error', error);
                }
            });
    }

}

module.exports = new User({
    host: config.dbHost,
    user: config.dbUsername,
    password: config.dbPassword,
    database: 'zr_dev',
    tableName: 'user'
})