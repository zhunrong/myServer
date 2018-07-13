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
                const filePath = path.join(relPath, filename);
                promiseArr.push(new Promise((resolve, reject) => {
                    statPromise(path.resolve(dirPath, filename)).then(file => {
                        resolve(Object.assign(file, {
                            name: filename
                        }))
                    })
                }))
            })
            Promise.all(promiseArr).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    })
}

module.exports = {
    statPromise,
    readDirPromise
}