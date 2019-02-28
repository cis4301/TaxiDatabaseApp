module.exports = {
  CISEPool: {
    user: process.env.CISE_USER,
    password: process.env.CISE_PASSWORD,
//    connectString: "localhost/orcl",
    connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = oracle.cise.ufl.edu)(PORT = 1521))(CONNECT_DATA =(SID= ORCL)))",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  }
};
