const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const upload = require('../middlewares/upload');

router.get('/status', apiController.getStatus);
router.get('/materi', apiController.getMateri);
router.get('/materi/:id', apiController.getMateriById);
router.post('/materi', upload.single('dokumen'), apiController.createMateri);
router.put('/materi/:id', upload.single('dokumen'), apiController.updateMateri);
router.delete('/materi/:id', apiController.deleteMateri);

module.exports = router;