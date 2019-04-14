const timegraph = require('../database/timegraph.js');

async function get(req, res, next) {
  try {
    const context = {};

      context.month = parseInt(req.query.month, 10);


    const rows = await timegraph.find(context);

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
