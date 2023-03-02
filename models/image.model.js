const { DataTypes } = require("sequelize");

const createImageModel = (sequelize) => {
    let image = sequelize.define("image", {
        image_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        file_name: {
            type: DataTypes.STRING,
        },
        date_added: {
            type: DataTypes.DATE
        },
        s3_bucket_path: {
            type: DataTypes.STRING
        }
    },
    {
        updatedAt: 'date_last_updated',
        createdAt: 'date_added',
    },
    {
        initialAutoIncrement: 1,
    });

    return image;
}

module.exports = createImageModel;