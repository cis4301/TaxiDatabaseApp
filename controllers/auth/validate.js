
async function get(req, res, next) {
  try {
    res.send('VALIDATE');
  } catch (err) {
    next (err);
  }
}

module.exports.get = get;
