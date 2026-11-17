const Materi = require('../models/materiModel');

const renderDashboard = async (req, res) => {
    try {
        const daftarMateri = await Materi.findAll({ order: [['createdAt', 'DESC']] });
        res.render('index', { title: 'LectureSum - Dashboard', materi: daftarMateri });
    } catch (error) {
        res.status(500).send("Gagal memuat dashboard");
    }
};

const renderForm = async (req, res) => {
    try {
        const id = req.query.id; 
        let materiEdit = null;
        if (id) materiEdit = await Materi.findByPk(id);
        
        res.render('form', { 
            title: materiEdit ? 'Edit Materi' : 'Tambah Materi', 
            materi: materiEdit 
        });
    } catch (error) {
        res.status(500).send("Gagal memuat form");
    }
};

const renderDetail = async (req, res) => {
    try {
        const materi = await Materi.findByPk(req.params.id);
        if (!materi) return res.status(404).send("Materi tidak ditemukan");
        res.render('detail', { 
            title: `${materi.judul} - Ringkasan LectureSum`, 
            materi 
        });
    } catch (error) {
        res.status(500).send("Gagal memuat dokumen ringkasan");
    }
};

module.exports = { renderDashboard, renderForm, renderDetail };