const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const upload = require("../middleware/upload");

router.post("/send",messageController.sendMessage);
router.get("/get",messageController.getMessages);
router.post("/upload",upload.single("media"),messageController.uploadMedia);

module.exports = router;