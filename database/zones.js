const database = require('../services/database.js');

const baseQuery =
'SELECT * from zones';


async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.locationID = context.id;

    query += '\nwhere LOCATIONID = :locationID';
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
