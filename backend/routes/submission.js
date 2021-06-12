const express = require('express');
const submissionController = require('../controllers/submission');
const router = express.Router();

router.get('/accounts/:_id/submissions', submissionController.getAccountSubmissions);
