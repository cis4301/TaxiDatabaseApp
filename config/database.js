module.exports = {
  CISEPool: {
    user: process.env.CISE_USER,
    password: process.env.CISE_PASSWORD,
//    connectString: "localhost/orcl",
    connectString: process.env.CISE_CONNECTIONSTRING,
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  },
  Mongoose: {
    database: process.env.MONGO_URI,
    secret: 'secret'
  }
};
