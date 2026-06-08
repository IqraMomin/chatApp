const cron = require('node-cron');
const Message = require('../models/messageModel');
const ArchivedChat = require('../models/archievedChat');
const { Op } = require('sequelize');

cron.schedule('0 0 * * *', async () => {
    try {
        const oneDayOld = new Date();
        oneDayOld.setDate(oneDayOld.getDate() - 1);
        console.log("Running ARCHIEVED ONE'S")
        const oldChats = await Message.findAll({
            where: {
                createdAt: {
                    [Op.lt]: oneDayOld
                }
            }
        });

        if (oldChats.length === 0) return;

        await ArchivedChat.bulkCreate(
            oldChats.map(chat => ({
                message: chat.message,
                userId: chat.userId,
                createdAt: chat.createdAt,
                updatedAt: chat.updatedAt
            }))
        );

        await Message.destroy({
            where: {
                createdAt: {
                    [Op.lt]: oneDayOld
                }
            }
        });

        console.log("Chats archived successfully");
    } catch (err) {
        console.log(err);
    }
});