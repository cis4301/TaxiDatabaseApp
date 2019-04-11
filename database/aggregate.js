const database = require('../services/database.js');

const baseQuery =
'WITH QUERY1 AS(SELECT TRIPID AS tripID, (extract(minute from (dropofftime - pickuptime))*60 + extract(second from (dropofftime - pickuptime))) AS DATEDIFF, PICKUPTIME AS starttime, DROPOFFTIME AS endtime, geo1.ZONEID AS pickupzone, geo2.zoneid AS endzone FROM CHASTAIN.TRIP, CHASTAIN.GEOZONE geo1, CHASTAIN.GEOZONE geo2 WHERE geo1.ZONEID = CHASTAIN.TRIP.PICKUPZONE AND geo2.ZONEID = CHASTAIN.TRIP.DROPOFFZONE)';


async function find(context) {
    let query = baseQuery;
  if (context.type === 1) {
    query += ', QUERY2 AS(SELECT * FROM QUERY1 NATURAL JOIN CHASTAIN.GREENTRIP)';
    console.log(query);
  }
  else if (context.type === 2) {
    query += ', QUERY2 AS(SELECT * FROM QUERY1 NATURAL JOIN CHASTAIN.YELLOWTRIP)';
    console.log(query);
  } else if (context.type === 3){
    query += ', QUERY2 AS(SELECT * FROM QUERY1 WHERE tripID NOT IN(SELECT TRIPID FROM CHASTAIN.YELLOWTRIP UNION SELECT TRIPID FROM CHASTAIN.GREENTRIP))'
    console.log(query);
  } else {
    query += ', QUERY2 AS(SELECT * FROM QUERY1)';
  }

  const binds = {};

  if (context.zone1) {

    binds.startingzone = context.zone1;
  //  binds.type = context.type;

    query += ' SELECT ROUND(AVG(DATEDIFF)) AS triptime, endzone FROM QUERY2 WHERE pickupzone = :startingzone GROUP BY endzone'

  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
