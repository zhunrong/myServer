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
            } catch (__) { }
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});


router.get('/md', (req, res) => {

    const filename = req.query.file;

    const dirPath = path.resolve(__dirname, '../public/markdown');

    if (filename) {
        fs.readFile(path.resolve(dirPath, filename), (err, result) => {
            const markedText = md.render(result.toString());
            res.send(markedText);
        })
    } else {
        fs.readdir(dirPath, (err, result) => {
            res.send(result);

        })
    }
})


module.exports = router