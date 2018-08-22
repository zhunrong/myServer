const articleModel = require('../../model/explorer/article');

exports.get = (req, res) => {
    const uid = req.session.uid;
    articleModel.get({
        uid
    }).then(result => {
        res.status(200).send({
            articles: result
        })
    }).catch(err => {
        console.log(err);
        res.status(400).send({
            message: '幺蛾子'
        })
    })

}

exports.post = (req, res) => {
    const uid = req.session.uid;

    const {
        title,
        content
    } = req.body;

    articleModel.post({
        uid,
        title,
        content
    }).then(result => {
        res.status(200).send({
            message: "创建成功"
        })
    }).catch(err => {
        console.log(err);
        res.status(400).send({
            message: '幺蛾子'
        })
    })
}