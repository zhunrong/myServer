const userModel = require('../../model/webChat/user');
const config = require('../../config');


/**
 * 获取用户列表
 * @param {*} req 
 * @param {*} res 
 */
exports.get = (req, res) => {


    userModel.get(req.query).then(result => {
        res.send({
            data: result
        });
    }).catch(err => {
        res.status(400).send(err);
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

    //如果未指定id，则取当前用户的id
    const id = req.body.id || req.session[config.sessionName];
    const nickname = req.body.nickname;
    const gender = req.body.gender;
    const age = req.body.age;
    const province = req.body.province;
    const city = req.body.city;
    const say = req.body.say;
    const name = req.body.name;
    const avatar = req.body.avatar;

    const dataObj = {};

    if (avatar) {
        dataObj['avatar'] = avatar;
    }
    if (name) {
        dataObj['name'] = name;
    }
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

/**
 * 获取当前用户信息
 * @param {*} req 
 * @param {*} res 
 */
exports.getMe = (req, res) => {

    const userID = req.session[config.sessionName];

    userModel.get({
        id: userID
    }).then(result => {
        res.send({
            data: result[0]
        })
    })

}