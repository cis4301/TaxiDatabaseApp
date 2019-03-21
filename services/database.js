const dbConfig = require('../config/database.js');
const oracledb = require('oracledb');
const iphandle = require('ip');
const vpn = require('cisco-vpn')({
  server: process.env.VPN_SERVER,
  username: process.env.VPN_username,
  password: process.env.VPN_PASSWORD
})

async function initialize()
{

  if(iphandle.toLong(iphandle.address()) > 200000000 )
  {
    await vpn.connect()
      .then(() => console.log('connected to UF VPN'))
  }
  console.log(iphandle.address());

  await oracledb.createPool(dbConfig.CISEPool);

  console.log("Oracle DB Connected~!!!");
}

async function close()
{
  await oracledb.getPool().close();
}

function simpleExecute(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;

    try {
      conn = await oracledb.getConnection();

      const result = await conn.execute(statement, binds, opts);

      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) { // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}

module.exports.simpleExecute = simpleExecute;
module.exports.close = close;
module.exports.initialize = initialize;
