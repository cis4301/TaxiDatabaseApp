const express = require('express');
const router = new express.Router();
const yellowtrips = require('../controllers/yellowtrips');
const zones = require('../controllers/zones');
const aggregate = require('../controllers/aggregate');
const netflow = require('../controllers/netflow');
const cost = require('../controllers/cost');

router.route('/yellowtrips/:id?')
  .get(yellowtrips.get);

router.route('/zones/:id?')
  .get(zones.get);

router.route('/aggregate/')
  .get(aggregate.get);

router.route('/netflow/')
  .get(netflow.get);

router.route('/cost/')
  .get(cost.get);

module.exports = router;
