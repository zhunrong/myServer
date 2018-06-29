const fs = require('fs');
const path = require('path');

function statPromise(filePath, filename) {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err, stats) => {
            if (err) {
                reject(err);
                return;
            }
            const file = {
                name: filename,
                type: stats.isDirectory() ? 'directory' : 'file'
            }
            resolve(file);
        })
    })
}

module.exports = dirPath => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {

            if (err) {
                reject(err);
                return;
            }
            const promiseArr = [];
            files.forEach(filename => {
                promiseArr.push(statPromise(path.resolve(dirPath, filename), filename))
            })
            Promise.all(promiseArr).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })

    })
}