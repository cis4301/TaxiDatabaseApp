const database = require('../services/database.js');

const basequery =
'WITH QUERY1 AS(SELECT TRIPID AS tripID, extract(month from DROPOFFTIME) AS month, PICKUPTIME AS starttime, DROPOFFTIME AS endtime, geo1.ZONEID AS pickupzone, geo2.zoneid AS endzone  FROM  CHASTAIN.TRIP, CHASTAIN.GEOZONE geo1, CHASTAIN.GEOZONE geo2 WHERE geo1.ZONEID = CHASTAIN.TRIP.PICKUPZONE AND geo2.ZONEID = CHASTAIN.TRIP.DROPOFFZONE)';

async function find(context) {
  let query = basequery;
  const binds = {};
  if (context.month) {
    binds.month = context.month
    query += ', QUERY2 AS( SELECT * FROM QUERY1 WHERE :month = 12)';
    query += 'SELECT COUNT(tripID) AS count, ENDZONE AS zone FROM QUERY2 GROUP BY ENDZONE';
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
