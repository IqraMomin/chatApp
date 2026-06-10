const express = require("express");
const router = express.Router();
const geminiController = require("../controllers/geminiController");

router.post("/ai/predict",geminiController.predictText);


module.exports = router