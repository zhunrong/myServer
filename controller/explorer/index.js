const path = require('path');
const fs = require('fs');
const multer = require('multer');
const {
    readDirPromise,
    statPromise,
    mkDirPromise
} = require('../../utils/dirReader');
const rootDirPath = path.resolve(__dirname, '../../private');

exports.get = (req, res) => {
    const pattern = /^\/explorer\/(\S*)/;
    // req.path可能包含中文被编码后的字符
    const match = pattern.exec(decodeURIComponent(req.path));

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

            // 直接返回一个文件
            fs.createReadStream(filePath).pipe(res);
        }
    }).catch(error => {
        res.status(400).send({
            code: 1200,
            message: '读取错误',
            error
        })
    })
}

const upload = multer({
    limits: '10mb',
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            // 注意 req.body 可能还没有完全填充，这取决于向客户端发送字段和文件到服务器的顺序
            const pattern = /^\/explorer\/(\S*)/;
            // req.path可能包含中文被编码后的字符
            const match = pattern.exec(decodeURIComponent(req.path));
            const relPath = match[1];
            cb(null, path.resolve(rootDirPath, relPath));
        },
        filename: (req, file, cb) => {
            // 为了发挥stream的优势,这里先以原文件名写在硬盘上，然后再修改为body.filename
            cb(null, file.originalname);
        }
    })
})

exports.post = [upload.single('file'), (req, res) => {

    const body = req.body;
    console.log(req.body);

    if (!body.filename) {
        res.status(400).send({
            message: '文件名不能为空'
        })
        return;
    }

    const pattern = /^\/explorer\/(\S*)/;
    // req.path可能包含中文被编码后的字符
    const match = pattern.exec(decodeURIComponent(req.path));
    const relPath = match[1];
    const filePath = path.resolve(rootDirPath, relPath, body.filename);

    if (req.body.isDirectory) {
        mkDirPromise(filePath).then(() => {
            res.status(200).send({
                message: '创建成功'
            })
        }).catch(err => {
            let message = '新建失败';
            if (err.errno === -4075) {
                message = '文件已存在';
            }
            res.status(400).send({
                message
            })
        })
    } else {
        console.log(req.file);
        if (req.file) {
            res.send('file');
        } else {
            res.status(400).send({
                message: '没有文件'
            })
        }
    }
}]