const Message = require("./messageModel");
const User = require("./userModel");

User.hasMany(Message);
Message.belongsTo(User);

module.exports = {User,Message}