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

    const relPath = match[1];
    const dirPath = path.resolve(rootDirPath, relPath);

    fs.stat(dirPath, (err, stats) => {
        if (err) {
            res.send(err);
            return;
        }
        if (stats.isDirectory()) {
            dirReader(rootDirPath, relPath).then(fileArray => {
                res.render('explorer/index', {
                    fileArray
                });
            }).catch(err => {
                res.send({
                    code: 1200,
                    message: '读取错误'
                })
            })
        } else {
            console.log(`/${match[1]}`);
            res.render('explorer/index', {
                file: {
                    name: '',
                    url: `/${match[1]}`,
                    type: 'img'
                }
            })
        }
    })
}