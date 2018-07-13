const path = require('path');
const fs = require('fs');
const {
    readDirPromise,
    statPromise
} = require('../../utils/dirReader');
const rootDirPath = path.resolve(__dirname, '../../public');

exports.get = (req, res) => {
    const pattern = /^\/explorer\/(\S*)/;
    const match = pattern.exec(req.path);

    const relPath = match[1];
    const filePath = path.resolve(rootDirPath, relPath);

    statPromise(filePath).then(file => {
        const rootDir = '/';
        let currentDir = rootDir + relPath;
        let parentDir = '/';
        if (file.isDirectory) {
            readDirPromise(rootDirPath, relPath).then(files => {
                // 使目录路径以'/'结尾
                if (!/.*\/$/.test(currentDir)) {
                    currentDir += '/';
                }
                if (currentDir != '/') {
                    const parentDirRE = /(.*\/)[^\/]+\//;
                    parentDir = parentDirRE.exec(currentDir)[1];
                }
                res.status(200).send({
                    files,
                    currentDir,
                    parentDir,
                    rootDir,
                    filePath
                })
            }).catch(error => {
                res.status(400).send({
                    code: 1200,
                    message: '读取错误',
                    error
                })
            })
        } else {
            const parentDirRE = /(.*\/)[^\/]+/;
            parentDir = parentDirRE.exec(currentDir)[1];
            res.status(200).send({
                files: [file],
                currentDir,
                parentDir,
                rootDir,
                filePath
            })
        }
    }).catch(error => {
        res.status(400).send({
            code: 1200,
            message: '读取错误',
            error
        })
    })
}