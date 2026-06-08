const { DataTypes } = require("sequelize");
const sequelize = require("../config/db-connection");

const ArchievedChat= sequelize.define("ArchievedChat",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    message:{
        type:DataTypes.STRING,
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER
    },
    mediaUrl:{
        type:DataTypes.TEXT
    }

})

module.exports = ArchievedChat