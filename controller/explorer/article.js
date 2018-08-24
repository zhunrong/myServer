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

// 新建文章
exports.createArticle = (req, res) => {
    const uid = req.session.uid;

    const {
        title,
        markdown,
        html
    } = req.body;

    if (typeof title !== undefined) {
        if (title === '') {
            return res.status(400).send({
                message: '标题不能为空'
            })
        }
    }

    articleModel.post({
        uid,
        title,
        markdown,
        html
    }).then(result => {
        const id = result.insertId;
        return articleModel.get({
            id
        })
    }).then(result => {
        res.status(200).send({
            ...result[0]
        })
    }).catch(err => {
        console.log(err);
        res.status(400).send({
            message: '幺蛾子'
        })
    })
}

// 修改文章
exports.editArticle = (req, res) => {
    const {
        id
    } = req.params;
    const {
        title,
        markdown,
        html
    } = req.body;
    if (typeof title !== undefined) {
        if (title === '') {
            return res.status(400).send({
                message: 'title不能为空'
            })
        }
    }
    articleModel.put({
        id
    }, {
        title,
        markdown,
        html
    }).then(result => {
        res.status(200).send({
            ...result
        })
    }).catch(err => {
        console.log(err);
        res.status(400).send({
            message: '幺蛾子'
        })
    })
}