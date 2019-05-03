const express = require('express');
const router = new express.Router();

// Bring in Query controllers
const yellowtrips = require('../../controllers/query/yellowtrips');
const zones = require('../../controllers/query/zones');
const totals = require('../../controllers/query/totals');
const aggregate = require('../../controllers/query/aggregate');
const netflow = require('../../controllers/query/netflow');
const cost = require('../../controllers/query/cost');
const timegraph = require('../../controllers/query/timegraph');
const weathergraph = require('../../controllers/query/weathergraph');
const weathertripavg = require('../../controllers/query/weathertripavg');
const weathermap = require('../../controllers/query/weathermap');
const netflowchart = require('../../controllers/query/netflowchart');


// Query controllers
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
