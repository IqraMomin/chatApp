const { DataTypes } = require("sequelize");
const sequelize = require("../config/db-connection");

const Message= sequelize.define("Message",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    message:{
        type:DataTypes.STRING,
        allowNull:false
    },

})

module.exports = Message