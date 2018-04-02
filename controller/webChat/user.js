const userModel = require('../../model/webChat/user');

exports.get = (req, res) => {

    userModel.get(req.query).then(result => {
        res.send(result);
    })

}

exports.delete = (req, res) => {

    userModel.delete(req.body).then(result => {
        res.send(result);
    })

}

exports.put = (req, res) => {

    const id = req.body.id;
    const nickname = req.body.nickname;
    userModel.put({
        id: id
    }, {
        nickname: nickname
    }).then(result => {
        res.send(result);
    })

}