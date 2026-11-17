
require('dotenv').config();

// ==========================================
// KONFIGURASI GEMINI (DINONAKTIFKAN)
// ==========================================

// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const geminiApiKey = process.env.GEMINI_API_KEY;

// const genAI = new GoogleGenerativeAI(geminiApiKey);
// const geminiModel = genAI.getGenerativeModel({
//     model: "gemini-3.8-flash"
// });

// ==========================================
// KONFIGURASI GROK (AKTIF)
// ==========================================

const OpenAI = require("openai");

const grok = new OpenAI({
    apiKey: process.env.GROK_API_KEY,
    baseURL: "https://api.x.ai/v1"
});

// ==========================================
// EXPORT
// ==========================================

module.exports = grok;
