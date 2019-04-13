const database = require('../services/database.js');

const basequery =
'WITH QUERY1 AS(SELECT TRIPID AS tripID, PICKUPTIME AS starttime, DROPOFFTIME AS endtime, geo1.ZONEID AS pickupzone, geo2.zoneid AS endzone  FROM  CHASTAIN.TRIP, CHASTAIN.GEOZONE geo1, CHASTAIN.GEOZONE geo2 WHERE geo1.ZONEID = CHASTAIN.TRIP.PICKUPZONE AND geo2.ZONEID = CHASTAIN.TRIP.DROPOFFZONE)';

async function find(context) {
  var query = 'WITH QUERY1 AS(SELECT TRIPID AS tripID, PICKUPTIME AS starttime, DROPOFFTIME AS endtime, geo1.ZONEID AS pickupzone, geo2.zoneid AS endzone  FROM  CHASTAIN.TRIP, CHASTAIN.GEOZONE geo1, CHASTAIN.GEOZONE geo2 WHERE geo1.ZONEID = CHASTAIN.TRIP.PICKUPZONE AND geo2.ZONEID = CHASTAIN.TRIP.DROPOFFZONE)';

  const binds = {};


    query += ', QUERY2 AS(SELECT TRIPID, TOTALCOST, DISTANCE FROM CHASTAIN.YELLOWTRIP UNION SELECT TRIPID, TOTALCOST, DISTANCE FROM CHASTAIN.GREENTRIP)' +
     ', QUERY3 AS(SELECT SUM(QUERY2.TOTALCOST) AS totalcost, QUERY1.PICKUPZONE, SUM(QUERY2.DISTANCE) AS totaldistance FROM QUERY1 INNER JOIN QUERY2 ON QUERY1.tripID = QUERY2.tripID GROUP BY QUERY1.PICKUPZONE)' +
      ' SELECT ROUND(totalcost/totaldistance, 2) AS pricepermile, pickupzone FROM QUERY3'




  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
