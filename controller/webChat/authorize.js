const userModel = require('../../model/webChat/user');

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
        res
            .status(400)
            .send('用户名不能为空');
        return;
    }
    if (!password) {
        res
            .status(400)
            .send('密码不能为空');
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
                        error: '用户名不存在'
                    })
            } else if (result[0].password != password) {
                res
                    .status(400)
                    .send({
                        error: "密码不正确"
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
            .send('用户名不能为空');
        return;
    }
    if (!password) {
        res
            .status(400)
            .send('密码不能为空');
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
                password: password
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
                    res.send({
                        data: result[0]
                    });
                })
        } else {
            res
                .status(400)
                .send({
                    error: '用户已存在'
                });
        }
    }).catch(err => {
        res.send(err);
    })

}