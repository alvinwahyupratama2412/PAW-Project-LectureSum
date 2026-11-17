const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController.js');
const validateChatInput = require('../middlewares/validateChatInput.js');

// Rute ini menerima POST dari frontend
router.post('/chat', validateChatInput, chatController.processChat);

module.exports = router;