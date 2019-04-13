const database = require('../services/database.js');

const baseQuery =
'WITH QUERY1 AS(SELECT TRIPID AS tripID, PICKUPTIME AS starttime, DROPOFFTIME AS endtime, geo1.ZONEID AS pickupzone, geo2.zoneid AS endzone FROM CHASTAIN.TRIP, CHASTAIN.GEOZONE geo1, CHASTAIN.GEOZONE geo2 WHERE geo1.ZONEID = CHASTAIN.TRIP.PICKUPZONE AND geo2.ZONEID = CHASTAIN.TRIP.DROPOFFZONE)';


async function find(context) {
  let query = baseQuery;

  const binds = {};

  if (context.hour) {

    binds.hour = context.hour;
  //  binds.type = context.type;
    query += ', QUERY2 AS (SELECT COUNT(tripID) AS inflow, pickupzone FROM QUERY1 WHERE (EXTRACT(hour from starttime)= :hour) GROUP BY pickupzone)';
    query += ', QUERY3 AS (SELECT COUNT(tripID) AS outflow, endzone FROM QUERY1 WHERE (EXTRACT(hour from endtime)= :hour) GROUP BY endzone)';
    query += ' SELECT (QUERY2.inflow - QUERY3.outflow) AS net, pickupzone AS zone FROM QUERY2, QUERY3 WHERE QUERY2.pickupzone = QUERY3.endzone';

  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;