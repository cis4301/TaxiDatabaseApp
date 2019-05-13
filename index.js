const server = require('./services/authentication');
const dbConfig = require('./config/database');


async function startup() {

  console.log('Starting auth server');

// Initialize the Mongoose server
  try {
    await server.initialize();
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
    await server.close();
  } catch (e) {
    console.log('Encountered error', e);
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
