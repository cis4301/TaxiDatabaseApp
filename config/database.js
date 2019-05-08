module.exports = {

  CISEPool: {

    user: 'jsh',
    password: 'Gg7405070366',
    connectString: "oracle.cise.ufl.edu:1521/orcl",
//    connectString: process.env.CISE_CONNECTIONSTRING,
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  },
  Mongoose: {

    database: 'mongodb+srv://Hackleman:HEEZBV82VxqHYVq6@honeycomb-6bs3p.mongodb.net/test?retryWrites=true',
    secret: 'rosebud'
  }
};
