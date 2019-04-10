const express = require('express');
const router = new express.Router();
const yellowtrips = require('../controllers/yellowtrips');
const zones = require('../controllers/zones');
const aggregate = require('../controllers/aggregate');

router.route('/yellowtrips/:id?')
  .get(yellowtrips.get);

router.route('/zones/:id?')
  .get(zones.get);

router.route('/aggregate/')
  .get(aggregate.get);

module.exports = router;
