const { DataTypes } = require("sequelize");

const createUserModel = (sequelize) => {
    let User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        account_created: {
            type: DataTypes.DATE,
            allowNull: false
        },
        account_updated: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        updatedAt: 'account_updated',
        createdAt: 'account_created',
    },
    {
        initialAutoIncrement: 1,
    });

    return User;
}

module.exports = createUserModel;