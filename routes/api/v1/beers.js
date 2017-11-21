const express = require('express');
const router = express.Router();

const env = require('../../../environment.json');

const BreweryDB = require('brewerydb-node');
const brewdb = new BreweryDB(env.api_key);


router.get('/', (req, res) => {

    let params = {p: 1};

    if(req.query.styleId) params.styleId = req.query.styleId;

    if(req.query.name) params.name = req.query.name;

    if(req.query.p) params.p = req.query.p;

    brewdb.beer.find(params, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Encountered an unexpected error finding beer.");
        } else {

            //this is a limitation of the BreweryDB API, it doesn't tell us if there are any more
            //results so we have to an assumption if there any more.

            //NOTE:  this couple possibly return a false positive if there are exactly 50 results
            //being return with no more afterwards.

            let resp = {
                hasMoreData: data ? data.length === 50 : false,
                data: data || []
            };

            res.send(resp);
        }
    });
});

module.exports = router;