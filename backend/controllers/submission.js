const Submission = require('../models/Submission');
const SubmissionService = require('../services/SubmissionService')

exports.getAccountSubmissions = async (req, res) => {
  const accountId = req.params._id;
  const params = { account_id: accountId, url: req.body.url }
	const accountSubmissions = await Submission.find({ account_id: accountId });
	
	try {
    if ( accountSubmissions ) {
      res.json(accountSubmissions);
    } else {
      accountSubmissions = await SubmissionService.importData(params);
      res.json(accountSubmissions);
    }
		
	} catch (error) {
		console.log(error);
	}
    
};