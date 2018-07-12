const path = require('path');
const fs = require('fs');
const dirReader = require('../../utils/dirReader');
const rootDirPath = path.resolve(__dirname, '../../public');

exports.get = (req, res) => {
    const pattern = /^\/explorer\/(\S*)/;
    const match = pattern.exec(req.path);

    const relPath = match[1];
    const dirPath = path.resolve(rootDirPath, relPath);

    fs.stat(dirPath, (err, stats) => {
        if (err) {
            res.send(err);
            return;
        }
        if (stats.isDirectory()) {
            dirReader(rootDirPath, relPath).then(fileArray => {
                res.status(200).send({
                    data: fileArray
                })
            }).catch(err => {
                res.send({
                    code: 1200,
                    message: '读取错误'
                })
            })
        } else {
            res.status(200).send({
                data: {
                    name: '',
                    url: `/${match[1]}`,
                    type: 'img'
                }
            })
        }
    })
}