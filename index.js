const server = require('./services/server');
const database = require('./services/database');
const authentication = require('./services/authentication');
const dbConfig = require('./config/database');

async function startup() {

  console.log('Starting application');
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
    await server.initialize();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

async function authenticate() {

  console.log('Starting auth server');

// Initialize the CISE database pool with credentials stored in ./bashrc
  try {
    await authentication.initialize();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

}

startup();
authenticate();

async function shutdown(e) {
  let err = e;
  console.log('Shutting down');
  try {
    await vpn.disconnect()
        .then(() => console.log('Disconnected from UF VPN'))
    await dataserver.close();
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
