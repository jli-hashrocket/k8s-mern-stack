const Submission = require('../models/Submission');
const SubmissionService = require('../services/SubmissionService')

exports.getAccountSubmissions = async (req, res) => {
  const accountId = req.params._id;
	const accountSubmissions = await Submission.find({ account_id: accountId });
	
	try {
    
    if ( accountSubmissions.length !== 0 ) {
      res.json({submissions: accountSubmissions});
    } else {
      res.json({submissions: null})
    }
	} catch (error) {
		console.log(error);
	}
    
};

exports.importSubmissions = (req, res) => {
  console.log(req);
  const url = req.body.url;
  const submissionService = new SubmissionService(url)
  const accountSubmissions = submissionService.importData();

  try {
    console.log(accountSubmissions);
    res.json(accountSubmissions);
  } catch (error) {
    console.log(error);
  }
}