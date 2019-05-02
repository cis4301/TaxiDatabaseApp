const database = require('../services/database.js');

const baseQuery =
'SELECT TRIPID, PASSENGERCOUNT, DISTANCE, TOTALCOST, TOLLSCOST, FEESCOST, TIPSCOST, FARECOST, PICKUPTIME, DROPOFFTIME, geo1.ZONEID AS pickupzone, geo1.borough AS pickupborough, geo1.zonename AS pickupzonename, geo1.yellowexclusive AS pickupexclusive, geo2.zoneid, geo2.borough, geo2.zonename, geo2.yellowexclusive FROM CHASTAIN.YELLOWTRIP NATURAL JOIN CHASTAIN.TRIP, CHASTAIN.GEOZONE geo1, CHASTAIN.GEOZONE geo2';


async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.tripID = context.id;

  query += '\nwhere TRIPID = :tripID AND geo1.ZONEID = CHASTAIN.TRIP.PICKUPZONE AND geo2.ZONEID = CHASTAIN.TRIP.DROPOFFZONE';

  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
