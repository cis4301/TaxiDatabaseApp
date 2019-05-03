const express = require('express');
const router = new express.Router();

// Bring in Auth controllers
const register = require('../../controllers/auth/register');
const authenticate = require('../../controllers/auth/authenticate');
const profile = require('../../controllers/auth/profile');
const validate = require('../../controllers/auth/validate');


//Authentication controllers
router.route('/register')
  .post(register.get);

router.route('/authenticate')
  .post(authenticate.get);

router.route('/profile')
  .get(profile.get);

router.route('/validate')
  .get(validate.get);



module.exports = router;
