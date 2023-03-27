const { Sequelize , DataTypes } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('myapp', 'root', '', {
  host: 'localhost',
  logging: false,
  dialect: 'mysql',
});


  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database: ' , error);
  }

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./Models/Users')(sequelize ,DataTypes);
db.History = require('./Models/History')(sequelize ,DataTypes);

db.sequelize.sync();
console.log("All models were synchronized successfully.");

module.exports = db;