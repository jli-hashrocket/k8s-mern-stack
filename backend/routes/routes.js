const express = require('express');
const accountController = require('../controllers/account');
const submissionController = require('../controllers/submission');

const router = express.Router();
//Home routes
router.get('/accounts', accountController.index);

//Account routes
router.get('/add-account', accountController.addAccount);
router.post('/create-account', accountController.createAccount);
router.get('/:_id', accountController.getAccount);
router.get('/edit/:_id', accountController.editAccount);
router.post('/update/:_id', accountController.updateAccount);
router.post('/delete/:_id', accountController.deleteAccount)

//Submission routes
router.get('/accounts/:_id/submissions', submissionController.getAccountSubmissions);


module.exports = router;