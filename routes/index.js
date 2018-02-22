const express = require('express');

const router = express.Router();

const data = require('../data/students.json');

router.get('/students', (req, res) => {
    res.send(data);
})


module.exports = router;