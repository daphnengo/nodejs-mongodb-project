const express = require('express');
const errorsController = require('../controllers/errors');

const router = express.Router();

router.get('/404', errorsController.getError404);

module.exports = router;