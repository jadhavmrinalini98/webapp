const Sequelize = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();

const createUserModel = require('../models/user.model');
const createProductModel = require('../models/product.model');
const createImageModel = require('../models/image.model');

console.log(    process.env.DATABASE,
    process.env.DBUSER,
    process.env.DBPASS, process.env.DBHOST)
    
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

db.user = createUserModel(sequelize);
db.product = createProductModel(sequelize);
db.image = createImageModel(sequelize);

module.exports = db;