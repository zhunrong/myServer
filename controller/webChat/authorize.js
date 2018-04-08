const userModel = require('../../model/webChat/user');

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
        res
            .status(400)
            .send({
                error: '用户名不能为空',
                code: 1001
            });
        return;
    }
    if (!password) {
        res
            .status(400)
            .send({
                error: '密码不能为空',
                code: 1002
            });
        return;
    }

    userModel
        .get({
            username: username
        })
        .then(result => {
            if (result.length === 0) {
                res
                    .status(400)
                    .send({
                        error: '用户名不存在',
                        code: 1003
                    })
            } else if (result[0].password != password) {
                res
                    .status(400)
                    .send({
                        error: "密码不正确",
                        code: 1004
                    })
            } else {
                req.session.uid = result[0].id;
                res.send({
                    data: '登录成功'
                })
            }
        })

}

exports.register = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
        res
            .status(400)
            .send({
                error: '用户名不能为空',
                code: 1001
            });
        return;
    }
    if (!password) {
        res
            .status(400)
            .send({
                error: '密码不能为空',
                code: 1002
            });
        return;
    }

    Promise.all([
        userModel.get({
            username: username
        }),
        userModel.count('id')
    ]).then(result => {
        if (result[0].length === 0) {
            const registerData = {
                username: username,
                password: password,
                avatar: 'https://zr-1253381776.cos.ap-guangzhou.myqcloud.com/images/avatar/man.png',
                gender: 1
            }
            if (result[1].id === 0) {
                //用户id从10000开始
                registerData['id'] = 10000;
            }
            userModel
                .post(registerData)
                .then(result => {

                    return userModel.get({
                        username: username
                    })

                })
                .then(result => {
                    req.session.uid = result[0].id;
                    res.send({
                        data: result[0]
                    });
                })
        } else {
            res
                .status(400)
                .send({
                    error: '用户已存在',
                    code: 1005
                });
        }
    }).catch(err => {
        res.send(err);
    })

}