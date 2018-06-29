const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const dirReader = require('../../utils/dirReader');
const rootDirPath = path.resolve(__dirname, '../../public');

exports.get = (req, res) => {
    // ejs.renderFile(path.resolve(__dirname, '../../template/explorer/index.ejs')).then(html => {
    //     res.send(html);
    // });

    const pattern = /^\/explorer\/(\S*)/;
    const match = pattern.exec(req.path);

    const dirPath = path.resolve(rootDirPath, match[1]);

    dirReader(dirPath).then(fileArray => {
        res.render('explorer/index', {
            fileArray
        });
    }).catch(err => {
        res.send({
            code: 1200,
            message: '读取错误'
        })
    })

}