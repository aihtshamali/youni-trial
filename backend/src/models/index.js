const Sequelize = require('sequelize');
const dbConfig = require('../config/config');

// Database connection
const sequelize = new Sequelize(dbConfig.postgres.DB, dbConfig.postgres.User, dbConfig.postgres.PWD, {
  host: dbConfig.HOST,
  dialect: 'postgres',

  pool: { ...dbConfig.pool },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Exporting our routes
db.Event = require('./event')(sequelize, Sequelize);

module.exports = db;
