module.exports = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'senacrs',
    database: 'db_bitbybit'
  },
  pool: { min: 0, max: 7 }
};