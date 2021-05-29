const express = require('express');
const accountController = require('../controllers/account');

const router = express.Router();
//Home routes
router.get('/', accountController.index);

//Account routes
router.get('/add-account', accountController.addAccount);
router.post('/add-account', accountController.createAccount);
router.get('/:_id', accountController.getAccount);
router.get('/edit/:_id', accountController.editAccount);
router.post('/update/:_id', accountController.updateAccount);
router.post('/delete/:_id', accountController.deleteAccount)

module.exports = router;