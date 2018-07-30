const path = require('path');
const fs = require('fs');
const multer = require('multer');
const {
    readDirPromise,
    statPromise,
    mkDirPromise
} = require('../../utils/fsPromise');
const rootDirPath = path.resolve(__dirname, '../../private');

const isExist = fs.existsSync(rootDirPath);
if (!isExist) {
    fs.mkdirSync(rootDirPath);
}

/**
 * 获取目录/文件
 * @param {*} req 
 * @param {*} res 
 */
exports.get = (req, res) => {

    const relPath = getRelativePath(req.path);
    const filePath = path.resolve(rootDirPath, relPath);
    console.log('req.path', req.path);
    console.log('rootDirPath', rootDirPath);
    console.log('relPath', relPath);
    console.log('filePath', filePath);
    statPromise(filePath).then(file => {
        const rootDir = '/';
        let currentDir = rootDir + relPath;
        let parentDir = '/';
        console.log('file', file);
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
            const relPath = getRelativePath(req.path);
            cb(null, path.resolve(rootDirPath, relPath));
        },
        filename: (req, file, cb) => {
            // 为了发挥stream的优势,这里先以原文件名写在硬盘上，然后再修改为body.filename
            cb(null, file.originalname);
        }
    })
})

/**
 * 新建目录/文件
 */
exports.post = [upload.single('file'), (req, res) => {
    const body = req.body;

    const relPath = getRelativePath(req.path);
    const filePath = path.resolve(rootDirPath, relPath, body.filename || '');

    if (req.file) {
        if (body.filename) {
            fs.rename(req.file.path, filePath, error => {
                if (error) {
                    return res.status(400).send({
                        error
                    })
                }
                res.status(200).send({
                    message: '创建成功'
                });
            })
        } else {
            res.status(200).send({
                message: '创建成功'
            });
        }
    } else if (body.isDirectory) {
        if (!body.filename) {
            res.status(400).send({
                message: '文件名不能为空'
            })
            return;
        }
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
        res.status(400).send({
            message: '缺少file或isDirectory字段'
        })
    }
}]

/**
 * 删除文件/目录
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = (req, res) => {
    const relPath = getRelativePath(req.path);
    const filePath = path.resolve(rootDirPath, relPath);
    statPromise(filePath).then(file => {
        if (file.isDirectory) {
            fs.rmdir(filePath, error => {
                let message = '成功';
                if (error) {
                    message = error;
                    console.log(error);
                    if (error.errno = -4051) {
                        message = '不能删除非空目录';
                    }
                    return res.status(400).send({
                        message
                    })
                }
                res.status(200).send({
                    message
                })
            })
        } else {
            fs.unlink(filePath, error => {
                let message = '成功';
                if (error) {
                    message = error;
                    if (error.errno === -4058) {
                        message = '文件不存在';
                    }
                    return res.status(400).send({
                        message
                    })
                }
                res.status(200).send({
                    message
                })
            })
        }
    })

}

/**
 * 重命名文件/目录
 * @param {*} req 
 * @param {*} res 
 */
exports.put = (req, res) => {
    const relPath = getRelativePath(req.path);
    const filename = getFileName(req.path);
    const oldPath = path.resolve(rootDirPath, relPath);
    const body = req.body;

    if (relPath === '') {
        return res.status(400).send({
            message: '根目录不能修改'
        })
    }
    if (!body.rename) {
        return res.status(400).send({
            message: 'rename不能为空'
        })
    }
    const newPath = oldPath.replace(filename, body.rename);
    fs.rename(oldPath, newPath, err => {
        let message = '成功';
        if (err) {
            message = err;
            if (err.errno === -4058) {
                message = '文件不存在';
            }
            return res.status(400).send({
                message
            })
        }
        res.send({
            message
        })
    })
}

/**
 * 获取相对于/explorer/的路径
 * @param {String} path 
 */
function getRelativePath(path) {
    const pattern = /^\/explorer\/([^\\\/:*?"><|]*)/;
    // req.path可能包含中文被编码后的字符
    const match = pattern.exec(decodeURIComponent(path));
    return match[1];
}

/**
 * 通过文件路径解析文件名
 * @param {*} path 
 */
function getFileName(path) {
    path = decodeURIComponent(path);
    let pattern;
    if (/.*\/$/.test(path)) {
        pattern = /.*\/([^/]+\/)/;
    } else {
        pattern = /.*\/([^/]+)/;
    }
    return pattern.exec(path)[1];
}