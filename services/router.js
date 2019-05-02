const express = require('express');
const router = new express.Router();
const yellowtrips = require('../controllers/yellowtrips');
const zones = require('../controllers/zones');
const totals = require('../controllers/totals');
const aggregate = require('../controllers/aggregate');
const netflow = require('../controllers/netflow');
const cost = require('../controllers/cost');
const timegraph = require('../controllers/timegraph');
const weathergraph = require('../controllers/weathergraph');
const weathertripavg = require('../controllers/weathertripavg');
const weathermap = require('../controllers/weathermap');
const netflowchart = require('../controllers/netflowchart');

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

router.route('/weathermap/')
  .get(weathermap.get);
  
router.route('/netflowchart/')
  .get(netflowchart.get);

router.route('/totals/')
  .get(totals.get);


module.exports = router;
