const express = require('express');
const router = new express.Router();
const yellowtrips = require('../controllers/yellowtrips')

router.route('/yellowtrips/:id?')
  .get(yellowtrips.get);

module.exports = router;
