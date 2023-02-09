const Sequelize = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();

const createUserModel = require('../models/user.model');
const createProductModel = require('../models/product.model');

const sequelize = new Sequelize(
    process.env.DATABASE,
   process.env.DBUSER,
   process.env.DBPASS,
    {
      host: process.env.DBHOST,
      dialect: 'mysql',
      "define": {
            freezeTableName: true
        }     
    }
);

let db = {};

db.sequelize = sequelize;
//db.Sequelize = Sequelize;

db.user = createUserModel(sequelize);
db.product = createProductModel(sequelize);

module.exports = db;