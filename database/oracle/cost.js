const database = require('../../services/database.js');

const baseQuery =
'WITH QUERY1 AS(SELECT TRIPID, TOTALCOST/DISTANCE AS costpermile, DISTANCE FROM CHASTAIN.YELLOWTRIP UNION SELECT TRIPID, TOTALCOST/DISTANCE AS costpermile, DISTANCE FROM CHASTAIN.GREENTRIP)'

async function find(context) {

  let query = baseQuery;

  const binds = {};

  if (context.hour === 0) {

    query += ', QUERY2 AS(SELECT TRIPID AS tripID, PICKUPTIME AS starttime, DROPOFFTIME AS endtime, geo1.ZONEID AS pickupzone, geo2.zoneid AS endzone  FROM  CHASTAIN.TRIP, CHASTAIN.GEOZONE geo1, CHASTAIN.GEOZONE geo2 WHERE geo1.ZONEID = CHASTAIN.TRIP.PICKUPZONE AND geo2.ZONEID = CHASTAIN.TRIP.DROPOFFZONE )'
    query +=  'SELECT AVG(costpermile) AS average, QUERY2.PICKUPZONE AS pickupzone FROM QUERY2 INNER JOIN QUERY1 ON QUERY2.tripID = QUERY1.tripID GROUP BY QUERY2.PICKUPZONE'


  } else {
    binds.hour = context.hour;
    query += ', QUERY2 AS(SELECT TRIPID AS tripID, PICKUPTIME AS starttime, DROPOFFTIME AS endtime, geo1.ZONEID AS pickupzone, geo2.zoneid AS endzone  FROM  CHASTAIN.TRIP, CHASTAIN.GEOZONE geo1, CHASTAIN.GEOZONE geo2 WHERE geo1.ZONEID = CHASTAIN.TRIP.PICKUPZONE AND geo2.ZONEID = CHASTAIN.TRIP.DROPOFFZONE )'
    query += ', QUERY3 AS(SELECT * FROM QUERY2 WHERE (EXTRACT(HOUR from QUERY2.starttime)) = :hour)'
    query +=  'SELECT AVG(costpermile) AS average, QUERY3.PICKUPZONE AS pickupzone FROM QUERY3 INNER JOIN QUERY1 ON QUERY3.tripID = QUERY1.tripID GROUP BY QUERY3.PICKUPZONE'

  }


  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
