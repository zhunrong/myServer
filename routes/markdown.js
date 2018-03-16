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

    const dirPath = path.resolve(__dirname, '../public/markdown');

    fs.readdir(dirPath, (err, result) => {

        console.log(result);

        res.send(result);

    })
    return;

    fs.readFile(path.resolve(__dirname, '../public/README.md'), (err, data) => {

        // console.log(data.toString());


        const markedText = md.render(data.toString());

        res.send(markedText);


    })


})


module.exports = router