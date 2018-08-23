const userModel = require('../../model/common/user');

userModel.init();

exports.update = function (req, res) {
    const id = req.session.uid;
    const {
        nickname,
        avatar
    } = req.body;

    const modifyData = {};
    if (typeof nickname !== undefined) {
        if (nickname === '') {
            return res.status(400).send({
                message: '昵称不能为空'
            })
        }
        modifyData['nickname'] = nickname;
    }

    if (typeof avatar !== undefined) {
        if (avatar === '') {
            return res.status(400).send({
                message: '头像不能为空'
            })
        }
        modifyData['avatar'] = avatar;
    }

    userModel.put({
        id
    }, modifyData).then(result => {
        return userModel.get({
            id
        })
    }).then(result => {
        res.status(200).send({
            ...result[0]
        })
    }).catch(err => {
        console.log(err);
    })

}

exports.get = function (req, res) {
    const id = req.session.uid;
    userModel.get({
        id
    }).then(result => {
        res.status(200).send({
            ...result[0]
        })
    }).catch(err => {
        res.status(400).send({
            error: err
        })
    })

}