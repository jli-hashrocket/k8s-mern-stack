const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();
//Home routes
router.get('/', adminController.index);

//Account routes
router.get('/add-account', adminController.addAccount);
router.post('/add-account', adminController.createAccount);
router.get('/:_id', adminController.getAccount);
router.get('/edit/:_id', adminController.editAccount);
router.post('/update/:_id', adminController.updateAccount);
router.post('/delete/:_id', adminController.deleteAccount)

module.exports = router;