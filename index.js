const webServer = require('./services/web-server.js');
const database = require('./services/database.js');
const dbConfig = require('./config/database.js');
const iphandle = require('ip');

const vpn = require('cisco-vpn')({
  server: process.env.VPN_SERVER,
  username: process.env.VPN_username,
  password: process.env.VPN_PASSWORD
})

async function startup() {

  console.log('Starting application');

// Checks to make sure VPN isn't already Connected
// Low value indicates an IP address that isn't local
  if(iphandle.toLong(iphandle.address()) > 200000000 )
  {
    await vpn.connect()
      .then(() => console.log('connected to UF VPN'))
  }
  console.log(iphandle.address());
// Initialize the CISE database pool with credentials stored in ./bashrc
  try {
    console.log('Initializing database module');
    await database.initialize();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

// Initialize the web server after VPN and database connected
  try {
    console.log('Initializing web server module');
    await webServer.initialize();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startup();

async function shutdown(e) {
  let err = e;
  console.log('Shutting down');
  try {
    await vpn.disconnect()
        .then(() => console.log('Disconnected from UF VPN'))
    await webServer.close();
  } catch (e) {
    console.log('Encountered error', e);
    err = err || e;
  }

  try {
    console.log('Closing database module');
    await database.close();
  } catch (err) {
    console.log ('Encountered error closing database', e);
    err = err || e;
  }

  console.log('Exiting process');

  if (err) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

// Ensure proper shutdown on CTRL + C case
process.on('SIGTERM', () => {
  console.log('Received SIGTERM');
  shutdown();
});

process.on('SIGINT', () => {
  console.log('Received SIGINT');

  shutdown();
});

process.on('uncaughtException', err => {
  console.log('Uncaught exception');
  console.error(err);

  shutdown(err);
});
