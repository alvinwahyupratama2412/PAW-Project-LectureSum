const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

router.get('/', viewController.renderDashboard);
router.get('/form', viewController.renderForm);
router.get('/materi/:id', viewController.renderDetail);

module.exports = router;