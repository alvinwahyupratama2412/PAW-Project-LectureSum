const fs = require('fs');
const { PDFParse } = require('pdf-parse');
const Materi = require('../models/materiModel');
const geminiService = require('../services/gemini.service');
const { formatAiSummary } = require('../utils/helpers');

// Fungsi untuk mengekstrak teks dari PDF
const extractPDFText = async (filePath) => {
    const data = new Uint8Array(fs.readFileSync(filePath));

    const parser = new PDFParse({ data });

    try {
        const result = await parser.getText();
        return result.text;
    } finally {
        await parser.destroy();
    }
};

// Cek status API
const getStatus = (req, res) => {
    res.json({
        status: "success",
        message: "API berjalan baik."
    });
};

// Mengambil semua materi
const getMateri = async (req, res) => {
    try {
        const materi = await Materi.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.json(materi);

    } catch (error) {
        console.error("ERROR GET MATERI:", error);
        res.status(500).json({
            error: error.message
        });
    }
};

// Mengambil materi berdasarkan ID
const getMateriById = async (req, res) => {
    try {
        const materi = await Materi.findByPk(req.params.id);

        if (!materi) {
            return res.status(404).json({
                message: "Materi tidak ditemukan!"
            });
        }

        res.json(materi);

    } catch (error) {
        console.error("ERROR GET MATERI BY ID:", error);
        res.status(500).json({
            error: error.message
        });
    }
};

// Menambahkan materi baru
const createMateri = async (req, res) => {
    try {
        const data = { ...req.body };

        if (req.file) {
            data.file_dokumen = `/uploads/docs/${req.file.filename}`;

            // Jika file yang diupload adalah PDF
            if (req.file.mimetype === 'application/pdf') {

                // Ekstrak teks PDF
                const pdfText = await extractPDFText(req.file.path);

                // Batasi teks maksimal 20.000 karakter
                const textToSummarize = pdfText.substring(0, 20000);

                // Buat ringkasan menggunakan Gemini AI
                data.ringkasan = await geminiService.summarizeDocument(
                    textToSummarize
                );
            }
        }

        await Materi.create(data);

        res.status(201).json({
            message: "Materi ditambahkan!"
        });

    } catch (error) {
        console.error("ERROR SAAT SIMPAN MATERI:", error);

        res.status(500).json({
            error: error.message
        });
    }
};

// Memperbarui materi
const updateMateri = async (req, res) => {
    try {
        const data = { ...req.body };

        if (req.file) {
            data.file_dokumen = `/uploads/docs/${req.file.filename}`;

            // Jika file baru adalah PDF
            if (req.file.mimetype === 'application/pdf') {

                // Ekstrak teks PDF
                const pdfText = await extractPDFText(req.file.path);

                // Buat ringkasan menggunakan Gemini AI
                data.ringkasan = await geminiService.summarizeDocument(
                    pdfText.substring(0, 20000)
                );
            }
        }

        const [updated] = await Materi.update(data, {
            where: { id: req.params.id }
        });

        if (!updated) {
            return res.status(404).json({
                message: "Materi tidak ditemukan!"
            });
        }

        res.json({
            message: "Materi diperbarui!"
        });

    } catch (error) {
        console.error("ERROR SAAT UPDATE MATERI:", error);

        res.status(500).json({
            error: error.message
        });
    }
};

// Menghapus materi
const deleteMateri = async (req, res) => {
    try {
        const deleted = await Materi.destroy({
            where: { id: req.params.id }
        });

        if (!deleted) {
            return res.status(404).json({
                message: "Materi tidak ditemukan!"
            });
        }

        res.json({
            message: "Materi dihapus!"
        });

    } catch (error) {
        console.error("ERROR DELETE MATERI:", error);

        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    getStatus,
    getMateri,
    getMateriById,
    createMateri,
    updateMateri,
    deleteMateri
};
