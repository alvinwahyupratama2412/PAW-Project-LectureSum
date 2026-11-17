const geminiService = require('../services/gemini.service.js');

const processChat = async (req, res) => {
    try {
        const { message } = req.body;
        const aiResponse = await geminiService.generateResponse(message);
        
        res.json({
            success: true,
            data: {
                reply: aiResponse
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan internal server saat memproses AI."
        });
    }
};

module.exports = { processChat };