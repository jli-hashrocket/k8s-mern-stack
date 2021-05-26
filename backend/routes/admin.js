const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();
//Home routes
router.get('/', adminController.getIndex);

//Account routes
router.get('/add-account', adminController.getAddAccount);
router.post('/add-account', adminController.postAccount);
router.get('/:accountId', adminController.getAccount);
router.post('/delete/:accountId', adminController.postDelete)

module.exports = router;