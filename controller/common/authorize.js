const userModel = require('../../model/common/user');
const config = require('../../config');

exports.login = (req, res) => {
    const {
        username,
        password
    } = req.body;

    if (!username) {
        res.status(400).send({
            message: '用户名不能为空'
        });
        return;
    } else if (!password) {
        res.status(400).send({
            message: '密码不能为空'
        });
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
        res.status(200).send({
            message: '登录成功'
        })
    })

}

exports.register = (req, res) => {
    const {
        username,
        password
    } = req.body;

    if (!username) {
        return res.status(400).send({
            message: '用户名不能为空'
        });
    } else if (!password) {
        return res.status(400).send({
            message: '密码不能为空'
        });
    }

    userModel.get({
        username
    }).then(result => {
        if (result.length) {
            res.status(400).send({
                message: '用户名已被注册'
            })
        } else {
            return userModel.post({
                username,
                password
            })
        }
    }).then(result => {
        return userModel.get({
            username
        })
    }).then(result => {
        res.status(200).send({
            ...result[0]
        })
    })
}