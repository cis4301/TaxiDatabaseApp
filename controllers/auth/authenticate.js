
async function get(req, res, next) {
  try {
    res.send('AUTHENTICATE');
  } catch (err) {
    next (err);
  }
}

module.exports.get = get;
