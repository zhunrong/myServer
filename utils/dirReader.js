const fs = require('fs');
const path = require('path');

/**
 * 返回文件基本信息
 * @param {String} filePath 
 */
function statPromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, stats) => {
            if (err) {
                reject(err);
                return;
            }
            const file = {
                isDirectory: stats.isDirectory(),
                size: stats.size,
                createAt: new Date(stats.birthtime),
                lastModifyAt: new Date(stats.mtime)
            }
            resolve(file);
        })
    })
}

/**
 * 读取目录内的文件
 * @param {*} rootDir 
 * @param {*} relPath 
 */
function readDirPromise(rootDir, relPath) {
    const dirPath = path.resolve(rootDir, relPath);
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            const promiseArr = [];
            files.forEach(filename => {
                promiseArr.push(new Promise((resolve, reject) => {
                    statPromise(path.resolve(dirPath, filename)).then(file => {
                        resolve(Object.assign(file, {
                            name: filename
                        }))
                    })
                }))
            })
            Promise.all(promiseArr).then(files => {
                // 将目录文件排在前面
                const sortedFiles = [];
                files.forEach(file => {
                    if (file.isDirectory) {
                        sortedFiles.unshift(file);
                    } else {
                        sortedFiles.push(file);
                    }
                })
                resolve(sortedFiles);
            }).catch(err => {
                reject(err);
            })
        })
    })
}


function mkDirPromise(dirPath) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirPath, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        })
    })
}

module.exports = {
    statPromise,
    readDirPromise,
    mkDirPromise
}