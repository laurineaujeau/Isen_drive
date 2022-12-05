// TODO compléter

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.pug', { title: "Bienvenue a ISEN Drive"});
});

module.exports = router;