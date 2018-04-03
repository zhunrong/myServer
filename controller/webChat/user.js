const userModel = require('../../model/webChat/user');


/**
 * 获取用户列表
 * @param {*} req 
 * @param {*} res 
 */
exports.get = (req, res) => {

    userModel.get(req.query).then(result => {
        res.send(result);
    })

}

/**
 * 删除用户
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = (req, res) => {

    userModel.delete(req.body).then(result => {
        res.send(result);
    })

}

/**
 * 修改用户
 * @param {*} req 
 * @param {*} res 
 */
exports.put = (req, res) => {

    const id = req.body.id;
    const nickname = req.body.nickname;
    const gender = req.body.gender;
    const age = req.body.age;
    const province = req.body.province;
    const city = req.body.city;
    const say = req.body.say;

    const dataObj = {};

    if (nickname) {
        dataObj['nickname'] = nickname;
    }
    if (gender) {
        dataObj['gender'] = gender;
    }
    if (age) {
        dataObj['age'] = age;
    }
    if (province) {
        dataObj['province'] = age;
    }
    if (city) {
        dataObj['city'] = city;
    }
    if (say) {
        if (say.length > 100) {
            res.status(400).send({
                error: '个性签名长度不能超过100个字符'
            })
            return;
        }
        dataObj['say'] = say;
    }

    userModel.put({
        id: id
    }, dataObj).then(() => {
        return userModel.get({
            id: id
        })
    }).then(result => {
        res.send({
            data: result[0]
        });
    })

}