const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();
//Home routes
router.get('/', adminController.getIndex);

//Account routes
router.get('/add-account', adminController.getAddAccount);
router.post('/add-account', adminController.postAccount);

module.exports = router;