const express = require('express');
const router = new express.Router();
const yellowtrips = require('../controllers/yellowtrips');
const zones = require('../controllers/zones');

router.route('/yellowtrips/:id?')
  .get(yellowtrips.get);

  router.route('/zones/:id?')
    .get(zones.get);
    
module.exports = router;
