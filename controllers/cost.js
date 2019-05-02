const cost = require('../database/cost.js');

async function get(req, res, next) {
  try {
    const context = {};

      context.hour = parseInt(req.query.hour, 10);


    const rows = await cost.find(context);

    if (req.query) {

        res.status(200).json(rows);

    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next (err);
  }
}

module.exports.get = get;
