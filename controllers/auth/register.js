
async function get(req, res, next) {
  try {
    res.send('REGISTER');
  } catch (err) {
    next (err);
  }
}

module.exports.get = get;
