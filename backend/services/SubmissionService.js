const parser = require('xml2json');
const fetch = require('node-fetch');

class SubmissionService {
  constructor(url) {
    this.url = url
  }

  async importData() {
    const response = await fetch(this.url);
    const data = await response.text();
    const jsonData = await parser.toJson(data)
    
    try {
      return jsonData;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = SubmissionService;
