const express = require('express');
const router = new express.Router();
const yellowtrips = require('../controllers/yellowtrips');
const zones = require('../controllers/zones');
const aggregate = require('../controllers/aggregate');
const netflow = require('../controllers/netflow');
const cost = require('../controllers/cost');
const timegraph = require('../controllers/timegraph');
const weathergraph = require('../controllers/weathergraph');
const weathertripavg = require('../controllers/weathertripavg');

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

router.route('/timegraph/')
  .get(timegraph.get);

router.route('/weathergraph/')
  .get(weathergraph.get);
  
router.route('/weathertripavg/')
  .get(weathertripavg.get);

module.exports = router;
