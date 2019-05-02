
async function get(req, res, next) {
  try {
    res.send('PROFILE');
  } catch (err) {
    next (err);
  }
}

module.exports.get = get;
