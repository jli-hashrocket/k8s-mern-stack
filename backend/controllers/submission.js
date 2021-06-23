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

exports.importSubmissions = async (req, res) => {
  const url = req.body.api_url;
  const accountId = req.params._id
  const submissionService = await new SubmissionService(accountId, url)
  const importedSubs = await submissionService.importData();
  const subRecords = await submissionService.persistSubmissions(importedSubs)

  try {
    res.json({submissions: subRecords});
  } catch (err) {
    console.log(err);
  }
}