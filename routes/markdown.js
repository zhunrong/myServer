const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const marked = require('marked');


router.get('/md', (req, res) => {


    fs.readFile(path.resolve(__dirname, '../public/README.md'), (err, data) => {

        // console.log(data.toString());


        const markedText = marked(data.toString());

        res.send(markedText);


    })


})


module.exports = router