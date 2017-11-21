const express = require('express');
const router = express.Router();
const beer = require('./api/v1/beer');
const beers = require('./api/v1/beers');
const styles = require('./api/v1/styles');

router.use('/v1/beer', beer);
router.use('/v1/beers', beers);
router.use('/v1/styles', styles);

module.exports = router;