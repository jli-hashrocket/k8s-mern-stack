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
    const savedSubs = []
    console.log
    submissions.forEach(s => {
      const submission = new Submission({ 
        account_id: this.accountId, 
        submission_id: parseInt(s.Id),
        form_id: parseInt(s.Form.Id),
        date: s.Date, 
        username: s.UserName,
        submission_status: s.SubmissionStatus
      });
      submission.save();
      savedSubs.push(submission)
    });
    console.log(savedSubs)
    return savedSubs
  }

  importData = async () => {
    const response = await fetch(this.url);
    const data = await response.text();
    const jsonData = await parser.toJson(data)
    
    try {
      return JSON.parse(jsonData);
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = SubmissionService;
