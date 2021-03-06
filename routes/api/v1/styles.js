const express = require('express');
const router = express.Router();
const env = require('../../../environment.json');

const BreweryDB = require('brewerydb-node');
const brewdb = new BreweryDB(env.api_key);

router.get('/', (req, res) => {

    brewdb.style.all((err, data) => {
        res.send(data);
    });

});

module.exports = router;
