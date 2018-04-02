const userModel = require('../../model/webChat/user');

exports.login = (req, res) => {
    res.send('login');
}


exports.register = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log(req.body);

    if (!username) {
        res.status(400).send('用户名不能为空');
        return;
    }
    if (!password) {
        res.status(400).send('密码不能为空');
        return;
    }

    userModel.get({
        username: username
    }).then(result => {
        if (result.length === 0) {
            userModel.post({
                username: username,
                password: password
            }).then(result => {
                res.send('注册成功');
            })
            return;
        }

        res.status(400).send('用户已存在');
    })
}