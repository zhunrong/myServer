const fs = require('fs');
const path = require('path');

console.log('dir',__dirname)
console.log('file',__filename)
console.log('self',require.resolve('./filesystem.js'));

fs.readFile('../webPage/index.html', {
    encoding: 'utf-8'
}, (err, data) => {
    console.log(err);
    console.log(data);
    const pattern = /document/i;

    if (data) {
        const result = pattern.test(data);
        console.log(result);
    }
})