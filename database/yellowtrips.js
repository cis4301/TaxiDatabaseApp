const database = require('../services/database.js');

const baseQuery =
'SELECT  TRIPID, TRIP_DISTANCE, TOTAL_AMOUNT, PICKUP_DATETIME, DROPOFF_DATETIME, PASSENGER_COUNT from yellowtrips';


async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.tripID = context.id;

    query += '\nwhere tripID = :tripID';
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
