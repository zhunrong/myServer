const fs = require('fs');
const path = require('path');

function statPromise(filePath, filename, relPath) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, stats) => {
            if (err) {
                reject(err);
                return;
            }
            const file = {
                name: filename,
                path: relPath,
                type: stats.isDirectory() ? 'directory' : 'file'
            }
            resolve(file);
        })
    })
}

module.exports = (rootDir, relPath) => {
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
                promiseArr.push(statPromise(path.resolve(dirPath, filename), filename, filePath))
            })
            Promise.all(promiseArr).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })

    })
}