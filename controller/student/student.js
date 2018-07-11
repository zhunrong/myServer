const studentModel = require('../../model/other/student');

exports.get = (req, res) => {
    const query = req.query;
    let count = +query['_count'] || 4;
    let page = +query['_page'] || 1;

    Promise.all([studentModel.get({
        _perPage: count,
        _page: page
    }), studentModel.count('id')]).then(result => {
        res.send({
            meta: {
                page: page,
                count: count,
                totalCount: result[1]['id']
            },
            data: result[0]
        })
    })

}

exports.put = (req, res) => {
    const dataBody = req.body;
    if (!dataBody.id) {
        res.send('id不能为空');
        return;
    }

    const modifyData = {}
    for (let key in dataBody) {
        switch (key) {
            case 'name':
            case 'gender':
            case 'age':
                modifyData[key] = dataBody[key];
                break
        }
    }

    studentModel.put({
        id: dataBody.id
    }, modifyData).then(() => studentModel.get({
        id: dataBody.id
    })).then(result => {
        res.send({
            data: result[0] || {}
        })
    }).catch(err => {
        res.status(400).send(err);
    })
}

exports.post = (req, res) => {
    const dataBody = req.body;

    const modifyData = {}
    for (let key in dataBody) {
        switch (key) {
            case 'name':
            case 'gender':
            case 'age':
                modifyData[key] = dataBody[key];
                break
        }
    }

    studentModel.post(modifyData).then(result => {
        const newId = result.insertId;
        return studentModel.get({
            id: newId
        })
    }).then(result => {
        res.send({
            data: result[0]
        })
    })

}

exports.delete = (req, res) => {
    const dataBody = req.body;
    if (!dataBody.id) {
        res.send('id不能为空');
        return;
    }

    studentModel.delete({
        id: dataBody.id
    }).then(result => {
        res.send({
            message: '删除成功'
        });
    }).catch(err => {
        res.status(400).send(err);
    })
}