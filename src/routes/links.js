const express = require('express');
const router = express.Router();

const db = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add');
    //res.send('From :D');
});

router.post('/add', (req, res) => {
    const {title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    console.log(newLink);
    res.send('recivido');
});


module.exports = router;