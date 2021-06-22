const parser = require('xml2json');
const fetch = require('node-fetch');
const Submission = require('../models/Submission');


class SubmissionService {
  constructor(accountId, url) {
    this.url = url
    this.accountId = accountId
  }

  persistSubmissions = (data) => {
    const submissions = data.CanvasResult.Submissions.Submission
    submissions.forEach(s => {
      const submission = new Submission({ 
        account_id: this.accountId, 
        submission_id: parseInt(s.Id),
        form_id: parseInt(s.Form.Id),
        date: s.Date, 
        email: s.UserName,
        submission_status: s.SubmissionStatus
      });
      submission.save();
    
    }); 
  }

  importData = async () => {
    const response = await fetch(this.url);
    const data = await response.text();
    const jsonData = await parser.toJson(data)
    
    try {
      this.persistSubmissions(JSON.parse(jsonData))
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = SubmissionService;
