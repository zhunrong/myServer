const userModel = require('../../model/common/user');
const config = require('../../config');

class Authorize {

    register(req, res) {


        const username = req.body.username;
        const password = req.body.password;

        if (!username) {
            res.send('用户名不能为空');
            return;
        } else if (!password) {
            res.send('密码不能为空');
            return;
        }

        const conn = this.mysqlConn();
        conn.query(`select * from ${this.tableName} where username='${username}'`, (err, result) => {

            if (err) {
                console.error(err);
                res.send(err);
                return;
            }
            if (result.length === 0) {

                conn.query(`insert into ${this.tableName} (username,password) values ('${username}','${password}')`, (err, result) => {
                    conn.end();
                    if (err) {
                        console.error(err);
                        res.send(err);
                        return;
                    }

                    res.send('注册成功');

                })

                return;
            }
            conn.end();

            res.send('用户已存在');

        })



    }

}

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
        res.send('用户名不能为空');
        return;
    } else if (!password) {
        res.send('密码不能为空');
        return;
    }

    userModel.get({
        username
    }).then(result => {
        const findUser = result[0];
        if (!findUser) {
            return res.status(400).send({
                message: '用户不存在'
            })
        }
        if (findUser.password !== password) {
            return res.status(400).send({
                message: '密码不正确'
            })
        }
        req.session[config.sessionName] = findUser.id;
        console.log(req.session);
        res.status(200).send({
            message: '登录成功'
        })
    })

}

exports.register = (req, res) => {

}