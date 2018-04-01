const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const hljs = require('highlight.js');
const md = require('markdown-it')({
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) {}
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});


router.get('/md', (req, res) => {

    const filename = req.query.file;
    const content = req.query.content;

    const dirPath = path.resolve(__dirname, '../public/markdown');

    if (filename) {
        fs.readFile(path.resolve(dirPath, filename), (err, result) => {
            const markedText = md.render(result.toString());
            res.send(markedText);
        })
    } else if (content === 'true') {
        fs.readdir(dirPath, (err, files) => {
            const result = [];
            if (files.length === 0) {
                res.send(result);
                return;
            }
            files.forEach(filename => {
                fs.readFile(path.resolve(dirPath, filename), (err, content) => {
                    result.push({
                        name: filename,
                        content: md.render(content.toString())
                    })

                    if (result.length === files.length) {
                        res.send(result);
                    }
                })
            })
        })
    } else {
        fs.readdir(dirPath, (err, result) => {
            res.send(result);
        })
    }
})


module.exports = router